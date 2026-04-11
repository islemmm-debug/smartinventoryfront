// ─────────────────────────────────────────────
// STOCK MODEL
// src/app/core/models/stock.model.ts
// ─────────────────────────────────────────────

import { ProductCategory, StockStatus } from './product.model';

export interface Stock {
  id:            string;
  productId:     string;
  storeId:       string;
  quantity:      number;
  reservedQty:   number;       // quantité réservée
  availableQty:  number;       // quantity - reservedQty
  status:        StockStatus;
  expiryDate?:   string;       // date d'expiration (si applicable)
  lastUpdated:   string;
  updatedBy:     string;

  // Objets liés
  product?: {
    id:            string;
    name:          string;
    reference:     string;
    barcode:       string;
    category:      ProductCategory;
    unit:          string;
    minStockLevel: number;
    maxStockLevel: number;
  };
  store?: {
    id:       string;
    name:     string;
    location: string;
  };
}

// ── Vue stock par magasin ──────────────────────
export interface StoreStockView {
  storeId:   string;
  storeName: string;
  items:     Stock[];
  summary: {
    total:     number;
    lowStock:  number;
    outStock:  number;
    ok:        number;
  };
}

// ── Requêtes API ──────────────────────────────
export interface AdjustStockRequest {
  productId: string;
  storeId:   string;
  quantity:  number;       // nouvelle quantité absolue
  reason:    string;
}

// ── Filtres ────────────────────────────────────
export interface StockFilter {
  storeId?:   string;
  productId?: string;
  status?:    StockStatus;
  category?:  ProductCategory;
  search?:    string;
  page?:      number;
  pageSize?:  number;
}