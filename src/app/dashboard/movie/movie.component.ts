import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  //get the data of selected movie and bind with view
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<MovieComponent>,) {}

  ngOnInit(): void {
    this.data;
  }

  //close the dailog box
  onNoClick(): void {
    this.dialogRef.close();
  }

}
