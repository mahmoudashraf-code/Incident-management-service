import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { pageButton } from 'src/public/page/page.component';
import { iIncident } from '../../../../../../../server/src/incident/incident.interface';
import { TabsService } from '../../../tabs.service';
import { iSetting } from '../../../../../../../server/src/setting/setting.interface';
import { iUser } from '../../../../../../../server/src/users/users.dto';

@Component({
  selector: 'app-edited',
  templateUrl: './edited.component.html',
  styleUrls: ['./edited.component.scss']
})

export class EditedComponent implements OnInit {
  userId: string = "";
  setting: iSetting;
  users: iUser[] = []
  buttons: (pageButton | undefined)[] = []
  userData: FormGroup;
  status: number = 0;
  constructor(
    public app: AppService,
    private tabs: TabsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.userData = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      callerPhone: new FormControl("", [Validators.required]),
      callerName: new FormControl("", [Validators.required]),
      assignTo: new FormControl(""),
      category: new FormControl(""),
      replay: new FormControl(""),
      priorty: new FormControl(""),
    });
    this.setting = {
      category: [],
      priorty: []
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.userId = res.id;
      if (res.id == "addNew") {
        this.userData.reset();
        this.addSave();
      } else this.getData(this.userId);
    })
    this.getSetting();
    this.getUsers();
  }
  addSave() {
    this.buttons.push(
      {
        icon: "save",
        action: () => this.save()
      }
    )
  }
  getSetting() {
    this.app.get<iSetting>(`setting`).subscribe(res => {
      this.setting = res;
    })
  }
  getUsers() {
    this.app.get<iUser[]>(`users/users`).subscribe(res => {
      this.users = res;
    })
  }
  getData(id: string) {
    this.app.loading = true;
    this.app.get<iIncident>(`incident/${id}`).subscribe(res => {
      this.status = res.status;
      if (res.status < 2) this.addSave();
      this.userData.setValue({
        title: res.title,
        description: res.description,
        callerPhone: res.callerPhone,
        callerName: res.callerName,
        category: res.category || "",
        priorty: res.priorty || "",
        replay: res.replay || "",
        assignTo: res.assignTo || ""
      })
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
    this.app.put(`incident/${this.userId}`, { data: this.userData.value }).subscribe(res => {
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
    this.app.post(`incident`, { data: this.userData.value }).subscribe(res => {
      this.app.loading = false;
      this.dialog.open(DoneDialogComponent);
      this.tabs.pop();
    }, (err: HttpErrorResponse) => {
      this.dialog.open(ErrorDialogComponent);
      this.app.loading = false;
    })
  }
}
