import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { HttpAuth } from '../../../core/services/http-auth';
import { HttpCart } from '../../../core/services/http-cart';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public counter = new BehaviorSubject<number|null>(0);


  public httpAuth = inject (HttpAuth);
  public httpCart = inject (HttpCart);
  private router = inject(Router);

  ngOnInit(): void {
    // Si ya hay sesión, precargamos el carrito para que el badge no arranque en 0 falso.
    if (this.httpAuth.isLoggedIn()) {
      this.loadCounter();
    }
  }

  loadCounter () {
    this.httpCart.cart.subscribe({
        next: ( res ) => {
          this.counter.next( res?.items.length || 0 );
        },
        error: ( err ) => {
          console.error( err );
        }
      })
  }

  logout(): void {
    this.httpAuth.logoutUser(); 
    this.router.navigateByUrl( '/login' );
  }
}
