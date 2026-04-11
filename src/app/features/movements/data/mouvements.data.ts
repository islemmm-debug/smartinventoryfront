// ─────────────────────────────────────────────
// FAKE MOVEMENTS DATA
// src/app/features/movements/data/movements.data.ts
// ─────────────────────────────────────────────
import { Movement } from '../../../core/models/movement.model';

export const FAKE_MOVEMENTS: Movement[] = [
  {
    id: 'mov-001', type: 'IN', reason: 'PURCHASE',
    productId: 'prod-001', destStoreId: 'store-001',
    quantity: 200, quantityBefore: 200, quantityAfter: 400,
    note: 'Réception commande fournisseur #CMD-2025-041',
    reference: 'BON-IN-001', createdAt: '2025-04-01T09:00:00Z', createdBy: 'user-007',
    product: { id: 'prod-001', name: 'Aliment Poulet Démarrage', reference: 'AVI-001', unit: 'sac 50kg' },
    destStore: { id: 'store-001', name: 'Magasin Central — Ben Arous' },
    user: { id: 'user-007', firstName: 'Ali', lastName: 'Mejri' },
  },
  {
    id: 'mov-002', type: 'OUT', reason: 'SALE',
    productId: 'prod-004', sourceStoreId: 'store-001',
    quantity: 50, quantityBefore: 1550, quantityAfter: 1500,
    note: 'Livraison client El Mazraa',
    reference: 'BON-OUT-001', createdAt: '2025-04-01T10:30:00Z', createdBy: 'user-007',
    product: { id: 'prod-004', name: 'Huile de Tournesol 1L', reference: 'AGR-001', unit: 'carton 12u' },
    sourceStore: { id: 'store-001', name: 'Magasin Central — Ben Arous' },
    user: { id: 'user-007', firstName: 'Ali', lastName: 'Mejri' },
  },
  {
    id: 'mov-003', type: 'TRANSFER', reason: 'INTER_STORE',
    productId: 'prod-001', sourceStoreId: 'store-001', destStoreId: 'store-002',
    quantity: 100, quantityBefore: 500, quantityAfter: 400,
    note: 'Transfert urgent vers Bizerte',
    reference: 'BON-TRF-001', createdAt: '2025-04-02T08:00:00Z', createdBy: 'user-002',
    product: { id: 'prod-001', name: 'Aliment Poulet Démarrage', reference: 'AVI-001', unit: 'sac 50kg' },
    sourceStore: { id: 'store-001', name: 'Magasin Central — Ben Arous' },
    destStore:   { id: 'store-002', name: 'Entrepôt Avicole — Bizerte' },
    user: { id: 'user-002', firstName: 'Mohamed', lastName: 'Ben Ali' },
  },
  {
    id: 'mov-004', type: 'OUT', reason: 'LOSS',
    productId: 'prod-007', sourceStoreId: 'store-001',
    quantity: 80, quantityBefore: 80, quantityAfter: 0,
    note: 'Produits périmés — destruction',
    reference: 'BON-OUT-002', createdAt: '2025-04-03T07:30:00Z', createdBy: 'user-007',
    product: { id: 'prod-007', name: 'Jus d\'Orange 1L', reference: 'AGR-004', unit: 'carton 12u' },
    sourceStore: { id: 'store-001', name: 'Magasin Central — Ben Arous' },
    user: { id: 'user-007', firstName: 'Ali', lastName: 'Mejri' },
  },
  {
    id: 'mov-005', type: 'IN', reason: 'PURCHASE',
    productId: 'prod-008', destStoreId: 'store-003',
    quantity: 150, quantityBefore: 230, quantityAfter: 380,
    note: 'Réception commande acier',
    reference: 'BON-IN-002', createdAt: '2025-04-03T11:00:00Z', createdBy: 'user-004',
    product: { id: 'prod-008', name: 'Tube Acier Soudé Ø50mm', reference: 'MET-001', unit: 'barre' },
    destStore: { id: 'store-003', name: 'Dépôt Métallurgie — Sfax' },
    user: { id: 'user-004', firstName: 'Karim', lastName: 'Trabelsi' },
  },
  {
    id: 'mov-006', type: 'ADJUSTMENT', reason: 'INVENTORY',
    productId: 'prod-006', destStoreId: 'store-004',
    quantity: 120, quantityBefore: 95, quantityAfter: 120,
    note: 'Correction inventaire physique',
    reference: 'BON-ADJ-001', createdAt: '2025-04-03T14:00:00Z', createdBy: 'user-005',
    product: { id: 'prod-006', name: 'Yaourt Nature 125g', reference: 'AGR-003', unit: 'pack 4u' },
    destStore: { id: 'store-004', name: 'Entrepôt Agroalimentaire — Sousse' },
    user: { id: 'user-005', firstName: 'Amira', lastName: 'Chaabane' },
  },
];