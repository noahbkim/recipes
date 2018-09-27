import { Injectable } from '@angular/core';
import { UserService } from './api/user.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user.me !== null) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {'redirect': state.url}}).then();
      return false;
    }
  }

}
