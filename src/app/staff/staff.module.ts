import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StaffRoutingModule } from './staff-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectSearchModule } from 'mat-select-search';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PatientCareFolderPageComponent } from './people/patient-care-folder-page/patient-care-folder-page.component';
import { PeopleComponent } from './people/people.component';
import { FormPatientComponent } from './people/patient-care-folder-page/form/form.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MedicationDetailsComponent } from './people/patient-care-folder-page/form/medication-details/medication-details.component';
import { MedicationPartsComponent } from './prescription/medication-parts/medication-parts.component';
import { ValidationFormComponent } from './prescription/medication-parts/validation-form/validation-form.component';
import { AllPatientsListComponent } from './people/all-patients-list/all-patients-list.component';
import { DayTakesForMedicationPartComponent } from './prescription/medication-parts/day-takes-for-medication-part/day-takes-for-medication-part.component';
//import { FormDialogComponent } from './calendar/dialogs/form-dialog/form-dialog.component';
//import { CalendarComponent } from './calendar/calendar.component';
//import { CalendarRoutingModule } from './calendar/calendar-routing.module';
@NgModule({
  declarations: [

    DashboardComponent,
    PeopleComponent,
    FormPatientComponent,
    MedicationDetailsComponent,
    PrescriptionComponent,
    PatientCareFolderPageComponent,
    MedicationPartsComponent,
    ValidationFormComponent,
    AllPatientsListComponent,
    DayTakesForMedicationPartComponent,
    //FormDialogComponent,
    //CalendarComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgChartsModule,
    StaffRoutingModule,
    //CalendarRoutingModule,
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
export class StaffModule {}
