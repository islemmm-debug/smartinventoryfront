// ─────────────────────────────────────────────
// DASHBOARD SERVICE — KPI globaux ou par magasin (RBAC)
// ─────────────────────────────────────────────
import { Injectable, computed, inject } from '@angular/core';
import { DashboardKpi } from '../../../core/models/shared.model';
import type { Stock } from '../../../core/models/stock.model';
import { ProductService } from '../../products/services/product.service';
import { StockService } from '../../stock/services/stock.service';
import { MovementService } from '../../movements/services/mouvement.service';
import { AlertService } from '../../alerts/services/alert.service';
import { OrganisationService } from '../../settings/services/organisation.service';
import { RbacService } from '../../../core/security/rbac.service';
import {
  FAKE_MOVEMENTS_CHART,
  FAKE_STOCK_BY_CATEGORY,
  FAKE_TOP_PRODUCTS,
} from '../data/dashboard.data';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private productService = inject(ProductService);
  private stockService = inject(StockService);
  private movementService = inject(MovementService);
  private alertService = inject(AlertService);
  private orgService = inject(OrganisationService);
  private rbac = inject(RbacService);

  /** KPI recalculés selon le périmètre effectif (admin = global). */
  readonly kpi = computed((): DashboardKpi => {
    const storeId = this.rbac.effectiveStoreId();
    if (storeId === null) return this.buildKpiGlobal();
    return this.buildKpiForStore(storeId);
  });

  /** Graphiques : en V1 restent statiques ; à filtrer par API ensuite. */
  readonly movementsChart = FAKE_MOVEMENTS_CHART;
  readonly stockByCategory = FAKE_STOCK_BY_CATEGORY;
  readonly topProducts = FAKE_TOP_PRODUCTS;

  /** Alertes actives affichées sur le dashboard (filtrées par magasin si besoin). */
  readonly scopedActiveAlerts = computed(() => {
    const storeId = this.rbac.effectiveStoreId();
    const list = this.alertService.activeAlerts();
    if (storeId === null) return list;
    return list.filter(a => a.storeId === storeId);
  });

  /** Lignes stock bas / rupture pour les cartes du bas du dashboard. */
  readonly scopedLowStockItems = computed(() => {
    const storeId = this.rbac.effectiveStoreId();
    const low = this.stockService.lowStockItems();
    const out = this.stockService.outOfStockItems();
    const merged = [...low, ...out].filter(
      (s, i, arr) => arr.findIndex(x => x.id === s.id) === i,
    );
    if (storeId === null) return merged;
    return merged.filter(s => s.storeId === storeId);
  });

  private buildKpiGlobal(): DashboardKpi {
    return {
      totalProducts: this.productService.activeProducts().length,
      totalStores: this.orgService.magasinsActifs().length,
      totalStockValue: this.computeStockValue(this.stockService.items()),
      activeAlerts: this.alertService.activeCount(),
      lowStockItems: this.stockService.lowStockItems().length,
      outOfStockItems: this.stockService.outOfStockItems().length,
      movementsToday: this.movementService.todayMovements().length,
      movementsWeek: this.movementsInLastDays(7).length,
    };
  }

  private buildKpiForStore(storeId: string): DashboardKpi {
    const stocks = this.stockService.items().filter(s => s.storeId === storeId);
    const productIds = new Set(stocks.map(s => s.productId));

    const low = stocks.filter(s => s.status === 'LOW');
    const out = stocks.filter(s => s.status === 'OUT');

    const today = new Date().toISOString().slice(0, 10);
    const movements = this.movementService.getByStore(storeId);
    const movToday = movements.filter(m => m.createdAt.startsWith(today));

    const alerts = this.alertService
      .items()
      .filter(a => a.storeId === storeId && a.status === 'ACTIVE');
y
    return {
      totalProducts: productIds.size,
      totalStores: 1,
      totalStockValue: this.computeStockValue(stocks),
      activeAlerts: alerts.length,
      lowStockItems: low.length,
      outOfStockItems: out.length,
      movementsToday: movToday.length,
      movementsWeek: this.movementsInLastDaysForStore(storeId, 7).length,
    };
  }

  private isoSinceDays(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
  }

  private movementsInLastDays(days: number) {
    const from = this.isoSinceDays(days);
    return this.movementService.items().filter(m => m.createdAt >= from);
  }

  private movementsInLastDaysForStore(storeId: string, days: number) {
    const from = this.isoSinceDays(days);
    return this.movementService.getByStore(storeId).filter(m => m.createdAt >= from);
  }

  private computeStockValue(stocks: Stock[]): number {
    const products = this.productService.getAllSimple();
    return stocks.reduce((total, stock) => {
      const product = products.find(p => p.id === stock.productId);
      if (!product) return total;
      return total + stock.quantity * product.purchasePrice;
    }, 0);
  }
}
