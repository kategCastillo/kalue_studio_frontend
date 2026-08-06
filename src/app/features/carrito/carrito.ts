import { Component, inject } from '@angular/core';
import { CardItemsCarrito } from "../../shared/components/card-items-carrito/card-items-carrito";
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruck, faRotateLeft, faCreditCard, faShield, faShieldCat, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-carrito',
  imports: [CardItemsCarrito, AsyncPipe, FontAwesomeModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export default class Carrito {
  private httpProducts = inject(HttpProducts);
  public listProduct$ = new BehaviorSubject<any>([]);

  //FONTAWESOME
  public faTruck = faTruck;
  public faRotateLeft = faRotateLeft;
  public faCreditCard = faCreditCard;
  public faShield = faShield;
  public faShieldCat = faShieldCat;
  public faArrowRigth = faArrowRight;

  private loadProducts () {
    this.httpProducts.getProduct().subscribe({
      next: (data) => {
        this.listProduct$.next(data.data);
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }

  ngOnInit (){
    this.loadProducts();
  }

}
