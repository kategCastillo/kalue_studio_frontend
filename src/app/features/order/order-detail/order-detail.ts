
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpOrderTs } from '../../../core/services/http-order';
import { faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-Order-list',
  imports: [FontAwesomeModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export default class OrderList {
  private httpOrder = inject(HttpOrderTs);
  private router = inject(Router);

  public faEye = faEye;
  public orders: any[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.httpOrder.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
      },
      error: (error: any) => {
        console.error(error);
        this.orders = [];
      }
    });
  }

  verOrden(orderId: string): void {
    this.router.navigate(['/order', orderId]);
  }
}

