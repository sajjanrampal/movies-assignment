import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<MovieComponent>,) {}

  ngOnInit(): void {
    this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
