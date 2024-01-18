import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalTreatmentService } from '../../physicalTreatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { PhysicalTreatment } from '../../physicalTreatment.model';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, ErrorObserver, of } from 'rxjs'; // Import throwError correctly
import { PhysicalTreatmentCategory } from 'app/admin/categories/categories-list/category.model';
import { CategoryService } from 'app/admin/categories/categories-list/category.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  physicalTreatmentForm: FormGroup;
  //physicalTreatment: PhysicalTreatment = new PhysicalTreatment();
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private fb: FormBuilder,

    private physicalTreatmentService: PhysicalTreatmentService,
    private router: Router,
    private route: ActivatedRoute,

    private snackBar: MatSnackBar,
    private categoryService: CategoryService) {
    this.physicalTreatmentForm = this.fb.group({
      treatmentName: ['', {
        validators: [Validators.required],asyncValidators: [this.checkTreatmentNameExists()],
        //asyncValidators: [this.checkTreatmentName()],
        //updateOn: 'blur'
      }],
      treatmentDescription: [''],
      duration: [''],
      notes: [''],
      // category fields
      categoryName: ['',Validators.required],
    });
  }

  treatmentNameExists: boolean=false;
  existingTreatments: PhysicalTreatment[]=[];
  existingTreatmentNames: string[] = [];

  categoryList: PhysicalTreatmentCategory[] | undefined;
  categoryNames: string[] = [];
  categories: PhysicalTreatmentCategory[] = [];
  //phys : PhysicalTreatment = new PhysicalTreatment();

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

  goToPhysicalTreatmentList(){
    this.router.navigate(['/admin/physicalTreatments/all-physicalTreatments'])
  }
  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getAllPhysicalTreatmentCategories().subscribe(
      (response) => {
        this.categoryList = response;

        // Extract an array of names from the categoryList (categoryList is gonna be the list of categories that comes from the backend)
        this.categoryNames = this.categoryList.map(category => category.categoryName);

        // table of categories initilized empty and we gonna fill it with our database categories
        this.categories = this.categoryList.map(category => category);

        console.log('Category names:', this.categoryNames);
      },
      (error) => {
        console.error('Error getting categories:', error);
      }
    );
  }


  onSubmit() {
    console.log("added successfully")
  }
  goToTreatmentsList() {
    this.router.navigate(['/admin/physicalTreatments/all-physicalTreatments'])
  }


  savePhysicalTreatment() {
    //console.log('hello')

    const phys: Partial<PhysicalTreatment> = {
      treatmentName: this.physicalTreatmentForm?.get('treatmentName')?.value,
      treatmentDescription: this.physicalTreatmentForm?.get('treatmentDescription')?.value,
      duration: this.physicalTreatmentForm?.get('duration')?.value,
      notes: this.physicalTreatmentForm?.get('notes')?.value,
      // physicalTreatmentCategory: this.physicalTreatmentForm?.get('categoryName')?.value,
    };

    console.log('Physical tratment add', phys);

    if (this.physicalTreatmentForm.valid) {
      console.log('the data exists');
      console.log('physical tratment', this.physicalTreatmentForm?.get('categoryName')?.value);
      this.categoryService.addTreatmentToCategory
        (this.physicalTreatmentForm?.get('categoryName')?.value, phys).subscribe(data => {
          console.log(data);
          this.goToTreatmentsList();
        },

          error => console.log(error))
    }
    this.goToPhysicalTreatmentList();

  }




   // Custom async validator for checking if the treatment name exists
   checkTreatmentNameExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const treatmentName = control.value;

      this.physicalTreatmentService.getAllPhysicalTreatments().subscribe(
        (response) => {
          this.existingTreatments = response;

          // Extract an array of names from the categoryList (categoryList is gonna be the list of categories that comes from the backend)
          this.existingTreatmentNames = this.existingTreatments.map(treatment => treatment.treatmentName);})
      if (!treatmentName) {
        return of(null); // No validation if the field is empty
      }

      // Check if the treatment name exists in the local list
      const exists = this.existingTreatmentNames.includes(treatmentName);

       // Set the validity of the form control
       if (exists) {
        return of({ treatmentNameExists: true }); // Set the error if the name already exists
      } else {
        return of(null); // Clear the error if the name doesn't exist
      }
    };
  }


}
