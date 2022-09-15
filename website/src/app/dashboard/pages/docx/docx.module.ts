import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocxComponent } from './docx.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocxComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: "",
        component: DocxComponent
      }
    ])
  ]
})
export class DocxModule { }
