import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { insurance } from './insurances.model';

@Injectable({
  providedIn: 'root'
})
export class insurancesService {
  private baseUrl = 'http://localhost:8080/healthInsurance';
  constructor(private http: HttpClient) { }



  getAllInsurances(): Observable<insurance[]> {
    return this.http.get<insurance[]>(this.baseUrl);
  }

  createInsurance(insuranceData: insurance): Observable<insurance> {
    return this.http.post<insurance>(this.baseUrl, insuranceData);
  }

  updateInsurance(insKy: number, insuranceData: insurance): Observable<insurance> {
    return this.http.put<insurance>(`${this.baseUrl}/${insKy}`, insuranceData);
  }

  deleteInsurance(insKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${insKy}`, { observe: 'response' });
  }
  getInsuranceByCompanyName(insNm: string): Observable<insurance[]> {
    const url = `${this.baseUrl}/by-company-name?companyName=${insNm}`;
    return this.http.get<insurance[]>(url);
  }




  getInsuranceBypolicyName(policyNm: string): Observable<insurance> {
    const url = `${this.baseUrl}/InsurancePlicyName/${policyNm}`;
    return this.http.get<insurance>(url);
  }

  // Ajoutez d'autres méthodes si nécessaire
}

