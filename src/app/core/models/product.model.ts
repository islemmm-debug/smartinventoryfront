// ─────────────────────────────────────────────
// PRODUCT MODEL
// src/app/core/models/product.model.ts
// ─────────────────────────────────────────────

export type ProductCategory =
  | 'AVICULTURE'
  | 'AGROALIMENTAIRE'
  | 'METALLURGIE'
  | 'CERAMIQUE'
  | 'EMBALLAGE'
  | 'BOIS'
  | 'IMMOBILIER'
  | 'AUTRE';

export interface Product {
  id:           string;
  name:         string;
  reference:    string;        // ex: PRD-0001
  barcode:      string;        // code-barres EAN
  category:     ProductCategory;
  description:  string;
  unit:         string;        // ex: kg, pièce, litre
  purchasePrice: number;
  sellingPrice:  number;
  minStockLevel: number;       // seuil d'alerte stock bas
  maxStockLevel: number;
  imageUrl?:    string;
  isActive:     boolean;
  supplierId?:  string;
  supplier?:    SupplierRef;
  createdAt:    string;
  updatedAt:    string;

  // Stock info (retourné avec certains endpoints)
  totalStock?:  number;
  stockByStore?: StockSummary[];
}

export interface SupplierRef {
  id:   string;
  name: string;
}

export interface StockSummary {
  storeId:   string;
  storeName: string;
  quantity:  number;
  status:    StockStatus;
}

export type StockStatus = 'OK' | 'LOW' | 'OUT' | 'OVERSTOCK';

// ── Requêtes API ──────────────────────────────
export interface CreateProductRequest {
  name:          string;
  reference:     string;
  barcode:       string;
  category:      ProductCategory;
  description:   string;
  unit:          string;
  purchasePrice: number;
  sellingPrice:  number;
  minStockLevel: number;
  maxStockLevel: number;
  supplierId?:   string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}

// ── Filtres liste produits ─────────────────────
export interface ProductFilter {
  search?:    string;
  category?:  ProductCategory;
  isActive?:  boolean;
  storeId?:   string;
  page?:      number;
  pageSize?:  number;
  sortBy?:    string;
  sortDir?:   'asc' | 'desc';
}