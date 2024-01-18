import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffGroupLink } from './staff-group-link.model';

@Injectable({
  providedIn: 'root'
})
export class StaffGrpLinkService {

  private baseUrl = '/api/parameterization/staffGrpLink';

  constructor(private http: HttpClient) { }

  getAllStaffGrpLinks(): Observable<StaffGroupLink[]> {
    return this.http.get<StaffGroupLink[]>(`${this.baseUrl}`);
  }

  assignStaffToGroup(staffKy: number, staffGrpKy: number): Observable<string> {
    const params = { staffKy: staffKy.toString(), staffGrpKy: staffGrpKy.toString() };
    return this.http.post<string>(`${this.baseUrl}/assign`, params);
  }

  unassignStaffFromGroup(staffKy: number, staffGrpKy: number): Observable<string> {
    const params = { staffKy: staffKy.toString(), staffGrpKy: staffGrpKy.toString() };
    return this.http.post<string>(`${this.baseUrl}/unassign`, params);
  }
}
