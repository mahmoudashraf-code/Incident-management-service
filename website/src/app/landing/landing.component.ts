import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { pageButton } from 'src/public/page/page.component';
import { AppService } from '../app.service';
import { goToDashboard } from '../goToDashboard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  buttons: pageButton[] = [
    {
      icon: "save",
      action: () => this.save()
    }
  ]
  userData: FormGroup;
  constructor(public app: AppService, private dialog: MatDialog) {
    this.userData = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      callerPhone: new FormControl("", [Validators.required]),
      callerName: new FormControl("", [Validators.required]),
    });
  }
  async ngOnInit() {
    await goToDashboard(this.app);
  }
  save() {
    this.app.loading = true;
    this.app.post(`incident`, { data: this.userData.value }).subscribe((res: any) => {
      this.app.loading = false;
      this.dialog.open(DoneDialogComponent);
      this.userData.reset();
    }, (err: HttpErrorResponse) => {
      this.app.loading = false;
      this.dialog.open(ErrorDialogComponent);
    })
  }
}
