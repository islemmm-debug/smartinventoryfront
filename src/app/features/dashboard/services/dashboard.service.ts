// ─────────────────────────────────────────────
// DASHBOARD SERVICE
// src/app/features/dashboard/services/dashboard.service.ts
// ─────────────────────────────────────────────
import { Injectable, computed, inject } from '@angular/core';
import { DashboardKpi } from '../../../core/models/shared.model';
import { ProductService }  from '../../products/services/product.service';
import { StockService }    from '../../stock/services/stock.service';
import { MovementService } from '../../movements/services/mouvement.service';
import { AlertService }    from '../../alerts/services/alert.service';
import { OrganisationService } from '../../settings/services/organisation.service';
import {
  FAKE_MOVEMENTS_CHART,
  FAKE_STOCK_BY_CATEGORY,
  FAKE_TOP_PRODUCTS
} from '../data/dashboard.data';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private productService  = inject(ProductService);
  private stockService    = inject(StockService);
  private movementService = inject(MovementService);
  private alertService    = inject(AlertService);
  private orgService      = inject(OrganisationService);

  // ── KPI calculés en temps réel ────────────
  readonly kpi = computed((): DashboardKpi => ({
    totalProducts:   this.productService.activeProducts().length,
    totalStores:     this.orgService.magasinsActifs().length,
    totalStockValue: this.computeStockValue(),
    activeAlerts:    this.alertService.activeCount(),
    lowStockItems:   this.stockService.lowStockItems().length,
    outOfStockItems: this.stockService.outOfStockItems().length,
    movementsToday:  this.movementService.todayMovements().length,
    movementsWeek:   this.movementService.items().length,
  }));

  // ── Données graphiques (fake pour l'instant) ─
  readonly movementsChart  = FAKE_MOVEMENTS_CHART;
  readonly stockByCategory = FAKE_STOCK_BY_CATEGORY;
  readonly topProducts     = FAKE_TOP_PRODUCTS;

  // ── Alertes critiques pour la navbar ──────
  readonly criticalAlerts = this.alertService.criticalAlerts;

  // ─────────────────────────────────────────
  // PRIVATE
  // ─────────────────────────────────────────
  private computeStockValue(): number {
    const products = this.productService.getAllSimple();
    return this.stockService.items().reduce((total, stock) => {
      const product = products.find(p => p.id === stock.productId);
      if (!product) return total;
      return total + stock.quantity * product.purchasePrice;
    }, 0);
  }
}