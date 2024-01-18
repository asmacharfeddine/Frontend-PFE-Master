
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Prescription } from 'app/doctor/prescription/prescription.model';
import { MedicationPart } from 'app/staff/people/patient-care-folder-page/form/medicationPart.model';
import { DayTakes } from 'app/staff/people/patient-care-folder-page/day-takes/dayTakes.model';
import { Status } from '../status.model';
import { AnyObject } from 'chart.js/dist/types/basic';
@Injectable({
  providedIn: 'root'
})

export class MedicationPartService {
  private baseUrl = 'http://localhost:8090/api/medication-parts'
 constructor(private http: HttpClient) { }

 getMedicationPartsForPrescription(prescriptionKey: number): Observable<any[]>{
 return this.http.get<any[]>(`${this.baseUrl}/prescription/${prescriptionKey}`);
}

/*incrementTotalCount(medicationPartId: number): Observable<any>{
  return this.http.post(`${this.baseUrl}/${medicationPartId}`);
}*/
/*incrementTotalCount(medicationPartId: number): Observable<any>{
const url = `${this.baseUrl}/${medicationPartId}/incrementTotalCount`;
return this.http.post<MedicationPart>(url, {});
}
*/
incrementTotalCount(medicationPartKey: number): Observable<MedicationPart> {
  const url = `${this.baseUrl}/${medicationPartKey}/increment-total-count`;
  return this.http.post<MedicationPart>(url, null);
}

decrementTotalCount(medicationPartId: number): Observable<any>{
  const url = `${this.baseUrl}/${medicationPartId}/decrementTotalCount`;
  return this.http.post<MedicationPart>(url, {});
  }


  /*addDayTakeToMedicationPart(
            medicationPartId: number,
            dayTake: any
            )Observable<any>
            {  const url = `${this.baseUrl}/addDayTakeToMedicationPart/${medicationPartId}`;
            return this.httpClient.post(url,dayTake);

  }*/


    addDayTakeToMedicationPart(medicationPartId: number, dayTake: any): Observable<any> {
    const url = `${this.baseUrl}/addDayTakeToMedicationPart/${medicationPartId}`;
    return this.http.post(url, dayTake);
  }


  getPrescriptionKeyForMedicationPart(medicationPartId: number): Observable<number> {
    const url = `${this.baseUrl}/${medicationPartId}/prescription-key`;
    return this.http.get<number>(url);
  }

  /*updateMedicationPartStatus(
    medicationPartKey: number,
    newStatus: Status
  ): Observable<any> {
    const url = `${this.baseUrl}/${medicationPartKey}/update-status`;
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(url, newStatus );
  }*/

  updateMedicationPartStatus(medicationPartKey: number, newStatus: Status): Observable<any> {
    const url = `${this.baseUrl}/${medicationPartKey}/update-status`;

    // Set the newStatus as a query parameter
    const params = new HttpParams().set('newStatus', newStatus);

    return this.http.put<any>(url, {}, { params });
  }


}


