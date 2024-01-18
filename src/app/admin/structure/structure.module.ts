import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureRoutingModule } from './structure-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { NgxPaginationModule } from 'ngx-pagination';

import { SiteGroupComponent } from './site-group/site-group.component';
import { SiteComponent } from './site/site.component';
import { ServiceComponent } from './service/service.component';
import { ServiceAreaComponent } from './service-area/service-area.component';
import { ExploitationUnitComponent } from './exploitation-unit/exploitation-unit.component';
import { RoomGroupComponent } from './material-resource/room-group/room-group.component';
import { RoomComponent } from './material-resource/room/room.component';
import { EquipmentComponent } from './material-resource/equipment/equipment.component';
import { DeleteComponent as SiteGroupDeleteComponent  } from './site-group/delete/delete.component';
import { FormComponent as SiteGroupFormComponent } from './site-group/form/form.component';
import { DeleteComponent as SiteDeleteComponent  } from './site/delete/delete.component';
import { FormComponent as SiteFormComponent } from './site/form/form.component';
import { FormComponent as ServiceFormComponent } from './service/form/form/form.component';
import { DeleteComponent as ServiceDeleteComponent} from './service/delete/delete/delete.component';
import { FormComponent as ServiceAreaFormComponent } from './service-area/form/form/form.component';
import { DeleteComponent as ServiceAreaDeleteComponent } from './service-area/delete/delete/delete.component';
import { FormComponent as ExploitationUnitFormComponent } from './exploitation-unit/form/form/form.component';
import { DeleteComponent as ExploitationUnitDeleteComponent } from './exploitation-unit/delete/delete/delete.component';
import { FormComponent as RoomGroupFormComponent } from './material-resource/room-group/form/form/form.component';
import { DeleteComponent as RoomGroupDeleteComponent } from './material-resource/room-group/delete/delete/delete.component';
import { FormComponent as RoomFormComponent} from './material-resource/room/form/form/form.component';
import { DeleteComponent as RoomDeleteComponent } from './material-resource/room/delete/delete/delete.component';
import { FormComponent as EquipmentFormComponent} from './material-resource/equipment/form/form/form.component';
import { DeleteComponent as EquipmentDeleteComponent } from './material-resource/equipment/delete/delete/delete.component';
import { LoadingSpinnerComponent } from 'app/loading-spinner/loading-spinner.component';
import { StaffComponent } from './human-resource/staff/staff.component';
import { StaffGroupComponent } from './human-resource/staff-group/staff-group.component';
import { StaffGroupLinkComponent } from './human-resource/staff-group-link/staff-group-link.component';
import { FormComponent } from './human-resource/staff-group/form/form.component';
import { DeleteComponent } from './human-resource/staff-group/delete/delete.component';

@NgModule({
  declarations: [
    SiteGroupComponent,
    SiteComponent,
    ServiceComponent,
    ServiceAreaComponent,
    ExploitationUnitComponent,
    RoomGroupComponent,
    RoomComponent,
    EquipmentComponent,
    SiteGroupDeleteComponent,
    SiteGroupFormComponent,
    SiteDeleteComponent,
    SiteFormComponent,
    ServiceFormComponent,
    ServiceDeleteComponent,
    ServiceAreaFormComponent,
    ServiceAreaDeleteComponent,
    ExploitationUnitFormComponent,
    ExploitationUnitDeleteComponent,
    RoomGroupFormComponent,
    RoomGroupDeleteComponent,
    RoomFormComponent,
    RoomDeleteComponent,
    EquipmentFormComponent,
    EquipmentDeleteComponent,
    LoadingSpinnerComponent,
    StaffComponent,
    StaffGroupComponent,
    StaffGroupLinkComponent,
    FormComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    NgScrollbarModule,
    ComponentsModule,
    SharedModule,
    NgxPaginationModule,

  ]
})
export class StructureModule { }
