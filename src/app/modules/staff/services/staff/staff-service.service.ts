import {Injectable} from '@angular/core';
import {catchError, lastValueFrom, mapTo, Observable, of, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

export interface Customer {
  _id: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  last_logon: Date,
  registration_date: Date
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly USERS_URL: string = `${environment.API_URL}/customer`;

  constructor(private http: HttpClient) {}

  public getAllCustomers = async (): Promise<Customer[]> =>
    await lastValueFrom(
      this.http.get<Customer[]>(`${this.USERS_URL}/all-customers`).pipe(
        catchError(this.handleError)
      )
    );

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
