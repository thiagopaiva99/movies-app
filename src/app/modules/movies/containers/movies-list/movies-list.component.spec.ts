import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { datatype, random } from 'faker';
import { of } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { MoviesService } from '../../../../core/services/movies.service';

import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    moviesService = TestBed.inject(MoviesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect to page-not-found if category param is not present on Map', () => {
    Object.assign(activatedRoute.snapshot.params, { category: 'not-found' });
    jest.spyOn(router, 'navigate').mockImplementation();
    component.ngOnInit()
    expect(router.navigate).toHaveBeenCalledWith(['page-not-found']);
  })

  it('should load movies with correct category', () => {
    const category = random.arrayElement(['most-popular', 'now-playing', 'top-rated']);
    Object.assign(activatedRoute.snapshot.params, { category });
    jest.spyOn(moviesService, 'getMoviesByCategory').mockReturnValue(of([]));
    component.ngOnInit()
    const expectedCategory = component.categories.get(category)!.apiValue;
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledWith(expectedCategory, 1);
  })

  it('should do nothing on scroll when is already loading', () => {
    const category = random.arrayElement(['most-popular', 'now-playing', 'top-rated']);
    Object.assign(activatedRoute.snapshot.params, { category });
    jest.spyOn(moviesService, 'getMoviesByCategory').mockReturnValue(of([]));
    component.ngOnInit()
    const expectedCategory = component.categories.get(category)!.apiValue;
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledWith(expectedCategory, 1);
    component.isLoadingMoreMovies = true;
    component.onScroll();
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledTimes(1)
  })

  it('should load movies with correct category and page on scroll hit the end', () => {
    const category = random.arrayElement(['most-popular', 'now-playing', 'top-rated']);
    Object.assign(activatedRoute.snapshot.params, { category });
    jest.spyOn(moviesService, 'getMoviesByCategory').mockReturnValue(of([]));
    component.ngOnInit()
    const expectedCategory = component.categories.get(category)!.apiValue;
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledWith(expectedCategory, 1);
    component.onScroll();
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledWith(expectedCategory, 2);
  })

  it('should load movies with correct category and update route on tab change', () => {
    let category = random.arrayElement(['most-popular', 'now-playing', 'top-rated']);
    let expectedCategory = component.categories.get(category)!.apiValue;
    Object.assign(activatedRoute.snapshot.params, { category });
    jest.spyOn(router, 'navigate').mockImplementation();
    jest.spyOn(moviesService, 'getMoviesByCategory').mockReturnValue(of([]));
    component.ngOnInit()
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledWith(expectedCategory, 1);
    category = random.arrayElement(['most-popular', 'now-playing', 'top-rated']);
    expectedCategory = component.categories.get(category)!.apiValue;
    component.onTabChange(category);
    expect(router.navigate).toHaveBeenCalledWith(['movie', category]);
    expect(moviesService.getMoviesByCategory).toHaveBeenCalledWith(expectedCategory, 1);
  })

  it('should redirect to detail page with movie id on route param', () => {
    jest.spyOn(router, 'navigate').mockImplementation();
    const id = datatype.number();
    component.onMovieClick({ id } as Movie);
    expect(router.navigate).toHaveBeenCalledWith(['movie', id, 'details']);
  })

  it('should redirect to search page with movie search on query params', () => {
    jest.spyOn(router, 'navigate').mockImplementation();
    const query = random.word();
    component.onSearch(query)
    expect(router.navigate).toHaveBeenCalledWith(['movie', 'search'], { queryParams: { query } });
  })
});
