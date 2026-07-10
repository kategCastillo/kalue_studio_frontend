import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class HttpMaterials {
    private http = inject (HttpClient)  

    getMaterials () {
        return this.http.get <any>('http://localhost:3000/api/materials')
    }
}
