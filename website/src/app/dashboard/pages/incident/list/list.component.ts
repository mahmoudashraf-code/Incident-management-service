import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogService } from 'src/public/confirm-dialog/confirm-dialog.service';
import { DoneDialogComponent } from 'src/public/done-error-dialog/done-dialog/done-dialog.component';
import { pageButton } from 'src/public/page/page.component';
import { iIncident } from '../../../../../../../server/src/incident/incident.interface';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['callerName', 'title', "category", "priorty", "status", "dateCreate","dateUpdate","delete", "update"];
  users: MatTableDataSource<iIncident> = new MatTableDataSource<iIncident>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectPage!: selectPage;
  pages: { [key: string]: selectPage } = {
    "all": {
      icon: "analytics",
      name: "Incidentes",
      filter: {}
    },
    "done": {
      icon: "admin_panel_settings",
      name: "Done Incidentes",
      filter: {
        status: 2
      }
    },
    "high": {
      icon: "verified",
      name: "High Incidentes",
      filter: {
        priorty: "high"
      }
    },
    "Wating": {
      icon: "connect_without_contact",
      name: "Wating Incidentes",
      filter: {
        status: 0
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }
  buttons: pageButton[] = [
    {
      action: () => this.getData(),
      icon: "restore"
    },
    {
      action: () => {
        this.app.router.navigate(["dashboard", "incident", "edited", "addNew"]);
      },
      icon: "add"
    }
  ]
  constructor(
    public app: AppService,
    private confirm: ConfirmDialogService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.selectPage = this.pages[res.id];
      this.getData();
    })
  }
  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }
  getData(filter = this.selectPage.filter) {
    this.app.loading = true;
    this.app.post<iIncident[]>("incident/filter", { filter }).subscribe(res => {
      this.app.loading = false;
      this.users = new MatTableDataSource<iIncident>(res);
      this.ngAfterViewInit();
    })
  }
  editedItem(item: any) {
    this.app.router.navigate(["dashboard", "incident", "edited", item._id]);
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
          this.app.delete(`incident/${id}`).subscribe(res => {
            this.app.loading = false;
            this.dialog.open(DoneDialogComponent);
            this.getData();
          })
        }
      });
  }
}


interface selectPage {
  filter: any;
  icon: string;
  name: string
}