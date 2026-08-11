import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [ProductCard, AsyncPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export default class Productos {
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
