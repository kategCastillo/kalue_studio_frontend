import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class HttpProducts {
    private http = inject (HttpClient)
    serverHostUrl: string = environment.serverHostUrl; // URL del servidor para las imágenes


    BASE_URL: string = environment.apiUrl;
    createProduct (newProduct:any) {
        return this.http.post(`${this.BASE_URL}/products`, newProduct);
    }
    
    getProduct(): Observable<any> {
    console.log(`${this.BASE_URL}/products`)
    return this.http.get(`${this.BASE_URL}/products`);
    
    }

    getProductById (id: string | any) {
        return this.http.get<any>(`${this.BASE_URL}/products/${id}`);
    }

    deleteProductById (id: string | null){
        return this.http.delete(`${this.BASE_URL}/products/${id}`);
    }

    updateProductById (id:string | null, updateProduct: any){
        return this.http.patch(`${this.BASE_URL}/products/${id}`,updateProduct);
    }

    getMainImageUrl( product: any ): string {
        if ( !product || product.images && product.images.length === 0 ) {
        return 'assets/images/default-product.jpg'; // Ruta de la imagen por defecto
        }
    
        const mainImage = product.images.find((img: any) => img.isMain || product.images[0]);
        return `${this.serverHostUrl}${mainImage.url.startsWith('/') ? mainImage.url.slice(1) : mainImage.url}`; // Ruta de la imagen por defecto
    }


}
