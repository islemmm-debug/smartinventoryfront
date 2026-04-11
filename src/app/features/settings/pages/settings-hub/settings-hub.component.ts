import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';
import { RbacService } from '../../../../core/security/rbac.service';
import { P } from '../../../../core/security/app-permissions';
import { SystemConfigService } from '../../../../core/config/system-config.service';

@Component({
  selector: 'app-settings-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageQuickNavComponent],
  templateUrl: './settings-hub.component.html',
  styleUrls: ['./settings-hub.component.scss'],
})
export class SettingsHubComponent {
  protected rbac = inject(RbacService);
  protected config = inject(SystemConfigService);

  readonly P = P;

  newCategory = '';

  addCat(): void {
    this.config.addCategoryLabel(this.newCategory);
    this.newCategory = '';
  }
}
