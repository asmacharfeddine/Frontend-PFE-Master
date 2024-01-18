import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormComponent } from './appointments/form/form.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsService } from './appointments/appointments.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { PeopleComponent } from './people/people.component';
//import { PatientFolderComponent } from './people/patient-folder/patient-folder.component';
import { PatientCareFolderPageComponent } from './people/patient-care-folder-page/patient-care-folder-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PrescriptionComponent } from './prescription/prescription.component';
import { FormPatientComponent } from './people/patient-care-folder-page/form/form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectSearchModule } from 'mat-select-search';
import { MedicationDetailsComponent } from './people/patient-care-folder-page/form/medication-details/medication-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AllPatientsListComponent } from './people/patient-care-folder-page/all-patients-list/all-patients-list.component';
import { DeletePrescriptionComponent } from './people/patient-care-folder-page/delete-prescription/delete-prescription.component';
import { MedicationPartsComponent } from './prescription/medication-parts/medication-parts.component';
import { UpdatePrescriptionComponent } from './people/patient-care-folder-page/update-prescription/update-prescription.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    FormComponent,
    DoctorsComponent,
    PatientsComponent,
    SettingsComponent,
    PeopleComponent,
    FormPatientComponent,
    DeletePrescriptionComponent,
   // PatientFolderComponent,
   PatientCareFolderPageComponent,
   PrescriptionComponent,
   MedicationDetailsComponent,
   AllPatientsListComponent,
   MedicationPartsComponent,
   UpdatePrescriptionComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    DoctorRoutingModule,
    NgChartsModule,
    MatDialogModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatIconModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
    MatAutocompleteModule,
    MatSelectSearchModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [AppointmentsService],
})
export class DoctorModule {}
