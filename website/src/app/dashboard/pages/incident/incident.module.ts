import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageModule } from 'src/public/page/page.module';
import { EditedComponent } from './edited/edited.component';
import { ListComponent } from './list/list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { FilterComponent } from './list/filter/filter.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    ListComponent,
    EditedComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    PageModule,
    MatSelectModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: "list/all",
            pathMatch: "full"
          },
          {
            path: 'list',
            redirectTo: "list/all",
            pathMatch: "full"
          },
          {
            path: 'edited',
            redirectTo: "edited/addNew",
            pathMatch: "full"
          },
          {
            path: "list/:id",
            component: ListComponent
          },
          {
            path: "edited/:id",
            component: EditedComponent
          }
        ]
      }
    ])
  ]
})
export class IncidentModule { }
