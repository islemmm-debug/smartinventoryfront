// ─────────────────────────────────────────────
// FAKE ALERTS DATA
// src/app/features/alerts/data/alerts.data.ts
// ─────────────────────────────────────────────
import { Alert } from '../../../core/models/alert.model';

export const FAKE_ALERTS: Alert[] = [
  {
    id: 'alert-001', type: 'LOW_STOCK', severity: 'HIGH', status: 'ACTIVE',
    title: 'Stock bas — Vaccin Newcastle',
    message: 'Le stock du Vaccin Newcastle (AVI-003) est sous le seuil minimum (45 < 50)',
    productId: 'prod-003', storeId: 'store-001',
    threshold: 50, currentQty: 45,
    createdAt: '2025-04-02T08:00:00Z', updatedAt: '2025-04-02T08:00:00Z',
    product: { id: 'prod-003', name: 'Vaccin Newcastle', reference: 'AVI-003' },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous' },
  },
  {
    id: 'alert-002', type: 'OUT_OF_STOCK', severity: 'CRITICAL', status: 'ACTIVE',
    title: 'Rupture de stock — Jus d\'Orange 1L',
    message: 'Stock épuisé pour Jus d\'Orange 1L (AGR-004) au Magasin Central',
    productId: 'prod-007', storeId: 'store-001',
    threshold: 200, currentQty: 0,
    createdAt: '2025-04-03T07:30:00Z', updatedAt: '2025-04-03T07:30:00Z',
    product: { id: 'prod-007', name: 'Jus d\'Orange 1L', reference: 'AGR-004' },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous' },
  },
  {
    id: 'alert-003', type: 'LOW_STOCK', severity: 'MEDIUM', status: 'ACTIVE',
    title: 'Stock bas — Panneau Bois MDF 18mm',
    message: 'Le stock de Panneau Bois MDF (MET-002) est sous le seuil minimum (65 < 80)',
    productId: 'prod-009', storeId: 'store-003',
    threshold: 80, currentQty: 65,
    createdAt: '2025-04-02T09:00:00Z', updatedAt: '2025-04-02T09:00:00Z',
    product: { id: 'prod-009', name: 'Panneau Bois MDF 18mm', reference: 'MET-002' },
    store:   { id: 'store-003', name: 'Dépôt Métallurgie — Sfax' },
  },
  {
    id: 'alert-004', type: 'LOW_STOCK', severity: 'CRITICAL', status: 'ACTIVE',
    title: 'Stock critique — Yaourt Nature 125g',
    message: 'Stock très bas (120 < 500) pour Yaourt Nature à Sousse — risque rupture imminent',
    productId: 'prod-006', storeId: 'store-004',
    threshold: 500, currentQty: 120,
    createdAt: '2025-04-03T09:00:00Z', updatedAt: '2025-04-03T09:00:00Z',
    product: { id: 'prod-006', name: 'Yaourt Nature 125g', reference: 'AGR-003' },
    store:   { id: 'store-004', name: 'Entrepôt Agroalimentaire — Sousse' },
  },
  {
    id: 'alert-005', type: 'ANOMALY', severity: 'MEDIUM', status: 'ACKNOWLEDGED',
    title: 'Anomalie détectée — Sortie inhabituelle',
    message: 'Sortie anormale détectée : 80 cartons Jus d\'Orange en une seule opération',
    productId: 'prod-007', storeId: 'store-001',
    createdAt: '2025-04-03T07:35:00Z', updatedAt: '2025-04-03T08:00:00Z',
    product: { id: 'prod-007', name: 'Jus d\'Orange 1L', reference: 'AGR-004' },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous' },
  },
  {
    id: 'alert-006', type: 'LOW_STOCK', severity: 'LOW', status: 'RESOLVED',
    title: 'Stock bas résolu — Aliment Poulet Démarrage',
    message: 'Stock réapprovisionné suite à réception commande',
    productId: 'prod-001', storeId: 'store-001',
    threshold: 100, currentQty: 400,
    createdAt: '2025-03-28T10:00:00Z', updatedAt: '2025-04-01T09:30:00Z',
    resolvedAt: '2025-04-01T09:30:00Z', resolvedBy: 'user-002',
    product: { id: 'prod-001', name: 'Aliment Poulet Démarrage', reference: 'AVI-001' },
    store:   { id: 'store-001', name: 'Magasin Central — Ben Arous' },
  },
];