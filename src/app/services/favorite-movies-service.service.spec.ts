import { TestBed } from '@angular/core/testing';

import { FavoriteMoviesService } from './favorite-movies-service.service';

describe('FavoriteMoviesServiceService', () => {
  let service: FavoriteMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
