// ─────────────────────────────────────────────
// MOVEMENT SERVICE
// src/app/features/movements/services/movement.service.ts
// ─────────────────────────────────────────────
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  Movement,
  MovementFilter,
  CreateMovementInRequest,
  CreateMovementOutRequest,
  CreateTransferRequest,
} from '../../../core/models/movement.model';
import { PagedResult } from '../../../core/models/shared.model';
import { environment } from '../../../environment/environment';
import { FAKE_MOVEMENTS } from '../data/mouvements.data';

export interface MovementQueryParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  type?: string;
  productId?: string;
  storeId?: string;
  dateFrom?: string;
  dateTo?: string;
}

@Injectable({ providedIn: 'root' })
export class StockService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/StockMovements`;

  private _items = signal<Movement[]>([]);
  private _filter = signal<MovementFilter>({});

  constructor() {
    if (environment.useMockData) {
      this._items.set([...FAKE_MOVEMENTS]);
    }
  }

  // ── Signals pour compatibilité composants ──
  readonly filtered = computed(() => {
    if (environment.useMockData) {
      const f = this._filter();
      return this._items()
        .filter((m) => {
          if (f.type && m.type !== f.type) return false;
          if (f.productId && m.productId !== f.productId) return false;
          if (f.storeId && m.sourceStoreId !== f.storeId && m.destStoreId !== f.storeId)
            return false;
          if (f.dateFrom && m.createdAt < f.dateFrom) return false;
          if (f.dateTo && m.createdAt > f.dateTo) return false;
          return true;
        })
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return this._items();
  });

  readonly todayMovements = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this._items().filter((m) => m.createdAt.startsWith(today));
  });

  readonly items = this._items.asReadonly();

  // ─────────────────────────────────────────
  // READ (API)
  // ─────────────────────────────────────────
  getMovements(params?: MovementQueryParams): Observable<PagedResult<Movement>> {
    if (environment.useMockData) {
      const f = this._filter();
      let filtered = this._items();
      if (f.type) filtered = filtered.filter((m) => m.type === f.type);
      if (f.productId) filtered = filtered.filter((m) => m.productId === f.productId);
      if (f.storeId)
        filtered = filtered.filter(
          (m) => m.sourceStoreId === f.storeId || m.destStoreId === f.storeId,
        );
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
      httpParams = httpParams.set('sortOrder', params.sortOrder ?? 'desc');
    }
    if (params?.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params?.productId) {
      httpParams = httpParams.set('productId', params.productId);
    }
    if (params?.storeId) {
      httpParams = httpParams.set('storeId', params.storeId);
    }
    if (params?.dateFrom) {
      httpParams = httpParams.set('dateFrom', params.dateFrom);
    }
    if (params?.dateTo) {
      httpParams = httpParams.set('dateTo', params.dateTo);
    }

    return this.http.get<PagedResult<Movement>>(this.API, { params: httpParams });
  }

  // ─────────────────────────────────────────
  // FILTER (client-side)
  // ─────────────────────────────────────────
  setFilter(filter: Partial<MovementFilter>): void {
    this._filter.update((f) => ({ ...f, ...filter }));
  }

  clearFilter(): void {
    this._filter.set({});
  }

  // ─────────────────────────────────────────
  // ENTRÉE STOCK (IN)
  // ─────────────────────────────────────────
  createIn(req: CreateMovementInRequest, userId?: string): Observable<Movement> {
    if (environment.useMockData) {
      const movement: Movement = {
        id: 'mov-' + Date.now(),
        type: 'IN',
        reason: req.reason,
        productId: req.productId,
        destStoreId: req.destStoreId,
        quantity: req.quantity,
        quantityBefore: 0,
        quantityAfter: req.quantity,
        note: req.note || '',
        reference: req.reference || `BON-IN-${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: userId || 'user',
      };
      this._items.update((list) => [movement, ...list]);
      return of(movement);
    }
    return this.http.post<Movement>(this.API, { ...req, type: 'IN' });
  }

  // ─────────────────────────────────────────
  // SORTIE STOCK (OUT)
  // ─────────────────────────────────────────
  createOut(req: CreateMovementOutRequest, userId?: string): Observable<Movement> {
    if (environment.useMockData) {
      const movement: Movement = {
        id: 'mov-' + Date.now(),
        type: 'OUT',
        reason: req.reason,
        productId: req.productId,
        sourceStoreId: req.sourceStoreId,
        quantity: req.quantity,
        quantityBefore: 100,
        quantityAfter: 100 - req.quantity,
        note: req.note || '',
        reference: req.reference || `BON-OUT-${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: userId || 'user',
      };
      this._items.update((list) => [movement, ...list]);
      return of(movement);
    }
    return this.http.post<Movement>(this.API, { ...req, type: 'OUT' });
  }

  // ─────────────────────────────────────────
  // TRANSFERT INTER-MAGASIN
  // ─────────────────────────────────────────
  createTransfer(req: CreateTransferRequest, userId?: string): Observable<Movement> {
    if (environment.useMockData) {
      const movement: Movement = {
        id: 'mov-' + Date.now(),
        type: 'TRANSFER',
        reason: 'INTER_STORE',
        productId: req.productId,
        sourceStoreId: req.sourceStoreId,
        destStoreId: req.destStoreId,
        quantity: req.quantity,
        quantityBefore: 100,
        quantityAfter: 100 - req.quantity,
        note: req.note || '',
        reference: req.reference || `BON-TRF-${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: userId || 'user',
      };
      this._items.update((list) => [movement, ...list]);
      return of(movement);
    }
    return this.http.post<Movement>(this.API, { ...req, type: 'TRANSFER' });
  }
}
