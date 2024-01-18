import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from './equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private baseUrl = 'http://localhost:8090/parameterization/equipment';

  constructor(private http: HttpClient) { }

  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.baseUrl);
  }
  createEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.baseUrl}`, equipment);
  }
  updateEquipment(equipmentKy: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.baseUrl}/${equipmentKy}`, equipment);
  }
  deleteEquipment(equipmentKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${equipmentKy}`, { observe: 'response' });
  }
  getEquipmentByNm(equipmentNm: string): Observable<Equipment> {
    const url = `${this.baseUrl}/EquipmentName/${equipmentNm}`;
    return this.http.get<Equipment>(url);
  }
  getEquipmentByKy(equipmentKy: number): Observable<Equipment> {
    const url = `${this.baseUrl}/${equipmentKy}`;
    return this.http.get<Equipment>(url);
  }
  getEquipmentNameByKey(equipmentKy: number): Observable<string> {
    const url = `${this.baseUrl}/${equipmentKy}/name`;
    return this.http.get(url, { responseType: 'text' });
  }
}
