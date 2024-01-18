import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomGroupComponent } from './room-group.component';

describe('RoomGroupComponent', () => {
  let component: RoomGroupComponent;
  let fixture: ComponentFixture<RoomGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomGroupComponent]
    });
    fixture = TestBed.createComponent(RoomGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
