// ─────────────────────────────────────────────
// ALERT SERVICE
// src/app/features/alerts/services/alert.service.ts
// ─────────────────────────────────────────────
import { Injectable, computed, signal } from '@angular/core';
import {
  Alert, AlertFilter, AlertType,
  AlertSeverity, AlertStatus,
  AcknowledgeAlertRequest, ResolveAlertRequest
} from '../../../core/models/alert.model';
import { PaginatedResponse } from '../../../core/models/shared.model';
import { BaseService } from '../../../core/services/base.service';
import { FAKE_ALERTS } from '../data/alerts.data';

@Injectable({ providedIn: 'root' })
export class AlertService extends BaseService<Alert> {

  private _filter = signal<AlertFilter>({});

  constructor() {
    super();
    this._items.set([...FAKE_ALERTS]);
  }

  // ── Computed ──────────────────────────────
  readonly activeAlerts = computed(() =>
    this._items().filter(a => a.status === 'ACTIVE')
  );

  readonly criticalAlerts = computed(() =>
    this._items().filter(a => a.severity === 'CRITICAL' && a.status === 'ACTIVE')
  );

  readonly activeCount = computed(() => this.activeAlerts().length);

  readonly filtered = computed(() => {
    const f = this._filter();
    return this._items().filter(a => {
      if (f.type      && a.type      !== f.type)      return false;
      if (f.severity  && a.severity  !== f.severity)  return false;
      if (f.status    && a.status    !== f.status)    return false;
      if (f.storeId   && a.storeId   !== f.storeId)   return false;
      if (f.productId && a.productId !== f.productId) return false;
      return true;
    }).sort((a, b) => {
      // Tri : CRITICAL > HIGH > MEDIUM > LOW, puis par date
      const sev = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      return (sev[b.severity] - sev[a.severity]) ||
              b.createdAt.localeCompare(a.createdAt);
    });
  });

  // ─────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────
  getAll(filter?: AlertFilter): PaginatedResponse<Alert> {
    if (filter) this._filter.set(filter);
    return this.paginate(this.filtered(), {
      page:     filter?.page     ?? 1,
      pageSize: filter?.pageSize ?? 10,
    });
  }

  setFilter(f: Partial<AlertFilter>): void {
    this._filter.update(cur => ({ ...cur, ...f }));
  }

  clearFilter(): void { this._filter.set({}); }

  // ─────────────────────────────────────────
  // ACTIONS
  // ─────────────────────────────────────────
  acknowledge(req: AcknowledgeAlertRequest, userId: string): void {
    this._items.update(list =>
      list.map(a => a.id !== req.alertId ? a : {
        ...a,
        status:    'ACKNOWLEDGED' as AlertStatus,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  resolve(req: ResolveAlertRequest, userId: string): void {
    this._items.update(list =>
      list.map(a => a.id !== req.alertId ? a : {
        ...a,
        status:     'RESOLVED' as AlertStatus,
        resolvedAt: new Date().toISOString(),
        resolvedBy: userId,
        updatedAt:  new Date().toISOString(),
      })
    );
  }

  // ─────────────────────────────────────────
  // AUTO-GÉNÉRATION D'ALERTES
  // Appelée par StockService après chaque mouvement
  // ─────────────────────────────────────────
  checkAndCreateAlert(
    productId:  string,
    storeId:    string,
    quantity:   number,
    minLevel:   number,
    productName: string,
    storeName:  string,
    reference:  string
  ): void {
    let type:     AlertType | null     = null;
    let severity: AlertSeverity        = 'LOW';

    if (quantity === 0) {
      type = 'OUT_OF_STOCK'; severity = 'CRITICAL';
    } else if (quantity < minLevel * 0.5) {
      type = 'LOW_STOCK';    severity = 'CRITICAL';
    } else if (quantity < minLevel) {
      type = 'LOW_STOCK';    severity = 'HIGH';
    }

    if (!type) return;

    // Vérifier si alerte déjà active pour ce produit/magasin
    const existing = this._items().find(
      a => a.productId === productId &&
           a.storeId   === storeId   &&
           a.type      === type      &&
           a.status    === 'ACTIVE'
    );
    if (existing) return;

    const alert: Alert = {
      id:         this.generateId('alert'),
      type,
      severity,
      status:     'ACTIVE',
      title:      type === 'OUT_OF_STOCK'
                    ? `Rupture de stock — ${productName}`
                    : `Stock bas — ${productName}`,
      message:    type === 'OUT_OF_STOCK'
                    ? `Stock épuisé pour ${productName} (${reference}) à ${storeName}`
                    : `Stock sous le seuil minimum (${quantity} < ${minLevel}) à ${storeName}`,
      productId,
      storeId,
      threshold:  minLevel,
      currentQty: quantity,
      createdAt:  new Date().toISOString(),
      updatedAt:  new Date().toISOString(),
      product:    { id: productId, name: productName, reference },
      store:      { id: storeId,   name: storeName },
    };

    this._items.update(list => [alert, ...list]);
  }
}