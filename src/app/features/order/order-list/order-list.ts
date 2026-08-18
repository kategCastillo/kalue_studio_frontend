import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { HttpOrderTs } from '../../../core/services/http-order';
import { BehaviorSubject } from 'rxjs';
import { OrderModal } from '../../../core/services/order-modal';
import OrderModalComponent from '../order-modal/order-modal';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, AsyncPipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export default class OrderList implements OnInit {

  private httpOrder = inject(HttpOrderTs);
  private router = inject(Router);
  private orderModal = inject(OrderModal);
 

  public faEye = faEye;
  public orders = new BehaviorSubject<any>([]);

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.httpOrder.getAllOrders().subscribe({
      next: (res) => this.orders.next(res.data),
      error:(error) => console.error('Error al cargar errores:', error)
    
    });
  }

  verOrden(orderId: string): void {
    this.httpOrder.getOrderById(orderId).subscribe({
      next: (res) => this.orderModal.open(res.data),
      error: (error) => console.error('Error al cargar el detalle de la orden',error)
    });
  }
}