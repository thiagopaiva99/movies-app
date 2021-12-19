import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { datatype, name, system } from 'faker';
import { environment } from '../../../environments/environment';

import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let service: SeriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SeriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get series list', (done) => {
    const mock = {
      page: 1,
      results: [
        {
          backdrop_path: system.filePath(),
          id: datatype.number(),
          name: name.title(),
          poster_path: system.filePath(),
          vote_average: datatype.number(),
          first_air_date: datatype.datetime().toString(),
        }
      ]
    }
    service.getSeries()
    .subscribe((movies) => {
      expect(movies[0].releaseDate).toBe(mock.results[0].first_air_date);
      expect(movies[0].voteAverage).toBe(mock.results[0].vote_average);
      expect(movies[0].title).toBe(mock.results[0].name);
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/tv/popular?page=1`)
    httpRequest.flush(mock)
  })
});
