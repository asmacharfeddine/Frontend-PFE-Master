import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormDialogComponent } from './categories-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './categories-list/dialog/delete/delete.component';
import { EditCategoryComponent } from './categories-list/dialog/edit-category/edit-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    CategoriesListComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    EditCategoryComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    ComponentsModule,
    SharedModule,
    MatPaginatorModule,
    NgxPaginationModule,
  ],
 // providers: [],
})
export class CategoriesModule {}
