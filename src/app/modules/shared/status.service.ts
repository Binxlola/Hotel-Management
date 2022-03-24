import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {StatusResponse} from "../../app.component";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private API_URL = environment.API_URL;
  private statusUrl = this.API_URL + '/api/status';

  constructor(private http: HttpClient) { }

  getStatus(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(this.statusUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
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
