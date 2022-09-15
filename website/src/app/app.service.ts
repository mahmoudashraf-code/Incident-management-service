import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from 'src/../../server/src/users/users.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  user!: iUser | undefined;
  _loading: boolean = false;

  public set loading(v: boolean) {
    setTimeout(() => {
      this._loading = v;
    }, 0);
  }

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  get<T>(url: string) {
    return this.http.get<T>(`${environment.url}/api/${url}`, { withCredentials: true })
  }
  post<T>(url: string, data: any) {
    return this.http.post<T>(`${environment.url}/api/${url}`, data, { withCredentials: true });
  }
  delete(url: string) {
    return this.http.delete(`${environment.url}/api/${url}`, { withCredentials: true });
  }
  put(url: string, data: any) {
    return this.http.put(`${environment.url}/api/${url}`, data, { withCredentials: true });
  }
  logout(navTo: string = "") {
    this.post("auth/logout", {}).subscribe(res => {
      this.user = undefined;
      this.router.navigate([navTo]);
    })
  }
}