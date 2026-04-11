import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAdminService } from '../../services/user-admin.service';
import { UserRole } from '../../../../core/models/user.model';
import { PageQuickNavComponent } from '../../../../shared/components/page-quick-nav/page-quick-nav.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, PageQuickNavComponent],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent {
  private users = inject(UserAdminService);

  filter: 'all' | 'pending' = 'all';

  /** Rôle sélectionné par ligne (userId → role) */
  roleDraft: Record<string, UserRole> = {};

  get rows() {
    const list = this.users.items();
    if (this.filter === 'pending') return list.filter(u => !u.isActive);
    return list;
  }

  roleClass(role: string): string {
    if (role === 'Admin') return 'role-admin';
    if (role === 'Manager') return 'role-manager';
    return 'role-worker';
  }

  draftRole(userId: string, current: UserRole): UserRole {
    return this.roleDraft[userId] ?? current;
  }

  onRoleChange(userId: string, role: UserRole): void {
    this.roleDraft[userId] = role;
  }

  applyRole(userId: string): void {
    const u = this.users.getById(userId);
    if (!u) return;
    const r = this.roleDraft[userId] ?? u.role;
    this.users.setRole(userId, r);
    delete this.roleDraft[userId];
  }

  approve(userId: string): void {
    this.users.approve(userId);
  }
}
