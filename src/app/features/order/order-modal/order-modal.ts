import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass, SlicePipe } from '@angular/common';
import { OrderModal } from '../../../core/services/order-modal';

interface PasoTimeline {
  key: string;
  label: string;
  activo: boolean;
}

@Component({
  selector: 'app-order-modal',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, NgClass, SlicePipe],
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
})
export default class OrderModalComponent {
  private orderModalService = inject(OrderModal);
  public selectedOrder$ = this.orderModalService.selectedOrder$;

  private readonly SECUENCIA = ['pendiente', 'pagado', 'en preparacion', 'enviado', 'entregado'];

  private readonly ETIQUETAS: Record<string, string> = {
    'pendiente': 'Pendiente',
    'pagado': 'Pagado',
    'en preparacion': 'En preparación',
    'enviado': 'Enviado',
    'entregado': 'Entregado',
  };

  cerrar(): void {
    this.orderModalService.close();
  }

  // Devuelve cada paso con activo=true si ya fue alcanzado según el
  // estado actual de la orden.
  getPasos(status: string): PasoTimeline[] {
    const indiceActual = this.SECUENCIA.indexOf(status);

    return this.SECUENCIA.map((step, index) => ({
      key: step,
      label: this.ETIQUETAS[step],
      activo: indiceActual >= 0 && index <= indiceActual,
    }));
  }
}