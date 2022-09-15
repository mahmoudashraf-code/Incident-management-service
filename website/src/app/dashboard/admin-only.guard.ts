import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOnlyGuard implements CanActivate {
  constructor(private app: AppService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean {
    if (this.app.user?.role == 0)
      return true;
    else return false;
  }
}
