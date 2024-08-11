import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './youtube/empty-route/empty-route.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { canActivateAuth } from './auth/access.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.routers').then(m => m.layoutRoutes),
    canActivate: [canActivateAuth],
  },
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];
