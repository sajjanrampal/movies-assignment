import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characterId: any = '';
  character: any;
  swapiFilms: any;
  filmsTitles: any = [];
  movieTitlesFromTheMoviedbApis: any = [];
  constructor(private readonly route: ActivatedRoute,private readonly service: CharacterService,private readonly dialog: MatDialog) { 
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.characterId = params.get("id");
        this.getCharacterDetail();
       }
    });
  }

  getCharacterDetail() {
     this.service.getPeople( this.characterId).subscribe({
       next: (res: any) => {
         this.character = res;
         this.swapiFilms = this.character.films;
         this.getFilmsName()
      },
      error: (err) => {},
    });
  }

  getFilmsName() {
    this.service.getFilmsName(this.swapiFilms).subscribe({
      next: (res: any) => {
        this.filmsTitles = res;
        this.getmoviesFromMovieDbApis(this.filmsTitles)
      },
      error: (err) => {},
    });
   
  }

  getmoviesFromMovieDbApis(filmsTitles:any) {
    this.service.getmoviesFromMovieDbApis(filmsTitles).subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.movieTitlesFromTheMoviedbApis = this.movieTitlesFromTheMoviedbApis.concat(element.results)
        });
      },
      error: (err) => {},
    });
  }

  openDialog(movie:any) {
    this.service.getTheMovieDetail(movie.id).subscribe({
      next: (res) => {
        debugger
       this.dialog.open(MovieComponent, {
      data: res
    });
      }, error: (err) => {
        console.log(err.error);
        alert(`Opps! An Error occurred, Status Code is ${err.error.status_code}, Message is ${err.error.status_message}`)
    }})
   
  }

  ngOnInit(): void {
  }

}
