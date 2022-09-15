import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { pageButton } from 'src/public/page/page.component';
import { iUser } from '../../../../../../server/src/users/users.dto';


@Component({
  selector: 'app-profile',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  buttons: pageButton[] = [
    {
      icon: "save",
      action: () => this.save()
    }
  ]
  userData: FormGroup;
  constructor(public app: AppService, private dialog: MatDialog) {
    this.userData = new FormGroup({
      email: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl(1, [Validators.required]),
    });
  }
  ngOnInit(): void {
    let user: iUser = this.app.user as iUser;
    this.userData.setValue({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  }
  save() {
    this.app.loading = true;
    this.app.put(`users/${this.app.user?._id}`, { user: this.userData.value }).subscribe((res: any) => {
      this.app.loading = false;
      this.app.user = res.user;
      this.dialog.open(DoneDialogComponent);
    }, (err: HttpErrorResponse) => {
      this.app.loading = false;
      this.dialog.open(ErrorDialogComponent);
    })
  }
}