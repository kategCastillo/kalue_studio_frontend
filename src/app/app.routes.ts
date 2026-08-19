import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
  { path: 'login', loadComponent: () => import('./features/auth/login/login') },
  { path: 'registro', loadComponent: () => import('./features/auth/register/register') },
  { path: 'dashboard',canActivate: [authGuard], loadComponent:() => import('./features/dashboard/dashboard')},
  { path: 'coleccion', loadComponent: () => import ('./features/coleccion/coleccion')},
  { path: 'productos', loadComponent: () => import ('./features/productos/productos')},
  { path: 'nosotros', loadComponent: () => import ('./features/nosotros/nosotros')},
  { path: 'contacto', loadComponent: () => import ('./features/contacto/contacto')},
  { path: 'order/:id', loadComponent: () => import ('./features/order/order-detail/order-detail')},
  { path: 'products/modal', loadComponent: () => import ('./features/products/products-modal/products-modal')},
  { path: 'user/detail', loadComponent: () => import('./features/dashboard-user/dashboard-user') },

  
    //Listado de componentes
    { path: 'dashboard/order/list', loadComponent: () => import ('./features/order/order-list/order-list')},
    { path: 'dashboard/user/list', canActivate: [authGuard], loadComponent: () => import('./features/users/user-list/user-list')},
    { path: 'dashboard/contact/list', loadComponent:() => import('./features/contact/contact-list/contact-list')},
    { path: 'dashboard/category/list', canActivate: [authGuard], loadComponent: () => import('./features/category/category-list/category-list')},
    { path: 'dashboard/material/list', canActivate: [authGuard], loadComponent: () => import('./features/material/material-list/material-list')},
    { path: 'dashboard/product/list', canActivate: [authGuard], loadComponent: () => import ('./features/products/products-list/products-list')},
    
    //Creacion de componenetes
    { path: 'dashboard/user/new/form', canActivate: [authGuard], loadComponent: () => import('./features/users/user-new-form/user-new-form')},
    { path: 'dashboard/contact/new/form', canActivate: [authGuard], loadComponent: () => import('./features/contact/contact-new-form/contact-new-form')},
    { path: 'dashboard/category/new/form', canActivate: [authGuard] ,loadComponent: () => import('./features/category/category-new-form/category-new-form')},
    { path: 'dashboard/material/new/form', canActivate: [authGuard], loadComponent: () => import('./features/material/material-new-form/material-new-form')},
    { path: 'dashboard/product-new', canActivate: [authGuard], loadComponent: () => import ('./features/products/products-new-form/products-new-form')},
    
    //edicion de componenetes
    { path: 'dashboard/product/edit/:id', canActivate: [authGuard], loadComponent: () => import ('./features/products/products-edit-form/products-edit-form')},
    { path: 'dashboard/user/edit/form/:id', canActivate: [authGuard], loadComponent: () => import('./features/users/user-edit-form/user-edit-form')},
    { path: 'dashboard/contact/edit/form/:id', loadComponent:() => import('./features/contact/contact-edit-form/contact-edit-form')},
    { path: 'dashboard/category/edit/form/:id', canActivate: [authGuard], loadComponent: () => import('./features/category/category-edit-form/category-edit-form')},
    { path: 'dashboard/material/edit/form/:id', canActivate: [authGuard], loadComponent: () => import('./features/material/material-edit-form/material-edit-form')},

    { path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
    { path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];


