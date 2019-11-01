import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFiltersComponent } from './date-filters.component';

describe('DateFiltersComponent', () => {
  let component: DateFiltersComponent;
  let fixture: ComponentFixture<DateFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
