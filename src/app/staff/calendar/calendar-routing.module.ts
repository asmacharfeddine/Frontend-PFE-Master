import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { CalendarComponentt } from './calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponentt,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
