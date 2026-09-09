import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { HttpCart } from '../../core/services/http-cart';
import { HttpAuth } from '../../core/services/http-auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coleccion',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './coleccion.html',
  styleUrl: './coleccion.css',
})
export default class Coleccion {
  private httpProducts = inject (HttpProducts)
  private httpCart = inject(HttpCart);
  private httpAuth = inject(HttpAuth);

  public listProducts$ = new BehaviorSubject<any>([]) 

  private loadProduct () {
    this.httpProducts.getProduct().subscribe({
      next: (data) => {
        this.listProducts$.next(data.data)
      },

      error: (error) => {
        console.error(error)
      },

      complete: () => {}
    })
  }

  ngOnInit () {
    this.loadProduct()
  }

  addCart( item: any ) {
  const { product, count } = item;

  if (!this.httpAuth.isLoggedIn()) {
    Swal.fire({
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para agregar productos al carrito.',
      icon: 'warning',
    });
    return;
  }

  // quantity aquí es la cantidad a SUMAR (delta), tal como lo espera PATCH /cart/me
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

}