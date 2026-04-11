// ─────────────────────────────────────────────
// FAKE ORGANISATION DATA — POULINA GROUP
// src/app/features/settings/data/organisation.data.ts
// ─────────────────────────────────────────────
import { Groupe, Secteur, Filiale, Magasin } from '../../../core/models/organisation.model';

// ════════════════════════════════════════════
// NIVEAU 1 — GROUPE
// ════════════════════════════════════════════
export const FAKE_GROUPE: Groupe = {
  id:          'grp-001',
  name:        'Poulina Group Holding',
  description: 'Premier groupe privé tunisien — 71 filiales dont 15 à l\'étranger',
  address:     'GP1 Km 12 Ezzahra, Ben Arous — Tunisie',
  phone:       '+216 70 020 520',
  website:     'www.poulinagroupholding.com',
  isActive:    true,
  createdAt:   '1967-01-01T00:00:00Z',
};

// ════════════════════════════════════════════
// NIVEAU 2 — SECTEURS / PÔLES
// ════════════════════════════════════════════
export const FAKE_SECTEURS: Secteur[] = [
  {
    id: 'sec-001', groupeId: 'grp-001',
    code: 'AVICOLE',
    name: 'Pôle Avicole',
    description: 'Élevage, abattage, transformation et distribution de produits avicoles',
    color: '#F59E0B', icon: '🐔',
    isActive: true, createdAt: '1967-01-01T00:00:00Z',
  },
  {
    id: 'sec-002', groupeId: 'grp-001',
    code: 'AGROALIMENTAIRE',
    name: 'Pôle Agroalimentaire',
    description: 'Produits laitiers, huiles, glaces, jus, confiseries — marques SELJA & OLA',
    color: '#10B981', icon: '🥛',
    isActive: true, createdAt: '1980-01-01T00:00:00Z',
  },
  {
    id: 'sec-003', groupeId: 'grp-001',
    code: 'INDUSTRIEL',
    name: 'Pôle Industriel',
    description: 'Métallurgie, bois, électroménager — marque Mont Blanc',
    color: '#6366F1', icon: '🏭',
    isActive: true, createdAt: '1975-01-01T00:00:00Z',
  },
  {
    id: 'sec-004', groupeId: 'grp-001',
    code: 'CERAMIQUE',
    name: 'Pôle Céramique',
    description: 'Fabrication et commercialisation de carreaux céramique et porcelaine',
    color: '#8B5CF6', icon: '🪟',
    isActive: true, createdAt: '1990-01-01T00:00:00Z',
  },
  {
    id: 'sec-005', groupeId: 'grp-001',
    code: 'EMBALLAGE',
    name: 'Pôle Emballage',
    description: 'Carton, papier, alvéoles, film étiré, emballages alimentaires',
    color: '#F97316', icon: '📦',
    isActive: true, createdAt: '1985-01-01T00:00:00Z',
  },
  {
    id: 'sec-006', groupeId: 'grp-001',
    code: 'IMMOBILIER',
    name: 'Pôle Immobilier & BTP',
    description: 'Promotion immobilière, construction bâtiments, routes et ponts',
    color: '#EF4444', icon: '🏗️',
    isActive: true, createdAt: '2000-01-01T00:00:00Z',
  },
  {
    id: 'sec-007', groupeId: 'grp-001',
    code: 'SERVICES',
    name: 'Pôle Services & Négoce',
    description: 'Informatique, import/export, distribution, services commerciaux',
    color: '#14B8A6', icon: '💼',
    isActive: true, createdAt: '1995-01-01T00:00:00Z',
  },
];

