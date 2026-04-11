// ─────────────────────────────────────────────
// MOVEMENT SERVICE
// src/app/features/movements/services/movement.service.ts
// ─────────────────────────────────────────────
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Movement, MovementFilter,
  CreateMovementInRequest, CreateMovementOutRequest,
  CreateTransferRequest
} from '../../../core/models/movement.model';
import { PaginatedResponse } from '../../../core/models/shared.model';
import { BaseService } from '../../../core/services/base.service';
import { StockService } from '../../stock/services/stock.service';
import { FAKE_MOVEMENTS } from '../data/mouvements.data';

@Injectable({ providedIn: 'root' })
export class MovementService extends BaseService<Movement> {

  private stockService = inject(StockService);
  private _filter      = signal<MovementFilter>({});

  constructor() {
    super();
    this._items.set([...FAKE_MOVEMENTS]);
  }

  // ── Computed ──────────────────────────────
  readonly filtered = computed(() => {
    const f = this._filter();
    return this._items()
      .filter(m => {
        if (f.type      && m.type      !== f.type)      return false;
        if (f.productId && m.productId !== f.productId) return false;
        if (f.storeId   && m.sourceStoreId !== f.storeId &&
                           m.destStoreId   !== f.storeId) return false;
        if (f.dateFrom  && m.createdAt < f.dateFrom)    return false;
        if (f.dateTo    && m.createdAt > f.dateTo)      return false;
        return true;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // plus récent en premier
  });

  readonly todayMovements = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this._items().filter(m => m.createdAt.startsWith(today));
  });

  // ─────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────
  getAll(filter?: MovementFilter): PaginatedResponse<Movement> {
    if (filter) this._filter.set(filter);
    return this.paginate(this.filtered(), {
      page:     filter?.page     ?? 1,
      pageSize: filter?.pageSize ?? 10,
    });
  }

  getByStore(storeId: string): Movement[] {
    return this._items().filter(
      m => m.sourceStoreId === storeId || m.destStoreId === storeId
    );
  }

  setFilter(filter: Partial<MovementFilter>): void {
    this._filter.update(f => ({ ...f, ...filter }));
  }

  clearFilter(): void { this._filter.set({}); }

  // ─────────────────────────────────────────
  // ENTRÉE STOCK (IN)
  // ─────────────────────────────────────────
  createIn(req: CreateMovementInRequest, userId: string): Movement | null {
    const stockBefore = this.stockService
      .getByProductAndStore(req.productId, req.destStoreId)?.quantity ?? 0;

    // Appliquer le mouvement sur le stock
    const updatedStock = this.stockService.applyMovement(
      req.productId, req.destStoreId, +req.quantity, userId
    );
    if (!updatedStock) return null;

    const movement: Movement = {
      id:             this.generateId('mov'),
      type:           'IN',
      reason:         req.reason,
      productId:      req.productId,
      destStoreId:    req.destStoreId,
      quantity:       req.quantity,
      quantityBefore: stockBefore,
      quantityAfter:  updatedStock.quantity,
      note:           req.note    ?? '',
      reference:      req.reference ?? this.generateRef('IN'),
      createdAt:      new Date().toISOString(),
      createdBy:      userId,
    };

    this._items.update(list => [movement, ...list]);
    return movement;
  }

  // ─────────────────────────────────────────
  // SORTIE STOCK (OUT)
  // ─────────────────────────────────────────
  createOut(req: CreateMovementOutRequest, userId: string): Movement | { error: string } {
    const currentStock = this.stockService
      .getByProductAndStore(req.productId, req.sourceStoreId);

    // ❌ Règle métier : stock ne peut pas être négatif
    if (!currentStock || currentStock.quantity < req.quantity) {
      return { error: `Stock insuffisant. Disponible : ${currentStock?.quantity ?? 0}` };
    }

    const stockBefore = currentStock.quantity;
    const updatedStock = this.stockService.applyMovement(
      req.productId, req.sourceStoreId, -req.quantity, userId
    );
    if (!updatedStock) return { error: 'Erreur lors de la mise à jour du stock' };

    const movement: Movement = {
      id:              this.generateId('mov'),
      type:            'OUT',
      reason:          req.reason,
      productId:       req.productId,
      sourceStoreId:   req.sourceStoreId,
      quantity:        req.quantity,
      quantityBefore:  stockBefore,
      quantityAfter:   updatedStock.quantity,
      note:            req.note      ?? '',
      reference:       req.reference ?? this.generateRef('OUT'),
      createdAt:       new Date().toISOString(),
      createdBy:       userId,
    };

    this._items.update(list => [movement, ...list]);
    return movement;
  }

  // ─────────────────────────────────────────
  // TRANSFERT INTER-MAGASIN
  // ─────────────────────────────────────────
  createTransfer(req: CreateTransferRequest, userId: string): Movement | { error: string } {
    if (req.sourceStoreId === req.destStoreId) {
      return { error: 'Source et destination ne peuvent pas être identiques' };
    }

    const sourceStock = this.stockService
      .getByProductAndStore(req.productId, req.sourceStoreId);

    if (!sourceStock || sourceStock.quantity < req.quantity) {
      return { error: `Stock insuffisant dans la source. Disponible : ${sourceStock?.quantity ?? 0}` };
    }

    const stockBefore = sourceStock.quantity;

    // Déduire du magasin source
    this.stockService.applyMovement(req.productId, req.sourceStoreId, -req.quantity, userId);
    // Ajouter au magasin destination
    const destStock = this.stockService.applyMovement(req.productId, req.destStoreId, +req.quantity, userId);

    const movement: Movement = {
      id:              this.generateId('mov'),
      type:            'TRANSFER',
      reason:          'INTER_STORE',
      productId:       req.productId,
      sourceStoreId:   req.sourceStoreId,
      destStoreId:     req.destStoreId,
      quantity:        req.quantity,
      quantityBefore:  stockBefore,
      quantityAfter:   stockBefore - req.quantity,
      note:            req.note      ?? '',
      reference:       req.reference ?? this.generateRef('TRF'),
      createdAt:       new Date().toISOString(),
      createdBy:       userId,
    };

    this._items.update(list => [movement, ...list]);
    return movement;
  }

  // ─────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────
  private generateRef(type: string): string {
    const date = new Date();
    const ymd  = date.toISOString().slice(0, 10).replace(/-/g, '');
    const seq  = String(this._items().length + 1).padStart(4, '0');
    return `BON-${type}-${ymd}-${seq}`;
  }
}