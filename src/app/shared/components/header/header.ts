import { AsyncPipe, SlicePipe } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { HttpAuth } from '../../../core/services/http-auth';
import { HttpCart } from '../../../core/services/http-cart';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, SlicePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public counter = new BehaviorSubject<number|null>(0);
  public isMobileMenuOpen = false;

  public httpAuth = inject(HttpAuth);
  public httpCart = inject(HttpCart);
  private router = inject(Router);

  private serverHostUrl: string = environment.serverHostUrl;

  ngOnInit(): void {
    // Nos suscribimos siempre a cart$: como ahora es el único punto que
    // emite (getMyCart/updateMyCart/removeCartItem/clearCart), el badge
    // se mantiene sincronizado sin importar desde qué página se modificó
    // el carrito.
    this.httpCart.cart.subscribe({
      next: (res) => {
        this.counter.next(res?.items?.length || 0);
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Si ya hay sesión, pedimos el carrito una vez al iniciar para que el
    // badge arranque con el valor real (antes dependía de que otra página
    // ya hubiera llamado a getMyCart()).
    if (this.httpAuth.isLoggedIn()) {
      this.loadCounter();
    }
  }

  loadCounter() {
    this.httpCart.getMyCart().subscribe({
      error: (err) => {
        console.error(err);
      }
    });
  }

  /**
   * Construye la URL pública absoluta del avatar (host del backend + ruta),
   * evitando el bug de slash faltante/doble. Devuelve null si no hay avatar,
   * para que el template pueda caer al fallback de iniciales.
   */
  getAvatarUrl(avatarPath: string | null | undefined): string | null {
    if (!avatarPath) return null;

    const host = this.serverHostUrl.endsWith('/')
      ? this.serverHostUrl.slice(0, -1)
      : this.serverHostUrl;
    const cleanPath = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;

    return `${host}${cleanPath}`;
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

  // Iniciales del nombre para el avatar cuando el usuario no tiene foto cargada
  getInitials(name?: string): string {
    if (!name) return 'U';

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}