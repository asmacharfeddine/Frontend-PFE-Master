import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFormComponent } from './delete-form.component';

describe('DeleteFormComponent', () => {
  let component: DeleteFormComponent;
  let fixture: ComponentFixture<DeleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFormComponent]
    });
    fixture = TestBed.createComponent(DeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
