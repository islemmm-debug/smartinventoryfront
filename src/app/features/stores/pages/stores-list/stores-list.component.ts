import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

@Component({
  selector: 'app-stores-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageQuickNavComponent],
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss'],
})
export class StoresListComponent {
  private storeService = inject(StoreService);

  q = '';

  onSearch(): void {
    this.storeService.setSearch(this.q);
  }

  get rows() {
    return this.storeService.filtered();
  }
}
