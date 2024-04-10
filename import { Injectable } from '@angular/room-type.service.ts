import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private roomTypeUrl = 'Get_Room_Type';

  constructor(private http: HttpClient) { }

  getRoomTypes(): Observable<any> {
    return this.http.get<any>(this.roomTypeUrl);
  }
}