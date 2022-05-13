import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/authentican.service";

@Injectable({
  providedIn: 'root'
})
export class ModulesGuard implements CanLoad, CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * Will determine if the module of the given route can be lazily loaded based on their logged in status.
   * @param route The route the user is navigating to with respects to its module
   * @param segments This is an array of URLs linked to the module in question.
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isLoggedIn();
  }

  /**
   * Will determine if a given route can be activated for the user based on their login status.
   * @param route The route the user is navigating to.
   * @param state Snapshot of current router state.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this._authService.isLoggedIn()) return this._router.parseUrl("/login");
    else return true;
  }
}
