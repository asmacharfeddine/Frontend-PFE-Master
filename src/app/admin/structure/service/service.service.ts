import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../service/service.model';
import { ServiceArea } from '../service-area/service-area.model';
import { s } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8090/parameterization/service';

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}`, service);
  }
  updateService(serviceKy: number, service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/${serviceKy}`, service);
  }
  deleteService(serviceKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${serviceKy}`, { observe: 'response' });
  }
  getServiceByServiceNm(serviceNm: string): Observable<Service> {
    const url = `${this.baseUrl}/ServiceName/${serviceNm}`;
    return this.http.get<Service>(url);
  }
  getServiceByKy(serviceKy: number): Observable<Service> {
    const url = `${this.baseUrl}/${serviceKy}`;
    return this.http.get<Service>(url);
  }
  getServiceNameByKey(serviceKy: number): Observable<string> {
    const url = `${this.baseUrl}/${serviceKy}/name`;
    return this.http.get(url, { responseType: 'text' });
  }
  getChildElements(serviceKy: number): Observable<ServiceArea[]> {
    return this.http.get<ServiceArea[]>(`${this.baseUrl}/${serviceKy}/child-elements`);
  }
  addChildElement(serviceKy: number, serviceArea: Partial<ServiceArea>): Observable<ServiceArea> {
    return this.http.post<ServiceArea>(`${this.baseUrl}/${serviceKy}/child-elements`, serviceArea);
  }
}
