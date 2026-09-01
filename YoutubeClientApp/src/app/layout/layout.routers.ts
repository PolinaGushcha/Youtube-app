import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'item/:id',
        loadComponent: () => import('../item/item.component').then(m => m.ItemComponent),
      },
      {
        path: 'favorite',
        loadComponent: () => import('../favorite/favorite.component').then(m => m.FavoriteComponent),
      },
      {
        path: 'create-card',
        loadComponent: () => import('../create-card/create-card.component').then(m => m.CreateCardComponent),
      },
    ],
  },
];
