import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { internet } from 'faker';
import { environment } from '../../../environments/environment';

import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ConfigurationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set configuration successfully', fakeAsync(() => {
    const mockResponse = {
      images: {
        base_url: internet.url(),
        poster_sizes: ['w92']
      }
    };

    service.setConfiguration()
    tick()

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/configuration`);
    httpRequest.flush(mockResponse);

    const baseUrl = service.getConfiguration('baseUrl');
    expect(baseUrl).toBe(mockResponse.images.base_url);

    const posterSizes = service.getConfiguration('posterSizes');
    expect(posterSizes).toBe(mockResponse.images.poster_sizes);
  }))
});
