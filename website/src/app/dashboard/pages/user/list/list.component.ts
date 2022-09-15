import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { pageButton } from 'src/public/page/page.component';
import { iUser } from '../../../../../../../server/src/users/users.dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['callerName', 'title', "category", "priorty", "status", "view"];
  users: MatTableDataSource<iUser> = new MatTableDataSource<iUser>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  buttons: (pageButton | undefined)[] = [
    {
      action: () => this.getData(),
      icon: "restore"
    }
  ]
  constructor(
    public app: AppService,
  ) { }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    this.users.paginator = this.paginator;
  }
  getData() {
    this.app.loading = true;
    this.app.post<{ [key: string]: iUser }>("incident/filter", { filter: { assignTo: this.app.user?._id } }).subscribe(res => {
      this.app.loading = false;
      this.users = new MatTableDataSource<iUser>(Object.values(res));
      this.users.paginator = this.paginator;
    })
  }
  editedItem(item: iUser) {
    this.app.router.navigate(["dashboard", "user", item._id]);
  }
}
