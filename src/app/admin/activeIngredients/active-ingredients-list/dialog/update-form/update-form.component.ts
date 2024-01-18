import { Component, Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActiveIngredientService } from '../../activeIngredientsService';
import { ActiveIngredient } from '../../activeIngredient.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {
  updateForm:FormGroup;
  activeIngredients: ActiveIngredient[];

  constructor(
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activeIngredientService : ActiveIngredientService,
    private router: Router,

    private fb: FormBuilder,
    ){
      {
          this.updateForm = this.fb.group({
          valueName: ['', {
           validators: [Validators.required], asyncValidators: [this.checkIngredientNameExists()],}]//,[this.AcIngNameValidator()]
      });
      this.activeIngredients = data;
      console.log("my active ings", this.activeIngredients);
      }
    }
    existingIngredients: ActiveIngredient[];
    existingIngredientsNames: string[] = [];


    checkIngredientNameExists(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const ingredientName = control.value;

        this.activeIngredientService.getAllActiveIngredients().subscribe(
          (response) => {
            this.existingIngredients = response;

            // Extract an array of names from the categoryList (categoryList is gonna be the list of categories that comes from the backend)
            this.existingIngredientsNames = this.existingIngredients.map(ingredient => ingredient.valueName);})
        if (!ingredientName) {
          return of(null); // No validation if the field is empty
        }

        // Check if the treatment name exists in the local list
        const exists = this.existingIngredientsNames.includes(ingredientName);

         // Set the validity of the form control
         if (exists) {
          return of({ ingredientNameExists: true }); // Set the error if the name already exists
        } else {
          return of(null); // Clear the error if the name doesn't exist
        }
      };
    }


    onCloseClick(): void {
      // You can optionally pass data back to the component that opened the dialog
      this.dialogRef.close(/* optional data to pass back */);
    }


    onSubmit(){
      if (this.updateForm.valid){
        this.activeIngredientService.updateActiveIngredient(this.updateForm.value, this.data.activeIngredients_Key).subscribe( data =>{
          console.log(data);
          this.goToActiveIngredientsList();
        },
        error => console.log(error));

      }
    }


    goToActiveIngredientsList(){
      this.router.navigate(['/admin/activeIngredients/all-activeIngredients'])
    }
}
