import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { StoreService } from '../../../stores/services/store.service';
import { StockStatus } from '../../../../core/models/product.model';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PageQuickNavComponent],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  protected stockService = inject(StockService);
  private storeService = inject(StoreService);

  search = '';
  status: StockStatus | '' = '';
  storeId = '';

  ngOnInit(): void {
    this.stockService.clearFilter();
  }

  get rows() {
    return this.stockService.filtered();
  }

  get stores() {
    return this.storeService.items();
  }

  applyFilter(): void {
    this.stockService.setFilter({
      search: this.search || undefined,
      status: this.status || undefined,
      storeId: this.storeId || undefined,
    });
  }

  clear(): void {
    this.search = '';
    this.status = '';
    this.storeId = '';
    this.stockService.clearFilter();
  }

  statusClass(s: StockStatus): string {
    const map: Record<StockStatus, string> = {
      OK: 'ok',
      LOW: 'warn',
      OUT: 'off',
      OVERSTOCK: 'warn',
    };
    return map[s] ?? 'ok';
  }
}
