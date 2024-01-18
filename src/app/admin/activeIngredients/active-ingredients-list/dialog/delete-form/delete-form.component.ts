import { Component, Inject } from '@angular/core';
import { ActiveIngredientService } from '../../activeIngredientsService';
import { ActiveIngredient } from '../../activeIngredient.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss']
})
export class DeleteFormComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActiveIngredient,
    public activeIngredientService: ActiveIngredientService,


    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}
