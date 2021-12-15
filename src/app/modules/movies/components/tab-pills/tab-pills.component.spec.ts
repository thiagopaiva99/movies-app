import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPillsComponent } from './tab-pills.component';

describe('TabPillsComponent', () => {
  let component: TabPillsComponent;
  let fixture: ComponentFixture<TabPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
