import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
