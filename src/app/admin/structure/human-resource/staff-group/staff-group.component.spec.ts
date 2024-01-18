import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGroupComponent } from './staff-group.component';

describe('StaffGroupComponent', () => {
  let component: StaffGroupComponent;
  let fixture: ComponentFixture<StaffGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffGroupComponent]
    });
    fixture = TestBed.createComponent(StaffGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
