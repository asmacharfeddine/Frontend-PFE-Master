import { Component } from '@angular/core';
import { Patient } from './patient.model';
import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Prescription } from 'app/doctor/prescription/prescription.model';
@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private baseUrl = 'http://localhost:8090/api/patients'
 constructor(private http: HttpClient) { }

 getAllPatients(): Observable<any[]>{
 return this.http.get<any[]>(`${this.baseUrl}/patientsList`);
}

getAllPrescriptionsForPatient(id: number): Observable<Prescription[]>{
  const url = `${this.baseUrl}/${id}/prescriptions`
  return this.http.get<Prescription[]>(url);
}


addPrescriptionToPatient(
  patientId: number,
  medicationId: number,
  prescription: Prescription
): Observable<any> {
  const params = new HttpParams().set('medicationId', medicationId);

  const url = `${this.baseUrl}/${patientId}/addPrescription`;
  return this.http.post(url,prescription,{params} );
}


createPrescription(prescription: Partial<Prescription>): Observable<Prescription> {
  const url = `${this.baseUrl}/createPrescription`;
  return this.http.post<Prescription>(url, prescription);
}

/*addMedication(medication: Medication, activeIngredientIds: number[]): Observable<any> {

  const params = new HttpParams().set('activeIngredientIds', activeIngredientIds.join(','));

   return this.http.post(`${this.baseUrl}/addMedication`, medication, {params});
 }*/

 addPrescriptionToPatientWithMedicationParts(patientId: number, prescription: Partial<Prescription>): Observable<any> {
  const url = `${this.baseUrl}/${patientId}/addPrescriptionWithMedicationParts`;
  return this.http.post(url, prescription);
}

deletePrescriptionById(id: number):Observable<HttpResponse<Prescription>>{
    return this.http.delete<Prescription>(`${this.baseUrl}/prescription/${id}`, {observe: 'response'});
}



/*@DeleteMapping("/prescription/{id}")
public ResponseEntity<Prescription> deleteMedicationById(@PathVariable("id") Integer prescriptionKey){
    return this.patientService.deletePrescriptionById(prescriptionKey);
}*/
}

