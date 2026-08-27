import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
    { path: 'login', loadComponent: () => import('./features/auth/login/login') },
    { path: 'registro', loadComponent: () => import('./features/auth/register/register') },
    { path: 'coleccion', loadComponent: () => import ('./features/coleccion/coleccion')},
    { path: 'productos', loadComponent: () => import ('./features/productos/productos')},
    { path: 'nosotros', loadComponent: () => import ('./features/nosotros/nosotros')},
    { path: 'contacto', loadComponent: () => import ('./features/contacto/contacto')},
    { path: 'order/:id', loadComponent: () => import ('./features/order/order-detail/order-detail')},
    { path: 'products/modal', loadComponent: () => import ('./features/products/products-modal/products-modal')},
    { path: 'user/detail', loadComponent: () => import('./features/dashboard-user/dashboard-user') },
    

    { path: 'dashboard',
      canActivate: [authGuard], 
      loadComponent:() => import('./features/dashboard/dashboard'),
      children: [
        //Listado de componentes
        { path: 'user/list', loadComponent: () => import('./features/users/user-list/user-list')},
        { path: 'category/list', loadComponent: () => import('./features/category/category-list/category-list')},
        { path: 'material/list', loadComponent: () => import('./features/material/material-list/material-list')},
        { path: 'product/list', loadComponent: () => import ('./features/products/products-list/products-list')},
        
        //Creacion de componenetes
        { path: 'user/new/form', loadComponent: () => import('./features/users/user-new-form/user-new-form')},
        { path: 'contact/new/form', loadComponent: () => import('./features/contact/contact-new-form/contact-new-form')},
        { path: 'category/new/form' ,loadComponent: () => import('./features/category/category-new-form/category-new-form')},
        { path: 'material/new/form', loadComponent: () => import('./features/material/material-new-form/material-new-form')},
        { path: 'product-new', loadComponent: () => import ('./features/products/products-new-form/products-new-form')},
        
        //edicion de componenetes
        { path: 'product/edit/:id', loadComponent: () => import ('./features/products/products-edit-form/products-edit-form')},
        { path: 'user/edit/form/:id', loadComponent: () => import('./features/users/user-edit-form/user-edit-form')},
        { path: 'category/edit/form/:id', loadComponent: () => import('./features/category/category-edit-form/category-edit-form')},
        { path: 'material/edit/form/:id',loadComponent: () => import('./features/material/material-edit-form/material-edit-form')},
      ]
    },
    
    { path: 'dashboard/order/list', loadComponent: () => import ('./features/order/order-list/order-list')},
    { path: 'dashboard/contact/list', loadComponent:() => import('./features/contact/contact-list/contact-list')},
    { path: 'dashboard/contact/edit/form/:id', loadComponent:() => import('./features/contact/contact-edit-form/contact-edit-form')},
    

    { path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
    { path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];


