import { Injectable, computed, signal } from '@angular/core';
import { Store } from '../../../core/models/store.model';
import { BaseService } from '../../../core/services/base.service';
import { FAKE_STORES } from '../data/stores.data';

@Injectable({ providedIn: 'root' })
export class StoreService extends BaseService<Store> {
  private _search = signal('');

  constructor() {
    super();
    this._items.set([...FAKE_STORES]);
  }

  readonly filtered = computed(() => {
    const q = this._search().trim().toLowerCase();
    if (!q) return this._items();
    return this._items().filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q),
    );
  });

  setSearch(q: string): void {
    this._search.set(q);
  }
}
