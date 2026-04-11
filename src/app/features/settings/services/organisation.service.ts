// ─────────────────────────────────────────────
// ORGANISATION SERVICE (fake + prêt pour API)
// src/app/features/settings/services/organisation.service.ts
// ─────────────────────────────────────────────
import { Injectable, signal, computed } from '@angular/core';
import {
  Groupe, Secteur, Filiale, Magasin,
  CreateFilialeRequest, CreateMagasinRequest, UpdateMagasinRequest,
  SecteurCode
} from '../../../core/models/organisation.model';
import {
  FAKE_GROUPE, FAKE_SECTEURS, FAKE_FILIALES, FAKE_MAGASINS
} from '../data/organisation.data';

@Injectable({ providedIn: 'root' })
export class OrganisationService {

  // ── State (signals) ───────────────────────
  private _groupe   = signal<Groupe>(FAKE_GROUPE);
  private _secteurs = signal<Secteur[]>([...FAKE_SECTEURS]);
  private _filiales = signal<Filiale[]>([...FAKE_FILIALES]);
  private _magasins = signal<Magasin[]>([...FAKE_MAGASINS]);

  // ── Public readonly ───────────────────────
  readonly groupe   = this._groupe.asReadonly();
  readonly secteurs = this._secteurs.asReadonly();
  readonly filiales = this._filiales.asReadonly();
  readonly magasins = this._magasins.asReadonly();

  // ── Computed ──────────────────────────────
  readonly secteursActifs = computed(() =>
    this._secteurs().filter(s => s.isActive)
  );

  readonly filialesActives = computed(() =>
    this._filiales().filter(f => f.isActive)
  );

  readonly magasinsActifs = computed(() =>
    this._magasins().filter(m => m.isActive)
  );

  // ─────────────────────────────────────────
  // SECTEURS
  // ─────────────────────────────────────────
  getSecteurById(id: string): Secteur | undefined {
    return this._secteurs().find(s => s.id === id);
  }

  getSecteurByCode(code: SecteurCode): Secteur | undefined {
    return this._secteurs().find(s => s.code === code);
  }

  // ─────────────────────────────────────────
  // FILIALES
  // ─────────────────────────────────────────
  getFilialesBySecteur(secteurId: string): Filiale[] {
    return this._filiales().filter(f => f.secteurId === secteurId);
  }

  getFilialeById(id: string): Filiale | undefined {
    return this._filiales().find(f => f.id === id);
  }

  addFiliale(req: CreateFilialeRequest): Filiale {
    const secteur = this.getSecteurById(req.secteurId);
    const filiale: Filiale = {
      ...req,
      id:          `fil-${Date.now()}`,
      secteurCode: secteur!.code,
      isActive:    true,
      createdAt:   new Date().toISOString(),
    };
    this._filiales.update(list => [...list, filiale]);
    return filiale;
  }

  updateFiliale(id: string, changes: Partial<CreateFilialeRequest>): void {
    this._filiales.update(list =>
      list.map(f => f.id === id ? { ...f, ...changes } : f)
    );
  }

  toggleFilialeActive(id: string): void {
    this._filiales.update(list =>
      list.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f)
    );
  }

  // ─────────────────────────────────────────
  // MAGASINS
  // ─────────────────────────────────────────
  getMagasinsByFiliale(filialeId: string): Magasin[] {
    return this._magasins().filter(m => m.filialeId === filialeId);
  }

  getMagasinsBySecteur(secteurCode: SecteurCode): Magasin[] {
    return this._magasins().filter(m => m.secteurCode === secteurCode);
  }

  getMagasinById(id: string): Magasin | undefined {
    return this._magasins().find(m => m.id === id);
  }

  addMagasin(req: CreateMagasinRequest): Magasin {
    const filiale = this.getFilialeById(req.filialeId);
    const magasin: Magasin = {
      ...req,
      id:          `mag-${Date.now()}`,
      filialeName: filiale!.name,
      secteurCode: filiale!.secteurCode,
      isActive:    true,
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
      totalProducts: 0,
      totalStock:    0,
      alertsCount:   0,
    };
    this._magasins.update(list => [...list, magasin]);
    return magasin;
  }

  updateMagasin(id: string, changes: UpdateMagasinRequest): void {
    this._magasins.update(list =>
      list.map(m => m.id === id
        ? { ...m, ...changes, updatedAt: new Date().toISOString() }
        : m
      )
    );
  }

  toggleMagasinActive(id: string): void {
    this._magasins.update(list =>
      list.map(m => m.id === id
        ? { ...m, isActive: !m.isActive, updatedAt: new Date().toISOString() }
        : m
      )
    );
  }

  deleteMagasin(id: string): void {
    this._magasins.update(list => list.filter(m => m.id !== id));
  }

  // ─────────────────────────────────────────
  // HELPERS (pour dropdowns / selects)
  // ─────────────────────────────────────────

  // Retourne { value, label } pour ng-select / mat-select
  getSecteurOptions() {
    return this.secteursActifs().map(s => ({
      value: s.id,
      label: `${s.icon} ${s.name}`,
      code:  s.code,
    }));
  }

  getFilialeOptions(secteurId?: string) {
    const list = secteurId
      ? this.getFilialesBySecteur(secteurId).filter(f => f.isActive)
      : this.filialesActives();
    return list.map(f => ({ value: f.id, label: f.name }));
  }

  getMagasinOptions(filialeId?: string) {
    const list = filialeId
      ? this.getMagasinsByFiliale(filialeId).filter(m => m.isActive)
      : this.magasinsActifs();
    return list.map(m => ({ value: m.id, label: `${m.name} — ${m.city}` }));
  }

  // ─────────────────────────────────────────
  // STATISTIQUES
  // ─────────────────────────────────────────
  getStats() {
    return {
      totalSecteurs:  this._secteurs().length,
      totalFiliales:  this._filiales().length,
      totalMagasins:  this._magasins().length,
      filialesActives: this.filialesActives().length,
      magasinsActifs:  this.magasinsActifs().length,
    };
  }
}