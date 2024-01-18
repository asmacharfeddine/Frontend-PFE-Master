import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import{ MedicationsListComponent} from "./medications-list/medications-list.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "all-medications",
    component: MedicationsListComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationsRoutingModule {}
