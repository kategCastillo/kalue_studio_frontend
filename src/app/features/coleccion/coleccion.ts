import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-coleccion',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './coleccion.html',
  styleUrl: './coleccion.css',
})
export default class Coleccion {
  private httpProducts = inject (HttpProducts)
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
}




