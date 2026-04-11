// ─────────────────────────────────────────────
// STOCK SERVICE
// src/app/features/stock/services/stock.service.ts
// ─────────────────────────────────────────────
import { Injectable, computed, signal } from '@angular/core';
import {
  Stock, StoreStockView,
  AdjustStockRequest, StockFilter
} from '../../../core/models/stock.model';
import { StockStatus } from '../../../core/models/product.model';
import { PaginatedResponse } from '../../../core/models/shared.model';
import { BaseService } from '../../../core/services/base.service';
import { FAKE_STOCK } from '../data/stock.data';

@Injectable({ providedIn: 'root' })
export class StockService extends BaseService<Stock> {

  private _filter = signal<StockFilter>({});

  constructor() {
    super();
    this._items.set([...FAKE_STOCK]);
  }

  // ── Computed ──────────────────────────────
  readonly lowStockItems = computed(() =>
    this._items().filter(s => s.status === 'LOW')
  );

  readonly outOfStockItems = computed(() =>
    this._items().filter(s => s.status === 'OUT')
  );

  readonly filtered = computed(() => {
    const f = this._filter();
    return this._items().filter(s => {
      if (f.storeId   && s.storeId   !== f.storeId)   return false;
      if (f.productId && s.productId !== f.productId) return false;
      if (f.status    && s.status    !== f.status)    return false;
      if (f.category  && s.product?.category !== f.category) return false;
      if (f.search) {
        const q = f.search.toLowerCase();
        if (!s.product?.name.toLowerCase().includes(q) &&
            !s.product?.reference.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  });

  // ─────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────
  getAll(filter?: StockFilter): PaginatedResponse<Stock> {
    if (filter) this._filter.set(filter);
    return this.paginate(this.filtered(), {
      page:     filter?.page     ?? 1,
      pageSize: filter?.pageSize ?? 10,
    });
  }

  getByStore(storeId: string): Stock[] {
    return this._items().filter(s => s.storeId === storeId);
  }

  getByProduct(productId: string): Stock[] {
    return this._items().filter(s => s.productId === productId);
  }

  getByProductAndStore(productId: string, storeId: string): Stock | undefined {
    return this._items().find(
      s => s.productId === productId && s.storeId === storeId
    );
  }

  // Vue groupée par magasin
  getStoreStockView(storeId: string): StoreStockView | null {
    const items = this.getByStore(storeId);
    if (!items.length) return null;

    const storeName = items[0].store?.name ?? storeId;
    return {
      storeId,
      storeName,
      items,
      summary: {
        total:    items.length,
        lowStock: items.filter(s => s.status === 'LOW').length,
        outStock: items.filter(s => s.status === 'OUT').length,
        ok:       items.filter(s => s.status === 'OK').length,
      },
    };
  }

  setFilter(filter: Partial<StockFilter>): void {
    this._filter.update(f => ({ ...f, ...filter }));
  }

  clearFilter(): void { this._filter.set({}); }

  // ─────────────────────────────────────────
  // ADJUST STOCK (entrée / sortie / correction)
  // ─────────────────────────────────────────
  adjustStock(req: AdjustStockRequest): Stock {
    const existing = this.getByProductAndStore(req.productId, req.storeId);

    if (existing) {
      // Mise à jour quantité
      const updated: Stock = {
        ...existing,
        quantity:     req.quantity,
        availableQty: req.quantity - existing.reservedQty,
        status:       this.computeStatus(req.quantity, existing),
        lastUpdated:  new Date().toISOString(),
        updatedBy:    req.reason,
      };
      this._items.update(list =>
        list.map(s => s.id === existing.id ? updated : s)
      );
      return updated;
    } else {
      // Création nouvelle ligne stock
      const newStock: Stock = {
        id:           this.generateId('stk'),
        productId:    req.productId,
        storeId:      req.storeId,
        quantity:     req.quantity,
        reservedQty:  0,
        availableQty: req.quantity,
        status:       'OK',
        lastUpdated:  new Date().toISOString(),
        updatedBy:    req.reason,
      };
      this._items.update(list => [...list, newStock]);
      return newStock;
    }
  }

  // Appliquer un mouvement (IN/OUT/TRANSFER)
  applyMovement(
    productId: string,
    storeId:   string,
    delta:     number,       // positif = IN, négatif = OUT
    userId:    string
  ): Stock | null {
    const stock = this.getByProductAndStore(productId, storeId);
    if (!stock) return null;

    const newQty = stock.quantity + delta;
    if (newQty < 0) return null;  // ❌ stock ne peut pas être négatif

    return this.adjustStock({
      productId,
      storeId,
      quantity: newQty,
      reason:   userId,
    });
  }

  // ─────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────
  private computeStatus(qty: number, stock: Stock): StockStatus {
    const min = stock.product?.minStockLevel ?? 0;
    const max = stock.product?.maxStockLevel ?? Infinity;
    if (qty === 0)    return 'OUT';
    if (qty < min)    return 'LOW';
    if (qty > max)    return 'OVERSTOCK';
    return 'OK';
  }
}