import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpUsers {
  private http = inject(HttpClient);
  BASE_URL: string = environment.apiUrl;
  private httpAuth = inject(HttpAuth);

  getUsers() {
    return this.http.get<any>(`${this.BASE_URL}/users`);
  }

  getUserById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/users/${id}`);
  }

  getUserByIdPublic(){
    return this.http.get<any>(`${this.BASE_URL}/users/details`)
  }

  updateUserSelf(updatedUser: any) {
    return this.http.patch<any>(`${this.BASE_URL}/users/details`, updatedUser);
  }

  createUser(newUser: any) {
    return this.http.post(`${this.BASE_URL}/users`, newUser);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }

  updateUserById(id: string, updatedUser: any) {
    return this.http.patch(`${this.BASE_URL}/users/${id}`, updatedUser);
  }
}

