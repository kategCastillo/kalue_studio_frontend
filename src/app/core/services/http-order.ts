import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class HttpOrder {
    private http = inject (HttpClient)

    BASE_URL: string = environment.apiUrl;
    createOrder  (newOrder:any) {
        return this.http.post ('http://localhost:3000/api/Order', newOrder )
    }

    getOrder () {
        //observable (HttpClient)
       return this.http.get<any>(`http://localhost:3000/api/Order `)
    }

    getOrderById (id: string | any) {
        return this.http.get<any>(`${this.BASE_URL}/Order/${id}`)
    }

    deleteOrderById (id: string | null){
        return this.http.delete(`${this.BASE_URL}/Order/${id}`)
    }

    updateOrderById (id:string | null, updateOrder: any){
        return this.http.patch(`${this.BASE_URL}/Order/${id}`,updateOrder);
    }


}
