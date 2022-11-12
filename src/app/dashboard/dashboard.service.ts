import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly apiService: ApiService) {}

  //get character from swapi apis
  getPeople(currentPageNo: number) {
    return this.apiService.sendRequest({
      method: 'get',
      endpoint: 'people',
      queryParams: { page: currentPageNo },
    });
  }

  //get character BY SEARCH KEYWORD from swapi apis
  searchPeople(keyword: string) {
    return this.apiService.sendRequest({
      method: 'get',
      endpoint: 'people',
      queryParams: { search: keyword },
    });
  }
}
