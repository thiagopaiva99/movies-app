import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPillComponent } from './tab-pill.component';

describe('TabPillComponent', () => {
  let component: TabPillComponent;
  let fixture: ComponentFixture<TabPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
