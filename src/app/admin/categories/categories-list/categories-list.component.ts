import { Component,ElementRef, Inject, OnInit,ViewChild } from '@angular/core';
import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PhysicalTreatmentCategory } from './category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { EditCategoryComponent } from './dialog/edit-category/edit-category.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Direction } from '@angular/cdk/bidi';
//import { PhysicalTreatmentCategory } from './category2';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent
implements OnInit {
  //id: number;
  //categoryForm: FormGroup;
  displayedColumns = [
    'name',
    'description',
    'actions',
  ];

  constructor(  private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private snackBar: MatSnackBar,
    ){}



  exampleDatabase!: CategoryService | null;
  //dataSource!: ExampleDataSource;
   categories: PhysicalTreatmentCategory[] = [];
   page = 1;
   items = 1;
   category!: PhysicalTreatmentCategory | null;
   filteredCategories: any[] = [];
   searchQuery: any;


   // injecter le service avec le constructeur: sà once we inject the category service in category component we can call the categoryService methods


    openAddEditForm(){
      //this._dialog.open(FormDialogComponent);
      const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

      const dialogRef = this._dialog.open(FormDialogComponent, {
        data: {
          categories: this.categories
        },
                direction: tempDirection,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) {
          this.openSuccessSnackBar("Category Added Successfully!");
          //this.getCategories();

        }
      });
    }



    openSuccessSnackBar(message: string): void {
      this.snackBar.open(message, '', {
        duration: 3000,
        horizontalPosition: 'start',
        panelClass: ["snackbar-success"]
      });
    }
    openEditForm(data: any){
      this._dialog.open(EditCategoryComponent, {
        data,
      });
    }

  ngOnInit(): void {
    this.getCategories();

  }

  private getCategories(){
    this.categoryService.getAllPhysicalTreatmentCategories().subscribe(data => {
      // data is a response data and we assign it to the categories property
      this.categories = data;
      this.filterCategories();
    })

  }

  /*private getCategories2(){
    this.categoryService.getAllPhysicalTreatmentCategories().subscribe(data => {
      // data is a response data and we assign it to the categories property
      this.categories = data;
    })

  }*/

  public hasCategories(): boolean {

    return this.categories.length > 0;
  }


    // Delete
    deleteCategory (category: PhysicalTreatmentCategory){
      console.log(category);
      console.log(category.physicalTreatmentCategory_Key);

      const dialogRef = this._dialog.open(DeleteDialogComponent, {
        data: category,
      });
      dialogRef.afterClosed().subscribe((result: number) => {
        if(result == 1){
          this.categoryService.deletePhysicalTreatmentCategoryById(category.physicalTreatmentCategory_Key).subscribe(
            ()=>{
              this.getCategories();
            },
            (error: any) => {
              console.error('Error while deleting category:',error);
            }
          )
        }
      })

    }




   /* categoryNameValidator(categoryService: CategoryService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const categoryName = control.value;
        return categoryService.checkCategoryNameExists(categoryName).pipe(
          map(isExists => isExists ? { categoryNameExists: true } : null),
          catchError(() => of(null))
        );
      };
  }*/


  filterCategories() {
    const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

    if (!searchTerm) {
      // If the search query is empty, show all medications
      this.filteredCategories = this.categories;
      return;
    }
    this.filteredCategories = this.categories.filter((catego) => {
      return (
        catego.categoryName.toLowerCase().includes(searchTerm)
      );
    });

  }

}


