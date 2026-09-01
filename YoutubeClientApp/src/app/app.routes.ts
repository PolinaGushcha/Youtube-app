import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { canActivateAuth } from './auth/access.guard';
import { CreateCardComponent } from './create-card/create-card.component';

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
    path: 'create-card',
    component: CreateCardComponent,
  },
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
