// ─────────────────────────────────────────────
// STORE MODEL
// src/app/core/models/store.model.ts
// ─────────────────────────────────────────────

export interface Store {
  id:          string;
  name:        string;
  location:    string;
  address:     string;
  phone:       string;
  isActive:    boolean;
  managerId?:  string;
  manager?:    ManagerRef;
  createdAt:   string;
  updatedAt:   string;

  // Stats (retournées par certains endpoints)
  totalProducts?: number;
  totalStock?:    number;
  alertsCount?:   number;
}

export interface ManagerRef {
  id:        string;
  firstName: string;
  lastName:  string;
  email:     string;
}

// ── Requêtes API ──────────────────────────────
export interface CreateStoreRequest {
  name:       string;
  location:   string;
  address:    string;
  phone:      string;
  managerId?: string;
}

export interface UpdateStoreRequest {
  name?:       string;
  location?:   string;
  address?:    string;
  phone?:      string;
  isActive?:   boolean;
  managerId?:  string;
}