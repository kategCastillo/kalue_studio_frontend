import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAuth } from './http-auth';

@Service()
export class HttpMaterials {
  private http = inject(HttpClient);
  BASE_URL: string = environment.apiUrl;
  private httpAuth = inject(HttpAuth);

  private getHeader(): HttpHeaders {
    const token = this.httpAuth.token;

    return new HttpHeaders({
      'X-Token': token || '',
      'Content-Type': 'application/json',
    });
  }

  getMaterials() {
    return this.http.get<any>(`${this.BASE_URL}/material`, { headers: this.getHeader() });
  }

  getMaterialById(id: string | any) {
    return this.http.get<any>(`${this.BASE_URL}/material/${id}`, { headers: this.getHeader() });
  }

  createMaterial(newMaterial: any) {
    return this.http.post(`${this.BASE_URL}/material`, newMaterial, { headers: this.getHeader() });
  }

  deleteMaterial(id: string) {
    return this.http.delete(`${this.BASE_URL}/material/${id}`, { headers: this.getHeader() });
  }

  updateMaterialById(id: string, updatedMaterial: any) {
    return this.http.patch(`${this.BASE_URL}/material/${id}`, updatedMaterial, {
      headers: this.getHeader(),
    });
  }
}
