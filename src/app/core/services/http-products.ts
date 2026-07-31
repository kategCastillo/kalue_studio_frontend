import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpProducts {
    private http = inject (HttpClient)
    private authHttp = inject (HttpAuth);

    //crear una cabecera y va a mantener dentro de ella el token
    private getHeader(): HttpHeaders{
    //obteniendo el token del getter del servicio de AuthHttp
        const token = this.authHttp.token
    //crea y retorna un header de angular con el token y el nombre de la propiedad especificado en Backend para recibir dicho valor
        return new HttpHeaders ({
            'X-Token': token ||'',
            'Content-Type': 'application/json'
        });
    }

    BASE_URL: string = environment.apiUrl;
    createProduct (newProduct:any) {
        return this.http.post('http://localhost:3000/api/products', newProduct, {headers: this.getHeader()});
    }

    getProduct () {
        //observable (HttpClient)
       return this.http.get<any>(`http://localhost:3000/api/products`, {headers: this.getHeader()});
    }

    getProductById (id: string | any) {
        return this.http.get<any>(`${this.BASE_URL}/products/${id}`, {headers: this.getHeader()});
    }

    deleteProductById (id: string | null){
        return this.http.delete(`${this.BASE_URL}/products/${id}`,{headers: this.getHeader()});
    }

    updateProductById (id:string | null, updateProduct: any){
        return this.http.patch(`${this.BASE_URL}/products/${id}`,updateProduct, {headers: this.getHeader()});
    }


}