// ════════════════════════════════════════════
// NIVEAU 3 — FILIALES (vraies filiales Poulina)
// ════════════════════════════════════════════
export const FAKE_FILIALES: Filiale[] = [

  // ── Pôle Avicole ──────────────────────────
  {
    id: 'fil-001', secteurId: 'sec-001', secteurCode: 'AVICOLE',
    name: 'El Mazraa',
    legalName: 'Société El Mazraa S.A.',
    description: 'Leader avicole tunisien — élevage, abattage, transformation, distribution. Plus grand abattoir d\'Afrique (10 ha). +300 produits, 1200 points de vente.',
    address: 'Route de Bizerte Km 15, Séjoumi',
    city: 'Tunis',
    phone: '+216 71 700 100',
    email: 'contact@elmazraa.com',
    website: 'www.elmazraa.com',
    isActive: true, createdAt: '1988-01-01T00:00:00Z',
  },
  {
    id: 'fil-002', secteurId: 'sec-001', secteurCode: 'AVICOLE',
    name: 'Poulina Avicole',
    legalName: 'Poulina S.A.',
    description: 'Alimentation animale — fabrication d\'aliments composés pour volailles et bétail. 30 à 35% de l\'alimentation animale tunisienne.',
    address: 'Zone Industrielle La Charguia',
    city: 'Tunis',
    phone: '+216 71 700 200',
    email: 'contact@poulinaavicole.tn',
    isActive: true, createdAt: '1967-01-01T00:00:00Z',
  },
  {
    id: 'fil-003', secteurId: 'sec-001', secteurCode: 'AVICOLE',
    name: 'SOZAM',
    legalName: 'SOZAM S.A.',
    description: 'Société d\'élevage avicole — couvoirs et élevage de reproducteurs',
    address: 'Route de Bizerte, Mateur',
    city: 'Bizerte',
    phone: '+216 72 460 100',
    email: 'contact@sozam.tn',
    isActive: true, createdAt: '1975-01-01T00:00:00Z',
  },

  // ── Pôle Agroalimentaire ───────────────────
  {
    id: 'fil-004', secteurId: 'sec-002', secteurCode: 'AGROALIMENTAIRE',
    name: 'Centrale Laitière',
    legalName: 'Centrale Laitière du Cap Bon S.A.',
    description: 'Production de yaourts, desserts, produits laitiers — marques SELJA & OLA',
    address: 'Zone Industrielle Grombalia',
    city: 'Grombalia',
    phone: '+216 72 260 300',
    email: 'contact@centralelaitiere.tn',
    isActive: true, createdAt: '1982-01-01T00:00:00Z',
  },
  {
    id: 'fil-005', secteurId: 'sec-002', secteurCode: 'AGROALIMENTAIRE',
    name: 'SELJA',
    legalName: 'SELJA S.A.',
    description: 'Crèmes glacées, sorbets et produits surgelés — leader en Tunisie',
    address: 'Route de Sfax Km 3',
    city: 'Sousse',
    phone: '+216 73 310 400',
    email: 'contact@selja.tn',
    isActive: true, createdAt: '1985-01-01T00:00:00Z',
  },
  {
    id: 'fil-006', secteurId: 'sec-002', secteurCode: 'AGROALIMENTAIRE',
    name: 'OASIS',
    legalName: 'OASIS S.A.',
    description: 'Production de jus de fruits, nectars et boissons — distribution nationale',
    address: 'Zone Industrielle Bir Bou Rekba',
    city: 'Nabeul',
    phone: '+216 72 280 500',
    email: 'contact@oasis.tn',
    isActive: true, createdAt: '1990-01-01T00:00:00Z',
  },
  {
    id: 'fil-007', secteurId: 'sec-002', secteurCode: 'AGROALIMENTAIRE',
    name: 'Margine',
    legalName: 'Margine S.A.',
    description: 'Fabrication de margarine, huiles végétales et graisses alimentaires',
    address: 'Zone Industrielle Sfax Nord',
    city: 'Sfax',
    phone: '+216 74 240 600',
    email: 'contact@margine.tn',
    isActive: true, createdAt: '1988-01-01T00:00:00Z',
  },

  // ── Pôle Industriel ───────────────────────
  {
    id: 'fil-008', secteurId: 'sec-003', secteurCode: 'INDUSTRIEL',
    name: 'MBG (Mont Blanc)',
    legalName: 'Mont Blanc Group S.A.',
    description: 'Fabrication d\'électroménager — réfrigérateurs, cuisinières, machines à laver. Leader tunisien avec 39% de parts de marché.',
    address: 'Zone Industrielle Ben Arous',
    city: 'Ben Arous',
    phone: '+216 71 380 200',
    email: 'contact@montblanc.tn',
    website: 'www.montblanc.tn',
    isActive: true, createdAt: '1978-01-01T00:00:00Z',
  },
  {
    id: 'fil-009', secteurId: 'sec-003', secteurCode: 'INDUSTRIEL',
    name: 'ENNAJEH Bois',
    legalName: 'ENNAJEH S.A.',
    description: 'Production de panneaux MDF, mobilier de bureau et bois transformé',
    address: 'Route de Tunis Km 5',
    city: 'Sfax',
    phone: '+216 74 220 300',
    email: 'contact@ennajeh.tn',
    isActive: true, createdAt: '1983-01-01T00:00:00Z',
  },
  {
    id: 'fil-010', secteurId: 'sec-003', secteurCode: 'INDUSTRIEL',
    name: 'SELMA Acier',
    legalName: 'SELMA S.A.',
    description: 'Transformation de l\'acier — tubes soudés, profilés métalliques',
    address: 'Zone Industrielle Mghira',
    city: 'Ben Arous',
    phone: '+216 71 380 400',
    email: 'contact@selma.tn',
    isActive: true, createdAt: '1975-01-01T00:00:00Z',
  },

  // ── Pôle Céramique ────────────────────────
  {
    id: 'fil-011', secteurId: 'sec-004', secteurCode: 'CERAMIQUE',
    name: 'SNA Céramique',
    legalName: 'Société Nouvelle des Abrasifs S.A.',
    description: 'Fabrication de carreaux céramique, faïence et grès cérame pour murs et sols',
    address: 'Route de Tunis Km 8',
    city: 'Sfax',
    phone: '+216 74 280 100',
    email: 'contact@snaceramique.tn',
    isActive: true, createdAt: '1992-01-01T00:00:00Z',
  },

  // ── Pôle Emballage ────────────────────────
  {
    id: 'fil-012', secteurId: 'sec-005', secteurCode: 'EMBALLAGE',
    name: 'MAZRAA Emballage',
    legalName: 'Mazraa Emballage S.A.',
    description: 'Fabrication de cartons ondulés, alvéoles œufs, emballages alimentaires et film étiré',
    address: 'Zone Industrielle La Charguia 2',
    city: 'Tunis',
    phone: '+216 71 700 500',
    email: 'contact@mazraaemballage.tn',
    isActive: true, createdAt: '1986-01-01T00:00:00Z',
  },
  {
    id: 'fil-013', secteurId: 'sec-005', secteurCode: 'EMBALLAGE',
    name: 'ImprimPlus',
    legalName: 'ImprimPlus S.A.',
    description: 'Impression sur film plastique, emballages souples et étiquettes',
    address: 'Rue de l\'Imprimerie, Zone Industrielle',
    city: 'Tunis',
    phone: '+216 71 700 600',
    email: 'contact@imprimplus.tn',
    isActive: true, createdAt: '1994-01-01T00:00:00Z',
  },

  // ── Pôle Immobilier ───────────────────────
  {
    id: 'fil-014', secteurId: 'sec-006', secteurCode: 'IMMOBILIER',
    name: 'Poulina Immobilier',
    legalName: 'Poulina Immobilier S.A.',
    description: 'Promotion immobilière résidentielle, bureaux et commerces',
    address: 'Av. Habib Bourguiba, Imm. Poulina',
    city: 'Tunis',
    phone: '+216 71 330 100',
    email: 'contact@poulinaimmobilier.tn',
    isActive: true, createdAt: '2000-01-01T00:00:00Z',
  },

  // ── Pôle Services ─────────────────────────
  {
    id: 'fil-015', secteurId: 'sec-007', secteurCode: 'SERVICES',
    name: 'PGH Distribution',
    legalName: 'PGH Distribution S.A.',
    description: 'Négoce, import/export, distribution nationale des produits du groupe',
    address: 'GP1 Km 12 Ezzahra',
    city: 'Ben Arous',
    phone: '+216 70 020 520',
    email: 'distribution@poulina.tn',
    isActive: true, createdAt: '1995-01-01T00:00:00Z',
  },
];

