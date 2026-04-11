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
    this.productService.clearFilter();
  }

  get rows() {
    return this.productService.filtered();
  }

  get categories(): ProductCategory[] {
    return this.productService.categories();
  }

  applyFilter(): void {
    this.productService.setFilter({
      search: this.search || undefined,
      category: this.category || undefined,
    });
  }

  clear(): void {
    this.search = '';
    this.category = '';
    this.productService.clearFilter();
  }

  openCreate(): void {
    this.editingId = null;
    this.form.reset({
      name: '',
      reference: '',
      barcode: '',
      category: 'AUTRE',
      description: '',
      unit: 'unité',
      purchasePrice: 0,
      sellingPrice: 0,
      minStockLevel: 0,
      maxStockLevel: 100,
    });
    this.formMsg = '';
    this.formErr = '';
    this.showEditor = true;
  }

  edit(p: Product): void {
    this.editingId = p.id;
    this.form.patchValue({
      name: p.name,
      reference: p.reference,
      barcode: p.barcode,
      category: p.category,
      description: p.description,
      unit: p.unit,
      purchasePrice: p.purchasePrice,
      sellingPrice: p.sellingPrice,
      minStockLevel: p.minStockLevel,
      maxStockLevel: p.maxStockLevel,
    });
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
    this.formErr = '';
    this.formMsg = '';

    if (v.maxStockLevel < v.minStockLevel) {
      this.formErr = 'Le seuil max doit être ≥ au seuil min.';
      return;
    }

    if (this.editingId) {
      this.productService.update(this.editingId, {
        name: v.name,
        reference: v.reference,
        barcode: v.barcode,
        category: v.category,
        description: v.description,
        unit: v.unit,
        purchasePrice: v.purchasePrice,
        sellingPrice: v.sellingPrice,
        minStockLevel: v.minStockLevel,
        maxStockLevel: v.maxStockLevel,
      });
      this.formMsg = 'Produit mis à jour (local).';
    } else {
      this.productService.create({
        name: v.name,
        reference: v.reference,
        barcode: v.barcode,
        category: v.category,
        description: v.description,
        unit: v.unit,
        purchasePrice: v.purchasePrice,
        sellingPrice: v.sellingPrice,
        minStockLevel: v.minStockLevel,
        maxStockLevel: v.maxStockLevel,
      });
      this.formMsg = 'Produit créé (local).';
    }
    this.showEditor = false;
    this.editingId = null;
  }

  toggleActive(p: Product, ev: Event): void {
    ev.stopPropagation();
    this.productService.toggleActive(p.id);
  }
}
