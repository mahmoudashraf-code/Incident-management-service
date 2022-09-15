import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DoneDialogComponent } from './done-dialog/done-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DoneDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [DoneDialogComponent, ErrorDialogComponent]
})
export class DoneErrorDialogModule { }
