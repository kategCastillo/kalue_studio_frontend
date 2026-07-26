import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class HttpRegister {

    private http = inject(HttpClient);
    private BASE_URL: string = environment.apiUrl;

    register (newUser: any) {
        return this.http.post( `${this.BASE_URL}/auth/register`, newUser)
    }

}
