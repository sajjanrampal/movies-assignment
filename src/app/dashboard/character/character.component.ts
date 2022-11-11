import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  filmsTitles: any;
  constructor(private readonly route: ActivatedRoute,private readonly service: CharacterService,) { 
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
      },
      error: (err) => {},
    });
   
  }

  ngOnInit(): void {
  }

}
