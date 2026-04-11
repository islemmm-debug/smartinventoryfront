// ─────────────────────────────────────────────
// SHARED INTERFACES
// src/app/core/models/shared.model.ts
// ─────────────────────────────────────────────

// ── Réponse API paginée ───────────────────────
export interface PaginatedResponse<T> {
  data:       T[];
  total:      number;
  page:       number;
  pageSize:   number;
  totalPages: number;
}

// ── Réponse API standard ──────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data:    T;
  message: string;
}

// ── Réponse erreur API ────────────────────────
export interface ApiError {
  status:  number;
  message: string;
  errors?: Record<string, string[]>;  // validation errors
}

// ── Params pagination génériques ─────────────
export interface PaginationParams {
  page?:     number;
  pageSize?: number;
  sortBy?:   string;
  sortDir?:  'asc' | 'desc';
}

// ── KPI Dashboard ─────────────────────────────
export interface DashboardKpi {
  totalProducts:   number;
  totalStores:     number;
  totalStockValue: number;
  activeAlerts:    number;
  lowStockItems:   number;
  outOfStockItems: number;
  movementsToday:  number;
  movementsWeek:   number;
}

// ── System Setting ─────────────────────────────
export interface SystemSetting {
  id:          string;
  key:         string;
  value:       string;
  description: string;
  updatedAt:   string;
}

// ── Select option (pour les dropdowns) ────────
export interface SelectOption {
  value: string | number;
  label: string;
}