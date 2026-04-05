import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { catalogGuard } from './core/auth/catalog.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/pages/forgot-password/forgot-password.component').then(
        m => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'pending-approval',
    loadComponent: () =>
      import('./features/auth/pages/pending-approval/pending-approval.component').then(
        m => m.PendingApprovalComponent,
      ),
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'Dashboard' },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/pages/products-list/products-list.component').then(
            m => m.ProductsListComponent,
          ),
        canActivate: [catalogGuard],
        data: { title: 'Produits' },
      },
      {
        path: 'stock',
        loadComponent: () =>
          import('./features/stock/pages/stock-list/stock-list.component').then(m => m.StockListComponent),
        data: { title: 'Stock' },
      },
      {
        path: 'movements',
        loadComponent: () =>
          import('./features/movements/pages/movements-page/movements-page.component').then(
            m => m.MovementsPageComponent,
          ),
        data: { title: 'Mouvements' },
      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('./features/alerts/pages/alerts-list/alerts-list.component').then(m => m.AlertsListComponent),
        data: { title: 'Alertes' },
      },
      {
        path: 'stores',
        loadComponent: () =>
          import('./features/stores/pages/stores-list/stores-list.component').then(m => m.StoresListComponent),
        data: { title: 'Magasins' },
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/dashboard/pages/reports-page/reports-page.component').then(
            m => m.ReportsPageComponent,
          ),
        canActivate: [catalogGuard],
        data: { title: 'Rapports & IA' },
      },
      {
        path: 'admin/users',
        loadComponent: () =>
          import('./features/users/pages/admin-users/admin-users.component').then(m => m.AdminUsersComponent),
        canActivate: [roleGuard],
        data: { roles: ['Admin'], title: 'Utilisateurs' },
      },
      {
        path: 'admin/roles',
        loadComponent: () =>
          import('./features/users/pages/admin-roles/admin-roles.component').then(m => m.AdminRolesComponent),
        canActivate: [roleGuard],
        data: { roles: ['Admin'], title: 'Rôles & permissions' },
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
