import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import {Prescr}
import { PatientService } from '../patient.service';
import { Prescription } from 'app/doctor/prescription/prescription.model';
@Component({
  selector: 'app-delete-prescription',
  templateUrl: './delete-prescription.component.html',
  styleUrls: ['./delete-prescription.component.scss']
})
export class DeletePrescriptionComponent implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<DeletePrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prescription,
    public patientService: PatientService

    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
      console.log("did the prescription come ?", this.data)
    }
}
