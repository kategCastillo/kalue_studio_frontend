import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpMaterials {
  private http = inject(HttpClient);
  BASE_URL: string = environment.apiUrl;

  getMaterials() {
    return this.http.get<any>(`${this.BASE_URL}/material`);
  }

  getMaterialById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/material/${id}`);
  }

  createMaterial(newMaterial: any) {
    return this.http.post(`${this.BASE_URL}/material`, newMaterial);
  }

  deleteMaterial(id: string) {
    return this.http.delete(`${this.BASE_URL}/material/${id}`);
  }

  updateMaterialById(id: string, updatedMaterial: any) {
    return this.http.patch(`${this.BASE_URL}/material/${id}`, updatedMaterial);
  }
}
