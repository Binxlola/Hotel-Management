import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {}

  /**
   * Make a post request to the backend, providing a validated Room object
   * @param room The room to be created and saved
   */
  public createRoom = (room: Room): Observable<boolean> =>
    this.http.post<boolean>(`${this.BOOKING_URL}/save-room`, room).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Make a post request to the backend, providing a validated Room object to update
   * @param room The room to be updated
   */
  public updateRoom = (room: Room): Observable<boolean> =>
    this.http.post<boolean>(`${this.BOOKING_URL}/update-room`, room).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  public deleteRoom = (roomID: string): Observable<boolean> =>
    this.http.post<boolean>(`${this.BOOKING_URL}/delete-room`, {_id: roomID}).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Make a get request to the backend to retrieve all stored rooms.
   * Unpack the returned array and store against this service
   */
  public getAllRooms = async (): Promise<Room[]> =>
    await lastValueFrom(
      this.http.get<Room[]>(`${this.BOOKING_URL}/all-rooms`).pipe(
        catchError(this.handleError)
      )
    );

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

  //    ==== GETTERS && SETTERS ====
  get rooms(): Room[] {
    return this._rooms;
  }
}
