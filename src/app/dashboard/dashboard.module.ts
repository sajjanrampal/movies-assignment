import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterComponent } from './character/character.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MovieComponent } from './movie/movie.component';
@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
       {
        path: 'character/:id',
        component: CharacterComponent,
      },
    ]),
  ],
  declarations: [DashboardComponent, CharacterComponent, MovieComponent],
  providers: [],
})
export class DashboardModule {}
