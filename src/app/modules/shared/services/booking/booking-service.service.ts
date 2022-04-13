import { Injectable } from '@angular/core';
import {catchError, mapTo, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Schema} from "mongoose";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly BOOKING_URL: string = `${environment.API_URL}/booking`;
  private _rooms: Room[] = []

  constructor(private http: HttpClient) {
    this.loadRooms();
    // this.saveRoom();
  }

  get rooms(): Room[] {return this._rooms;}

  private loadRooms(): void {
    this.http.get<Room[]>(`${this.BOOKING_URL}/rooms`)
      .subscribe({
        next: (data: Room[]) => {
          this._rooms = [...data];
        },
        error: err => console.log(err)
      })
  }

  public saveRoom() {
    return this.http.post<any>(`${this.BOOKING_URL}/room/save`, {test: "test"})
      .pipe(
        tap(rooms => console.log(rooms)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }
}

export interface Room {
  _id: string,
  type: string,
  description_short: string,
  description_full: string,
  max_adults: number,
  max_children: number,
  num_available: number,
  base_price: number,
}
