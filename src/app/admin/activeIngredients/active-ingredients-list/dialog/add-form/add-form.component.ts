import { Component, Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveIngredient } from '../../activeIngredient.model';
import { ActiveIngredientService } from '../../activeIngredientsService';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError, ErrorObserver, of } from 'rxjs'; // Import throwError correctly

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {
  activeIngForm: FormGroup;
   activeIngredients: ActiveIngredient[];
   existingIngredients: ActiveIngredient[];
   existingIngredientsNames: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activeIngredientService : ActiveIngredientService,
    private router: Router,

    private fb: FormBuilder,
    ){
      {
          this.activeIngForm = this.fb.group({
          valueName: ['', {
           validators: [Validators.required], asyncValidators: [this.checkIngredientNameExists()],}]//,[this.AcIngNameValidator()]
      });
      this.activeIngredients = data;
      console.log("my active ings", this.activeIngredients);
      }
    }
    ingredientNameExists: boolean=false;

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }


  AcIngNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputAcIngName = control.value;
        if (!inputAcIngName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          this.activeIngredients = this.data;
          console.log("validator acting",this.activeIngredients);

          const isDuplicate = this.activeIngredients.some(
            (AcIng) => AcIng.valueName.toLowerCase() === inputAcIngName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
}


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



onSubmit(){
  //console.log(this.category);
  this.saveAcIng();
  // this.openSnackBar('PhysicalTreatmentCategory added successfully');
  // this.refreshCategoryList();
}


saveAcIng(){

  const activeIng : Partial<ActiveIngredient> = {
    valueName: this.activeIngForm?.get('valueName')?.value,
  }

  if (this.activeIngForm.valid){
  this.activeIngredientService.createActiveIngredient(activeIng).subscribe( data =>{
      this.dialogRef.close(1); // Return 1 to indicate successful addition
      this.goToAcIngList();
     //this.activeIngredients.push(data);
     window.location.reload();
      },
      (error) => {
        console.error('Error adding active Ingredient :', error);
      }
    );
}
}

goToAcIngList(){
  this.router.navigate(['/admin/activeIngredients/all-activeIngredients'])
}
}
