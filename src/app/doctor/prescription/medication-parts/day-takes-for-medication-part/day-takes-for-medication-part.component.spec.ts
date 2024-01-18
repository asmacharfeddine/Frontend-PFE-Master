import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTakesForMedicationPartComponent } from './day-takes-for-medication-part.component';

describe('DayTakesForMedicationPartComponent', () => {
  let component: DayTakesForMedicationPartComponent;
  let fixture: ComponentFixture<DayTakesForMedicationPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayTakesForMedicationPartComponent]
    });
    fixture = TestBed.createComponent(DayTakesForMedicationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
