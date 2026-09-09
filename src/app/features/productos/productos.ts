import { Component, inject } from '@angular/core';
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
  imports: [ProductCard, AsyncPipe, ProductsModal, CurrencyPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export default class Productos {
  private httpProducts = inject(HttpProducts);
  private httpCategories = inject(HttpCategories);
  private httpCart = inject(HttpCart);
  private httpAuth = inject(HttpAuth);
  public listProducts$ = new BehaviorSubject<any>([]);
  public listCategory$ = new BehaviorSubject<any>([]);

  private loadProduct() {
    this.httpProducts.getProduct().subscribe({
      next: (data) => {
        this.listProducts$.next(data.data);
      },

      error: (error) => {
        console.error(error);
      },

      complete: () => {},
    });
  }

  private loadCategories() {
    this.httpCategories.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.listCategory$.next(data.data);
      },

      error: (error) => {
        console.error(error);
      },
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