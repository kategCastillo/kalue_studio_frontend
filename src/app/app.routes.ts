import { Routes } from '@angular/router';


export const routes: Routes = [
  {path: 'coleccion', loadComponent: () => import ('./pages/coleccion/coleccion').then ( m => m.Coleccion)},

  {path: 'productos', loadComponent: () => import ('./pages/productos/productos')},

  {path: 'nosotros', loadComponent: () => import ('./pages/nosotros/nosotros').then (m => m.Nosotros)},

  {path: 'contacto', loadComponent: () => import ('./pages/contacto/contacto').then (m => m.Contacto)},

  {path: 'product-new',loadComponent: () => import ('./feature/products/products-new-form/products-new-form')},
  
  {path: 'product/list', loadComponent: () => import ('./feature/products/products-list/products-list')},

  {path: '' , redirectTo: 'coleccion', pathMatch: 'full'},
  {path: '**', redirectTo: 'coleccion', pathMatch: 'full' }
];