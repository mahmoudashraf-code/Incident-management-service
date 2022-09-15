import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageModule } from 'src/public/page/page.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    PageModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: AccountComponent
      }
    ])
  ]
})
export class AccountModule { }
