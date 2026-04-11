// ─────────────────────────────────────────────
// MOVEMENT MODEL
// src/app/core/models/movement.model.ts
// ─────────────────────────────────────────────

export type MovementType = 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT';

export type MovementReason =
  // IN
  | 'PURCHASE'        // achat fournisseur
  | 'RETURN'          // retour client
  | 'PRODUCTION'      // production interne
  // OUT
  | 'SALE'            // vente
  | 'LOSS'            // perte / casse
  | 'EXPIRY'          // expiration
  | 'CONSUMPTION'     // consommation interne
  // TRANSFER
  | 'INTER_STORE'     // transfert entre magasins
  // ADJUSTMENT
  | 'INVENTORY'       // inventaire physique
  | 'CORRECTION';     // correction manuelle

export interface Movement {
  id:            string;
  type:          MovementType;
  reason:        MovementReason;
  productId:     string;
  sourceStoreId?:  string;     // pour OUT et TRANSFER
  destStoreId?:    string;     // pour IN et TRANSFER
  quantity:      number;
  quantityBefore: number;      // stock avant mouvement
  quantityAfter:  number;      // stock après mouvement
  note:          string;
  reference:     string;       // numéro de bon
  createdAt:     string;
  createdBy:     string;

  // Objets liés
  product?: {
    id:        string;
    name:      string;
    reference: string;
    unit:      string;
  };
  sourceStore?: { id: string; name: string; };
  destStore?:   { id: string; name: string; };
  user?: {
    id:        string;
    firstName: string;
    lastName:  string;
  };
}

// ── Requêtes API ──────────────────────────────
export interface CreateMovementInRequest {
  productId:   string;
  destStoreId: string;
  quantity:    number;
  reason:      MovementReason;
  note?:       string;
  reference?:  string;
}

export interface CreateMovementOutRequest {
  productId:      string;
  sourceStoreId:  string;
  quantity:       number;
  reason:         MovementReason;
  note?:          string;
  reference?:     string;
}

export interface CreateTransferRequest {
  productId:      string;
  sourceStoreId:  string;
  destStoreId:    string;
  quantity:       number;
  note?:          string;
  reference?:     string;
}

// ── Filtres ────────────────────────────────────
export interface MovementFilter {
  type?:      MovementType;
  productId?: string;
  storeId?:   string;
  userId?:    string;
  dateFrom?:  string;
  dateTo?:    string;
  page?:      number;
  pageSize?:  number;
}