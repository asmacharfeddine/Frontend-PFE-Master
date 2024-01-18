import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { PhysicalTreatmentCategory } from '../../category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent  implements
OnInit{
 // id: number;
  //category: PhysicalTreatmentCategory =new PhysicalTreatmentCategory();
  categoryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,

    // Injection token to recieve the data which is a whole category to edit it
    @Inject(MAT_DIALOG_DATA) public data: PhysicalTreatmentCategory,

    private fb: FormBuilder,

    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,

    private snackBar: MatSnackBar

  ) {
    //this.id = this.route.snapshot.params['id']
    this.categoryForm = this.fb.group({
    categoryName: [{
       Validators: [Validators.required],
        asyncValidators: [this.categoryNameValidator(this.categoryService)],
  }],
    categoryDescription: ['']
  });




  }

  ngOnInit(): void { this.categoryForm.patchValue(this.data);}

  categoryNameValidator(categoryService: CategoryService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const categoryName = control.value;
      return categoryService.checkCategoryNameExists(categoryName).pipe(
        map(isExists => isExists ? { categoryNameExists: true } : null),
        catchError(() => of(null))
      );
    };
}

onCloseClick(): void {
  // You can optionally pass data back to the component that opened the dialog
  this.dialogRef.close(/* optional data to pass back */);
}

/*OnSubmit(){
  this.categoryService.updatePhysicalTreatmentCategory(this.data.id, this.data.category).subscribe(data => {
    this.goToCategoryList();
  }
  , error => console.log(error));


}*/

goToCategoryList(){
  this.router.navigate(['/admin/categories/all-categories'])
}

saveUpdateCategory(){
  if (this.categoryForm.valid){
  this.categoryService.updatePhysicalTreatmentCategory(this.categoryForm.value, this.data.physicalTreatmentCategory_Key).subscribe( data =>{
    console.log(data);
    this.goToCategoryList();
  },
  error => console.log(error));

}
}

onSubmit(){
  if (this.categoryForm.valid){
    this.categoryService.updatePhysicalTreatmentCategory(this.categoryForm.value, this.data.physicalTreatmentCategory_Key).subscribe( data =>{
      console.log(data);
      this.goToCategoryList();
    },
    error => console.log(error));

  }
}
}
