import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class HttpCategorys {
    private http = inject (HttpClient)

    BASE_URL: string = environment.apiUrl;
    
    getCategorys () {
        return this.http.get <any> (`${this.BASE_URL}/category`)
    }


}
