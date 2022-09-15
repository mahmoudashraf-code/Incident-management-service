import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TabsService } from './tabs.service';
import { delay } from 'rxjs/operators';
import { Event, NavigationEnd } from '@angular/router';
import { ConfirmDialogService } from 'src/public/confirm-dialog/confirm-dialog.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(
    public app: AppService,
    public tabs: TabsService,
    private observer: BreakpointObserver,
    private confirm: ConfirmDialogService
  ) { }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1200px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  ngOnInit() {
    this.tabs.reset();
    this.app.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.tabs.reset();
      }
    })
  }
  logout() {
    this.confirm
      .confirmDialog({
        title: "Are You Sure?",
        message: "Are you sure you want to logOut.",
        confirmCaption: "Yes",
        cancelCaption: "No",
      })
      .subscribe((yes) => {
        if (yes) {
          this.app.logout()
        }
      });
  }
}
