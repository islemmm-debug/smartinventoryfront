import { Injectable } from '@angular/core';
import { User, UserRole } from '../../../core/models/user.model';
import { BaseService } from '../../../core/services/base.service';
import { FAKE_USERS } from '../data/users.data';

@Injectable({ providedIn: 'root' })
export class UserAdminService extends BaseService<User> {
  constructor() {
    super();
    this._items.set([...FAKE_USERS]);
  }

  pendingUsers(): User[] {
    return this._items().filter(u => !u.isActive);
  }

  approve(id: string): void {
    this._items.update(list =>
      list.map(u =>
        u.id === id
          ? { ...u, isActive: true, updatedAt: new Date().toISOString() }
          : u,
      ),
    );
  }

  setRole(id: string, role: UserRole): void {
    this._items.update(list =>
      list.map(u =>
        u.id === id ? { ...u, role, updatedAt: new Date().toISOString() } : u,
      ),
    );
  }
}
