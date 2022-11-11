import { Component, OnInit } from '@angular/core';
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
  constructor(private readonly service: DashboardService) {}

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
}
