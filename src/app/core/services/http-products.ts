import { HttpClient } from '@angular/common/http';
import { inject, Inject, Service } from '@angular/core';

@Service()
export class HttpProducts {

    private http = inject(HttpClient);
    
    getUsers() {
        return this.http.get('http://localhost:3000/api/users');
    }

}
