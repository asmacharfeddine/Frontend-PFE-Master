import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActiveIngredientsListComponent } from "./active-ingredients-list/active-ingredients-list.component";
import { Page404Component } from "./../../authentication/page404/page404.component";

const routes: Routes = [
  {
    path: "all-activeIngredients",
    component: ActiveIngredientsListComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class activeIngredientssRoutingModule { }
