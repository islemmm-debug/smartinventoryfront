import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { ProductService } from '../../../products/services/product.service';
import { StoreService } from '../../../stores/services/store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { MovementReason } from '../../../../core/models/movement.model';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

@Component({
  selector: 'app-movements-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PageQuickNavComponent],
  templateUrl: './movements-page.component.html',
  styleUrls: ['./movements-page.component.scss'],
})
export class MovementsPageComponent implements OnInit {
  private movements = inject(StockService);
  private products = inject(ProductService);
  private stores = inject(StoreService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private scroller = inject(ViewportScroller);

  scanCode = '';

  productId = '';
  destStoreId = '';
  quantity: number | null = null;
  reason: MovementReason = 'PURCHASE';
  note = '';

  outProductId = '';
  outSourceStoreId = '';
  outQty: number | null = null;
  outReason: MovementReason = 'SALE';
  outNote = '';

  trProductId = '';
  trSourceStoreId = '';
  trDestStoreId = '';
  trQty: number | null = null;
  trNote = '';

  formMsg = '';
  formErr = '';

  ngOnInit(): void {
    this.route.fragment.subscribe(f => {
      if (f) {
        setTimeout(() => this.scroller.scrollToAnchor(f), 200);
      }
    });
  }

  get rows() {
    return this.movements.filtered().slice(0, 50);
  }

  get productOptions() {
    return this.products.getOptions();
  }

  get storesList() {
    return this.stores.items();
  }

  private userId(): string {
    return this.auth.currentUser()?.id ?? 'mock-user';
  }

  async submitIn(): Promise<void> {
    this.formMsg = '';
    this.formErr = '';
    if (!this.productId || !this.destStoreId || !this.quantity || this.quantity <= 0) {
      this.formErr = 'Remplissez produit, magasin destination et quantité.';
      return;
    }
    try {
      const res = await lastValueFrom(this.movements.createIn(
        {
          productId: this.productId,
          destStoreId: this.destStoreId,
          quantity: this.quantity,
          reason: this.reason,
          note: this.note || undefined,
        },
        this.userId(),
      ));
      this.formMsg = `Entrée enregistrée — réf. ${res.reference}`;
      this.quantity = null;
      this.note = '';
    } catch (err: any) {
      this.formErr = err.error?.message || 'Impossible d’enregistrer le mouvement.';
    }
  }

  async submitOut(): Promise<void> {
    this.formMsg = '';
    this.formErr = '';
    if (!this.outProductId || !this.outSourceStoreId || !this.outQty || this.outQty <= 0) {
      this.formErr = 'Remplissez produit, magasin source et quantité (sortie).';
      return;
    }
    try {
      const res = await lastValueFrom(this.movements.createOut(
        {
          productId: this.outProductId,
          sourceStoreId: this.outSourceStoreId,
          quantity: this.outQty,
          reason: this.outReason,
          note: this.outNote || undefined,
        },
        this.userId(),
      ));
      this.formMsg = `Sortie enregistrée — réf. ${res.reference}`;
      this.outQty = null;
      this.outNote = '';
    } catch (err: any) {
      this.formErr = err.error?.message || 'Erreur sortie stock.';
    }
  }

  async submitTransfer(): Promise<void> {
    this.formMsg = '';
    this.formErr = '';
    if (
      !this.trProductId ||
      !this.trSourceStoreId ||
      !this.trDestStoreId ||
      !this.trQty ||
      this.trQty <= 0
    ) {
      this.formErr = 'Remplissez tous les champs du transfert.';
      return;
    }
    try {
      const res = await lastValueFrom(this.movements.createTransfer(
        {
          productId: this.trProductId,
          sourceStoreId: this.trSourceStoreId,
          destStoreId: this.trDestStoreId,
          quantity: this.trQty,
          note: this.trNote || undefined,
        },
        this.userId(),
      ));
      this.formMsg = `Transfert enregistré — réf. ${res.reference}`;
      this.trQty = null;
      this.trNote = '';
    } catch (err: any) {
      this.formErr = err.error?.message || 'Erreur transfert.';
    }
  }

  simulateScan(): void {
    const code = this.scanCode.trim();
    if (!code) return;
    const p = this.products
      .getAllSimple()
      .find(x => x.barcode === code || x.reference.toLowerCase() === code.toLowerCase());
    if (p) {
      this.productId = p.id;
      this.outProductId = p.id;
      this.trProductId = p.id;
      this.formMsg = `Produit sélectionné : ${p.name}`;
      this.formErr = '';
    } else {
      this.formErr = 'Aucun produit pour ce code.';
    }
  }
}
