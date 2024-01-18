import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "all-categories",
    component: CategoriesListComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
