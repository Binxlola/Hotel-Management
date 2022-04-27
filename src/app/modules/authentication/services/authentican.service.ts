import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, lastValueFrom, mapTo, Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Booking} from "../../shared/services/booking/booking-service.service";
import {Router} from "@angular/router";

export interface Tokens {
  email: string,
  token: string,
  refreshToken: string
}

export interface Customer {
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string
}

export interface Staff {
  username: string,
  password: string
}

export interface LoginRes {
  error: null | string;
  user: null | Staff | Customer;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  private readonly AUTHENTICATION_URL: string = `${environment.API_URL}/authentication`
  private loggedUser: string | undefined;

  constructor(
    private http: HttpClient,
    private _router: Router
    ) {}

  /**
   * Send user login information via a request, and expects a response with a JWT token and refresh token.
   * Assuming no errors the respective user login method will be called.
   * @param user The user object, containing a user name and password
   * @param redirectPath
   * @param callback
   * @return Observable<boolean> should be the return type, but for nom it is void.
   */
  // login(user: { username: string, password: string, isStaff: boolean }): Observable<boolean> {
  //   return this.http.post<any>(`${this.AUTHENTICATION_URL}/login`, user)
  //     .pipe(
  //       tap(tokens => this.doLoginUser(user.username, tokens)),
  //       mapTo(true),
  //       catchError(error => {
  //         alert(error.error);
  //         return of(false);
  //       }));
  // }

  async login(user: { username: string, password: string, isStaff: boolean }, redirectPath: string, callback: ((error: string | null) => void)): Promise<LoginRes> {
    return await lastValueFrom(
      this.http.post<LoginRes>(`${this.AUTHENTICATION_URL}/login`, user).pipe(
        tap((response: LoginRes) => {
          if (!response.user) callback(response.error);
          else this.redirectTo(redirectPath);
        }),
        catchError(this.handleError)
      )
    );
  }

  logout() {
    this.loggedUser = undefined;
    this.removeTokens();
    this.redirectTo("/login");
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

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  public redirectTo(route: string){
    this._router.navigate([route]);
  }

  refreshToken() {
    return this.http.post<any>(`${this.AUTHENTICATION_URL}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
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
