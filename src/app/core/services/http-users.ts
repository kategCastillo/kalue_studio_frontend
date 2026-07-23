import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class HttpUsers {

    private http = inject(HttpClient);
    BASE_URL: string = environment.apiUrl;
    
    getUsers() {
        return this.http.get<any>(`${this.BASE_URL}/users`)
    }

    getUserById(id: string | any ) {
        return this.http.get<any>(`${this.BASE_URL}/users/${id}`)
    }

    createUser(newUser:any){
        return this.http.post(`${this.BASE_URL}/users`, newUser);
    }

    deleteUser( id:string ){
        return this.http.delete(`${this.BASE_URL}/users/${id}`);
    }

    updateUserById( id:string, updatedUser: any ){
        return this.http.patch(`${this.BASE_URL}/users/${id}`, updatedUser);
    }
}
