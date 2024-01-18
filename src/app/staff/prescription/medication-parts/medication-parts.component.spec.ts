import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationPartsComponent } from './medication-parts.component';

describe('MedicationPartsComponent', () => {
  let component: MedicationPartsComponent;
  let fixture: ComponentFixture<MedicationPartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationPartsComponent]
    });
    fixture = TestBed.createComponent(MedicationPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
