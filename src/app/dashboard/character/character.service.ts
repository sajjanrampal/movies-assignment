import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private readonly apiService: ApiService, private http: HttpClient) {}

  getPeople(id:any) {
    return this.apiService.sendRequest({
      method: 'get',
      endpoint: `people/${id}`,
    });
  }

  getFilmsName(films: any) {  
    let requestArr = []
    for (const film of films) { 
      requestArr.push(this.http.get(film))
    }
    return forkJoin(requestArr);
  }
}
