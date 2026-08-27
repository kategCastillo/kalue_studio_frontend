import { Component, inject } from '@angular/core';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import ProductsModal from "../products/products-modal/products-modal";
import { HttpCategories } from '../../core/services/http-categories';

@Component({
  selector: 'app-productos',
  imports: [ProductCard, AsyncPipe, ProductsModal, JsonPipe, CurrencyPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export default class Productos {
  private httpProducts = inject (HttpProducts)
  private httpCategories = inject (HttpCategories)
  public listProducts$ = new BehaviorSubject<any>([]) 
  public listCategory$ = new BehaviorSubject<any>([])

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

  private loadCategories (){
    this.httpCategories.getCategories().subscribe({
      next: (data) => {
        console.log (data)
        this.listCategory$.next(data.data)
      },

      error: (error) => {
        console.error(error)
      },
      

    })
  }

  ngOnInit () {
    this.loadProduct()
    this.loadCategories()
  }
}
