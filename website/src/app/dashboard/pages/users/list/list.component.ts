import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogService } from 'src/public/confirm-dialog/confirm-dialog.service';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { pageButton } from 'src/public/page/page.component';
import { iUser } from '../../../../../../../server/src/users/users.dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', "password", "role", "delete", "update"];
  users: MatTableDataSource<iUser> = new MatTableDataSource<iUser>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  buttons: pageButton[] = [
    {
      action: () => this.getData(),
      icon: "restore"
    },
    {
      action: () => {
        this.app.router.navigate(["dashboard", "users", "addNew"]);
      },
      icon: "add"
    }
  ]
  constructor(
    public app: AppService,
    private confirm: ConfirmDialogService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
  }
  getData() {
    this.app.loading = true;
    this.app.get<{ [key: string]: iUser }>("users").subscribe(res => {
      this.app.loading = false;
      this.users = new MatTableDataSource<iUser>(Object.values(res));
      this.users.paginator = this.paginator;
    })
  }
  editedItem(item: iUser) {
    this.app.router.navigate(["dashboard", "users", item._id]);
  }
  deleteItem(id: string) {
    this.confirm
      .confirmDialog({
        title: "Are You Sure?",
        message: "Are you sure you want to delete item.",
        confirmCaption: "Yes",
        cancelCaption: "No",
      })
      .subscribe((yes) => {
        if (yes) {
          this.app.loading = true;
          this.app.delete(`users/${id}`).subscribe(res => {
            this.app.loading = false;
            this.dialog.open(DoneDialogComponent);
            this.getData();
          })
        }
      });
  }
}
