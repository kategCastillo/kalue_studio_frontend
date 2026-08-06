import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faMinus } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-card-items-carrito',
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './card-items-carrito.html',
  styleUrl: './card-items-carrito.css',
})
export class CardItemsCarrito {
  @Input() product:any;
  public count: number = 0;
  
  //FONTAWESOME
  public faPlus = faPlus;
  public faTrash = faTrash;
  public faMinus = faMinus;

  increment(){
    this.count++;
  }

  decrement(){
    this.count--;
  }
}
