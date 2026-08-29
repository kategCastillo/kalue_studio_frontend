import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public httpAuth = inject(HttpAuth);
  private router = inject(Router);

  /** Controla si el menú móvil está desplegado. En escritorio no se usa. */
  isMobileOpen = signal(false);

  constructor() {
    // Cierra el menú móvil automáticamente al navegar a otra sección.
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.isMobileOpen.set(false));
  }

  toggleMobileMenu(): void {
    this.isMobileOpen.update((value) => !value);
  }

  closeMobileMenu(): void {
    this.isMobileOpen.set(false);
  }

  // Si el usuario redimensiona a escritorio con el menú abierto, lo cerramos.
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 960 && this.isMobileOpen()) {
      this.isMobileOpen.set(false);
    }
  }

  logout(): void {
    this.httpAuth.logoutUser();
  }
}