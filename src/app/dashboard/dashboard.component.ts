import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounce, interval } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  people: any;
  isPrevious: string = '';
  isNext: string = '';
  currentPageNo: number = 1;
  loading: boolean = true;
  constructor(private readonly service: DashboardService,private readonly router: Router,) {}

  ngOnInit(): void {
    //call character with default page no 1 
    this.getDate(this.currentPageNo);
  }

  //GET Character with page no 
  getDate(currentPageNo: number) {
    this.service.getPeople(currentPageNo).subscribe({
      next: (res: any) => {
        this.people = res.results;
        this.isPrevious = res.previous;
        this.isNext = res.next;
        this.loading = false;
      },
      error: (err) => {
        console.log(`Opps! An Error occurred, Status Code is ${err.error.status_code}, Message is ${err.error.status_message}`)
      },
    });
  }

  //Get Character from the search bar.
  searchData(event: any) {
    // if (event.key === 'Enter') {
      this.service.searchPeople(event.currentTarget.value).pipe(debounce(() => interval(500))).subscribe({
        next: (res: any) => {
          debugger
          this.people = res.results;
          this.isPrevious = '';
          this.isNext = '';
          this.loading = false;
        },
        error: (err) => {
         console.log(`Opps! An Error occurred, Status Code is ${err.error.status_code}, Message is ${err.error.status_message}`)
        },
      });
    // }
  }

  //next page of character
  nextData() {
    this.loading = true;
    this.getDate(+this.isNext.split('=')[1]);
  }

  //next previous of character
  previousData() {
    this.loading = true;
    this.getDate(+this.isPrevious.split('=')[1]);
  }

  //Open the single character details screen
  openChaccterDetail(user: any) {
    let userUrl = user.url.split('/');
    let userId = userUrl[userUrl.length -2]
    this.router.navigate(["/dashboard/character",userId]);
  }
}
