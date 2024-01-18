import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceRoutingModule } from './insurances-routing.module';

import { InsuListComponent } from './ins-list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { FeatherIconsModule } from '@shared/components/feather-icons/feather-icons.module';

import { SharedModule } from '@shared';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DeleteComponent } from './delete/delete.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [InsuListComponent, FormDialogComponent, DeleteComponent],
    imports: [
        CommonModule,
        InsuranceRoutingModule,
        ComponentsModule,
        MatIconModule,
        NgxPaginationModule,
        SharedModule,
        FeatherIconsModule
    ]
})
export class InsuranceModule {}
