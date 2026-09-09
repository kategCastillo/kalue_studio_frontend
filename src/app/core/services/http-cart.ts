import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpCart {
  private http = inject(HttpClient);
  BASE_URL: any = environment.apiUrl;

  // Carrito compartido en toda la app (header, carrito, product-card, etc.)
  // Cualquier componente puede suscribirse a cart$ para enterarse de cambios.
  public cart$ = new BehaviorSubject<any>(null);
  public cart = this.cart$.asObservable();

  // Trae (o crea) el carrito del usuario logueado -> GET /cart/me
  getMyCart() {
    return this.http.get<any>(`${this.BASE_URL}/cart/me`).pipe(
      map((res) => res.data),
      tap((res) => {
        // Antes: "this.cart = res" — sobrescribía la propiedad que debía ser
        // el Observable, dejándola como un objeto plano y rompiendo a todo
        // el que se suscribiera después. Se actualiza el Subject, no la
        // propiedad derivada.
        this.cart$.next(res);
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  // quantity es un DELTA: positivo suma, negativo resta -> PATCH /cart/me
  updateMyCart(productId: any, quantity: any) {
    return this.http.patch<any>(`${this.BASE_URL}/cart/me`, { productId, quantity }).pipe(
      tap((res) => {
        // Antes: nunca se avisaba al resto de la app (header, carrito) que
        // el carrito había cambiado. Ahora cualquier suscriptor de cart$
        // se entera al instante, sin importar desde qué página se agregó.
        if (res?.data) {
          this.cart$.next(res.data);
        }
      }),
    );
  }

  // Elimina un producto del carrito por completo -> DELETE /cart/me/items/:productId
  removeCartItem(productId: any) {
    return this.http.delete<any>(`${this.BASE_URL}/cart/me/items/${productId}`).pipe(
      tap((res: any) => {
        if (res?.data) {
          this.cart$.next(res.data);
        }
      }),
    );
  }

  // Vacía el carrito completo -> DELETE /cart/me
  clearCart() {
    return this.http.delete<any>(`${this.BASE_URL}/cart/me`).pipe(
      tap(() => {
        this.cart$.next({ items: [] });
      }),
    );
  }
}