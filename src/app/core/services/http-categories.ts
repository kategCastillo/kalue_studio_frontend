import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpCategories {
  // http-categories.ts
  private http = inject(HttpClient);
  BASE_URL: string = environment.apiUrl;

  getCategories() {
    return this.http.get<any>(`${this.BASE_URL}/category`);
  }

  getCategoryById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/category/${id}`);
  }

  createCategory(newCategory: any) {
    return this.http.post(`${this.BASE_URL}/category`, newCategory );
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.BASE_URL}/category/${id}`);
  }

  updateCategoryById(id: string, updatedCategory: any) {
    return this.http.patch(`${this.BASE_URL}/category/${id}`, updatedCategory);
  }
}
