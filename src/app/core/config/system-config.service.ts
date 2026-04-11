import { Injectable, signal } from '@angular/core';
import { ProductCategory } from '../models/product.model';

/**
 * Paramétrage runtime (remplacé / hydraté par API admin).
 * Les magasins restent portés par OrganisationService / API stores.
 */
@Injectable({ providedIn: 'root' })
export class SystemConfigService {
  /** Libellés catégories métier additionnels (hors enum figée produit). */
  private _extraCategories = signal<string[]>([]);

  readonly extraCategories = this._extraCategories.asReadonly();

  /** À brancher : GET /api/settings/categories */
  loadCategoriesFromApi(): void {
    /* future HttpClient */
  }

  addCategoryLabel(label: string): void {
    const t = label.trim();
    if (!t || this._extraCategories().includes(t)) return;
    this._extraCategories.update(a => [...a, t]);
  }

  removeCategoryLabel(label: string): void {
    this._extraCategories.update(a => a.filter(x => x !== label));
  }

  /** Options fusion (enum + extras) pour formulaires. */
  categoryOptions(base: ProductCategory[]): string[] {
    const extra = this._extraCategories();
    return [...new Set([...base, ...extra])];
  }
}
