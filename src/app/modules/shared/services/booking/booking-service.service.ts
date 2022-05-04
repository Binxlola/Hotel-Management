import {ElementRef, Injectable} from '@angular/core';
import {catchError, lastValueFrom, mapTo, Observable, of, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

export interface Room {
  _id?: string,
  type: string,
  description_short: string,
  description_full: string,
  max_adults: number,
  max_children: number,
  num_available: number,
  base_price: number,
  minCheckIn: string,
  maxCheckIn: string,
  minCheckOut: string,
  maxCheckOut: string,
  checkInOutInterval: number
}

export interface Booking {
  _id?: string,
  user?: string,
  bookingName: string,
  room: string,
  uuid?: string | undefined,
  totalPaid: number,
  checkInDate: Date | string,
  checkOutDate: Date | string,
  checkInTime: string,
  checkOutTime: string,
  numAdults: number,
  numChildren: number,
  comments: string,
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly BOOKING_URL: string = `${environment.API_URL}/booking`;
  private _rooms: Room[] = []

  constructor(private http: HttpClient) {
    this.loadRooms();
  }

  /**
   * Make a post request to the backend, providing a validated Room object
   * @param room The room to be created and saved
   */
  public createRoom = (room: Room): Observable<boolean> =>
    this.http.post<any>(`${this.BOOKING_URL}/save-room`, room).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  get rooms(): Room[] {return this._rooms;}

  /**
   * Retrieve all stored rooms using get request to backend
   * @private
   */
  private loadRooms(): void {
    this.http.get<Room[]>(`${this.BOOKING_URL}/all-rooms`)
      .subscribe({
        next: (data: Room[]) => {
          this._rooms = [...data];
        },
        error: err => console.log(err)
      })
  }

  public async makeBooking(booking: Booking): Promise<Booking> {
    return await lastValueFrom(
      this.http.post<Booking>(`${this.BOOKING_URL}/save-booking`, booking).pipe(
        catchError(this.handleError)
      )
    );
  }

  public async getAllBookings(): Promise<Booking[]> {
    return await lastValueFrom(
      this.http.get<Booking[]>(`${this.BOOKING_URL}/all-bookings`).pipe(
        catchError(this.handleError)
      )
    );
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

  private handleError(error: HttpErrorResponse, caught: Observable<any>) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
