import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGroupLinkComponent } from './staff-group-link.component';

describe('StaffGroupLinkComponent', () => {
  let component: StaffGroupLinkComponent;
  let fixture: ComponentFixture<StaffGroupLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffGroupLinkComponent]
    });
    fixture = TestBed.createComponent(StaffGroupLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
