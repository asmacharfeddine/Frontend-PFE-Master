import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCareFolderPageComponent } from './patient-care-folder-page.component';

describe('PatientCareFolderPageComponent', () => {
  let component: PatientCareFolderPageComponent;
  let fixture: ComponentFixture<PatientCareFolderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientCareFolderPageComponent]
    });
    fixture = TestBed.createComponent(PatientCareFolderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
