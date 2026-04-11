// ─────────────────────────────────────────────
// DASHBOARD COMPONENT
// src/app/features/dashboard/pages/dashboard.component.ts
// ─────────────────────────────────────────────
import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { AlertSeverity } from '../../../core/models/alert.model';
import { PageQuickNavComponent } from '../../../shared/components/page-quick-nav/page-quick-nav.component';
import { RbacService } from '../../../core/security/rbac.service';
import { P } from '../../../core/security/app-permissions';
import { OrganisationService } from '../../settings/services/organisation.service';
import { StockService } from '../../stock/services/stock.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink, PageQuickNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrls:  ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private dashService  = inject(DashboardService);
  private stockService = inject(StockService);

  // ── Data ──────────────────────────────────
  kpi            = this.dashService.kpi;
  movementsChart = this.dashService.movementsChart;
  topProducts    = this.dashService.topProducts;
  stockByCategory = this.dashService.stockByCategory;
  recentAlerts   = this.dashService.criticalAlerts;
  lowStockItems  = this.stockService.lowStockItems;

  // ── Chart max (pour les barres %) ─────────
  get chartMax(): number {
    return Math.max(...this.movementsChart.map((d: { in: any; out: any; transfer: any; }) => d.in + d.out + d.transfer));
  }

  barHeight(val: number): string {
    return `${Math.round((val / this.chartMax) * 100)}%`;
  }

  // ── Severity color ────────────────────────
  severityClass(s: AlertSeverity): string {
    return { CRITICAL: 'sev-critical', HIGH: 'sev-high',
             MEDIUM: 'sev-medium',     LOW:  'sev-low' }[s];
  }

  // ── Date ──────────────────────────────────
  today = new Date();

  // ── Category colors ───────────────────────
  private colors = ['#4a6cf7','#4ade80','#fbbf24','#a78bfa','#2dd4bf','#f87171','#fb923c'];
  getCategoryColor(i: number): string { return this.colors[i % this.colors.length]; }

  ngOnInit(): void {}
}