import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';
import { PERMISSIONS, PermissionKey } from '../../../../core/models/role.model';

@Component({
  selector: 'app-admin-roles',
  standalone: true,
  imports: [CommonModule, PageQuickNavComponent],
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss'],
})
export class AdminRolesComponent {
  readonly PERMISSIONS = PERMISSIONS;

  readonly permissionRows = (Object.keys(PERMISSIONS) as PermissionKey[]).map(key => ({
    key,
    code: PERMISSIONS[key],
  }));

  readonly rolePresets = [
    {
      name: 'Administrateur',
      desc: 'Gestion utilisateurs, rôles, configuration.',
      keys: ['VIEW_USERS', 'MANAGE_USERS', 'MANAGE_SETTINGS'] as PermissionKey[],
    },
    {
      name: 'Gestionnaire de stock',
      desc: 'Supervision, validation, tableaux de bord.',
      keys: [
        'VIEW_PRODUCTS',
        'VIEW_STOCK',
        'VIEW_MOVEMENTS',
        'VIEW_ALERTS',
        'MANAGE_ALERTS',
        'VIEW_STORES',
        'VIEW_REPORTS',
        'EXPORT_REPORTS',
      ] as PermissionKey[],
    },
    {
      name: 'Magasinier',
      desc: 'Mouvements, scan, consultation stock local.',
      keys: ['VIEW_STOCK', 'VIEW_MOVEMENTS', 'CREATE_MOVEMENT', 'VIEW_ALERTS', 'VIEW_STORES'] as PermissionKey[],
    },
  ];
}
