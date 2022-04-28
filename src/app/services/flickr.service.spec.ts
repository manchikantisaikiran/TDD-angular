import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FlickrService } from './flickr.service';

interface Photo {
  id: string;
  title: string;
  tags: string;
  owner: string;
  ownername: string;
  datetaken: string;
  url_q: string;
  url_m: string;
}

interface PhotosStateSlice {
  searchTerm: string;
  photos: Photo[];
  currentPhoto: Photo | null;
}

const photo1: Photo = {
  id: '50179462511',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (1)',
  url_q: 'https://live.staticflickr.com/65535/50179462511_0752249fba_q.jpg',
  url_m: 'https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg',
  datetaken: '2020-06-21T15:16:07-08:00',
  owner: '12639178@N07',
  ownername: 'naturgucker.de',
  tags: 'ngidn2020772215 calopteryxvirgo blauflügelprachtlibelle',
};

const photo1Link = `https://www.flickr.com/photos/${photo1.owner}/${photo1.id}`;

const photo2: Photo = {
  id: '50178927498',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (2)',
  url_q: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_q.jpg',
  url_m: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_m.jpg',
  datetaken: '2020-06-21T15:16:17-08:00',
  owner: '12639178@N07',
  ownername: 'naturgucker.de',
  tags: 'ngid657236235 calopteryxvirgo blauflügelprachtlibelle',
};

const photo2Link = `https://www.flickr.com/photos/${photo1.owner}/${photo1.id}`;

const photos: Photo[] = [photo1, photo2];
const searchTerm = 'calopteryx';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `https://www.flickr.com/services/rest/?tags=${encodedSearchTerm}&method=flickr.photos.search&format=json&nojsoncallback=1&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m&api_key=c3050d39a5bb308d9921bef0e15c437d`;

const initialState: PhotosStateSlice = {
  searchTerm: '',
  photos: [],
  currentPhoto: null,
};

const stateWithSearchTerm: PhotosStateSlice = {
  searchTerm,
  photos: [],
  currentPhoto: null,
};

const stateWithPhotos: PhotosStateSlice = {
  searchTerm,
  photos,
  currentPhoto: null,
};

const stateWithCurrentPhoto: PhotosStateSlice = {
  searchTerm,
  photos,
  currentPhoto: photo1,
};

describe('FlickrService', () => {
  let flickrService: FlickrService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlickrService],
    });
    flickrService = TestBed.inject(FlickrService);
    controller = TestBed.inject(HttpTestingController);
  });

  // Verify that all requests have been answered
  afterEach(() => {
    controller.verify();
  });

  it('searches for public photos', () => {
    let actualPhotos: Photo[] | undefined;
    //Call the method under test that sends HTTP requests
    flickrService.searchPublicPhotos(searchTerm).subscribe((otherPhotos) => {
      actualPhotos = otherPhotos;
    });

    // Find pending requests
    const request = controller.expectOne(expectedUrl)
    
    //Respond to these requests with fake data
    request.flush({ photos: { photo: photos } });
  
    //Check the result of the method call
    expect(actualPhotos).toEqual(photos);
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    flickrService.searchPublicPhotos(searchTerm).subscribe(
      () => {
        fail('next handler must not be called');
      },
      (error) => {
        actualError = error;
      },
      () => {
        fail('complete handler must not be called');
      },
    );

    controller.expectOne(expectedUrl).error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});