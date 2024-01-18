import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
//import { PatientFolderComponent } from './patient-folder/patient-folder.component';
import { PatientService } from './patient-care-folder-page/patient.service';
import { Patient } from './patient-care-folder-page/patient.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  patient: any;
  filteredPatients: any[]=[];
  searchQuery: any;

  constructor(
    public dialogRef: MatDialogRef<PeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Patient,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private PatientService: PatientService,
    //private snackBar: MatSnackBar
    ){}

    onNoClick(): void {
      this.dialogRef.close();
    }



  loadPatient(): void {
    this.PatientService.getAllPatients().subscribe(
      (data) => {
        console.log("all patients are here",data);
        this.patient=data;
        this.filterPatients();
      },
      (error) => {
          console.error('Error fetching patients, error ')
      }
      );

  }

  goToFirstComponent(data: any) {
    // Programmatically navigate to the FirstComponent route

    this.router.navigate(['/doctor/patientInfos', data]);
    console.log('daaaaaataaaa of patient with prescription', data);
    this.dialogRef.close();

  }

 

  goToFirstComponentwithId(data: any) {
    this.router.navigate(['/doctor/patientInfos/:data', data]);
    console.log('patientId', data);
  }


  ngOnInit(): void {
    this.patient=this.data;
   // this.loadPatients();
    console.log('filterd patients', this.patient);
  }


  filterPatients() {
    const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

    if (!searchTerm) {
      // If the search query is empty, show all patients
      console.log("are we here ");
      this.filteredPatients = this.patient;
      console.log("are we here ",this.filteredPatients);

      //console.log("are we here ?",this.filteredPatients);
      return;
    }

    this.filteredPatients = this.patient.filter((patients) => {
      return (
        patients.userFirstName.toLowerCase().includes(searchTerm) /*||
        patientss.userLastName.toLowerCase().includes(searchTerm) ||
        patientss.bloodGroup.toLowerCase().includes(searchTerm) ||
        patientss.surgeryTtpe.toLowerCase().includes(searchTerm)*/

      );
    });
  }



  /*filterPatients() {
    const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

    if (!searchTerm) {
      // If the search query is empty, show all medications
      this.filteredPatients = this.patients;
      return;
    }

    this.filteredMedications = this.medications.filter((medicationss) => {
      return (
        medicationss.name.toLowerCase().includes(searchTerm) ||
        medicationss.code.toLowerCase().includes(searchTerm)
      );
    });
  }*/
}
