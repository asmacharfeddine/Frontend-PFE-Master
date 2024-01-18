import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalTreatmentsListComponent } from './physical-treatments-list.component';

describe('PhysicalTreatmentsListComponent', () => {
  let component: PhysicalTreatmentsListComponent;
  let fixture: ComponentFixture<PhysicalTreatmentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicalTreatmentsListComponent]
    });
    fixture = TestBed.createComponent(PhysicalTreatmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
