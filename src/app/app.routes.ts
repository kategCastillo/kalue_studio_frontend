import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
  { path: 'login', loadComponent: () => import('./features/auth/login/login') },
  { path: 'registro', loadComponent: () => import('./features/auth/register/register') },
  { path: 'dashboard', loadComponent:() => import('./features/dashboard/dashboard')},
  { path: 'coleccion', loadComponent: () => import ('./features/coleccion/coleccion')},
  { path: 'productos', loadComponent: () => import ('./features/productos/productos')},
  { path: 'nosotros', loadComponent: () => import ('./features/nosotros/nosotros')},
  { path: 'contacto', loadComponent: () => import ('./features/contacto/contacto')},
  { path: 'order/:id', loadComponent: () => import ('./features/order/order-detail/order-detail')},
  { path: 'user/detail', loadComponent: () => import('./features/dashboard-user/dashboard-user') },

  
    //Listado de componentes
    { path: 'dashboard/order/list', loadComponent: () => import ('./features/order/order-list/order-list')},
    { path: 'dashboard/product-new',loadComponent: () => import ('./features/products/products-new-form/products-new-form')},
    { path: 'dashboard/user/list', loadComponent: () => import('./features/users/user-list/user-list')},
    { path: 'dashboard/contact/list', loadComponent:() => import('./features/contact/contact-list/contact-list')},
    { path: 'dashboard/category/list', loadComponent: () => import('./features/category/category-list/category-list')},
    { path: 'dashboard/material/list', loadComponent: () => import('./features/material/material-list/material-list')},
    { path: 'dashboard/product/list', loadComponent: () => import ('./features/products/products-list/products-list')},
    
    //Creacion de componenetes
    { path: 'dashboard/user/new/form', loadComponent: () => import('./features/users/user-new-form/user-new-form')},
    { path: 'dashboard/contact/new/form', loadComponent: () => import('./features/contact/contact-new-form/contact-new-form')},
    { path: 'dashboard/category/new/form', loadComponent: () => import('./features/category/category-new-form/category-new-form')},
    { path: 'dashboard/material/new/form', loadComponent: () => import('./features/material/material-new-form/material-new-form')},
    
    //edicion de componenetes
    { path: 'dashboard/product/edit/:id', loadComponent: () => import ('./features/products/products-edit-form/products-edit-form')},
    { path: 'dashboard/user/edit/form/:id', loadComponent: () => import('./features/users/user-edit-form/user-edit-form')},
    { path: 'dashboard/contact/edit/form/:id', loadComponent:() => import('./features/contact/contact-edit-form/contact-edit-form')},
    { path: 'dashboard/category/edit/form/:id', loadComponent: () => import('./features/category/category-edit-form/category-edit-form')},
    { path: 'dashboard/material/edit/form/:id', loadComponent: () => import('./features/material/material-edit-form/material-edit-form')},

    { path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
    { path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];
