// ─────────────────────────────────────────────
// FAKE STOCK DATA
// src/app/features/stock/data/stock.data.ts
// ─────────────────────────────────────────────
import { Stock } from '../../../core/models/stock.model';

export const FAKE_STOCK: Stock[] = [

  // ── Magasin Central Ben Arous (store-001) ───
  { id: 'stk-001', productId: 'prod-001', storeId: 'store-001', quantity: 400, reservedQty: 20, availableQty: 380, status: 'OK',  lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-007',
    product: { id: 'prod-001', name: 'Aliment Poulet Démarrage',  reference: 'AVI-001', barcode: '6191234560001', category: 'AVICULTURE',      unit: 'sac 50kg',   minStockLevel: 100,  maxStockLevel: 2000 },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous', location: 'Ben Arous' } },

  { id: 'stk-002', productId: 'prod-002', storeId: 'store-001', quantity: 600, reservedQty: 50, availableQty: 550, status: 'OK',  lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-007',
    product: { id: 'prod-002', name: 'Aliment Poulet Croissance',  reference: 'AVI-002', barcode: '6191234560002', category: 'AVICULTURE',      unit: 'sac 50kg',   minStockLevel: 150,  maxStockLevel: 3000 },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous', location: 'Ben Arous' } },

  { id: 'stk-003', productId: 'prod-003', storeId: 'store-001', quantity: 45,  reservedQty: 0,  availableQty: 45,  status: 'LOW', lastUpdated: '2025-04-02T08:00:00Z', updatedBy: 'user-007',
    product: { id: 'prod-003', name: 'Vaccin Newcastle',           reference: 'AVI-003', barcode: '6191234560003', category: 'AVICULTURE',      unit: 'flacon',     minStockLevel: 50,   maxStockLevel: 500  },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous', location: 'Ben Arous' } },

  { id: 'stk-004', productId: 'prod-004', storeId: 'store-001', quantity: 1500, reservedQty: 100, availableQty: 1400, status: 'OK', lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-007',
    product: { id: 'prod-004', name: 'Huile de Tournesol 1L',       reference: 'AGR-001', barcode: '6191234560004', category: 'AGROALIMENTAIRE', unit: 'carton 12u', minStockLevel: 200,  maxStockLevel: 5000 },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous', location: 'Ben Arous' } },

  { id: 'stk-005', productId: 'prod-007', storeId: 'store-001', quantity: 0,   reservedQty: 0,  availableQty: 0,   status: 'OUT', lastUpdated: '2025-04-03T08:00:00Z', updatedBy: 'user-007',
    product: { id: 'prod-007', name: 'Jus d\'Orange 1L',            reference: 'AGR-004', barcode: '6191234560007', category: 'AGROALIMENTAIRE', unit: 'carton 12u', minStockLevel: 200,  maxStockLevel: 4000 },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous', location: 'Ben Arous' } },

  // ── Entrepôt Avicole Bizerte (store-002) ────
  { id: 'stk-006', productId: 'prod-001', storeId: 'store-002', quantity: 250, reservedQty: 10, availableQty: 240, status: 'OK',  lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-008',
    product: { id: 'prod-001', name: 'Aliment Poulet Démarrage',  reference: 'AVI-001', barcode: '6191234560001', category: 'AVICULTURE',      unit: 'sac 50kg',   minStockLevel: 100,  maxStockLevel: 2000 },
    store:   { id: 'store-002', name: 'Entrepôt Avicole — Bizerte', location: 'Bizerte' } },

  { id: 'stk-007', productId: 'prod-013', storeId: 'store-002', quantity: 95000, reservedQty: 5000, availableQty: 90000, status: 'OK', lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-008',
    product: { id: 'prod-013', name: 'Alvéole Plastique Œufs x30', reference: 'EMB-002', barcode: '6191234560013', category: 'EMBALLAGE',       unit: 'unité',      minStockLevel: 5000, maxStockLevel: 200000 },
    store:   { id: 'store-002', name: 'Entrepôt Avicole — Bizerte', location: 'Bizerte' } },

  // ── Dépôt Métallurgie Sfax (store-003) ─────
  { id: 'stk-008', productId: 'prod-008', storeId: 'store-003', quantity: 380, reservedQty: 30, availableQty: 350, status: 'OK',  lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-004',
    product: { id: 'prod-008', name: 'Tube Acier Soudé Ø50mm',    reference: 'MET-001', barcode: '6191234560008', category: 'METALLURGIE',     unit: 'barre',      minStockLevel: 50,   maxStockLevel: 1000 },
    store:   { id: 'store-003', name: 'Dépôt Métallurgie — Sfax',   location: 'Sfax' } },

  { id: 'stk-009', productId: 'prod-009', storeId: 'store-003', quantity: 65,  reservedQty: 5,  availableQty: 60,  status: 'LOW', lastUpdated: '2025-04-02T08:00:00Z', updatedBy: 'user-004',
    product: { id: 'prod-009', name: 'Panneau Bois MDF 18mm',      reference: 'MET-002', barcode: '6191234560009', category: 'METALLURGIE',     unit: 'panneau',    minStockLevel: 80,   maxStockLevel: 800  },
    store:   { id: 'store-003', name: 'Dépôt Métallurgie — Sfax',   location: 'Sfax' } },

  // ── Entrepôt Agroalimentaire Sousse (store-004)
  { id: 'stk-010', productId: 'prod-005', storeId: 'store-004', quantity: 2800, reservedQty: 200, availableQty: 2600, status: 'OK', lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-005',
    product: { id: 'prod-005', name: 'Margarine 500g',              reference: 'AGR-002', barcode: '6191234560005', category: 'AGROALIMENTAIRE', unit: 'carton 24u', minStockLevel: 300,  maxStockLevel: 6000 },
    store:   { id: 'store-004', name: 'Entrepôt Agroalimentaire — Sousse', location: 'Sousse' } },

  { id: 'stk-011', productId: 'prod-006', storeId: 'store-004', quantity: 120,  reservedQty: 0,  availableQty: 120,  status: 'LOW', lastUpdated: '2025-04-03T09:00:00Z', updatedBy: 'user-005',
    product: { id: 'prod-006', name: 'Yaourt Nature 125g',          reference: 'AGR-003', barcode: '6191234560006', category: 'AGROALIMENTAIRE', unit: 'pack 4u',    minStockLevel: 500,  maxStockLevel: 8000 },
    store:   { id: 'store-004', name: 'Entrepôt Agroalimentaire — Sousse', location: 'Sousse' } },

  { id: 'stk-012', productId: 'prod-010', storeId: 'store-004', quantity: 1850, reservedQty: 100, availableQty: 1750, status: 'OK', lastUpdated: '2025-04-01T08:00:00Z', updatedBy: 'user-005',
    product: { id: 'prod-010', name: 'Carrelage Sol 60x60 Blanc',   reference: 'CER-001', barcode: '6191234560010', category: 'CERAMIQUE',       unit: 'm²',         minStockLevel: 100,  maxStockLevel: 3000 },
    store:   { id: 'store-004', name: 'Entrepôt Agroalimentaire — Sousse', location: 'Sousse' } },
];