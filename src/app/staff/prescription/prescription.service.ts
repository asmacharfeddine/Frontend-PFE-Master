import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
//import { Prescription } from 'app/doctor/prescription/prescription.model';
import { Prescription } from './prescription.model';
@Injectable({
  providedIn: 'root'
})

export class PrescriptionService {
  private baseUrl = 'http://localhost:8090/api/prescriptions'
 constructor(private http: HttpClient) { }

 getPrescriptionByPrescriptionKey(prescriptionKey: number): Observable<Prescription> {
  const url = `${this.baseUrl}/${prescriptionKey}`;
  return this.http.get<Prescription>(url);
}

getAllPrescriptions(): Observable<Prescription[]> {
  const url = `${this.baseUrl}/all`;
  return this.http.get<Prescription[]>(url);

}
}

