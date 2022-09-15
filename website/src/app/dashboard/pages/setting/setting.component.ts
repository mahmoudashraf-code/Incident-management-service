import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { iSetting } from '../../../../../../server/src/setting/setting.interface';
import { pageButton } from 'src/public/page/page.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  setting: iSetting = {
    category: [],
    priorty: []
  }
  buttons: pageButton[] = [
    {
      icon: "save",
      action: () => this.save()
    }
  ]
  constructor(public app: AppService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.app.get<iSetting>(`setting`).subscribe(res => {
      this.setting = res;
    })
  }
  add(event: MatChipInputEvent, name: 'priorty' | 'category'): void {
    const value = (event.value || '').trim();
    if (value) {
      this.setting[name].push(value);
    }
    event.chipInput?.clear();
  }
  save() {
    this.app.loading = true;
    this.app.post(`setting`, { setting: this.setting }).subscribe(() => {
      this.app.loading = false;
      this.dialog.open(DoneDialogComponent);
    }, () => {
      this.app.loading = false;
      this.dialog.open(ErrorDialogComponent);
    });
  }
}
