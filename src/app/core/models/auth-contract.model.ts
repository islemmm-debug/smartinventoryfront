/** Contrats API auth (alignés backend futur). */
export interface RegisterApiResponse {
  message: string;
  /** Si le backend renvoie un token (peu probable pour compte en attente). */
  token?: string;
}

export interface PendingUserSummary {
  email: string;
  requestedAt: string;
}
