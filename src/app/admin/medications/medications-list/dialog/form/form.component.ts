import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MedicationsService } from '../../medications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActiveIngredientsListComponent } from '../active-ingredients-list/active-ingredients-list.component';
import { ActiveIngredientService } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredientsService';
import { ActiveIngredient } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredient.model';
import {FormControl} from '@angular/forms';
import { Medication } from '../../medication.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  medicationForm: FormGroup;
  ActiveIngredients = new FormControl('');

  activeIngredientsList: ActiveIngredient[]=[];
  activeIngredientsNames : string[]=[];
  ingredients: ActiveIngredient[] = [];
  medications: Medication[]
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,
    private _dialog: MatDialog,


    private medicationService: MedicationsService,
    private router: Router,
    private activeIngredientService: ActiveIngredientService,

    private snackBar: MatSnackBar


    ){
      this.medicationForm = this.fb.group({
        code:['',[Validators.required], [this.medicationCodeValidator()]],
        name:['', [Validators.required], [this.medicationNameValidator()]],
        dosageForm:[''],
        type:[''],
        force:[''],
        ActiveIngredients:[[]],
      });
      this.medications = data.medications;
    }

    openActiveIngredientsForm(){
      this._dialog.open(ActiveIngredientsListComponent)
    }
  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }


  loadActiveIngredients(){
    this.activeIngredientService.getAllActiveIngredients().subscribe((response) => {
      this.activeIngredientsList = response;

      this.activeIngredientsNames = this.activeIngredientsList.map(ingredient => ingredient.valueName);

      this.ingredients = this.activeIngredientsList.map(ingredient => ingredient);

      console.log('ingredients names:', this.activeIngredientsNames);

    },
    (error)=> {
      console.error('Error getting active ingredients:', error);
    }
    );
   }

   onActiveIngredientsSelectionChange() {
    const selectedIds = this.ActiveIngredients.value;
    this.medicationForm.get('ActiveIngredients')?.setValue(selectedIds);
    return selectedIds;
   // console.log("selecteeed idss",selectedIds);
  }

  addMedication(){

    const med = this.medicationForm.value;
    if (this.medicationForm.valid) {
      console.log('medication', this.medicationForm?.get('ActiveIngredients')?.value);
      console.log(med)
      this.medicationService.addMedication(med,this.medicationForm?.get('ActiveIngredients')?.value).subscribe(
        (response) => {
          this.dialogRef.close(1);
          this.goToMedicationsList();
          this.medications.push(response);
          console.log('Medication added successfully:', response);
        },
        (error) => {
          console.log('error adding medication:', error);
        }
      );
    }
  }

  goToMedicationsList(){
    this.router.navigate(['/admin/medications/all-medications'])
  }
  /*const medicationData = this.medicationForm.value;
    const activeIngredientIds = [1, 2, 3]; // Replace with your selected active ingredient IDs

    this.medicationService.addMedication(medicationData, activeIngredientIds).subscribe(
      (response) => {
        // Handle the successful response from your Spring Boot backend here
        console.log('Medication added successfully:', response);
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('Error adding medication:', error);
      }
    );
  }
}
In the onSubmit method, you can collect the form data from medicationForm and the selected active ingredient IDs. Replace [1, 2, 3] with the actual selected active ingredient IDs that you want to send to your Spring Boot backend.

Use the medicationService.addMedication() method to make the POST request to your Spring Boot controller. You can subscribe to the observable to handle the response or errors accordingly.

Make sure to replace the form controls and active ingredient IDs with your actual data.





 */


medicationNameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      const inputMedicationName = control.value;
      if (!inputMedicationName) {
        resolve(null); // If the field is empty, no need to check for duplicates
      } else {
        const isDuplicate = this.medications.some(
          (medicationItem) => medicationItem.name.toLowerCase() === inputMedicationName.toLowerCase()
        );

        resolve(isDuplicate ? { duplicated: true } : null);
      }
    });
  };
}

medicationCodeValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      const inputmedicationCode = control.value;
      if (!inputmedicationCode) {
        resolve(null); // If the field is empty, no need to check for duplicates
      } else {
        const isDuplicate = this.medications.some(
          (medicationItem) => medicationItem.code.toLowerCase() === inputmedicationCode.toLowerCase()
        );

        resolve(isDuplicate ? { duplicated: true } : null);
      }
    });
  };
}

ngOnInit(): void {

}
onSubmit(){
  //console.log(this.category);
  this.addMedication();
  // this.openSnackBar('PhysicalTreatmentCategory added successfully');
  // this.refreshCategoryList();
}

openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    panelClass: 'custom-snackbar',
    duration: 5000, // Duration in milliseconds
  });
}
}
