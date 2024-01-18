import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveIngredientsListComponent } from './active-ingredients-list.component';

describe('ActiveIngredientsListComponent', () => {
  let component: ActiveIngredientsListComponent;
  let fixture: ComponentFixture<ActiveIngredientsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveIngredientsListComponent]
    });
    fixture = TestBed.createComponent(ActiveIngredientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
