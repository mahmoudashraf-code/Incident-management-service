import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-done-dialog',
  templateUrl: './done-dialog.component.html',
  styleUrls: ['./done-dialog.component.scss']
})
export class DoneDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DoneErrorDialogData | undefined,
    public dialogRef: MatDialogRef<DoneDialogComponent>,
    public app: AppService
  ) { }
  ngOnInit(): void {
    this.dialogRef.updateSize("300px");
  }
}

export interface DoneErrorDialogData {
  title: string;
}