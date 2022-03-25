import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, mapTo, Observable, of, tap} from "rxjs";
import {environment} from "../../../../environments/environment";

export interface Tokens {
  email: string;
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  private readonly AUTHENTICATION_URL: string = `${environment.API_URL}/authentication`
  private loggedUser: string | undefined;

  constructor(private http: HttpClient) {}

  /**
   * Send user login information via a request, and expects a response with a JWT token and refresh token.
   * Assuming no errors the respective user login method will be called.
   * @param user The user object, containing a user name and password
   * @return Observable<boolean> should be the return type, but for nom it is void.
   */
  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.AUTHENTICATION_URL}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    this.loggedUser = undefined;
    this.removeTokens();

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
}
