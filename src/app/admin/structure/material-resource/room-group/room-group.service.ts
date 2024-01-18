import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomGroup } from '../room-group/room-group.model';
import { Room } from '../room/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomGroupService {

  private baseUrl = 'http://localhost:8090/parameterization/roomgrp';

  constructor(private http: HttpClient) { }

  getAllRoomGroups(): Observable<RoomGroup[]> {
    return this.http.get<RoomGroup[]>(this.baseUrl);
  }
  createRoomGroup(roomGroup: RoomGroup): Observable<RoomGroup> {
    return this.http.post<RoomGroup>(`${this.baseUrl}`, roomGroup);
  }
  updateRoomGroup(roomGrpKy: number, roomGroup: RoomGroup): Observable<RoomGroup> {
    return this.http.put<RoomGroup>(`${this.baseUrl}/${roomGrpKy}`, roomGroup);
  }
  deleteRoomGroup(roomGrpKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${roomGrpKy}`, { observe: 'response' });
  }
  getRoomGroupByNm(roomGrpNm: string): Observable<RoomGroup> {
    const url = `${this.baseUrl}/roomGrpName/${roomGrpNm}`;
    return this.http.get<RoomGroup>(url);
  }
  getRoomGroupByKy(roomGrpKy: number): Observable<RoomGroup> {
    const url = `${this.baseUrl}/${roomGrpKy}`;
    return this.http.get<RoomGroup>(url);
  }
  getRoomGroupNameByKey(roomGrpKy: number): Observable<string> {
    const url = `${this.baseUrl}/${roomGrpKy}/name`;
    return this.http.get(url, { responseType: 'text' });
  }
  getChildElements(roomGrpKy: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/${roomGrpKy}/child-elements`);
  }
  addChildElement(roomGrpKy: number, room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/${roomGrpKy}/child-elements`, room);
  }
}
