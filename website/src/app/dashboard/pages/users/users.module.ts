import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageModule } from 'src/public/page/page.module';
import { EditedComponent } from './edited/edited.component';
import { ListComponent } from './list/list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ListComponent,
    EditedComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    PageModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: "",
            component: ListComponent
          },
          {
            path: ":id",
            component: EditedComponent
          }
        ]
      }
    ])
  ]
})
export class UsersModule { }
