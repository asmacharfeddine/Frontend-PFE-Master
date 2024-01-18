import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { activeIngredientssRoutingModule } from './activeIngredient-routing.module';
import { ActiveIngredientsListComponent } from './active-ingredients-list/active-ingredients-list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AddFormComponent } from './active-ingredients-list/dialog/add-form/add-form.component';
import { DeleteFormComponent } from './active-ingredients-list/dialog/delete-form/delete-form.component';
import { UpdateFormComponent } from './active-ingredients-list/dialog/update-form/update-form.component';
//import { FormDialogComponent } from './physical-treatments-list/dialog/form-dialog/form-dialog.component';
//import { DeleteComponent } from './physical-treatments-list/dialog/delete/delete.component';

@NgModule({
  declarations: [
    ActiveIngredientsListComponent,
    AddFormComponent,
    DeleteFormComponent,
    UpdateFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    activeIngredientssRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  // providers: [],
})
export class activeIngredientsModule { }
