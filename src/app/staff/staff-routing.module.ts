import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PeopleComponent } from "./people/people.component";
import { PatientCareFolderPageComponent } from "./people/patient-care-folder-page/patient-care-folder-page.component";
import { MedicationPartsComponent } from "./prescription/medication-parts/medication-parts.component";
import { AllPatientsListComponent } from "./people/all-patients-list/all-patients-list.component";
//import { PrescriptionsComponent } from "./prescriptions/prescriptions.component";
//import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
//import { BillingComponent } from "./billing/billing.component";
//import { SettingsComponent } from "./settings/settings.component";
//import { CalendarComponentt } from "./calendar/calendar.component";
//import { FormDialogComponent } from "./calendar/dialogs/form-dialog/form-dialog.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: 'patients',
    component: AllPatientsListComponent,
  },
  {
  path: 'patientInfos',
  component: PatientCareFolderPageComponent,
  },
  {
    path: 'prescriptionMedicationParts/:prescriptionKey',
    component: MedicationPartsComponent,
    },





  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
