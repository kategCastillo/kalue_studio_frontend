import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-items-carrito',
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './card-items-carrito.html',
  styleUrl: './card-items-carrito.css',
})
export class CardItemsCarrito {
  // item = { _id, productId: { _id, name, price, images, category, stock, isActive }, quantity }
  // Así es exactamente como el backend devuelve cada item del carrito (populate en cart.service.js).
  @Input() item: any;

  // El componente no llama al backend directamente: solo avisa al padre (carrito.ts),
  // que es quien tiene la lógica de recarga y manejo de errores.
  @Output() incrementEm = new EventEmitter<any>();
  @Output() decrementEm = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  //FONTAWESOME
  public faPlus = faPlus;
  public faTrash = faTrash;
  public faMinus = faMinus;
  
  increment() {
    if (!this.item.productId) return;

    if (this.item.quantity < this.item.productId.stock) {
      this.item.quantity++
      this.incrementEm.emit({ productId: this.item.productId._id });
    }
  }

  decrement() {
    if (!this.item.productId) return;

    if (this.item.quantity > 0) {
      this.item.quantity--
      this.decrementEm.emit({ productId: this.item.productId._id });
    }
  }

  onRemove() {
    // Item huerfano (producto ya eliminado del catalogo): no hay productId
    // valido por el cual pedirle al backend que elimine. El backend ya se
    // autolimpia en el siguiente GET /cart/me, asi que aqui solo forzamos
    // ese refresco en el padre.
    if (!this.item.productId) {
      this.remove.emit(null);
      return;
    }

    this.remove.emit(this.item.productId._id);
  }
}