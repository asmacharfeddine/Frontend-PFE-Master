import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { PeopleComponent } from './people/people.component';
import { SettingsComponent } from './settings/settings.component';
import { PatientCareFolderPageComponent } from './people/patient-care-folder-page/patient-care-folder-page.component';
import { AllPatientsListComponent } from './people/patient-care-folder-page/all-patients-list/all-patients-list.component';
import { MedicationPartsComponent } from './prescription/medication-parts/medication-parts.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patientss',
    component: PatientsComponent,
  },

  {
    path: 'prescriptionMedicationParts/:prescriptionKey',
    component: MedicationPartsComponent,
    },
  /*{
  path: 'patients',
  component: PeopleComponent,
},*/
{
  path: 'patients',
  component: AllPatientsListComponent,
},

{
path: 'patientInfos',
component: PatientCareFolderPageComponent,
},



  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
