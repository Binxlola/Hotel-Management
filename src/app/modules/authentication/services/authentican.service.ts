import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, lastValueFrom, mapTo, Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

export interface Token {
  token: string,
  expiresIn: number
}

export interface User {
  _id: string,
  jwt: Token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = "Token";

  private USER: User | undefined;
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  private readonly AUTHENTICATION_URL: string = `${environment.API_URL}/authentication`;

  constructor(private http: HttpClient, private _router: Router) {}

  /**
   * Send user login information via a request, and expects a response with a JWT token and refresh token.
   * Assuming no errors the respective user login method will be called.
   * @param user The user object, containing a user name and password
   * @param redirectPath
   * @param callback
   * @return Observable<boolean> should be the return type, but for nom it is void.
   */
  public async login(user: { username: string, password: string, isCustomer: boolean }, redirectPath: string, callback: ((error: HttpErrorResponse) => void)): Promise<boolean> {
    return await lastValueFrom(
      this.http.post<User>(`${this.AUTHENTICATION_URL}/login`, user).pipe(
        tap((response: User) => {
          this.USER = response;
          localStorage.setItem(this.TOKEN_KEY, response.jwt.token);
          this.redirectTo(redirectPath);
        }),
        mapTo(true),
        catchError(error => {
          callback(error);
          return of(false);
        })
      )
    );
  }

  public logout() {
    this.USER = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN);
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

  public isLoggedIn(): boolean {
    console.log(localStorage.getItem(this.TOKEN_KEY));
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
}
