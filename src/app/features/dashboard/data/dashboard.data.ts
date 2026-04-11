// ─────────────────────────────────────────────
// FAKE DASHBOARD DATA
// src/app/features/dashboard/data/dashboard.data.ts
// ─────────────────────────────────────────────
import { DashboardKpi } from '../../../core/models/shared.model';

export const FAKE_KPI: DashboardKpi = {
  totalProducts:   13,
  totalStores:     5,
  totalStockValue: 2_847_500,   // valeur totale en TND
  activeAlerts:    4,
  lowStockItems:   3,
  outOfStockItems: 1,
  movementsToday:  6,
  movementsWeek:   34,
};

// Données pour graphique mouvements (7 derniers jours)
export const FAKE_MOVEMENTS_CHART = [
  { date: '28 Mar', in: 3,  out: 5,  transfer: 1 },
  { date: '29 Mar', in: 2,  out: 8,  transfer: 0 },
  { date: '30 Mar', in: 5,  out: 3,  transfer: 2 },
  { date: '31 Mar', in: 1,  out: 4,  transfer: 1 },
  { date: '01 Avr', in: 4,  out: 6,  transfer: 2 },
  { date: '02 Avr', in: 2,  out: 3,  transfer: 0 },
  { date: '03 Avr', in: 3,  out: 5,  transfer: 1 },
];

// Données pour graphique stock par catégorie
export const FAKE_STOCK_BY_CATEGORY = [
  { category: 'Aviculture',       value: 35 },
  { category: 'Agroalimentaire',  value: 28 },
  { category: 'Emballage',        value: 18 },
  { category: 'Céramique',        value: 10 },
  { category: 'Métallurgie',      value: 9  },
];

// Top 5 produits les plus mouvementés
export const FAKE_TOP_PRODUCTS = [
  { name: 'Aliment Poulet Démarrage', reference: 'AVI-001', movements: 24, trend: 'up'   },
  { name: 'Huile de Tournesol 1L',    reference: 'AGR-001', movements: 18, trend: 'up'   },
  { name: 'Alvéole Plastique x30',    reference: 'EMB-002', movements: 15, trend: 'down' },
  { name: 'Margarine 500g',           reference: 'AGR-002', movements: 12, trend: 'up'   },
  { name: 'Tube Acier Ø50mm',         reference: 'MET-001', movements: 9,  trend: 'down' },
];