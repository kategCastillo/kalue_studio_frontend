import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpUsers {
  private http = inject(HttpClient);
  BASE_URL: string = environment.apiUrl;
  private httpAuth = inject(HttpAuth);

  private getHeader(): HttpHeaders {
    const token = this.httpAuth.token;

    return new HttpHeaders({
      'X-Token': token || '',
      'Content-Type': 'application/json',
    });
  }

  getUsers() {
    return this.http.get<any>(`${this.BASE_URL}/users`, { headers: this.getHeader() });
  }

  getUserById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/users/${id}`, { headers: this.getHeader() });
  }

  createUser(newUser: any) {
    return this.http.post(`${this.BASE_URL}/users`, newUser, { headers: this.getHeader() });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.BASE_URL}/users/${id}`, { headers: this.getHeader() });
  }

  updateUserById(id: string, updatedUser: any) {
    return this.http.patch(`${this.BASE_URL}/users/${id}`, updatedUser, { headers: this.getHeader() });
  }
}
