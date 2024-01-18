import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhysicalTreatmentService } from '../../physicalTreatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { PhysicalTreatment } from '../../physicalTreatment.model';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, ErrorObserver, of } from 'rxjs'; // Import throwError correctly
import { PhysicalTreatmentCategory } from 'app/admin/categories/categories-list/category.model';
import { CategoryService } from 'app/admin/categories/categories-list/category.service';
import { PhysicalTreatmentsListComponent } from '../../physical-treatments-list.component';
//import { Category } from 'app/admin/Models/category';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  recievedPhysicalTreatment: PhysicalTreatment;
  //categoryform = new FormControl<Category>(null);
  physicalTreatmentForm: FormGroup;
  //physicalTreatment: PhysicalTreatment = new PhysicalTreatment();
  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhysicalTreatment,


    private fb: FormBuilder,

    private physicalTreatmentService: PhysicalTreatmentService,
    private router: Router,
    private route: ActivatedRoute,

    private snackBar: MatSnackBar,
    private categoryService: CategoryService) {
    this.recievedPhysicalTreatment = this.data;
    this.physicalTreatmentForm = this.fb.group({
      treatmentName: ['', {
        validators: [Validators.required],
        asyncValidators: [this.checkTreatmentNameExists()],
        //asyncValidators: [this.checkTreatmentName()],
        //updateOn: 'blur'
      }],
      treatmentDescription: [''],
      duration: [''],
      notes: [''],
      categoryName: [''],
      //this.data.physicalTreatmentCategory.physicalTreatmentCategory_Key
      // category fields
      /*physicalTreatmentCategory: this.fb.group({
        categoryName:[''],
        categoryDescription: [''],
        physicalTreatmentCategory_Key: ['']

      }),*/
    });

  }

  treatmentNameExists: boolean=false;
  existingTreatments: PhysicalTreatment[]=[];
  existingTreatmentNames: string[] = [];

  categoryList: PhysicalTreatmentCategory[] | undefined;
  categoryNames: string[] = [];
  categories: PhysicalTreatmentCategory[] = [];
  phys: PhysicalTreatment | undefined;
  updatedPhysicalTreatment: PhysicalTreatment | undefined;

  OldcategoryName: String = '';
  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }


  // loading physical treatment data in the update form when we open it
  ngOnInit(): void {
    this.physicalTreatmentForm.valueChanges.subscribe((values) => {
      console.log('values', values)
    })
    this.loadCategories();
    console.log("datttttaaa", this.data);
    console.log(this.data.physicalTreatmentCategory?.categoryName);

    /*this.physicalTreatmentForm.patchValue(
                             this.data)*/

    if (this.recievedPhysicalTreatment) {
      this.physicalTreatmentForm.patchValue({
        treatmentName: this.recievedPhysicalTreatment.treatmentName,
        treatmentDescription: this.recievedPhysicalTreatment.treatmentDescription,
        duration: this.recievedPhysicalTreatment.duration,
        notes: this.recievedPhysicalTreatment.notes,
        categoryName: this.recievedPhysicalTreatment.physicalTreatmentCategory,
        //OldcategoryName : this.data.physicalTreatmentCategory.categoryName,
        //categoryName: this.data.physicalTreatmentCategory

      });
      console.log(this.physicalTreatmentForm.value);
      //this.physicalTreatmentForm.get('categoryName')?.setValue(this.data.physicalTreatmentCategory.physicalTreatmentCategory_Key);
    }





  }

  loadCategories() {
    this.categoryService.getAllPhysicalTreatmentCategories().subscribe(
      (response) => {
        this.categoryList = response;

        // Extract an array of names from the categoryList
        this.categoryNames = this.categoryList.map(category => category.categoryName);

        this.categories = this.categoryList.map(category => category);

        console.log('Category names:', this.categoryNames);
      },
      (error) => {
        console.error('Error getting categories:', error);
      }
    );
  }

  goToPhysicalTreatmentList() {
    this.router.navigate(['/admin/physicalTreatments/all-physicalTreatments'])
  }



  updatePhysicalTreatmentWithCatgeory() {
    const category: PhysicalTreatmentCategory = this.physicalTreatmentForm.get('categoryName')?.value;
    const UpdateFrom = this.physicalTreatmentForm.getRawValue();
    if (this.physicalTreatmentForm?.valid) {
      console.log(this.physicalTreatmentForm.value);
      console.log(this.recievedPhysicalTreatment.physicalTreatmentCategory);
      console.log(this.physicalTreatmentForm.get('categoryName')?.value)

      if (category.physicalTreatmentCategory_Key !== this.recievedPhysicalTreatment.physicalTreatmentCategory.physicalTreatmentCategory_Key) {
        UpdateFrom.physicalTreatmentCategory = category;
      }

      const newPhysicalTreatment: Partial<PhysicalTreatment> = {
        treatmentName: this.physicalTreatmentForm?.get('treatmentName')?.value,
        treatmentDescription: this.physicalTreatmentForm?.get('treatmentDescription')?.value,
        duration: this.physicalTreatmentForm?.get('duration')?.value,
        notes: this.physicalTreatmentForm?.get('notes')?.value,
      }

      if (this.physicalTreatmentForm?.get('categoryName')?.value.physicalTreatment_Key != this.recievedPhysicalTreatment.physicalTreatmentCategory.physicalTreatmentCategory_Key) {
        newPhysicalTreatment.physicalTreatmentCategory = this.physicalTreatmentForm?.get('categoryName')?.value;
      }
      else {
        newPhysicalTreatment.physicalTreatmentCategory = this.recievedPhysicalTreatment.physicalTreatmentCategory
      }

      this.physicalTreatmentService.updatePhysicalTreatmentWithCategory
        (this.recievedPhysicalTreatment.physicalTreatment_Key, newPhysicalTreatment).subscribe(
          (updatedPhysicalTreatment) => {
            console.log('treamtent updated: ', updatedPhysicalTreatment);
          },
          (error) => {
            console.error('Error Updating treatment: ', error);
          }

        );
      this.goToPhysicalTreatmentList();

      // goToPhysicalTreatmentList();
    }

  }
  // Custom async validator for checking if the treatment name exists
  checkTreatmentNameExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const treatmentName = control.value;

      this.physicalTreatmentService.getAllPhysicalTreatments().subscribe(
        (response) => {
          this.existingTreatments = response;

          //
          this.existingTreatmentNames = this.existingTreatments.map(treatment => treatment.treatmentName).filter(
            name => name !== this.recievedPhysicalTreatment.treatmentName
          );})


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
