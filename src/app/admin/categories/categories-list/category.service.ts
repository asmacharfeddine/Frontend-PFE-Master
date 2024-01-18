import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { BehaviorSubject } from 'rxjs';
import { PhysicalTreatmentCategory } from './category.model';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { catchError } from 'rxjs/operators'; // Import catchError correctly
import { PhysicalTreatment } from 'app/admin/physicalTreatments/physical-treatments-list/physicalTreatment.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService  {
  private baseUrl  = 'http://localhost:8090/api/categories';
   private otherUrl ='admin/categories/all-categories';

 // we imported httpclient and injected using the constructor
  constructor(private http: HttpClient) {}


  getAllPhysicalTreatmentCategories(): Observable<PhysicalTreatmentCategory[]> {
    return this.http.get<PhysicalTreatmentCategory[]>(`${this.baseUrl}/list`);
  }


 createPhysicalTreatmentCategory(category: Partial<PhysicalTreatmentCategory>): Observable<PhysicalTreatmentCategory>{
  return this.http.post<PhysicalTreatmentCategory>(`${this.baseUrl}/category`, category);
 }

 checkCategoryNameExists(categoryName: string): Observable<boolean> {
  const url = `${this.baseUrl}/check-name-exists?name=${categoryName}`;
  return this.http.get<boolean>(url);
}


updatePhysicalTreatmentCategory(category: PhysicalTreatmentCategory, physicalTreatmentCategory_Key: number){
  return this.http.put(`${this.baseUrl}/${physicalTreatmentCategory_Key}`, category);
}


deletePhysicalTreatmentCategoryById(physicalTreatmentCategory_Key: number): Observable<HttpResponse<any>>{
  console.log('Delete URL:');
  return this.http.delete<any>(`${this.baseUrl}/${physicalTreatmentCategory_Key}`, {observe: 'response'});
}

addTreatmentToCategory(categoryId: number, physicalTreatment: Partial<PhysicalTreatment>): Observable<PhysicalTreatment> {
  const url = `${this.baseUrl}/${categoryId}/treatmentsChildren`;
  return this.http.post<PhysicalTreatment>(url, physicalTreatment);
}

 // Method to fetch the count of categories
 countCategories(): Observable<number> {
  const url = `${this.baseUrl}/count`;
  return this.http.get<number>(url);
}
}


