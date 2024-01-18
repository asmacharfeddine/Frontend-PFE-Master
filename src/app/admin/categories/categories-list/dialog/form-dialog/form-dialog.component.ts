import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhysicalTreatmentCategory } from '../../category.model';
///import { PhysicalTreatmentCategory } from '../../category2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})

export class FormDialogComponent implements OnInit{
  category: PhysicalTreatmentCategory | undefined ;
  categoryForm: FormGroup;
  categories: PhysicalTreatmentCategory[]

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,

    private categoryService: CategoryService,
    private router: Router,
    private route : ActivatedRoute,

    private snackBar: MatSnackBar

  ) {
    this.categoryForm = this.fb.group({
    categoryName: ['', [Validators.required],[this.categoryNameValidator()]],
    categoryDescription: ['']
  });
  this.categories = data.categories;
  console.log('my categories', this.categories);
  }

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

  saveCategory(){

    const category : Partial<PhysicalTreatmentCategory> = {
      categoryName: this.categoryForm?.get('categoryName')?.value,
      categoryDescription: this.categoryForm?.get('categoryDescription')?.value,
    }

    if (this.categoryForm.valid){
    this.categoryService.createPhysicalTreatmentCategory(category).subscribe( data =>{
        this.dialogRef.close(1); // Return 1 to indicate successful addition
        this.goToCategoryList();
        this.categories.push(data);
        },
        (error) => {
          console.error('Error adding category :', error);
        }
      );
  }
}

  ngOnInit(): void {
  }

  goToCategoryList(){
    this.router.navigate(['/admin/categories/all-categories'])
  }
  // once we submit data the form data will be available in this method
  onSubmit(){
    //console.log(this.category);
    this.saveCategory();
    // this.openSnackBar('PhysicalTreatmentCategory added successfully');
    // this.refreshCategoryList();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      panelClass: 'custom-snackbar',
      duration: 5000, // Duration in milliseconds
    });
  }

  refreshCategoryList() {
    // Reload the current route to refresh the category list
    this.router.navigateByUrl('/admin/categories', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/categories/all-categories']);
    });
  }

    categoryNameValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve) => {
          const inputCategoryName = control.value;
          if (!inputCategoryName) {
            resolve(null); // If the field is empty, no need to check for duplicates
          } else {
            const isDuplicate = this.categories.some(
              (categoryItem) => categoryItem.categoryName.toLowerCase() === inputCategoryName.toLowerCase()
            );

            resolve(isDuplicate ? { duplicated: true } : null);
          }
        });
      };
  }

  isTextareaDisabled(): boolean {
    const categoryNameControl = this.categoryForm.get('categoryName');
    return !this.categoryForm.get('categoryName')?.valid || this.categoryForm.get('categoryName')?.untouched === true

  }

  deleteCategory(){

  }

}
