import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../staff/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl = 'http://localhost:8090/parameterization/staff';

  constructor(private http: HttpClient) { }

  getAllStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl);
  }

  createStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.baseUrl}`, staff);
  }

  updateStaff(staffKy: number, staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.baseUrl}/${staffKy}`, staff);
  }

  deleteStaff(staffKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${staffKy}`, { observe: 'response' });
  }

  getStaffByKy(staffKy: number): Observable<Staff> {
    const url = `${this.baseUrl}/${staffKy}`;
    return this.http.get<Staff>(url);
  }

}
