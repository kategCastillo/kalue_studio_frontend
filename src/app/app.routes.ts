import { Routes } from '@angular/router';


export const routes: Routes = [
  {path: 'coleccion', loadComponent: () => import ('./pages/coleccion/coleccion').then ( m => m.Coleccion)},

  {path: 'productos', loadComponent: () => import ('./pages/productos/productos')},

  {path: 'nosotros', loadComponent: () => import ('./pages/nosotros/nosotros').then (m => m.Nosotros)},

  {path: 'contacto', loadComponent: () => import ('./pages/contacto/contacto').then (m => m.Contacto)},

  {path: 'login',loadComponent: () => import ('./feature/auth/login/auth')},

  {path: 'register',loadComponent: () => import ('./feature/auth/register/register')},

  {path: 'dashboard',loadComponent: () => import ('./feature/dashboard/dashboard')},

  {path: 'dashboard/product-new',loadComponent: () => import ('./feature/products/products-new-form/products-new-form')},

  {path: 'dashboard/product/edit/:id', loadComponent: () => import ('./feature/products/products-edit-form/products-edit-form')},
  
  {path: 'dashboard/product/list', loadComponent: () => import ('./feature/products/products-list/products-list')},

  {path: 'dashboard/variant-new',loadComponent: () => import ('./feature/variants/variants-new-form/variants-new-form')},

  {path: 'dashboard/variant/edit/:id', loadComponent: () => import ('./feature/variants/variants-edit-form/variants-edit-form')},
  
  {path: 'dashboard/variant/list', loadComponent: () => import ('./feature/variants/variants-list/variants-list')},

  {path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
  {path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];