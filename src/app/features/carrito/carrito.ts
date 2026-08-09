import { Component, inject } from '@angular/core';
import { CardItemsCarrito } from "../../shared/components/card-items-carrito/card-items-carrito";
import { HttpCart } from '../../core/services/http-cart';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruck, faRotateLeft, faCreditCard, faShield, faShieldCat, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-carrito',
  imports: [CardItemsCarrito, CurrencyPipe, FontAwesomeModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export default class Carrito {
  private httpCart = inject(HttpCart);

  // Ya NO creamos un BehaviorSubject propio. Reusamos el del servicio
  // (el mismo que lee el header para el badge) para que exista una única
  // fuente de verdad y ambos queden siempre sincronizados.
  public cart$ = this.httpCart.cart$;

  //FONTAWESOME
  public faTruck = faTruck;
  public faRotateLeft = faRotateLeft;
  public faCreditCard = faCreditCard;
  public faShield = faShield;
  public faShieldCat = faShieldCat;
  public faArrowRigth = faArrowRight;

  private loadCart() {
    this.httpCart.getMyCart().subscribe({
      next: (res: any) => {
        this.httpCart.cart$.next(res.data);
      },
      error: (error: any) => {
        console.error(error);
        // Evita que el estado se quede "atascado" en null si la petición falla:
        // así el getter de abajo cae en items: [] de forma explícita y visible.
        this.httpCart.cart$.next({ items: [] });
      },
      complete: () => { }
    });
  }

  ngOnInit() {
    this.loadCart();
  }

  // Getter de conveniencia para usar en el template sin repetir el optional-chaining.
  get items(): any {
    return this.cart$.getValue()?.items || [];
  }

  getSubtotal(): any {
    return this.items.reduce((acc: any, item: any) => acc + (item.productId?.price || 0) * item.quantity, 0);
  }

  // Impuesto de ejemplo (8%). Ajusta el porcentaje si el negocio maneja otro valor.
  getTax(): any {
    return this.getSubtotal() * 0.08;
  }

  getTotal(): any {
    return this.getSubtotal() + this.getTax();
  }

  // Se dispara cuando card-items-carrito emite un cambio de cantidad (+1 / -1)
  onQuantityChange(event: any) {
    this.httpCart.updateMyCart(event.productId, event.delta).subscribe({
      next: () => this.loadCart(),
      error: (error: any) => {
        console.error(error);
        alert(error.error?.msg || 'No se pudo actualizar el carrito');
      }
    });
  }

  //Se dispara cuando card-items-carrito emite la eliminación de un producto
  onRemove(productId: any) {
    this.httpCart.removeCartItem(productId).subscribe({
      next: () => this.loadCart(),
      error: (error: any) => {
        console.error(error);
        alert(error.error?.msg || 'No se pudo eliminar el producto del carrito');
      }
    });
  }
}