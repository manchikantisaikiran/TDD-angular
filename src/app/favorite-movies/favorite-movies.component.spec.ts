import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FavoriteMoviesService } from '../services/favorite-movies-service.service';

import { FavoriteMoviesComponent } from './favorite-movies.component';
import { favoriteMovies } from './favoritemovies';

xdescribe('Render FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;
  let favoriteMovieService: FavoriteMoviesService;
  let spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteMoviesComponent],
      providers: [FavoriteMoviesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    component.favoriteMovies = favoriteMovies;
    favoriteMovieService = TestBed.inject(FavoriteMoviesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.innerText).toBe('Favorite movies');
  });

  it('show all the favorite movies', () => {
    const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
    expect(movieElements.length).toBe(favoriteMovies.length);
  });

  it('should show the movie titles', () => {
    const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
    movieElements.forEach((movieElement: DebugElement, index) => {
      expect(movieElement.nativeElement.innerHTML).toContain(
        favoriteMovies[index].title
      );
    });
  });

  it('should get the movies from the service', () => {
    // const service = jasmine.createSpyOn('favoriteMovieService', [
    //   'getFavoriteMovies',
    // ]);,
    spyOn(favoriteMovieService,'getFavoriteMovies').and.returnValue(undefined);
    // spy = service.getFavoriteMovies
    expect(favoriteMovieService.getFavoriteMovies).toHaveBeenCalled();
  });
});
