// ─────────────────────────────────────────────
// AI PREDICTION MODEL
// src/app/core/models/prediction.model.ts
// ─────────────────────────────────────────────

export type PredictionType =
  | 'DEMAND_FORECAST'     // prévision de demande
  | 'STOCKOUT_RISK'       // risque de rupture
  | 'REORDER_SUGGESTION'  // suggestion de réapprovisionnement
  | 'ANOMALY_DETECTION';  // détection d'anomalie

export interface Prediction {
  id:             string;
  type:           PredictionType;
  productId:      string;
  storeId?:       string;
  predictedValue: number;
  confidence:     number;   // 0-100 (%)
  horizon:        number;   // jours dans le futur
  generatedAt:    string;
  validUntil:     string;
  metadata:       Record<string, any>;

  product?: { id: string; name: string; reference: string; };
  store?:   { id: string; name: string; };
}

export interface DemandForecast {
  productId:  string;
  storeId:    string;
  forecasts:  ForecastPoint[];
  confidence: number;
}

export interface ForecastPoint {
  date:            string;
  predictedDemand: number;
  lowerBound:      number;
  upperBound:      number;
}