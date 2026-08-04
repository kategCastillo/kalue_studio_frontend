import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpCategories {
  // http-categories.ts
  private http = inject(HttpClient);
  BASE_URL: string = environment.apiUrl;
  private httpAuth = inject(HttpAuth);

  private getHeader() : HttpHeaders {

    const  token  = this.httpAuth.token;

    console.log(token)

    return new HttpHeaders ({
      'X-Token': token || '',
      'Content-Type': 'application/json'
    });
  }


  getCategories() {
    console.log({ headers: this.getHeader() })
    return this.http.get<any>(`${this.BASE_URL}/category`, { headers: this.getHeader() });
  }

  getCategoryById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/category/${id}`, { headers: this.getHeader() });
  }

  createCategory(newCategory: any) {
    return this.http.post(`${this.BASE_URL}/category`, newCategory , { headers: this.getHeader() });
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.BASE_URL}/category/${id}`, { headers: this.getHeader() });
  }

  updateCategoryById(id: string, updatedCategory: any) {
    return this.http.patch(`${this.BASE_URL}/category/${id}`, updatedCategory, { headers: this.getHeader() });
  }
}
