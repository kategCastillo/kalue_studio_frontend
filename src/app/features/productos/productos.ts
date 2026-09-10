import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import ProductsModal from '../products/products-modal/products-modal';
import { HttpCategories } from '../../core/services/http-categories';
import { HttpCart } from '../../core/services/http-cart';
import { HttpAuth } from '../../core/services/http-auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  imports: [ProductCard, AsyncPipe, ProductsModal],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export default class Productos {
  private httpProducts = inject(HttpProducts);
  private httpCategories = inject(HttpCategories);
  private httpCart = inject(HttpCart);
  private httpAuth = inject(HttpAuth);

  // Tipado estricto a arreglos para evitar problemas con async pipe
  public listProducts$ = new BehaviorSubject<any[]>([]);
  public listCategory$ = new BehaviorSubject<any[]>([]);

  @ViewChild('categoriasTrack') categoriasTrack?: ElementRef<HTMLElement>;

  scrollCategorias(direction: -1 | 1) {
    const track = this.categoriasTrack?.nativeElement;
    if (!track) return;
    const scrollAmount = track.clientWidth * 0.8 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  private loadProduct() {
    this.httpProducts.getProduct().subscribe({
      next: (res: any) => {
        console.log('Respuesta backend productos:', res);
        // Garantiza extraer un arreglo sin importar el formato enviado por la API
        const items = Array.isArray(res) ? res : (res?.data || []);
        this.listProducts$.next(items);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  private loadCategories() {
    this.httpCategories.getCategories().subscribe({
      next: (res: any) => {
        console.log('Respuesta backend categorías:', res);
        const items = Array.isArray(res) ? res : (res?.data || []);
        this.listCategory$.next(items);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

 addCart(item: any) {
  const { product, count } = item;

  if (!this.httpAuth.isLoggedIn()) {
    Swal.fire({
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para agregar productos al carrito.',
      icon: 'warning',
    });
    return;
  }

  this.httpCart.updateMyCart(product._id, count).subscribe({
    next: () => {
      Swal.fire({
        title: 'Producto añadido',
        text: `${product.name || 'El producto'} se agregó a tu carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    error: (error: any) => {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: error.error?.msg || 'No se pudo agregar el producto al carrito.',
        icon: 'error',
      });
    },
  });
}

  ngOnInit() {
    this.loadProduct();
    this.loadCategories();
  }
}