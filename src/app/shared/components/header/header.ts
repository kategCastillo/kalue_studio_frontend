import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
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
  public isMobileMenuOpen = false;

  public httpAuth = inject(HttpAuth);
  public httpCart = inject(HttpCart);
  private router = inject(Router);

  ngOnInit(): void {
    // Si ya hay sesión, precargamos el carrito para que el badge no arranque en 0 falso.
    if (this.httpAuth.isLoggedIn()) {
      this.loadCounter();
    }
  }

  loadCounter() {
    this.httpCart.cart.subscribe({
      next: (res) => {
        this.counter.next(res?.items.length || 0);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
  }

  logout(): void {
    this.httpAuth.logoutUser();
    this.closeMobileMenu();
    this.router.navigateByUrl('/login');
  }
}