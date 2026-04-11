// ─────────────────────────────────────────────
// PRODUCT SERVICE
// src/app/features/products/services/product.service.ts
// ─────────────────────────────────────────────
import { Injectable, computed, signal } from '@angular/core';
import {
  Product, CreateProductRequest,
  UpdateProductRequest, ProductFilter, ProductCategory
} from '../../../core/models/product.model';
import { PaginatedResponse } from '../../../core/models/shared.model';
import { BaseService } from '../../../core/services/base.service';
import { FAKE_PRODUCTS } from '../data/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<Product> {

  // ── Filtres actifs ────────────────────────
  private _filter = signal<ProductFilter>({});

  // ── Init avec fake data ───────────────────
  constructor() {
    super();
    this._items.set([...FAKE_PRODUCTS]);
  }

  // ── Computed : produits filtrés ───────────
  readonly filtered = computed(() => {
    const f = this._filter();
    return this._items().filter(p => {
      if (f.search && !this.matchSearch(p, f.search)) return false;
      if (f.category  && p.category  !== f.category)  return false;
      if (f.isActive  !== undefined && p.isActive !== f.isActive) return false;
      return true;
    });
  });

  readonly activeProducts = computed(() =>
    this._items().filter(p => p.isActive)
  );

  readonly categories = computed((): ProductCategory[] =>
    [...new Set(this._items().map(p => p.category))]
  );

  // ─────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────
  getAll(filter?: ProductFilter): PaginatedResponse<Product> {
    if (filter) this._filter.set(filter);
    return this.paginate(this.filtered(), {
      page:     filter?.page     ?? 1,
      pageSize: filter?.pageSize ?? 10,
    });
  }

  getAllSimple(): Product[] {
    return this._items();
  }

  setFilter(filter: Partial<ProductFilter>): void {
    this._filter.update(f => ({ ...f, ...filter }));
  }

  clearFilter(): void {
    this._filter.set({});
  }

  // ─────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────
  create(req: CreateProductRequest): Product {
    const product: Product = {
      ...req,
      id:         this.generateId('prod'),
      isActive:   true,
      totalStock: 0,
      createdAt:  new Date().toISOString(),
      updatedAt:  new Date().toISOString(),
    };
    this._items.update(list => [product, ...list]);
    return product;
  }

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────
  update(id: string, changes: UpdateProductRequest): Product | null {
    let updated: Product | null = null;
    this._items.update(list =>
      list.map(p => {
        if (p.id !== id) return p;
        updated = { ...p, ...changes, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    return updated;
  }

  toggleActive(id: string): void {
    this._items.update(list =>
      list.map(p => p.id === id
        ? { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() }
        : p
      )
    );
  }

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  getOptions() {
    return this.activeProducts().map(p => ({
      value: p.id,
      label: `[${p.reference}] ${p.name}`,
      unit:  p.unit,
    }));
  }

  private matchSearch(p: Product, search: string): boolean {
    const s = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(s)      ||
      p.reference.toLowerCase().includes(s) ||
      p.barcode.includes(s)
    );
  }
}