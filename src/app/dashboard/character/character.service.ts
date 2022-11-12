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

  //get the character by Id
  getPeople(id:any) {
    return this.apiService.sendRequest({
      method: 'get',
      endpoint: `people/${id}`,
    });
  }

  //get the films name from the swapi, which are present in films array of charater object
  getFilmsName(films: any) {  
    let requestArr = []
    for (const film of films) { 
      requestArr.push(this.http.get(film))
    }
    return forkJoin(requestArr);
  }

  //get the movies name form the themoviedb api, pass the films name, which are presnts in swapi character api
  getmoviesFromMovieDbApis(films: any) {  
    let requestArr = []
    for (const film of films) { 
      requestArr.push(this.http.get(`${environment.themoviedbAPI}search/movie?api_key=${environment.APIKey}&query=${film.title}`))
    }
    return forkJoin(requestArr);
  }

  //get the single movie object fron showing the details
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
