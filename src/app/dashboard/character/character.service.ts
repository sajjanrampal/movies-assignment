import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

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

  getmoviesFromMovieDbApis(films: any) {  
    let requestArr = []
    for (const film of films) { 
      requestArr.push(this.http.get(`${environment.themoviedbAPI}search/movie?api_key=${environment.APIKey}&query=${film.title}`))
    }
    return forkJoin(requestArr);
  }

  getTheMovieDetail(id:any) {
    return this.apiService.sendRequest({
      apiBase:environment.themoviedbAPI,
      method: 'get',
      endpoint: `movie/${id}`,
      queryParams: {
        api_key:environment.APIKey
      }
    });
  }
}
