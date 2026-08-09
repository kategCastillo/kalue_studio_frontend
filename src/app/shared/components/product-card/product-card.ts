import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { HttpCart } from '../../../core/services/http-cart';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any;

  public count: any = 0;
  public adding: any = false; // deshabilita el botón mientras la petición está en curso

  private httpCart = inject(HttpCart);
  private httpAuth = inject(HttpAuth);

  addCart() {
    if (!this.httpAuth.isLoggedIn()) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    if (this.count <= 0) {
      alert('Selecciona al menos 1 unidad para agregar al carrito');
      return;
    }

    this.adding = true;

    // quantity aquí es la cantidad a SUMAR (delta), tal como lo espera PATCH /cart/me
    this.httpCart.updateMyCart(this.product._id, this.count).subscribe({
      next: () => {
        this.httpCart.refreshCart(); // avisa al header (badge) y a quien esté suscrito
        this.count = 0;
        this.adding = false;
      },
      error: (error: any) => {
        console.error(error);
        alert(error.error?.msg || 'No se pudo agregar el producto al carrito');
        this.adding = false;
      }
    });
  }

  increment() {
    if (this.count < this.product.stock) {
      this.count++;
    }
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
    }
  }
}
