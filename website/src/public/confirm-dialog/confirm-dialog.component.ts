import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    public app: AppService
  ) { }
  ngOnInit(): void { }
}

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmCaption: string;
  cancelCaption: string;
}