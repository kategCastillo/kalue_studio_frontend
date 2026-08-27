import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { HttpAuth } from '../../../core/services/http-auth';
import { HttpCart } from '../../../core/services/http-cart';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public httpAuth = inject (HttpAuth);
  public httpCart = inject (HttpCart);
  private router = inject(Router);

  ngOnInit(): void {
    // Si ya hay sesión, precargamos el carrito para que el badge no arranque en 0 falso.
    if (this.httpAuth.isLoggedIn()) {
      this.httpCart.refreshCart();
    }
  }

  logout(): void {
    this.httpAuth.logoutUser(); 
    this.router.navigateByUrl( '/login' );
  }
}
