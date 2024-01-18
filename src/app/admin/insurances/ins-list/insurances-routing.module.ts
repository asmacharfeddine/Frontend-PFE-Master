import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 // Remplacez par le nom réel de votre composant
import { InsuListComponent } from './ins-list.component';
const routes: Routes = [
  {
    path: 'insu-list',
    component: InsuListComponent,
  },
  // Autres routes spécifiques à ce module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceRoutingModule {}
