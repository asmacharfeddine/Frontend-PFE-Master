import { Component } from '@angular/core';
import { PhysicalTreatment } from './physicalTreatment.model';
import { PhysicalTreatmentService } from './physicalTreatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateComponent } from './dialog/update/update.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-physical-treatments-list',
  templateUrl: './physical-treatments-list.component.html',
  styleUrls: ['./physical-treatments-list.component.scss']
})
export class PhysicalTreatmentsListComponent {


  physicalTreatments: any [] = [];
  filteredPhysicalTreatments: PhysicalTreatment[] = [];
  searchQuery: any;

  constructor(private physicalTreatmentService: PhysicalTreatmentService,
    private fb: FormBuilder,

    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar

    ) { }

    treatments: PhysicalTreatment[] = [];

    loadPhysicalTreatments(): void {
      this.physicalTreatmentService.getAllPhysicalTreatments().subscribe(
        (data) => {
          console.log(data);
        this.physicalTreatments = data;
        this.filterPhysicalTreatments();
        },
        (error) => {
          console.error('Error fetching treatment, error');

      }
      );
    }

    ngOnInit(): void {
    this.loadPhysicalTreatments();
   // this.filteredPhysicalTreatments = this.physicalTreatments; // Initialize filtered list

  }



  // delete
  deleteTreatment (treatment: PhysicalTreatment){
    console.log(treatment);
    const dialogRef = this._dialog.open(DeleteComponent, {
      data: treatment,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if(result == 1){
        this.physicalTreatmentService.deletePhysicalTreatment(treatment.physicalTreatment_Key).subscribe(
          ()=>{
            this.loadPhysicalTreatments();
          },
          (error: any) => {
            console.error('Error while deleting physical Treatment:',error);
          }
        )
      }
    })
  }

  /*openAddForm(){
    this._dialog.open(FormDialogComponent, {

    });
    this._dialog.afterAllClosed.subscribe(()=>{
      this.loadPhysicalTreatments();
     // this.afficherMessageSucces();

    });

  }*/


  openAddForm(){
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';
    const dialogRef= this._dialog.open(FormDialogComponent, {
      data: {
        treatments: this.treatments
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        //this.openSuccessSnackBar("Medication Added Successfully!");
        //this.getCategories();
        this.loadPhysicalTreatments();

        this.afficherMessageSucces();

      }
    });

  }


  afficherMessageSucces() {
    this._snackBar.open('Le traitement physique a été ajouté avec succès', 'Fermer', {
      duration: 3000, // La durée en millisecondes pendant laquelle le message est affiché
      panelClass: ["snackbar-success"]

    });
  }

  openEditForm(data: any){
    console.log(data, 'data');

    this._dialog.open(UpdateComponent, {
      data,
    });
    this._dialog.afterAllClosed.subscribe(()=>{
      this.loadPhysicalTreatments();

    })
  }

  filterPhysicalTreatments() {
    const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

    if (!searchTerm) {
      // If the search query is empty, show all medications
      this.filteredPhysicalTreatments = this.physicalTreatments;
      return;
    }

    this.filteredPhysicalTreatments = this.physicalTreatmentService.filter((phyTreat) => {
      return (
        phyTreat.treatmentName.toLowerCase().includes(searchTerm) ||
        phyTreat.physicalTreatmentCategory.categoryName.toLowerCase().includes(searchTerm)
      );
    });
  }

}
