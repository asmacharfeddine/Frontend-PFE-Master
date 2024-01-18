import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { Medication } from './medication.model';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  private baseUrl = 'http://localhost:8090/api/medication';

  constructor(private http: HttpClient) { }

  getAllMedications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`)
  }
  deleteMedicationById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  addMedication(medication: Medication, activeIngredientIds: number[]): Observable<any> {

   const params = new HttpParams().set('activeIngredientIds', activeIngredientIds.join(','));

    return this.http.post(`${this.baseUrl}/addMedication`, medication, {params});
  }


  updateMedicationWithActiveIngredients(
    medication_Key: number,
    updatedMedication: Medication
  ): Observable<Medication> {
    const url = `${this.baseUrl}/updateMedicationWithAcIng/${medication_Key}`;
    return this.http.put<Medication>(url, updatedMedication);
  }
  // Method to fetch the count of medications from the Spring Boot API
    countMedications(): Observable<number> {
    const url = `${this.baseUrl}/count`;
    return this.http.get<number>(url);
  }

}
