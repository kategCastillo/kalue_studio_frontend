import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpProducts {
    private http = inject (HttpClient)

    BASE_URL: string = environment.apiUrl;
    createProduct (newProduct:any) {
        return this.http.post(`${this.BASE_URL}/products`, newProduct);
    }

    getProduct () {
        //observable (HttpClient)
       return this.http.get<any>(`${this.BASE_URL}products`);
    }

    getProductById (id: string | any) {
        return this.http.get<any>(`${this.BASE_URL}/products/${id}`);
    }

    deleteProductById (id: string | null){
        return this.http.delete(`${this.BASE_URL}/products/${id}`);
    }

    updateProductById (id:string | null, updateProduct: any){
        return this.http.patch(`${this.BASE_URL}/products/${id}`,updateProduct);
    }


}
