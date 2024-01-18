import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CategoryService } from '../../category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicalTreatmentCategory } from '../../category.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { map, catchError } from 'rxjs/operators';
import {Observable,of } from 'rxjs'
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

/*export interface DialogData {
  categoryId: number;
  id: number;
  name: string;
}*/
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {
  //category: PhysicalTreatmentCategory =new PhysicalTreatmentCategory();



  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhysicalTreatmentCategory,
    public categoryService: CategoryService

    ) {}
    /*private fb: FormBuilder,

    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,

    private snackBar: MatSnackBar

  ) {
    this.categoryId = data.categoryId;
    this.categoryForm = this.fb.group({
    categoryName: [{
       Validators: [Validators.required],
        asyncValidators: [this.categoryNameValidator(this.categoryService)],
  }],
    categoryDescription: ['']
  });
  }*/
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*confirmDelete(): void {
    this.categoryService.deletePhysicalTreatmentCategoryById(this.data.id);
  }*/

  /*deleteCategory(categoryId: number){
    this.categoryService.deletePhysicalTreatmentCategoryById(categoryId).subscribe({
      next: (res) => {
        alert('PhysicalTreatmentCategory deleted!');
    },
    error: console.log,})
  }*/

  /*categoryNameValidator(categoryService: CategoryService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const categoryName = control.value;
      return categoryService.checkCategoryNameExists(categoryName).pipe(
        map(isExists => isExists ? { categoryNameExists: true } : null),
        catchError(() => of(null))
      );
    };*/
}


