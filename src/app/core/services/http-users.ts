import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map } from 'rxjs';
import { ResponseUsers } from '../models/Users';

@Service()
export class HttpUsers {

    private http = inject(HttpClient);
    
    getUsers() {
        return this.http.get<ResponseUsers>('http://localhost:3000/api/users').pipe( 
            map( ( res ) => { return res.data } )
        );
    }
}
