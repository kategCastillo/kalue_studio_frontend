import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map } from 'rxjs';
import { ResponseUsers } from '../models/Users';

@Service()
export class HttpUsers {

    private http = inject(HttpClient);
    
    getUsers() {
        return this.http.get<any>('http://localhost:3000/api/users')
    }

    getUserById(id: string | any ) {
        return this.http.get<any>(`http://localhost:3000/api/users/${id}`)
    }

    createUser(newUser:any){
        return this.http.post('http://localhost:3000/api/users', newUser);
    }

    deleteUser( id:string ){
        return this.http.delete(`http://localhost:3000/api/users/${id}`);
    }

    updateUserById( id:string, updatedUser: any ){
        return this.http.patch(`http://localhost:3000/api/users/${id}`, updatedUser);
    }
}
