import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Input() data!: { name: string, icon: string };
  @Input() buttons: (pageButton | undefined)[] = [];
  constructor() { }
}


export interface pageButton {
  icon: string | undefined,
  action: () => void,
  name?: () => string;
  flat?: boolean;
  isIcon?: boolean;
}