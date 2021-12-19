import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { datatype, random } from 'faker';
import { of } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { SeriesService } from '../../../../core/services/series.service';

import { SeriesListComponent } from './series-list.component';

describe('SeriesListComponent', () => {
  let component: SeriesListComponent;
  let fixture: ComponentFixture<SeriesListComponent>;
  let seriesService: SeriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesListComponent ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesListComponent);
    component = fixture.componentInstance;

    seriesService = TestBed.inject(SeriesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies with correct category', () => {
    jest.spyOn(seriesService, 'getSeries').mockReturnValue(of([]));
    component.ngOnInit()
    expect(seriesService.getSeries).toHaveBeenCalledWith(1);
  })

  it('should load movies with correct category and page on scroll hit the end', () => {
    jest.spyOn(seriesService, 'getSeries').mockReturnValue(of([]));
    component.ngOnInit()
    expect(seriesService.getSeries).toHaveBeenCalledWith(1);
    component.onScroll();
    expect(seriesService.getSeries).toHaveBeenCalledWith(2);
  })

  it('should dot nothing when scroll and is loading', () => {
    jest.spyOn(seriesService, 'getSeries').mockReturnValue(of([]));
    component.ngOnInit()
    expect(seriesService.getSeries).toHaveBeenCalledWith(1);
    component.isLoading = true;
    component.onScroll();
    expect(seriesService.getSeries).toHaveBeenCalledTimes(1)
  })
});
