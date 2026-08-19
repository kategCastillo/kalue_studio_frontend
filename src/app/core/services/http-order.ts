import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { HttpAuth } from './http-auth';
import { environment } from '../../../environments/environment';

@Service()
export class HttpOrderTs {
    private http = inject (HttpClient);

    BASE_URL: string = environment.apiUrl;

    getAllOrders () {
        return this.http.get<any>(`${this.BASE_URL}/orders`)
    }

    getOrderById (id:string) {
        return this.http.get <any> (`${this.BASE_URL}/orders/${id}`)
    }

     createOrder (order:any) {
        return this.http.post<any>(`${this.BASE_URL}/orders`,order)
     }
}


