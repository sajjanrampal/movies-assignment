import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.getDate(this.currentPageNo);
  }

  getDate(currentPageNo: number) {
    this.service.getPeople(currentPageNo).subscribe({
      next: (res: any) => {
        this.people = res.results;
        this.isPrevious = res.previous;
        this.isNext = res.next;
        this.loading = false;
      },
      error: (err) => {},
    });
  }

  searchData(event: any) {
    if (event.key === 'Enter') {
      this.service.searchPeople(event.currentTarget.value).subscribe({
        next: (res: any) => {
          debugger;
          this.people = res.results;
          this.isPrevious = '';
          this.isNext = '';
          this.loading = false;
        },
        error: (err) => {
          debugger;
        },
      });
    }
  }

  nextData() {
    this.loading = true;
    this.getDate(+this.isNext.split('=')[1]);
  }

  previousData() {
    this.loading = true;
    this.getDate(+this.isPrevious.split('=')[1]);
  }

  openChaccterDetail(user: any) {
    debugger
    let userUrl = user.url.split('/');
    let userId = userUrl[userUrl.length -2]
    this.router.navigate(["/dashboard/character",userId]);
  }
}
