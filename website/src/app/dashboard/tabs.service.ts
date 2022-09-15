import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  tabs: string[] = [];
  constructor(private app: AppService) { }
  selectDir(i: number) {
    this.tabs.splice(i + 1);
    this.app.router.navigate(['dashboard']);
    this.app.router.navigateByUrl(`dashboard/${this.tabs.join("/")}`)
  }
  init() {
    this.tabs = [];
    this.app.router.navigate(['dashboard']);
  }
  pop() {
    this.tabs.pop();
    this.app.router.navigate(['dashboard', ...this.tabs]);
  }
  reset() {
    let url = this.app.router.url.slice(11);
    if (url != "")
      this.tabs = url.split("/");
  }
}