import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { physicalTreatmentsRoutingModule } from './physicalTreatments-routing.module';
import { PhysicalTreatmentsListComponent } from './physical-treatments-list/physical-treatments-list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormDialogComponent } from './physical-treatments-list/dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './physical-treatments-list/dialog/delete/delete.component';
import { UpdateComponent } from './physical-treatments-list/dialog/update/update.component';

//import { FormDialogComponent } from './physical-treatments-list/form-dialog/form-dialog.component';
//import { FormDialogComponent } from './categories-list/dialog/form-dialog/form-dialog.component';
//import { DeleteDialogComponent } from './categories-list/dialog/delete/delete.component';
//import { EditCategoryComponent } from './categories-list/dialog/edit-category/edit-category.component';

@NgModule({
  declarations: [
    PhysicalTreatmentsListComponent,
    FormDialogComponent,
    DeleteComponent,
    UpdateComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    physicalTreatmentsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  // providers: [],
})
export class physicalTreatmentsModule { }
