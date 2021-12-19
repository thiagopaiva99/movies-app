import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { datatype, image, lorem, name } from 'faker';
import { of, throwError } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { MoviesService } from '../../../../core/services/movies.service';

import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: datatype.number() })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    moviesService = TestBed.inject(MoviesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to to page-not-found if not found movie by id', () => {
    jest.spyOn(moviesService, 'getById').mockReturnValue(throwError({ status: 404}));
    jest.spyOn(router, 'navigate').mockImplementation();
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['page-not-found']);
  })

  it('should do nothing if movie service return error but is not 404', () => {
    jest.spyOn(moviesService, 'getById').mockReturnValue(throwError({ status: 500 }));
    jest.spyOn(router, 'navigate').mockImplementation();
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  })

  it('should set movie object with object returned from service', () => {
    const movie = {
      id: datatype.number(),
      title: name.title(),
      imageUrl: image.imageUrl(),
      releaseDate: datatype.datetime().toString(),
      originalLanguage: 'en',
      voteAverage: datatype.number({ min: 1, max: 100 }),
      overview: lorem.paragraph(),
      genres: [],
    }
    jest.spyOn(moviesService, 'getById').mockReturnValue(of(movie));
    jest.spyOn(router, 'navigate').mockImplementation();
    component.ngOnInit();
    expect(component.movie).toEqual(movie)
  })

  it('should redirect to recommendation movie on click on it', () => {
    const id = datatype.number();
    jest.spyOn(router, 'navigate').mockImplementation();
    component.onRecommendationClick({ id } as Movie);
    expect(router.navigate).toHaveBeenCalledWith(['/movie', id, 'details'], { skipLocationChange: true })
  })
});
