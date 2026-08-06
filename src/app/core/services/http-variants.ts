import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class HttpVariants{
    private http = inject (HttpClient)

    BASE_URL: string = environment.apiUrl;
    createVariants(newVariants:any) {
        return this.http.post ('http://localhost:3000/api/Variants', newVariants)
    }

    getVariants () {
        //observable (HttpClient)
       return this.http.get<any>(`http://localhost:3000/api/Variants`)
    }

    getVariantsById (id: string | any) {
        return this.http.get<any>(`${this.BASE_URL}/Variants/${id}`)
    }

    deleteVariantsById (id: string | null){
        return this.http.delete(`${this.BASE_URL}/Variants/${id}`)
    }

    updateVariantsById (id:string | null, updateVariants: any){
        return this.http.patch(`${this.BASE_URL}/Variants/${id}`,updateVariants);
    }


}
