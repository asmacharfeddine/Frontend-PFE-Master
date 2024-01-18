import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room/room.model';
import { Equipment } from '../equipment/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8090/parameterization/room';

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl);
  }
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}`, room);
  }
  updateRoom(roomKy: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${roomKy}`, room);
  }
  deleteRoom(roomKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${roomKy}`, { observe: 'response' });
  }
  getRoomByNm(roomNm: string): Observable<Room> {
    const url = `${this.baseUrl}/roomName/${roomNm}`;
    return this.http.get<Room>(url);
  }
  getRoomByKy(roomKy: number): Observable<Room> {
    const url = `${this.baseUrl}/${roomKy}`;
    return this.http.get<Room>(url);
  }
  getRoomNameByKey(roomKy: number): Observable<string> {
    const url = `${this.baseUrl}/${roomKy}/name`;
    return this.http.get(url, { responseType: 'text' });
  }
  getChildElements(roomKy: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}/${roomKy}/child-elements`);
  }
  addChildElement(roomKy: number, equipment: Partial<Equipment>): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.baseUrl}/${roomKy}/child-elements`, equipment);
  }
}
