import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class HttpProducts {
    private http = inject (HttpClient)


    createProduct (newProduct:any) {
        return this.http.post ('http://localhost:3000/api/products', newProduct)
    }

    getProduct () {
        //observable (HttpClient)
       return this.http.get<any>('http://localhost:3000/api/products')
    }


}
