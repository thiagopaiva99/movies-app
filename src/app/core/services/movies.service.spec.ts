import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { datatype, internet, lorem, name, system } from 'faker';
import { environment } from '../../../environments/environment';

import { MoviesService } from './movies.service';

const mockMoviesFactory = () => ({
  page: 1,
  results: [
    {
      id: 123123,
      poster_path: '/some-file-path',
      backdrop_path: '/some-file-path',
      release_date: '2021-12-17',
      genres: [],
      original_language: 'pt',
      overview: 'some description',
      title: 'some title',
      vote_average: 78,
    }
  ]
})

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies by category', (done) => {
    const category = lorem.word();

    service.getMoviesByCategory(category)
    .subscribe((movies) => {
      expect(movies).toMatchSnapshot('Movies List')
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/movie/${category}?page=1`)
    httpRequest.flush(mockMoviesFactory())
  })

  it('should get movies by recommendation', (done) => {
    const movieId = datatype.number();

    service.getRecommendations(movieId)
    .subscribe((movies) => {
      expect(movies).toMatchSnapshot('Recommendations List')
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/movie/${movieId}/recommendations`)
    httpRequest.flush(mockMoviesFactory())
  })

  it('should get movie by id', (done) => {
    const movieId = datatype.number();

    service.getById(movieId)
    .subscribe((movies) => {
      expect(movies).toMatchSnapshot('Movie By Id')
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/movie/${movieId}`)
    httpRequest.flush(mockMoviesFactory())
  })

  it('should search movie by query', (done) => {
    const query = lorem.word()

    service.search(query)
    .subscribe((movies) => {
      expect(movies).toMatchSnapshot('Search by Query')
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/search/movie?query=${query}&page=1`)
    httpRequest.flush(mockMoviesFactory())
  })

  it('should get movie credits', (done) => {
    const mock = {
      cast: [
        {
          id: 123213,
          name: 'some name',
          character: 'some character',
          profile_path: '/some-file-path',
        }
      ]
    }

    const movieId = datatype.number();

    service.getCredits(movieId)
    .subscribe((movies) => {
      expect(movies).toMatchSnapshot('Movie Casting')
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/movie/${movieId}/credits`)
    httpRequest.flush(mock)
  })
});
