// ─────────────────────────────────────────────
// ALERT MODEL
// src/app/core/models/alert.model.ts
// ─────────────────────────────────────────────

export type AlertType =
  | 'LOW_STOCK'       // stock sous le seuil minimum
  | 'OUT_OF_STOCK'    // stock épuisé
  | 'OVERSTOCK'       // stock dépasse le maximum
  | 'EXPIRY'          // produit proche expiration
  | 'ANOMALY';        // anomalie détectée par IA

export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus   = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface Alert {
  id:          string;
  type:        AlertType;
  severity:    AlertSeverity;
  status:      AlertStatus;
  title:       string;
  message:     string;
  productId:   string;
  storeId:     string;
  threshold?:  number;     // seuil déclencheur
  currentQty?: number;     // quantité actuelle
  createdAt:   string;
  updatedAt:   string;
  resolvedAt?: string;
  resolvedBy?: string;

  // Objets liés
  product?: { id: string; name: string; reference: string; };
  store?:   { id: string; name: string; };
}

// ── Requêtes API ──────────────────────────────
export interface AcknowledgeAlertRequest {
  alertId: string;
  note?:   string;
}

export interface ResolveAlertRequest {
  alertId: string;
  note?:   string;
}

// ── Filtres ────────────────────────────────────
export interface AlertFilter {
  type?:      AlertType;
  severity?:  AlertSeverity;
  status?:    AlertStatus;
  storeId?:   string;
  productId?: string;
  page?:      number;
  pageSize?:  number;
}