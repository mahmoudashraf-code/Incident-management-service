import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { iUser } from '../../../../server/src/users/users.dto';
import { AppService } from '../app.service';
import { goToDashboard } from '../goToDashboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;
  redirect: string = "";
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.loginData = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.route.queryParams.subscribe((res: any) => {
      if (res.redirect) this.redirect = res.redirect;
    })
  }
  ngOnInit(): void {
    goToDashboard(this.app).then(res => {
      if (res) this.app.router.navigate(['dashboard']);
    });
  }
  logIn() {
    if (this.loginData.valid == false) {
      this.dialog.open(ErrorDialogComponent)
      return;
    } else {
      this.app.post<{ user: iUser }>("auth/login", this.loginData.value).subscribe({
        next: (res) => {
          this.app.user = res.user;
          if (this.redirect == '') this.app.router.navigate(["dashboard"]);
          else this.app.router.navigateByUrl(this.redirect)
        },
        error: (err) => {
          this.dialog.open(ErrorDialogComponent)
        },
      })
    }
  }
}
