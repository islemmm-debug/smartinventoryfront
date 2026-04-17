import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  Product,
  ProductCategory,
} from '../../../../core/models/product.model';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

const CATEGORY_OPTIONS: ProductCategory[] = [
  'AVICULTURE',
  'AGROALIMENTAIRE',
  'METALLURGIE',
  'CERAMIQUE',
  'EMBALLAGE',
  'BOIS',
  'IMMOBILIER',
  'AUTRE',
];

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    PageQuickNavComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  readonly categoryOptions = CATEGORY_OPTIONS;

  // ── État de la liste ──
  products: Product[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  loading = false;

  // ── Filtres ──
  search = '';
  category: ProductCategory | '' = '';

  showEditor = false;
  editingId: string | null = null;

  formMsg = '';
  formErr = '';

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    reference: ['', Validators.required],
    barcode: ['', Validators.required],
    category: ['AUTRE' as ProductCategory, Validators.required],
    description: [''],
    unit: ['unité', Validators.required],
    purchasePrice: [0, [Validators.required, Validators.min(0)]],
    sellingPrice: [0, [Validators.required, Validators.min(0)]],
    minStockLevel: [0, [Validators.required, Validators.min(0)]],
    maxStockLevel: [100, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchTerm: this.search || undefined,
      category: (this.category as ProductCategory) || undefined,
    }).subscribe({
      next: (res) => {
        this.products = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Géré par l'intercepteur mais on peut ajouter un log local
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadProducts();
  }

  applyFilter(): void {
    this.pageNumber = 1; // reset à la première page
    this.loadProducts();
  }

  clear(): void {
    this.search = '';
    this.category = '';
    this.pageNumber = 1;
    this.loadProducts();
  }

  // ── Actions CRUD ──

  openCreate(): void {
    this.editingId = null;
    this.form.reset();
    this.formMsg = '';
    this.formErr = '';
    this.showEditor = true;
  }

  edit(p: Product): void {
    this.editingId = p.id;
    this.form.patchValue(p);
    this.formMsg = '';
    this.formErr = '';
    this.showEditor = true;
  }

  cancelEditor(): void {
    this.showEditor = false;
    this.editingId = null;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.loading = true;

    // Appel au service (create ou update)
    const obs = this.editingId
      ? this.productService.update(this.editingId, v)
      : this.productService.create(v);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.showEditor = false;
        this.editingId = null;
        this.loadProducts();
      },
      error: (err) => {
        this.loading = false;
        this.formErr = err.error?.message || 'Erreur lors de l’enregistrement.';
      }
    });
  }

  toggleActive(p: Product, ev: Event): void {
    ev.stopPropagation();
    this.productService.toggleActive(p.id).subscribe(() => this.loadProducts());
  }
}
