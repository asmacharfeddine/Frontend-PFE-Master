import { Component } from '@angular/core';
//import { Patient } from './patient.model';
import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver, catchError } from 'rxjs'; // Import throwError correctly
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Prescription } from 'app/doctor/prescription/prescription.model';
import { Doctor } from './doctor.model';
import { Patient } from '../patient.model';
@Injectable({
  providedIn: 'root'
})

export class MyDoctorService {
  private baseUrl = 'http://localhost:8090/api/Doctors'
 constructor(private http: HttpClient) { }



 getDoctorByEmail(userEmail: string): Observable<any> {
  const url = `${this.baseUrl}/byEmail/${userEmail}`;

  return this.http.get<Doctor>(url)
    .pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
}



getAllPatientsForDoctor(doctorId: number): Observable<Patient[]> {
  const url = `${this.baseUrl}/${doctorId}/patients`;

  return this.http.get<Patient[]>(url)
}



}
