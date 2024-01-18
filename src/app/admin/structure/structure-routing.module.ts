import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiteGroupComponent } from './site-group/site-group.component';
import { SiteComponent } from './site/site.component';
import { ServiceComponent } from './service/service.component';
import { ServiceAreaComponent } from './service-area/service-area.component';
import { ExploitationUnitComponent } from './exploitation-unit/exploitation-unit.component';
import { RoomGroupComponent } from './material-resource/room-group/room-group.component';
import { RoomComponent } from './material-resource/room/room.component';
import { EquipmentComponent } from './material-resource/equipment/equipment.component';
import { StaffGroupComponent } from './human-resource/staff-group/staff-group.component';
import { StaffComponent } from './human-resource/staff/staff.component';

const routes: Routes = [
  {
    path: "site-group",
    component: SiteGroupComponent,
  },
  { path: 'site-group/:siteGrpKy/child-elements',
    component: SiteComponent
  },
  { path: 'site/:siteKy/child-elements',
    component: ServiceComponent
  },
  { path: 'service/:serviceKy/child-elements',
    component: ServiceAreaComponent
  },
  { path: 'service-area/:servAreaKy/child-elements',
    component: ExploitationUnitComponent
  },
  { path: 'exploitation-unit/:expUnitKy/child-elements',
    component: RoomGroupComponent
  },
  { path: 'room-group/:roomGrpKy/child-elements',
    component: RoomComponent
  },
  { path: 'room/:roomKy/child-elements',
    component: EquipmentComponent
  },
  {
    path: "sites",
    component: SiteComponent,
  },
  {
    path: "services",
    component: ServiceComponent,
  },
  {
    path: "serviceAreas",
    component: ServiceAreaComponent,
  },
  {
    path: "exploitationUnits",
    component: ExploitationUnitComponent,
  },
  {
    path: "roomGroups",
    component: ExploitationUnitComponent,
  },
  {
    path: "rooms",
    component: ExploitationUnitComponent,
  },
  {
    path: "equipments",
    component: ExploitationUnitComponent,
  },
  {
    path: "staff-group",
    component: StaffGroupComponent,
  },

  { path: 'staff-group/:staffGrpKy/child-elements',
    component: StaffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructureRoutingModule { }
