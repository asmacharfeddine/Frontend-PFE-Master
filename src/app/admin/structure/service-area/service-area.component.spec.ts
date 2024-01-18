import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaComponent } from './service-area.component';

describe('ServiceAreaComponent', () => {
  let component: ServiceAreaComponent;
  let fixture: ComponentFixture<ServiceAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceAreaComponent]
    });
    fixture = TestBed.createComponent(ServiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
