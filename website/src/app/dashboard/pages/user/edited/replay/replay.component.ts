import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TabsService } from 'src/app/dashboard/tabs.service';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { ErrorDialogComponent } from 'src/public/done-error-dialog/error-dialog/error-dialog.component';
import { pageButton } from 'src/public/page/page.component';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {
  userId: string = "";
  description: string = ""
  buttons: pageButton[] = [
    {
      icon: "save",
      action: () => this.update()
    },
  ]
  constructor(
    public app: AppService,
    private tabs: TabsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.userId = res.id;
    })
  }
  update() {
    this.app.loading = true;
    this.app.put(`incident/${this.userId}`, { data: { replay: this.description } }).subscribe(res => {
      this.app.loading = false;
      this.dialog.open(DoneDialogComponent);
      this.tabs.pop();
    }, (err: HttpErrorResponse) => {
      this.dialog.open(ErrorDialogComponent);
      this.app.loading = false;
    })
  }
}
