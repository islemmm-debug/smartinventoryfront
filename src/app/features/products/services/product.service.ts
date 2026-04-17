// ─────────────────────────────────────────────
// PRODUCT SERVICE
// src/app/features/products/services/product.service.ts
// ─────────────────────────────────────────────
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilter,
  ProductCategory,
} from '../../../core/models/product.model';
import { PagedResult } from '../../../core/models/shared.model';
import { environment } from '../../../environment/environment';
import { FAKE_PRODUCTS } from '../data/products.data';

export interface ProductQueryParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchTerm?: string;
  category?: ProductCategory;
  isActive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/Products`;

  private _items = signal<Product[]>([]);
  private _filter = signal<ProductFilter>({});

  constructor() {
    if (environment.useMockData) {
      this._items.set([...FAKE_PRODUCTS]);
    }
  }

  // ── Signals pour compatibilité composants ──
  readonly filtered = computed(() => {
    if (environment.useMockData) {
      const f = this._filter();
      return this._items().filter((p) => {
        if (f.search && !this.matchSearch(p, f.search || '')) return false;
        if (f.category && p.category !== f.category) return false;
        if (f.isActive !== undefined && p.isActive !== f.isActive) return false;
        return true;
      });
    }
    return this._items();
  });

  readonly activeProducts = computed(() => this._items().filter((p) => p.isActive));

  readonly categories = computed((): ProductCategory[] => [
    ...new Set(this._items().map((p) => p.category)),
  ]);

  // ─────────────────────────────────────────
  // READ (API)
  // ─────────────────────────────────────────
  getProducts(params?: ProductQueryParams): Observable<PagedResult<Product>> {
    if (environment.useMockData) {
      const f = this._filter();
      let filtered = this._items();
      if (f.search) filtered = filtered.filter((p) => this.matchSearch(p, f.search || ''));
      if (f.category) filtered = filtered.filter((p) => p.category === f.category);
      if (f.isActive !== undefined) filtered = filtered.filter((p) => p.isActive === f.isActive);
      const page = params?.pageNumber ?? 1;
      const size = params?.pageSize ?? 10;
      const start = (page - 1) * size;
      return of({
        items: filtered.slice(start, start + size),
        totalCount: filtered.length,
        pageNumber: page,
        pageSize: size,
      });
    }

    let httpParams = new HttpParams()
      .set('pageNumber', params?.pageNumber?.toString() ?? '1')
      .set('pageSize', params?.pageSize?.toString() ?? '10');

    if (params?.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
      httpParams = httpParams.set('sortOrder', params.sortOrder ?? 'asc');
    }
    if (params?.searchTerm) {
      httpParams = httpParams.set('searchTerm', params.searchTerm);
    }
    if (params?.category) {
      httpParams = httpParams.set('category', params.category);
    }
    if (params?.isActive !== undefined) {
      httpParams = httpParams.set('isActive', params.isActive.toString());
    }

    return this.http.get<PagedResult<Product>>(this.API, { params: httpParams });
  }

  getAllSimple(): Product[] {
    return this._items();
  }

  getProductById(id: string): Observable<Product> {
    if (environment.useMockData) {
      const p = this._items().find((x) => x.id === id);
      return of(p!).pipe(map((x) => x!));
    }
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  // ─────────────────────────────────────────
  // CREATE (API)
  // ─────────────────────────────────────────
  create(req: CreateProductRequest): Observable<Product> {
    if (environment.useMockData) {
      const product: Product = {
        ...req,
        id: 'prod-' + Date.now(),
        isActive: true,
        totalStock: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this._items.update((list) => [product, ...list]);
      return of(product);
    }
    return this.http.post<Product>(this.API, req);
  }

  // ─────────────────────────────────────────
  // UPDATE (API)
  // ─────────────────────────────────────────
  update(id: string, changes: UpdateProductRequest): Observable<Product> {
    if (environment.useMockData) {
      let updated: Product | undefined;
      this._items.update((list) =>
        list.map((p) => {
          if (p.id !== id) return p;
          updated = { ...p, ...changes, updatedAt: new Date().toISOString() };
          return updated;
        }),
      );
      return of(updated!);
    }
    return this.http.put<Product>(`${this.API}/${id}`, changes);
  }

  // ─────────────────────────────────────────
  // DELETE (API)
  // ─────────────────────────────────────────
  delete(id: string): Observable<void> {
    if (environment.useMockData) {
      this._items.update((list) => list.filter((p) => p.id !== id));
      return of(undefined);
    }
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // ─────────────────────────────────────────
  // TOGGLE ACTIVE
  // ─────────────────────────────────────────
  toggleActive(id: string, isActive?: boolean): Observable<Product> {
    const p = this._items().find((x) => x.id === id);
    const newActive = isActive ?? !(p?.isActive ?? false);
    
    if (environment.useMockData) {
      let updated: Product | undefined;
      this._items.update((list) =>
        list.map((item) => {
          if (item.id !== id) return item;
          updated = { ...item, isActive: newActive, updatedAt: new Date().toISOString() };
          return updated;
        }),
      );
      return of(updated!);
    }
    return this.http.patch<Product>(`${this.API}/${id}/toggle-active`, { isActive: newActive });
  }

  // ─────────────────────────────────────────
  // FILTER (client-side)
  // ─────────────────────────────────────────
  setFilter(filter: Partial<ProductFilter>): void {
    this._filter.update((f) => ({ ...f, ...filter }));
  }

  clearFilter(): void {
    this._filter.set({});
  }

  // ─────────────────────────────────────────
  // CATEGORIES & SUPPLIERS (API)
  // ─────────────────────────────────────────
  getCategories(): Observable<ProductCategory[]> {
    if (environment.useMockData) {
      const cats = [...new Set(this._items().map((p) => p.category))];
      return of(cats);
    }
    return this.http.get<ProductCategory[]>(`${environment.apiUrl}/Categories`);
  }

  getAllCategories(): Observable<ProductCategory[]> {
    return this.getCategories();
  }

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Suppliers`);
  }

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  getOptions() {
    return this._items()
      .filter((p) => p.isActive)
      .map((p) => ({
        value: p.id,
        label: `[${p.reference}] ${p.name}`,
        unit: p.unit,
      }));
  }

  private matchSearch(p: Product, search: string): boolean {
    const s = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(s) ||
      p.reference.toLowerCase().includes(s) ||
      p.barcode.includes(s)
    );
  }
}
