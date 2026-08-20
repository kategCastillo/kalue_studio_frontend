import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { AsyncPipe } from '@angular/common';
import { HttpCart } from '../../core/services/http-cart';
import { HttpAuth } from '../../core/services/http-auth';

@Component({
  selector: 'app-productos',
  imports: [ProductCard, AsyncPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export default class Productos {
  private httpProducts = inject (HttpProducts);
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

   addCart( item: any ) {
    const { product, count } = item;

    console.log({ product, count });

    if (!this.httpAuth.isLoggedIn()) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    // quantity aquí es la cantidad a SUMAR (delta), tal como lo espera PATCH /cart/me
    this.httpCart.updateMyCart(product._id, count).subscribe({
      next: ( data ) => {
        console.log( data );
      },
      error: (error: any) => {
        console.error(error);
        alert(error.error?.msg || 'No se pudo agregar el producto al carrito');
      }
    });
  }

  ngOnInit () {
    this.loadProduct()
  }
}
