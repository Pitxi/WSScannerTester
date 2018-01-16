import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-large-image-dialog',
  templateUrl: './large-image-dialog.component.html',
  styleUrls: ['./large-image-dialog.component.scss']
})
export class LargeImageDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LargeImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
