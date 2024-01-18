import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffGroup } from './staff-group.model';
import { Staff } from '../staff/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffGroupService {

  private baseUrl = 'http://localhost:8090/parameterization/staffGrp';

  constructor(private http: HttpClient) { }

  getAllStaffGroups(): Observable<StaffGroup[]> {
    return this.http.get<StaffGroup[]>(this.baseUrl);
  }

  createStaffGrp(staffGroup: Partial<StaffGroup>): Observable<StaffGroup> {
    return this.http.post<StaffGroup>(`${this.baseUrl}`, staffGroup);
  }

  updateStaffGrp(staffGrpKy: number, staffGroup: StaffGroup): Observable<StaffGroup> {
    return this.http.put<StaffGroup>(`${this.baseUrl}/${staffGrpKy}`, staffGroup);
  }

  deleteStaffGrp(staffGrpKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${staffGrpKy}`, { observe: 'response' });
  }

  getStaffGrpByKy(staffGrpKy: number): Observable<StaffGroup> {
    const url = `${this.baseUrl}/${staffGrpKy}`;
    return this.http.get<StaffGroup>(url);
  }

  getChildElements(staffGrpId: number): Observable<Staff[]> {
    const url = `${this.baseUrl}/${staffGrpId}/child-elements`;
    return this.http.get<Staff[]>(url);
  }

}
