import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { PhysicalTreatment } from './physicalTreatment.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PhysicalTreatmentService {
  filter(arg0: (medicationss: any) => any): PhysicalTreatment[] {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8090/api/treatments';

  constructor(private http: HttpClient) { }

  getAllPhysicalTreatments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  createPhysicalTreatment(physicalTreatment: PhysicalTreatment): Observable<PhysicalTreatment> {
    return this.http.post<PhysicalTreatment>(`${this.baseUrl}/create`, physicalTreatment);
  }


  deletePhysicalTreatment(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  updatePhysicalTreatment( physicalTreatment: PhysicalTreatment, id: number): Observable<PhysicalTreatment> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<PhysicalTreatment>(url, physicalTreatment);
  }
  updatePhysicalTreatments(id: number, updatedTreatment: PhysicalTreatment): Observable<PhysicalTreatment> {
    const url = `${this.baseUrl}/treatment/${id}`;
    return this.http.put<PhysicalTreatment>(url, updatedTreatment);
  }
  updatePhysicalTreatmentWithCategory(physicalTreatment_Key: number, updatedPhysicalTreatment: Partial<PhysicalTreatment>): Observable<PhysicalTreatment> {
    const url = `${this.baseUrl}/treatment/${physicalTreatment_Key}`;
    return this.http.put<PhysicalTreatment>(url, updatedPhysicalTreatment);
  }

  /*checkTreatmentNameExists(treatmentName: String): Observable<boolean>{
    const url = `${this.baseUrl}/check-name-exists?name=${treatmentName}`;
    return this.http.get<boolean>(url);
  }*/

   // Method to fetch the count of physicalTreatments
   countPhysicalTreatments(): Observable<number> {
    const url = `${this.baseUrl}/count`;
    return this.http.get<number>(url);
  }
}


