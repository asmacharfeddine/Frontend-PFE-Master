import { Component } from '@angular/core';
import { ActiveIngredientService } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredientsService';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActiveIngredient } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredient.model';
@Component({
  selector: 'app-active-ingredients-list',
  templateUrl: './active-ingredients-list.component.html',
  styleUrls: ['./active-ingredients-list.component.scss']
})
export class ActiveIngredientsListComponent {

  activeIngredientList: ActiveIngredient[] = []
  //activeIngredient: ActiveIngredient = new ActiveIngredient();
  activeIngredientsValues : string[] = [];

  constructor(private activeIngredientService: ActiveIngredientService){

  }
  getActiveIngredients(): void {
    this.activeIngredientService.getAllActiveIngredients().subscribe((data) =>
    console.log(data));
  }
 ngOnInit(): void {
   this.getActiveIngredients();
 }

 loadActiveIngredients(){
  this.activeIngredientService.getAllActiveIngredients().subscribe((response) => {

  })
 }


}
