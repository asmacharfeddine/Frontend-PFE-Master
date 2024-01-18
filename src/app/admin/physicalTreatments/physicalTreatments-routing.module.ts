import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhysicalTreatmentsListComponent } from "./physical-treatments-list/physical-treatments-list.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "all-physicalTreatments",
    component: PhysicalTreatmentsListComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class physicalTreatmentsRoutingModule { }
