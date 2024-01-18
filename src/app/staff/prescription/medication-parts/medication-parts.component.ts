import { Component, OnInit } from '@angular/core';
import { MedicationPartService } from './medicationPart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { contourDensity } from 'd3';
import { MatDialog } from '@angular/material/dialog';
import { ValidationFormComponent } from './validation-form/validation-form.component';
import { MedicationPart } from 'app/staff/people/patient-care-folder-page/form/medicationPart.model';
import { DayTakes } from 'app/staff/people/patient-care-folder-page/day-takes/dayTakes.model';
import { Direction } from '@angular/cdk/bidi';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-medication-parts',
  templateUrl: './medication-parts.component.html',
  styleUrls: ['./medication-parts.component.scss']
})
export class MedicationPartsComponent implements OnInit {
prescriptionKy: any;
medicationParts: any[];
  constructor(
    private medicationpartService: MedicationPartService,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private snackBar: MatSnackBar


  ){
    this.route.params.subscribe((data) => {

      this.prescriptionKy = data['prescriptionKey']; // Access the data passed as route parameters
    });
  }
  showDetails: boolean[];

ngOnInit(): void {
  console.log("are you there",this.prescriptionKy)
  this.getMedicationPartsForSpecificPrescription();
  //this.showDetails= new Array(this.medicationParts.length).fill(false);

  // Initialize checkboxStatus for each medicationPart
  /*this.medicationParts.forEach((medicationPart) => {
    this.checkboxStatus[medicationPart.medicationPartKey] = Array(medicationPart.takes).fill(false);
  });*/



}
generateValues(takes: number): number[] {
  return Array.from({ length: takes }, (_, i) => i + 1);
}

getMedicationPartsForSpecificPrescription(){
this.medicationpartService.getMedicationPartsForPrescription(this.prescriptionKy).subscribe(
  (data)=>{
    this.medicationParts=data;
    console.log("hello there",data)
    this.medicationParts.forEach((medicationPart) => {
      medicationPart.checked = false;
    });
  }
);
}
  // Initialize an empty object to track confirmation status for each medicationPart
  //confirmationStatus: { [key: number]: boolean } = {};

  //checkboxStatus: { [key: number]: { [key: number]: boolean } } = {};

openValidationForm(data: any){
  const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

  const dialogRef = this._dialog.open(ValidationFormComponent, {
  data:data});



  /*dialogRef.afterClosed().subscribe(result => {
   /* if (result === 1) {
      this.checkboxStatus[data][checkboxIndex] = true;
      // User confirmed the action in the validation form
      //this.confirmationStatus[data] = true;
    }
  });*/
}



openSuccessSnackBar(message: string): void {
  this.snackBar.open(message, '', {
    duration: 3000,
    horizontalPosition: 'start',
    panelClass: ["snackbar-success"]
  });
}


medicationPart:any
totalTakesCount:number=0;
incrementTotalCount(data: any){

  console.log('here is the medicationPart Key',data);
  this.totalTakesCount++;
  console.log("totalTakesCount",this.totalTakesCount);
  this.medicationpartService.incrementTotalCount(data).subscribe(
    (dataa)=>{
      this.medicationPart=dataa;
      console.log("hello there total takescount",dataa.totalTakesCount)

      console.log("hello there total count",dataa.totalCount)
      /*if (dataa.totalTakesCount===dataa.takes){
       this.onDisableRow(dataa);*/
       //this.checkBoxStatus();
      }
   // }
    );
  console.log("is there any problem here ?");
}


decrementTotalCount(data: any){

  console.log('here is the medicationPart Key',data);
  this.totalTakesCount++;
  console.log("totalTakesCount",this.totalTakesCount);
  if (this.totalTakesCount)
  this.medicationpartService.decrementTotalCount(data).subscribe(
    (dataa)=>{
      this.medicationPart=dataa;
      console.log("hello there total takescount from decrement",dataa.totalTakesCount)

      console.log("hello there total count from decrement",dataa.totalCount)

    }
    );
  console.log("is there any problem here from decrement ?");
}


/*isDisable = false;

onDisableRow(medicationPart: any){
 // if(medicationPart.takes)
  medicationPart.isDisable = true;
  medicationPart.onDisableRow;
}*/
/*disable:any;
checkBoxStatus(){
  if(this.medicationPart.totalTakesCount === this.medicationPart.takes){
    this.disable=true;

  }
}*/

//rowDisabled: { [key: number]: boolean } = {};

 // Function to check if checkboxes should be disabled and checked for the row
 /*isCheckboxDisabled(medicationPart: any): boolean {
  return medicationPart.totalCount === medicationPart.takes;
}*/

checkboxStatus: { [key: number]: boolean } = {};

  // Function to handle checkbox click
  handleCheckboxClick(medicationPartKey: number, checkboxIndex: number) {
    // Toggle the checkbox status (checked/unchecked)
 if(this.medicationPart.totalCount === this.medicationPart.takes){

    this.checkboxStatus[medicationPartKey] = !this.checkboxStatus[medicationPartKey];
  }
}


toggleTotalCount(medicationPart: any) {
  if (medicationPart.checked) {
    this.decrementTotalCount(medicationPart.medicationPartKey);
  } else {
    this.incrementTotalCount(medicationPart.medicationPartKey);
  }
  medicationPart.checked = !medicationPart.checked; // Toggle the checkbox state
}

ViewDayTakesForMedicationPart(medicationPart: any){

}


  // Function to reload the page
  reloadPage() {
    location.reload();
  }

  // Use this function to refresh the page when needed
  refreshPage() {
    this.reloadPage();
  }

}


