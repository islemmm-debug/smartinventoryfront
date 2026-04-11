import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { AlertSeverity } from '../../../../core/models/alert.model';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

@Component({
  selector: 'app-alerts-list',
  standalone: true,
  imports: [CommonModule, PageQuickNavComponent],
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss'],
})
export class AlertsListComponent {
  private alerts = inject(AlertService);
  private auth = inject(AuthService);

  get rows() {
    return this.alerts.filtered();
  }

  severityClass(s: AlertSeverity): string {
    return (
      {
        CRITICAL: 'off',
        HIGH: 'warn',
        MEDIUM: 'warn',
        LOW: 'ok',
      } as const
    )[s];
  }

  resolve(id: string): void {
    const uid = this.auth.currentUser()?.id ?? 'mock-user';
    this.alerts.resolve({ alertId: id, note: 'Traité (local)' }, uid);
  }
}
