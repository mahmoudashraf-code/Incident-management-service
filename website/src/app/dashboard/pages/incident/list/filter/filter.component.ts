import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { iSetting } from '../../../../../../../../server/src/setting/setting.interface';
import { iUser } from '../../../../../../../../server/src/users/users.dto';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() done = new EventEmitter<any>();
  constructor(
    public app: AppService
  ) {
    this.setting = {
      category: [],
      priorty: []
    }
  }
  filter: {
    assignTo?: string;
    status?: number;
    category?: string;
    priorty?: string;
  } = {}
  status: { id: number, name: string }[] = [
    {
      id: 0,
      name: "Wating"
    },
    {
      id: 1,
      name: "Assign"
    },
    {
      id: 2,
      name: "Finsh"
    },
  ]
  setting: iSetting;
  users: iUser[] = []
  ngOnInit(): void {
    this.getSetting();
    this.getUsers();
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
}
