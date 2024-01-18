import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuListComponent } from './ins-list.component';

describe('InsuListComponent', () => {
  let component: InsuListComponent;
  let fixture: ComponentFixture<InsuListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuListComponent]
    });
    fixture = TestBed.createComponent(InsuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
