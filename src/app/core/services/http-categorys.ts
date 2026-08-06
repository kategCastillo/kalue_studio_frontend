import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class HttpCategorys {
    private http = inject (HttpClient)

    getCategorys () {
        return this.http.get <any> ('http://localhost:3000/api/category')
    }


}