// ════════════════════════════════════════════
// NIVEAU 4 — MAGASINS / ENTREPÔTS
// ════════════════════════════════════════════
export const FAKE_MAGASINS: Magasin[] = [

  // ── El Mazraa (fil-001) ───────────────────
  {
    id: 'mag-001', filialeId: 'fil-001', filialeName: 'El Mazraa', secteurCode: 'AVICOLE',
    type: 'ABATTOIR', name: 'Abattoir Central El Mazraa',
    address: 'Route de Bizerte Km 15, Séjoumi', city: 'Tunis',
    phone: '+216 71 700 101', surface: 100000, capacity: 50000,
    isActive: true, createdAt: '1988-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 45, totalStock: 12000, alertsCount: 1,
  },
  {
    id: 'mag-002', filialeId: 'fil-001', filialeName: 'El Mazraa', secteurCode: 'AVICOLE',
    type: 'ENTREPOT', name: 'Entrepôt Frigorifique Bizerte',
    address: 'Zone Industrielle, Bizerte', city: 'Bizerte',
    phone: '+216 72 431 200', surface: 5000, capacity: 20000,
    isActive: true, createdAt: '1995-01-01T00:00:00Z', updatedAt: '2025-02-01T00:00:00Z',
    totalProducts: 30, totalStock: 8500, alertsCount: 0,
  },
  {
    id: 'mag-003', filialeId: 'fil-001', filialeName: 'El Mazraa', secteurCode: 'AVICOLE',
    type: 'MAGASIN', name: 'Point de Vente El Mazraa — Sfax',
    address: 'Av. Farhat Hached', city: 'Sfax',
    phone: '+216 74 220 400', surface: 300, capacity: 2000,
    isActive: true, createdAt: '2000-01-01T00:00:00Z', updatedAt: '2025-03-01T00:00:00Z',
    totalProducts: 25, totalStock: 1800, alertsCount: 2,
  },

  // ── Poulina Avicole (fil-002) ─────────────
  {
    id: 'mag-004', filialeId: 'fil-002', filialeName: 'Poulina Avicole', secteurCode: 'AVICOLE',
    type: 'USINE', name: 'Usine Aliments Composés — La Charguia',
    address: 'Zone Industrielle La Charguia', city: 'Tunis',
    phone: '+216 71 700 201', surface: 20000, capacity: 100000,
    isActive: true, createdAt: '1967-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 20, totalStock: 45000, alertsCount: 0,
  },
  {
    id: 'mag-005', filialeId: 'fil-002', filialeName: 'Poulina Avicole', secteurCode: 'AVICOLE',
    type: 'ENTREPOT', name: 'Dépôt Aliments — Béja',
    address: 'Route de Tunis, Zone Industrielle', city: 'Béja',
    phone: '+216 78 450 100', surface: 3000, capacity: 15000,
    isActive: true, createdAt: '2002-01-01T00:00:00Z', updatedAt: '2025-02-01T00:00:00Z',
    totalProducts: 12, totalStock: 9000, alertsCount: 1,
  },

  // ── Centrale Laitière (fil-004) ───────────
  {
    id: 'mag-006', filialeId: 'fil-004', filialeName: 'Centrale Laitière', secteurCode: 'AGROALIMENTAIRE',
    type: 'USINE', name: 'Usine Centrale Laitière — Grombalia',
    address: 'Zone Industrielle Grombalia', city: 'Grombalia',
    phone: '+216 72 260 301', surface: 15000, capacity: 80000,
    isActive: true, createdAt: '1982-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 35, totalStock: 22000, alertsCount: 1,
  },
  {
    id: 'mag-007', filialeId: 'fil-004', filialeName: 'Centrale Laitière', secteurCode: 'AGROALIMENTAIRE',
    type: 'ENTREPOT', name: 'Entrepôt Frigorifique — Sousse',
    address: 'Zone Industrielle Sousse Nord', city: 'Sousse',
    phone: '+216 73 310 401', surface: 2500, capacity: 15000,
    isActive: true, createdAt: '1990-01-01T00:00:00Z', updatedAt: '2025-03-01T00:00:00Z',
    totalProducts: 28, totalStock: 7200, alertsCount: 3,
  },

  // ── SELJA (fil-005) ───────────────────────
  {
    id: 'mag-008', filialeId: 'fil-005', filialeName: 'SELJA', secteurCode: 'AGROALIMENTAIRE',
    type: 'USINE', name: 'Usine SELJA — Sousse',
    address: 'Route de Sfax Km 3', city: 'Sousse',
    phone: '+216 73 310 402', surface: 8000, capacity: 40000,
    isActive: true, createdAt: '1985-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 40, totalStock: 18500, alertsCount: 0,
  },

  // ── OASIS (fil-006) ───────────────────────
  {
    id: 'mag-009', filialeId: 'fil-006', filialeName: 'OASIS', secteurCode: 'AGROALIMENTAIRE',
    type: 'USINE', name: 'Usine OASIS — Nabeul',
    address: 'Zone Industrielle Bir Bou Rekba', city: 'Nabeul',
    phone: '+216 72 280 501', surface: 6000, capacity: 35000,
    isActive: true, createdAt: '1990-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 22, totalStock: 14000, alertsCount: 0,
  },

  // ── MBG Mont Blanc (fil-008) ──────────────
  {
    id: 'mag-010', filialeId: 'fil-008', filialeName: 'MBG (Mont Blanc)', secteurCode: 'INDUSTRIEL',
    type: 'USINE', name: 'Usine Mont Blanc — Ben Arous',
    address: 'Zone Industrielle Ben Arous', city: 'Ben Arous',
    phone: '+216 71 380 201', surface: 25000, capacity: 60000,
    isActive: true, createdAt: '1978-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 55, totalStock: 32000, alertsCount: 2,
  },
  {
    id: 'mag-011', filialeId: 'fil-008', filialeName: 'MBG (Mont Blanc)', secteurCode: 'INDUSTRIEL',
    type: 'ENTREPOT', name: 'Dépôt Pièces Mont Blanc — Sfax',
    address: 'Route de Tunis Km 4', city: 'Sfax',
    phone: '+216 74 240 200', surface: 4000, capacity: 20000,
    isActive: true, createdAt: '1990-01-01T00:00:00Z', updatedAt: '2025-02-01T00:00:00Z',
    totalProducts: 30, totalStock: 11000, alertsCount: 1,
  },

  // ── ENNAJEH Bois (fil-009) ────────────────
  {
    id: 'mag-012', filialeId: 'fil-009', filialeName: 'ENNAJEH Bois', secteurCode: 'INDUSTRIEL',
    type: 'USINE', name: 'Usine ENNAJEH — Sfax',
    address: 'Route de Tunis Km 5', city: 'Sfax',
    phone: '+216 74 220 301', surface: 12000, capacity: 50000,
    isActive: true, createdAt: '1983-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 25, totalStock: 9500, alertsCount: 2,
  },

  // ── SELMA Acier (fil-010) ─────────────────
  {
    id: 'mag-013', filialeId: 'fil-010', filialeName: 'SELMA Acier', secteurCode: 'INDUSTRIEL',
    type: 'USINE', name: 'Usine SELMA — Mghira',
    address: 'Zone Industrielle Mghira', city: 'Ben Arous',
    phone: '+216 71 380 401', surface: 18000, capacity: 70000,
    isActive: true, createdAt: '1975-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 40, totalStock: 28000, alertsCount: 3,
  },

  // ── SNA Céramique (fil-011) ───────────────
  {
    id: 'mag-014', filialeId: 'fil-011', filialeName: 'SNA Céramique', secteurCode: 'CERAMIQUE',
    type: 'USINE', name: 'Usine SNA — Sfax',
    address: 'Route de Tunis Km 8', city: 'Sfax',
    phone: '+216 74 280 101', surface: 30000, capacity: 120000,
    isActive: true, createdAt: '1992-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 60, totalStock: 85000, alertsCount: 0,
  },
  {
    id: 'mag-015', filialeId: 'fil-011', filialeName: 'SNA Céramique', secteurCode: 'CERAMIQUE',
    type: 'MAGASIN', name: 'Show-room Céramique — Tunis',
    address: 'Av. de la Liberté', city: 'Tunis',
    phone: '+216 71 840 200', surface: 800, capacity: 5000,
    isActive: true, createdAt: '2001-01-01T00:00:00Z', updatedAt: '2025-03-01T00:00:00Z',
    totalProducts: 45, totalStock: 3200, alertsCount: 0,
  },

  // ── MAZRAA Emballage (fil-012) ────────────
  {
    id: 'mag-016', filialeId: 'fil-012', filialeName: 'MAZRAA Emballage', secteurCode: 'EMBALLAGE',
    type: 'USINE', name: 'Usine Emballage — La Charguia',
    address: 'Zone Industrielle La Charguia 2', city: 'Tunis',
    phone: '+216 71 700 501', surface: 10000, capacity: 500000,
    isActive: true, createdAt: '1986-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
    totalProducts: 30, totalStock: 280000, alertsCount: 0,
  },
];