import { Component, inject } from '@angular/core';
import { HttpUsers } from '../../core/services/http-users';
import { HttpCategories } from '../../core/services/http-categories';
import { HttpMaterials } from '../../core/services/http-materials';
import { HttpProducts } from '../../core/services/http-products';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resume-dashboard',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './resume-dashboard.html',
  styleUrl: './resume-dashboard.css',
})
export default class ResumeDashboard {
    // TODO: reemplazar con datos reales desde los servicios http-users, http-categories,
  // http-materials y http-contacts (por ejemplo con un forkJoin en el constructor/ngOnInit).
  private httpUsers = inject(HttpUsers);
  private httpCategories = inject(HttpCategories);
  private httpMaterials = inject(HttpMaterials);
  private httpProducts = inject(HttpProducts);

  private users$ = new BehaviorSubject<any>([]);
  public users = this.users$.asObservable();

  private categories$ = new BehaviorSubject<any>([]);
  public categories = this.categories$.asObservable();

  private materials$ = new BehaviorSubject<any>([]);
  public materials = this.materials$.asObservable();

  private products$ = new BehaviorSubject<any>([]);
  public products = this.products$.asObservable();

  private loadUsers (){
    this.httpUsers.getUsers().subscribe({
      next: (data) => {
        this.users$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {}
    })
  }

  private loadCategories () {
    this.httpCategories.getCategories().subscribe({
      next: (data) => {
        this.categories$.next(data.data)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private loadMaterials () {
    this.httpMaterials.getMaterials().subscribe({
      next: (data) => {
        this.materials$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {}
    })
  }

  private loadProducts () {
    this.httpProducts.getProduct().subscribe({
      next: (data) => {
        this.products$.next(data.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {}
    })
  }

  ngOnInit () {
    this.loadUsers();
    this.loadCategories();
    this.loadMaterials();
    this.loadProducts();
  }

  recentActivity: { text: string; time: string }[] = [];
}
