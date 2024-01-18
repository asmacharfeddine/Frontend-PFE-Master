import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceArea } from './service-area.model';
import { ExploitationUnit } from '../exploitation-unit/exploitation-unit.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreaService {

  private baseUrl = 'http://localhost:8090/parameterization/serviceArea';

  constructor(private http: HttpClient) { }

  getAllServiceAreas(): Observable<ServiceArea[]> {
    return this.http.get<ServiceArea[]>(this.baseUrl);
  }
  createServiceArea(serviceArea: ServiceArea): Observable<ServiceArea> {
    return this.http.post<ServiceArea>(`${this.baseUrl}`, serviceArea);
  }
  updateServiceArea(servAreaKy: number, serviceArea: ServiceArea): Observable<ServiceArea> {
    return this.http.put<ServiceArea>(`${this.baseUrl}/${servAreaKy}`, serviceArea);
  }
  deleteServiceArea(servAreaKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${servAreaKy}`, { observe: 'response' });
  }
  getServiceAreaByServiceAreaNm(servAreaNm: string): Observable<ServiceArea> {
    const url = `${this.baseUrl}/ServiceAreaName/${servAreaNm}`;
    return this.http.get<ServiceArea>(url);
  }
  getServiceAreaByKy(servAreaKy: number): Observable<ServiceArea> {
    const url = `${this.baseUrl}/${servAreaKy}`;
    return this.http.get<ServiceArea>(url);
  }
  getServiceAreaNameByKey(servAreaKy: number): Observable<string> {
    const url = `${this.baseUrl}/${servAreaKy}/name`;
    return this.http.get(url, { responseType: 'text' });
  }
  getChildElements(servAreaKy: number): Observable<ExploitationUnit[]> {
    return this.http.get<ExploitationUnit[]>(`${this.baseUrl}/${servAreaKy}/child-elements`);
  }
  addChildElement(servAreaKy: number, exploitationUnit: Partial<ExploitationUnit>): Observable<ExploitationUnit> {
    return this.http.post<ExploitationUnit>(`${this.baseUrl}/${servAreaKy}/child-elements`, exploitationUnit);
  }
}
