import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, PageQuickNavComponent],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent {}
