// ─────────────────────────────────────────────
// ORGANISATION MODELS
// src/app/core/models/organisation.model.ts
// Hiérarchie : Groupe → Secteur → Filiale → Magasin
// ─────────────────────────────────────────────

// ── Groupe (niveau 1) ─────────────────────────
export interface Groupe {
  id:          string;
  name:        string;
  description: string;
  address:     string;
  phone:       string;
  website:     string;
  isActive:    boolean;
  createdAt:   string;
  secteurs?:   Secteur[];
}

// ── Secteur / Pôle (niveau 2) ─────────────────
export type SecteurCode =
  | 'AVICOLE'
  | 'AGROALIMENTAIRE'
  | 'INDUSTRIEL'
  | 'CERAMIQUE'
  | 'EMBALLAGE'
  | 'IMMOBILIER'
  | 'SERVICES';

export interface Secteur {
  id:          string;
  groupeId:    string;
  code:        SecteurCode;
  name:        string;
  description: string;
  color:       string;    // couleur UI
  icon:        string;    // icône UI
  isActive:    boolean;
  createdAt:   string;
  filiales?:   Filiale[];
}

// ── Filiale (niveau 3) ────────────────────────
export interface Filiale {
  id:          string;
  secteurId:   string;
  secteurCode: SecteurCode;
  name:        string;
  legalName:   string;    // raison sociale
  description: string;
  address:     string;
  city:        string;
  phone:       string;
  email:       string;
  website?:    string;
  directorId?: string;
  director?:   { id: string; firstName: string; lastName: string; };
  isActive:    boolean;
  createdAt:   string;
  magasins?:   Magasin[];
}

// ── Magasin / Entrepôt (niveau 4) ─────────────
export type MagasinType =
  | 'MAGASIN'      // point de vente
  | 'ENTREPOT'     // stockage
  | 'USINE'        // production
  | 'FERME'        // élevage
  | 'ABATTOIR';    // abattage

export interface Magasin {
  id:          string;
  filialeId:   string;
  filialeName: string;
  secteurCode: SecteurCode;
  type:        MagasinType;
  name:        string;
  address:     string;
  city:        string;
  phone:       string;
  managerId?:  string;
  manager?:    { id: string; firstName: string; lastName: string; email: string; };
  surface?:    number;    // m²
  capacity?:   number;    // capacité de stockage
  isActive:    boolean;
  createdAt:   string;
  updatedAt:   string;
  // Stats
  totalProducts?: number;
  totalStock?:    number;
  alertsCount?:   number;
}

// ── Requêtes API ──────────────────────────────
export interface CreateSecteurRequest {
  groupeId:    string;
  code:        SecteurCode;
  name:        string;
  description: string;
  color:       string;
  icon:        string;
}

export interface CreateFilialeRequest {
  secteurId:   string;
  name:        string;
  legalName:   string;
  description: string;
  address:     string;
  city:        string;
  phone:       string;
  email:       string;
  website?:    string;
  directorId?: string;
}

export interface CreateMagasinRequest {
  filialeId:  string;
  type:       MagasinType;
  name:       string;
  address:    string;
  city:       string;
  phone:      string;
  managerId?: string;
  surface?:   number;
  capacity?:  number;
}

export interface UpdateMagasinRequest extends Partial<CreateMagasinRequest> {
  isActive?: boolean;
}