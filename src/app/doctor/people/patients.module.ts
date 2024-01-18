import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PeopleComponent } from "./people.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { MedicationDetailsComponent } from './patient-care-folder-page/form/medication-details/medication-details.component';
import { DeletePrescriptionComponent } from './patient-care-folder-page/delete-prescription/delete-prescription.component';
import { DayTakesComponent } from './patient-care-folder-page/day-takes/day-takes.component';
import { UpdatePrescriptionComponent } from './patient-care-folder-page/update-prescription/update-prescription.component';
const routes: Routes = [
  {
    path: "patients",
    component: PeopleComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    MedicationDetailsComponent,
    DeletePrescriptionComponent,
    DayTakesComponent,
    UpdatePrescriptionComponent
  ],
})
export class patientssModule {}
