import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { goToDashboard } from './goToDashboard';

@Injectable({
  providedIn: 'root'
})

export class SessionInitGuard implements CanActivate {
  constructor(private app: AppService) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const res = await goToDashboard(this.app);
    if (res) return true;
    else {
      this.app.router.navigate(["signIn"], { queryParams: { redirect: state.url } });
      return false;
    }
  }
}
