import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    { path: 'carrito', loadComponent: () => import('./features/carrito/carrito') },
    { path: 'login', canActivate:[guestGuard] ,loadComponent: () => import('./features/auth/login/login') },
    { path: 'registro', canActivate:[guestGuard] ,loadComponent: () => import('./features/auth/register/register') },
    { path: 'coleccion', loadComponent: () => import ('./features/coleccion/coleccion')},
    { path: 'productos', loadComponent: () => import ('./features/productos/productos')},
    { path: 'nosotros', loadComponent: () => import ('./features/nosotros/nosotros')},
    { path: 'contacto', loadComponent: () => import ('./features/contacto/contacto')},
    { path: 'order/:id', loadComponent: () => import ('./features/order/order-detail/order-detail')},
    { path: 'products/modal', loadComponent: () => import ('./features/products/products-modal/products-modal')},
    { path: 'user/detail', loadComponent: () => import('./features/dashboard-user/dashboard-user') },
    

    { path: 'dashboard',
      canActivate: [authGuard, guestGuard], 
      loadComponent:() => import('./features/dashboard/dashboard'),
      children: [
        { path: 'user',
          children: [
            { path: 'list', loadComponent: () => import('./features/users/user-list/user-list')},
            { path: 'new/form', loadComponent: () => import('./features/users/user-new-form/user-new-form')},
            { path: 'edit/form/:id', loadComponent: () => import('./features/users/user-edit-form/user-edit-form')}
          ]
         },

         { path: 'category',
           loadChildren: () => import('./features/category/category.routes')
         },

         { path: 'material',
           children: [
            { path: 'list', loadComponent: () => import('./features/material/material-list/material-list')},
            { path: 'new/form', loadComponent: () => import('./features/material/material-new-form/material-new-form')},
            { path: 'edit/form/:id',loadComponent: () => import('./features/material/material-edit-form/material-edit-form')}
           ]
         },

         { path: 'product',
           children: [
            { path: 'list', loadComponent: () => import ('./features/products/products-list/products-list')},
            { path: 'new', loadComponent: () => import ('./features/products/products-new-form/products-new-form')},
            { path: 'edit/:id', loadComponent: () => import ('./features/products/products-edit-form/products-edit-form')}
           ]
         }
        ]
      },
      
    { path: 'dashboard/contact/new/form', loadComponent: () => import('./features/contact/contact-new-form/contact-new-form')},
    { path: 'dashboard/order/list', loadComponent: () => import ('./features/order/order-list/order-list')},
    { path: 'dashboard/contact/list', loadComponent:() => import('./features/contact/contact-list/contact-list')},
    { path: 'dashboard/contact/edit/form/:id', loadComponent:() => import('./features/contact/contact-edit-form/contact-edit-form')},
    

    { path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
    { path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];


