import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { RouterModule } from '@angular/router';
import { PageModule } from 'src/public/page/page.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    PageModule,
    MatFormFieldModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSlideToggleModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path: "",
        component: SettingComponent
      }
    ])
  ]
})
export class SettingModule { }
