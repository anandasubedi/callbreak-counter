import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(state.url, route);
    const url: string = state.url;
    if (this.authService.isTokenExpired()) {
        // this.router.navigate([state.url]);
        return true;
    }
    return false;
  }
}
