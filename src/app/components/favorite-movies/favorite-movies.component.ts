import { Component, OnInit } from '@angular/core';
import { favoriteMovies } from './favoritemovies';


@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  favoriteMovies = favoriteMovies;

}
