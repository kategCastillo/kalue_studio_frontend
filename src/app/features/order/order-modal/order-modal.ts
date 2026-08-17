import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { OrderModal } from '../../../core/services/order-modal';

@Component({
  selector: 'app-order-modal',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, NgClass],
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
})
export default class OrderModalComponent {
  private orderModalService = inject (OrderModal);
  public selectedOrder$ = this.orderModalService.selectedOrder$;

  cerrar(): void {
    this.orderModalService.close();
  }
}
