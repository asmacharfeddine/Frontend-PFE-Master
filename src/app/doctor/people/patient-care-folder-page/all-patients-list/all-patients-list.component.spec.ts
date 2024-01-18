import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatientsListComponent } from './all-patients-list.component';

describe('AllPatientsListComponent', () => {
  let component: AllPatientsListComponent;
  let fixture: ComponentFixture<AllPatientsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPatientsListComponent]
    });
    fixture = TestBed.createComponent(AllPatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
