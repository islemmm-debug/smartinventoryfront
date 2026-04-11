// ─────────────────────────────────────────────
// BASE SERVICE — pattern commun à tous les services
// src/app/core/services/base.service.ts
// ─────────────────────────────────────────────
import { signal, computed } from '@angular/core';
import { PaginatedResponse, PaginationParams } from '../models/shared.model';

export abstract class BaseService<T extends { id: string }> {

  protected _items   = signal<T[]>([]);
  protected _loading = signal(false);
  protected _error   = signal<string | null>(null);

  // ── Public readonly ───────────────────────
  readonly items   = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error   = this._error.asReadonly();
  readonly count   = computed(() => this._items().length);

  // ── Pagination helper ─────────────────────
  protected paginate<U>(list: U[], params: PaginationParams): PaginatedResponse<U> {
    const page     = params.page     ?? 1;
    const pageSize = params.pageSize ?? 10;
    const start    = (page - 1) * pageSize;
    const data     = list.slice(start, start + pageSize);
    return {
      data,
      total:      list.length,
      page,
      pageSize,
      totalPages: Math.ceil(list.length / pageSize),
    };
  }

  // ── ID generator ──────────────────────────
  protected generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // ── Find helpers ──────────────────────────
  getById(id: string): T | undefined {
    return this._items().find(item => item.id === id);
  }

  // ── Delete ────────────────────────────────
  delete(id: string): void {
    this._items.update(list => list.filter(item => item.id !== id));
  }
}