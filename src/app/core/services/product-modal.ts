import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class ProductModal {
    public selectedProduct$ = new BehaviorSubject<any>(null);

  open(product: any): void {
    this.selectedProduct$.next(product);
  }

  close(): void {
    this.selectedProduct$.next(null);
  }
}
