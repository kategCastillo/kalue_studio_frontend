import { Component, inject } from '@angular/core';
import { CardItemsCarrito } from "../../shared/components/card-items-carrito/card-items-carrito";
import { HttpCart } from '../../core/services/http-cart';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruck, faRotateLeft, faCreditCard, faShield, faShieldCat, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { HttpContacts } from '../../core/services/http-contacts';
import { HttpOrderTs } from '../../core/services/http-order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  imports: [CardItemsCarrito, CurrencyPipe, FontAwesomeModule, RouterLink, AsyncPipe, JsonPipe],
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
  public shoppingCart = new BehaviorSubject<any[]>([]);

  // Evita doble-click / doble submit del boton "Pagar" mientras la orden
  // se esta procesando en el backend.
  public isProcessingOrder = false;

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
        this.httpCart.cart$.next(res);
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

    this.httpCart.cart.subscribe({
      next: ( res ) => {
        console.log( res );
        this.shoppingCart.next( res );
      },
      error: ( err ) => {
        console.log( err );
      }
    })
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

  decrementQuantity(event: any){
    this.httpCart.updateMyCart(event.productId, -1).subscribe({
      next: () => this.loadCart(),
      error: (error: any) => {
        console.error(error);
        alert(error.error?.msg || 'No se pudo actualizar el carrito');
      }
    });
  }

  incrementQuantity(event: any){
    this.httpCart.updateMyCart(event.productId, +1).subscribe({
      next: () => this.loadCart(),
      error: (error: any) => {
        console.error(error);
        alert(error.error?.msg || 'No se pudo actualizar el carrito');
      }
    });
  }
  
  //Se dispara cuando card-items-carrito emite la eliminación de un producto
  onRemove(productId: any) {
    // Item huerfano (sin productId valido): el backend ya lo autolimpia al
    // leer el carrito, asi que basta con volver a pedirlo.    
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
    if (this.isProcessingOrder || this.items.length === 0) {
      return;
    }
    
    const mailingAddress = this.contacts$.getValue();
    
    if (!mailingAddress) {
      Swal.fire({
        title: 'Falta una dirección de envío',
        text: 'Agrega una dirección de envío predeterminada antes de pagar.',
        icon: 'warning'
      });
      return;
    }
    
    // El backend es quien decide qué productos, cantidades, precios y total
    // corresponden a esta orden (los toma del carrito real del usuario en
    // el servidor). Desde el cliente solo enviamos lo que legítimamente
    // controla el comprador: la dirección, el método de pago y una nota.
    const checkoutData = {
      mailingAddress,
      paymentMethod: 'tarjeta',
      notes: 'Dejar en porteria'
    };

    this.isProcessingOrder = true;
    
    this.httpOrder.createOrder(checkoutData).subscribe({
      next: (res) => {
        // La orden ya vació el carrito en el servidor; sincronizamos el
        // estado local para que el header y esta vista lo reflejen.
        // this.loadCart();
        this.httpCart.cart$.next([]);
        this.isProcessingOrder = false;
        
        Swal.fire({
          title: '¡Pedido confirmado!',
          text: 'Tu compra se ha procesado con éxito.',
          icon: 'success',
          draggable: true
        });
      },
      error: (error) => {
        console.error(error);
        this.isProcessingOrder = false;

        Swal.fire({
          title: 'Algo salió mal',
          text: error.error?.msg || 'No pudimos procesar tu pedido, intenta de nuevo.',
          icon: 'error'
        });
        // Si el error fue por un producto ya no disponible (409), el
        // backend ya limpió ese item huérfano al leer el carrito; nos
        // aseguramos de reflejarlo aquí sin que el usuario tenga que
        // salir y volver a entrar al carrito.
      }
    })
  }
  
  // Getter de conveniencia para usar en el template sin repetir el optional-chaining.
  get items(): any {
    return this.cart$.getValue()?.items || [];
  }
}