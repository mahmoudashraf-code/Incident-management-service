import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DoneErrorDialogData } from '../done-dialog/done-dialog.component';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DoneErrorDialogData | undefined,
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    public app: AppService
  ) { }
  ngOnInit(): void {
    this.dialogRef.updateSize("300px");
  }
}
