import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

@Component({
  standalone: true,
  template: `
    <div style="padding: 2rem;">
      <h2>Zalogowano pomyślnie!</h2>
      <p>Tutaj pojawi się lista Twoich wycieczek.</p>
    </div>
  `,
})
export class PlaceholderTripsComponent {}

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'trips',
    canActivate: [authGuard],
    component: PlaceholderTripsComponent,
  },
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: '**', redirectTo: 'trips' },
];