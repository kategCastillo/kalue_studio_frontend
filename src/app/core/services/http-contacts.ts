import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpAuth } from './http-auth';

@Service()
export class HttpContacts {
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

  // Todos los contactos (vista de administrador)
  getContacts() {
    return this.http.get<any>(`${this.BASE_URL}/contacts`, { headers: this.getHeader() });
  }

  // Contactos de un usuario en concreto
  getContactsByUser(userId: string) {
    return this.http.get<any>(`${this.BASE_URL}/contacts/user/${userId}`, { headers: this.getHeader() });
  }

  getContactById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/contacts/${id}`, { headers: this.getHeader() });
  }

  createContact(newContact: any) {
    return this.http.post(`${this.BASE_URL}/contacts`, newContact, { headers: this.getHeader() });
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.BASE_URL}/contacts/${id}`, { headers: this.getHeader() });
  }

  updateContactById(id: string, updatedContact: any) {
    return this.http.patch(`${this.BASE_URL}/contacts/${id}`, updatedContact, { headers: this.getHeader() });
  }
}
