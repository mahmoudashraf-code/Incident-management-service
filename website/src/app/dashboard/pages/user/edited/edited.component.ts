import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { pageButton } from 'src/public/page/page.component';
import { iIncident } from '../../../../../../../server/src/incident/incident.interface';
import { TabsService } from '../../../tabs.service';

@Component({
  selector: 'app-edited',
  templateUrl: './edited.component.html',
  styleUrls: ['./edited.component.scss']
})

export class EditedComponent implements OnInit {
  userId: string = "";
  buttons: (pageButton | undefined)[] = []
  data: iIncident = {
    callerName: "",
    callerPhone: "",
    category: "",
    description: "",
    priorty: "",
    status: 0,
    title: "",
  };
  constructor(
    public app: AppService,
    private tabs: TabsService,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.userId = res.id;
      this.getData(this.userId);
    })
  }
  getData(id: string) {
    this.app.loading = true;
    this.app.get<iIncident>(`incident/${id}`).subscribe(res => {
      this.data = res;
      if (res.status == 1) {
        this.buttons.push({
          icon: "fact_check",
          action: () => {
            this.app.router.navigate(["dashboard", "user", this.userId, "replay"]);
          }
        })
      }
      this.app.loading = false;
    }, () => {
      this.app.loading = false;
      this.tabs.pop();
    })
  }
}
