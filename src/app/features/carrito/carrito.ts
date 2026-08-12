import { Component, inject } from '@angular/core';
import { CardItemsCarrito } from "../../shared/components/card-items-carrito/card-items-carrito";
import { HttpCart } from '../../core/services/http-cart';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruck, faRotateLeft, faCreditCard, faShield, faShieldCat, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { HttpContacts } from '../../core/services/http-contacts';
import { HttpOrderTs } from '../../core/services/http-order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  imports: [CardItemsCarrito, CurrencyPipe, FontAwesomeModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export default class Carrito {
  private httpCart = inject(HttpCart);
  private httpContacts = inject(HttpContacts);
  private httpOrder = inject(HttpOrderTs);

  // Ya NO creamos un BehaviorSubject propio. Reusamos el del servicio
  // (el mismo que lee el header para el badge) para que exista una única
  // fuente de verdad y ambos queden siempre sincronizados.
  public cart$ = this.httpCart.cart$;
  private contacts$ = new BehaviorSubject<any>('');

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
    this.getContactdefault();
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

  getContactdefault(){
    this.httpContacts.getContacts().subscribe({
      next: (res) => {
        for ( const isDefault of res.data){
          if(isDefault.isDefault){
            console.log(isDefault);
            this.contacts$.next(isDefault._id);

            console.log(this.contacts$.getValue());
          }
        } 
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }

  order(){
    const mailingAddress = this.contacts$.getValue();

    const items: any = this.items.map( (item : any) => ({ productID: item.productId._id , quantity: item.quantity}));

    const order = {
      status: 'enviado',
      products: items,
      mailingAddress,
      subtotal: this.getSubtotal(),
      total: this.getTotal(),
      paymentMethod: 'tarjeta',
      paymentStatus: 'aprobado',
      paymentReference: 'A#B156',
      notes: 'Dejar en porteria'
    }

    console.log(order)

    this.httpOrder.createOrder(order).subscribe({
      next: (res) => {
        console.log(res);

        Swal.fire({
        title: '¡Pedido confirmado!',
        text: 'Tu compra se ha procesado con éxito.',
        icon: 'success',
        draggable: true
      });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
        title: 'Algo salió mal',
        text: error.error?.msg || 'No pudimos procesar tu pedido, intenta de nuevo.',
        icon: 'error'
      });
      },
      complete: () => {}
    })
  }
}