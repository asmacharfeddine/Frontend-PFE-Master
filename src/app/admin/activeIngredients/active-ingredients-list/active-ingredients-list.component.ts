import { Component, OnInit } from '@angular/core';
import { ActiveIngredientService } from './activeIngredientsService';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Direction } from '@angular/cdk/bidi';
import { AddFormComponent } from './dialog/add-form/add-form.component';
import { ActiveIngredient } from './activeIngredient.model';
import { UpdateFormComponent } from './dialog/update-form/update-form.component';
import { DeleteFormComponent } from './dialog/delete-form/delete-form.component';
@Component({
  selector: 'app-active-ingredients-list',
  templateUrl: './active-ingredients-list.component.html',
  styleUrls: ['./active-ingredients-list.component.scss']
})
export class ActiveIngredientsListComponent implements OnInit {
   data:ActiveIngredient[];
   filteredActiveIngredients:ActiveIngredient[];
   searchQuery: any;
   activeIngredients: ActiveIngredient[];
   
  constructor(private activeIngredientService: ActiveIngredientService,
    private _dialog: MatDialog,
    private snackBar: MatSnackBar,

    ){

  }
  getActiveIngredients(): void {
    this.activeIngredientService.getAllActiveIngredients().subscribe((data) =>{
    this.activeIngredients = data,
    console.log("the actIng",this.activeIngredients )
    this.filterActiveIngredients()
    console.log("the filtered ones",this.filteredActiveIngredients);
  }

    //console.log(data)
    );
  }
 ngOnInit(): void {
   this.getActiveIngredients();
 }



 openAddEditForm(){
  //this._dialog.open(FormDialogComponent);
  const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';
  console.log(this.activeIngredients)

  const dialogRef = this._dialog.open(AddFormComponent, {
    data: {
      activeIngredients : this.activeIngredients,
    },
            direction: tempDirection,
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      this.openSuccessSnackBar("Active Ingredient Added Successfully!");
      //this.getCategories();

    }
  });
}
openSuccessSnackBar(message: string): void {
  this.snackBar.open(message, '', {
    duration: 3000,
    horizontalPosition: 'start',
    panelClass: ["snackbar-success"]
  });
}




filterActiveIngredients() {
  const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

  if (!searchTerm) {
    // If the search query is empty, show all medications
    this.filteredActiveIngredients = this.activeIngredients;
    return;
  }
  this.filteredActiveIngredients = this.activeIngredients.filter((AcIng) => {
    return (
      AcIng.valueName.toLowerCase().includes(searchTerm)
    );
  });

}

openEditForm(data: any){
  this._dialog.open(UpdateFormComponent, {
    data,
  });
}




    // Delete
    deleteIngredient (ingredient: ActiveIngredient){
      console.log(ingredient);
      console.log(ingredient.activeIngredients_Key);

      const dialogRef = this._dialog.open(DeleteFormComponent, {
        data: ingredient,
      });
      dialogRef.afterClosed().subscribe((result: number) => {
        if(result == 1){
          this.activeIngredientService.deleteActiveIngredientById(ingredient.activeIngredients_Key).subscribe(
            ()=>{
              this.getActiveIngredients();
            },
            (error: any) => {
              console.error('Error while deleting category:',error);
            }
          )
        }
      })

    }

    public hasActiveIngredients(): boolean {

      return this.activeIngredients.length > 0;
    }
}

