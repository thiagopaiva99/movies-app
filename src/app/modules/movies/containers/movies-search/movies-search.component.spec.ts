import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { datatype, lorem, random } from 'faker';
import { of } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { MoviesService } from '../../../../core/services/movies.service';

import { MoviesSearchComponent } from './movies-search.component';

describe('MoviesSearchComponent', () => {
  let component: MoviesSearchComponent;
  let fixture: ComponentFixture<MoviesSearchComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesSearchComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesSearchComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    moviesService = TestBed.inject(MoviesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies with correct search', () => {
    const query = lorem.word();
    Object.assign(activatedRoute.snapshot.queryParams, { query });
    jest.spyOn(moviesService, 'search').mockReturnValue(of([]));
    component.ngOnInit()
    expect(moviesService.search).toHaveBeenCalledWith(query, 1);
  })

  it('should search movies with correct query and page on scroll hit the end', () => {
    const query = lorem.word();
    Object.assign(activatedRoute.snapshot.queryParams, { query });
    jest.spyOn(moviesService, 'search').mockReturnValue(of([]));
    component.ngOnInit()
    expect(moviesService.search).toHaveBeenCalledWith(query, 1);
    component.onScroll()
    expect(moviesService.search).toHaveBeenCalledWith(query, 2);
  })

  it('should do nothing on scroll when is already loading', () => {
    const query = lorem.word();
    Object.assign(activatedRoute.snapshot.queryParams, { query });
    jest.spyOn(moviesService, 'search').mockReturnValue(of([]));
    component.ngOnInit()
    expect(moviesService.search).toHaveBeenCalledWith(query, 1);
    component.isLoading = true;
    component.onScroll()
    expect(moviesService.search).toHaveBeenCalledTimes(1)
  })

  it('should search movies with correct search', () => {
    let query = lorem.word();
    Object.assign(activatedRoute.snapshot.queryParams, { query });
    jest.spyOn(moviesService, 'search').mockReturnValue(of([]));
    jest.spyOn(router, 'navigate').mockImplementation();
    component.ngOnInit()
    expect(moviesService.search).toHaveBeenCalledWith(query, 1);
    query = lorem.word()
    component.onSearch(query)
    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { query } });
    expect(moviesService.search).toHaveBeenCalledWith(query, 1);
  })

  it('should redirect to detail page with movie id on route param', () => {
    jest.spyOn(router, 'navigate').mockImplementation();
    const id = datatype.number();
    component.onMovieClick({ id } as Movie);
    expect(router.navigate).toHaveBeenCalledWith(['movie', id, 'details']);
  })
});
