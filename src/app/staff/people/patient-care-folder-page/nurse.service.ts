import { Component } from '@angular/core';
//import { Patient } from './patient.model';
import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver, catchError } from 'rxjs'; // Import throwError correctly
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
//import { Prescription } from 'app/doctor/prescription/prescription.model';
import { Doctor } from './doctor.model';
import { Patient } from './patient.model';
import { Nurse } from './nurse.model';
@Injectable({
  providedIn: 'root'
})

export class MyNurseService {
  private baseUrl = 'http://localhost:8090/api/Nurses'
 constructor(private http: HttpClient) { }



 getNurseByEmail(userEmail: string): Observable<any> {
  const url = `${this.baseUrl}/byEmail/${userEmail}`;

  return this.http.get<any>(url)
    .pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
}



getAllPatientsForNurse(nurseId: number): Observable<Patient[]> {
  const url = `${this.baseUrl}/${nurseId}/patients`;

  return this.http.get<Patient[]>(url)
}



}
