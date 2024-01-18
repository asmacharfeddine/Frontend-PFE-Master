import { Component, Inject, OnInit } from '@angular/core';
import { Medication } from '../../medication.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicationsService } from '../../medications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActiveIngredientService } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredientsService';
import { MatIconModule } from '@angular/material/icon';
import { ActiveIngredient } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredient.model';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  recievedMedication: Medication;
  ActiveIngredients: FormControl;

  medicationUpdateForm: FormGroup;
  activeIngredientsList: ActiveIngredient[] = [];
  activeIngredientsNames: string[] = [];
  ingredients: ActiveIngredient[] = [];
  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medication,

    private fb: FormBuilder,

    private medicationService: MedicationsService,
    private router: Router,
    private route: ActivatedRoute,

    private snackBar: MatSnackBar,
    private activeIngredientService: ActiveIngredientService

  ) {
    this.recievedMedication = this.data;
    this.medicationUpdateForm = this.fb.group({
      code: ['', {
        validators: [Validators.required],

      }],
      name: ['', {
        validators: [Validators.required],

      }],
      dosageForm: [''],
      type: [''],
      force: [''],
      activeIngredients: [this.recievedMedication.activeIngredients.map(c => c.valueName)],
      //activeIngredients as the model not activeIngredientsIds
    });

    this.ActiveIngredients = new FormControl(
      this.recievedMedication.activeIngredients.map(ai => ai.activeIngredients_Key)
    );

    this.ActiveIngredients.valueChanges.subscribe(selectedKeys => {
      // Update the selectedActiveIngredientKeys array to keep track of selected keys
      this.selectedActiveIngredientKeys = selectedKeys;
    });
  }
  public values: any;
  ngOnInit(): void {
    this.medicationUpdateForm.valueChanges.subscribe((values) => {
      console.log('values', values)
    })

    if (this.recievedMedication) {
      this.medicationUpdateForm.patchValue({
        code: this.recievedMedication.code,
        name: this.recievedMedication.name,
        dosageForm: this.recievedMedication.dosageForm,
        type: this.recievedMedication.type,
        force: this.recievedMedication.force,
        activeIngredients: this.recievedMedication.activeIngredients.map(c => c.valueName),
      })
    }
    this.values = this.medicationUpdateForm.get('activeIngredients')?.value;
  }





  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close();
  }
  selectedActiveIngredientKeys: number[] = [];

  loadActiveIngredients() {

    this.activeIngredientService.getAllActiveIngredients().subscribe((response) => {
      this.activeIngredientsList = response;

      this.activeIngredientsNames = this.activeIngredientsList.map(ingredient => ingredient.valueName);

      this.ingredients = this.activeIngredientsList.map(ingredient => ingredient);
      this.selectedActiveIngredientKeys = this.recievedMedication.activeIngredients.map(ai => ai.activeIngredients_Key);

      // Determine which active ingredients should be preselected
      const activeIngredientIds = this.recievedMedication.activeIngredients.map(
        (ingredient) => ingredient.activeIngredients_Key
      );

      // Loop through active ingredients and mark them as selected if in the medication
      this.activeIngredientsList.forEach((ingredient) => {
        ingredient.selected = activeIngredientIds.includes(ingredient.activeIngredients_Key);
      });
      console.log(this.ingredients)
      console.log('ingredients names:', this.activeIngredientsNames);

    },
      (error) => {
        console.error('Error getting active ingredients:', error);
      }
    );
  }

  updateMedicationWithActiveIngredients() {


    const activeIngredientIds: number[] = this.ActiveIngredients.value;
    console.log('idssss', activeIngredientIds)
    // Convert selected activeIngredientIds to ActiveIngredient objects
    /*const selectedActiveIngredients: ActiveIngredient[] = this.activeIngredientsList
      .filter(ingredient => activeIngredientIds.includes(ingredient.activeIngredients_Key));*/
    const selectedActiveIngredients: ActiveIngredient[] = [];
    activeIngredientIds.forEach((id) => {
      const foundIngredient = this.activeIngredientsList.find(ingredient => ingredient.activeIngredients_Key === id);
      if (foundIngredient) {
        selectedActiveIngredients.push(foundIngredient);
      }
    });

    console.log('Selected Active Ingredients:', selectedActiveIngredients);

    console.log('Selected:', activeIngredientIds);

    // Create an updated medication object by copying the current form values
    const updatedMedication: Medication = {
      ...this.medicationUpdateForm.value,
      //activeIngredients: this.selectedActiveIngredientKeys, // Assign the selected ActiveIngredients
    };

    if (this.ActiveIngredients.touched) {
      updatedMedication.activeIngredients = selectedActiveIngredients;
    } else {
      updatedMedication.activeIngredients = this.recievedMedication.activeIngredients;
    }


    console.log(updatedMedication);
    // Now, you can send the updated medication to your Spring Boot backend using a service
    this.medicationService.updateMedicationWithActiveIngredients(this.recievedMedication.medication_Key, updatedMedication).subscribe(
      (response) => {
        // Handle successful update
        console.log('Medication updated successfully', response);
        // Close the dialog or perform any other necessary actions
        this.dialogRef.close();
      },
      (error: any) => {
        // Handle error
        console.error('Error updating medication', error);
        // Display an error message or perform any other necessary actions
      }
    );

  }



  toggleIngredient(ingredientKey: number) {
    if (this.selectedActiveIngredientKeys.includes(ingredientKey)) {
      this.removeIngredient(ingredientKey);
    } else {
      this.addIngredient(ingredientKey);
    }
  }

  addIngredient(ingredientKey: number) {
    this.selectedActiveIngredientKeys.push(ingredientKey);
    this.updateFormActiveIngredients(); // Update form control value
  }

  removeIngredient(ingredientKey: number) {
    const index = this.selectedActiveIngredientKeys.indexOf(ingredientKey);
    if (index !== -1) {
      this.selectedActiveIngredientKeys.splice(index, 1);
      this.updateFormActiveIngredients(); // Update form control value
    }
  }

  updateFormActiveIngredients() {
    this.ActiveIngredients.setValue(this.selectedActiveIngredientKeys);
  }

}
