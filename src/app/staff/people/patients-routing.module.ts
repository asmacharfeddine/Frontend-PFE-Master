import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { patientssModule } from './patients.module';
import { PatientCareFolderPageComponent } from './patient-care-folder-page/patient-care-folder-page.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormPatientComponent } from './patient-care-folder-page/form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectSearchModule } from 'mat-select-search';
import { MedicationDetailsComponent } from './patient-care-folder-page/form/medication-details/medication-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    PatientCareFolderPageComponent,
    FormPatientComponent,
    MedicationDetailsComponent,

  ],
  imports: [
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    patientssModule,
    ComponentsModule,
    SharedModule,
    MatAutocompleteModule,
    MatSelectSearchModule,
    MatInputModule,
    MatFormFieldModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line

 // providers: [],
})
export class patientsRoutingModule {}
