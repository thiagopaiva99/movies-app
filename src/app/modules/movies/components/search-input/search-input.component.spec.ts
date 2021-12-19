import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { lorem } from 'faker';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit inputed value on button click if useSearchButton input is passed', () => {
    jest.spyOn(component.onSearch, 'emit');
    component.useSearchButton = true;
    const value = lorem.words()
    component.input.setValue(value);
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSearch.emit).toHaveBeenCalledWith(value);
  })

  it('should emit inputed value on write if useSearchButton input is not passed', fakeAsync(() => {
    jest.spyOn(component.onSearch, 'emit');
    component.useSearchButton = false;
    component.ngOnInit()
    const value = lorem.words()
    component.input.setValue(value);
    tick(500);
    expect(component.onSearch.emit).toHaveBeenCalledWith(value);
  }))

  it('should set initial value on form control', () => {
    const value = lorem.words();
    component.initialValue = value;
    component.ngOnInit();
    expect(component.input.value).toBe(value);
  })
});
