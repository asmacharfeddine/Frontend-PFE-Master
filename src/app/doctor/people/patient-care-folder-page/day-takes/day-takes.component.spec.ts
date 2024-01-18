import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTakesComponent } from './day-takes.component';

describe('DayTakesComponent', () => {
  let component: DayTakesComponent;
  let fixture: ComponentFixture<DayTakesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayTakesComponent]
    });
    fixture = TestBed.createComponent(DayTakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
