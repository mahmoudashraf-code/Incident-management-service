import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { pageButton } from 'src/public/page/page.component';
import { iUser } from '../../../../../../../server/src/users/users.dto';
import { TabsService } from '../../../tabs.service';

@Component({
  selector: 'app-edited',
  templateUrl: './edited.component.html',
  styleUrls: ['./edited.component.scss']
})

export class EditedComponent implements OnInit {
  userId: string = "";
  buttons: (pageButton | undefined)[] = [
    {
      icon: "save",
      action: () => this.save()
    }
  ]
  userData: FormGroup;
  constructor(
    public app: AppService,
    private tabs: TabsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.userData = new FormGroup({
      email: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl(1, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.userId = res.id;
      if (res.id == "addNew") {
        this.userData.setValue({
          name: "",
          email: "",
          password: "",
          role: 1,
        })
      } else this.getData(this.userId);
    })
  }
  getData(id: string) {
    this.app.loading = true;
    this.app.get<iUser>(`users/${id}`).subscribe(res => {
      this.userData.reset();
      this.app.loading = false;
    }, () => {
      this.app.loading = false;
      this.tabs.pop();
    })
  }
  save() {
    if (!this.userData.valid) {
      this.dialog.open(ErrorDialogComponent);
      return;
    }
    if (this.userId == "addNew") this.addNew();
    else this.update();
  }
  update() {
    this.app.loading = true;
    this.app.put(`users/${this.userId}`, { user: this.userData.value }).subscribe(res => {
      this.app.loading = false;
      this.dialog.open(DoneDialogComponent);
      this.tabs.pop();
    }, (err: HttpErrorResponse) => {
      this.dialog.open(ErrorDialogComponent);
      this.app.loading = false;
    })
  }
  addNew() {
    this.app.loading = true;
    this.app.post(`users`, { user: this.userData.value }).subscribe(res => {
      this.app.loading = false;
      this.dialog.open(DoneDialogComponent);
      this.tabs.pop();
    }, (err: HttpErrorResponse) => {
      this.dialog.open(ErrorDialogComponent);
      this.app.loading = false;
    })
  }
}
