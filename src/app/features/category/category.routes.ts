import { Routes } from '@angular/router';

const CATEGORY_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./category-list/category-list'),
  },
  {
    path: 'new/form',
    loadComponent: () => import('./category-new-form/category-new-form'),
  },
  {
    path: 'edit/form/:id',
    loadComponent: () => import('./category-edit-form/category-edit-form'),
  },
];

export default CATEGORY_ROUTES;
