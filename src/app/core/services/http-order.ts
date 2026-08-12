import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { HttpAuth } from './http-auth';
import { environment } from '../../../environments/environment';

@Service()
export class HttpOrderTs {
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

     createOrder (order:any) {
        return this.http.post<any>(`${this.BASE_URL}/orders`,order,{ headers: this.getHeader() } )
     }
}


