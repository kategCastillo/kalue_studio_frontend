import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Service()
export class HttpContacts {

    private http = inject(HttpClient);
    BASE_URL: string = environment.apiUrl;

    // Todos los contactos (vista de administrador)
    getContacts() {
        return this.http.get<any>(`${this.BASE_URL}/contacts`);
    }

    // Contactos de un usuario en concreto
    getContactsByUser(userId: string) {
        return this.http.get<any>(`${this.BASE_URL}/contacts/user/${userId}`);
    }

    getContactById(id: string | any) {
        return this.http.get<any>(`${this.BASE_URL}/contacts/${id}`);
    }

    createContact(newContact: any) {
        return this.http.post(`${this.BASE_URL}/contacts`, newContact);
    }

    deleteContact(id: string) {
        return this.http.delete(`${this.BASE_URL}/contacts/${id}`);
    }

    updateContactById(id: string, updatedContact: any) {
        return this.http.patch(`${this.BASE_URL}/contacts/${id}`, updatedContact);
    }

}
