import {ElementRef, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, mapTo, Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {LoggedInUser} from "../../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: LoggedInUser | undefined;
  private _isAdmin: boolean = false;

  private readonly TOKEN_KEY = "Token";
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  private readonly AUTHENTICATION_URL: string = `${environment.API_URL}/authentication`;

  constructor(private http: HttpClient, private _router: Router) {}

  /**
   * Send user login information via a request, and expects a response with a JWT token and refresh token.
   * Assuming no errors the respective user login method will be called.
   * @param user The user object, containing a user name and password
   * @param redirectPath
   * @param callback
   * @param view
   * @return Observable<boolean> should be the return type, but for nom it is void.
   */
  public login = (
    user: { username: string, password: string, isCustomer: boolean },
    redirectPath: string,
    callback: ((error: HttpErrorResponse, view: ElementRef) => void),
    view: ElementRef): Observable<boolean> =>
    this.http.post<LoggedInUser>(`${this.AUTHENTICATION_URL}/login`, user).pipe(
      tap((response: LoggedInUser) => this.logUserIn(response, redirectPath)),
      mapTo(true),
      catchError(error => {
        callback(error, view);
        return of(false);
      })
    );

  /**
   * Send user login information via a request, and expects a response with a JWT token and refresh token.
   * Assuming no errors the respective user login method will be called.
   * @param user The user object, containing a user name, password, first name, last name, email
   * @param redirectPath
   * @param callback
   * @param view
   * @return Observable<boolean> should be the return type, but for nom it is void.
   */
  public signup = (
    user: { username: string; password: string; firstName: string; lastName: string; email: string },
    redirectPath: string,
    callback: OmitThisParameter<(error: HttpErrorResponse, view: ElementRef) => void>,
    view: ElementRef): Observable<boolean> =>
    this.http.post<LoggedInUser>(`${this.AUTHENTICATION_URL}/signup`, user).pipe(
      tap((response: LoggedInUser) => this.logUserIn(response, redirectPath)),
      mapTo(true),
      catchError(error => {
        callback(error, view);
        return of(false);
      })
    );

  // post request with body with object as username (this calls method in backend)
  public resetPassword = (
    data: { value: string, resetID: string | null, isNewReset: boolean}
  ): Observable<boolean> =>
    this.http.post<void> (`${this.AUTHENTICATION_URL}/password-reset`, data).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  private logUserIn(user: LoggedInUser, redirectPath: string): void{
    this._user = user;
    this._isAdmin = user.role === 'admin';
    localStorage.setItem(this.TOKEN_KEY, user.jwt.token);
    this.redirectTo(redirectPath);
  }

  /**
   * It removes username and password from the webpage
   */
  public logout(redirectPath: string) {
    this._user = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.redirectTo(redirectPath);
    // return this.http.post<any>(`${this.AUTHENTICATION_URL}/logout`, {
    //   'refreshToken': this.getRefreshToken()
    // }).pipe(
    //   tap(() => {
    //     this.loggedUser = undefined;
    //     this.removeTokens();
    //   }),
    //   mapTo(true),
    //   catchError(error => {
    //     alert(error.error);
    //     return of(false);
    //   }));
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) != undefined;
  }

  public redirectTo(route: string) {
    this._router.navigate([route]);
  }

  // refreshToken() {
  //   return this.http.post<any>(`${this.AUTHENTICATION_URL}/refresh`, {
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(tap((tokens: Tokens) => {
  //     this.storeJwtToken(tokens.token);
  //   }));
  // }

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

  get user(): LoggedInUser | undefined {
    return this._user;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
}
