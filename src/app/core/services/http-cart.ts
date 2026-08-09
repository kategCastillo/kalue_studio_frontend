import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpCart {
  private http = inject(HttpClient);
  private httpAuth = inject(HttpAuth);
  BASE_URL: any = environment.apiUrl;

  // Carrito compartido en toda la app (header, carrito, product-card, etc.)
  // Cualquier componente puede suscribirse a cart$ para enterarse de cambios.
  public cart$ = new BehaviorSubject<any>(null);

  private getHeader(): any {
    const token = this.httpAuth.token;

    return new HttpHeaders({
      'X-Token': token || '',
      'Content-Type': 'application/json'
    });
  }

  // Trae (o crea) el carrito del usuario logueado -> GET /cart/me
  getMyCart() {
    return this.http.get<any>(`${this.BASE_URL}/cart/me`, { headers: this.getHeader() });

  }

  // quantity es un DELTA: positivo suma, negativo resta -> PATCH /cart/me
  updateMyCart(productId: any, quantity: any) {
    return this.http.patch<any>(`${this.BASE_URL}/cart/me`, { productId, quantity }, { headers: this.getHeader() });
  }

  // Elimina un producto del carrito por completo -> DELETE /cart/me/items/:productId
  removeCartItem(productId: any) {
    return this.http.delete<any>(`${this.BASE_URL}/cart/me/items/${productId}`, { headers: this.getHeader() });
  }

  // Vacía el carrito completo -> DELETE /cart/me
  clearCart() {
    return this.http.delete<any>(`${this.BASE_URL}/cart/me`, { headers: this.getHeader() });
  }

  // Vuelve a pedir el carrito al backend y actualiza cart$, para que el
  // header (y cualquier otro componente suscrito) se refresque solo.
  refreshCart(): void {
    this.getMyCart().subscribe({
      next: (res: any) => this.cart$.next(res.data),
      error: (err: any) => console.error(err)
    });
  }
}
