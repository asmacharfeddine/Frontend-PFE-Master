import { Component, Inject, Input, OnInit } from '@angular/core';
import { MedicationPartService } from '../medicationPart.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DayTakes } from 'app/staff/people/patient-care-folder-page/day-takes/dayTakes.model';
import { MedicationPart } from 'app/staff/people/patient-care-folder-page/form/medicationPart.model';
import { Status } from '../../status.model';
import { PatientService } from 'app/staff/people/patient-care-folder-page/patient.service';
import { PrescriptionService } from '../../prescription.service';
@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent implements OnInit {
  takeForm: FormGroup;

  @Input() message: string ='';
  //dayTakeForm: FormGroup;
constructor(
  public dialogRef: MatDialogRef<ValidationFormComponent>,
  @Inject(MAT_DIALOG_DATA) public medicationPart: MedicationPart,
  private patientService : PatientService,
  private fb: FormBuilder,

  private medicationpartService: MedicationPartService,
  private prescriptionService: PrescriptionService,
  @Inject(MAT_DIALOG_DATA) public data: any,

){
  const currentDate = new Date();
  const currentTime = new Date().toLocaleTimeString();

  this.takeForm = this.fb.group({
    takeDate:[currentDate.toISOString().substring(0, 10),[Validators.required]],
    takeTime:[currentTime, [Validators.required]],
    medicationName: new FormControl(this.medicationPart.medication.name),
    takeNotes:['']
  })
}
ngOnInit(): void {
  console.log("ikikik",this.medicationPart);

this.message = 'This is a simple message.'; // Set the message content

console.log("medicationPartKey",this.data)
}


  incrementTotalCount(){

    console.log('here is the Key again',this.data);
    this.medicationpartService.incrementTotalCount(this.data).subscribe(
      (dataa)=>{
        console.log("hello there total count",dataa.totalCount)
      }
      );
    console.log("is there any problem here ?");
  }

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

 /* addDayTakeToMedicationPart(medicationPartKey:number,dayTake: DayTakes){
    this.medicationpartService.addDayTakeToMedicationPart( medicationPartKey, dayTake);
  }*/
increment(){
   // After successfully adding the DayTake, increment the total count
 this.medicationpartService.incrementTotalCount(this.medicationPart.medicationPartKey).subscribe(updatedMedicationPart => {
  console.log('Total Count incremented successfully:', updatedMedicationPart.totalCount);
  // Update your local medicationPart or perform any other actions as needed
},
error => console.log(error));
}


 prescriptionKey =this.medicationpartService.getPrescriptionKeyForMedicationPart(this.medicationPart.medicationPartKey);
 // na9es chouf  prescriptionKey 9a3ed youssel walla w amal il update
  dt:any
  adddayTakeToMedicationPart(){
     this.dt  = {
      takeDate: this.takeForm.get('takeDate')?.value,
      takeTime:this.takeForm.get('takeTime')?.value,
      medicationName:this.takeForm.get('medicationName')?.value,
      takeNotes: this.takeForm.get('takeNotes')?.value,
    };
    console.log("dayTake to add", this.dt)
    console.log("medicationPartKey",this.medicationPart.medicationPartKey);

      this.medicationpartService.addDayTakeToMedicationPart(this.medicationPart.medicationPartKey,this.dt).subscribe(data=>{
        console.log(data,"added succeffuly");
        //this.patientService.updatePrescriptionStatus(this.medicationPart.prescription.)
        /*this.medicationpartService.getPrescriptionKeyForMedicationPart(this.medicationPart.medicationPartKey).subscribe(prescriptionKey =>{
          console.log("wiiii we get the prescriptionKey : ",prescriptionKey);
          this.prescriptionService.getPrescriptionByPrescriptionKey(prescriptionKey).subscribe(p=>{
            console.log("did we get the prescription here ?",p);
          })
          this.patientService.updatePrescriptionStatus(prescriptionKey);
        })*/
      },
      error => console.log(error)
      )
      console.log("abaaaaaaayyy")

     /* this.patientService.updatePrescriptionStatus(prescriptionId).subscribe(
        () => {
          console.log('Prescription status updated successfully.');
        },
        (error) => {
          console.error('Error updating prescription status:', error);
        }
      );
  }*/

}}
/*   // Increment TotalCount by 1
        this.medicationpartService.incrementTotalCount(this.medicationPart.medicationPartKey).subscribe(data=>{
          console.log(data,"this is the data with incremention succeffuly");
          console.log('totalCount',this.medicationPart.totalCount);

        })   // Increment TotalCount by 1
        this.medicationpartService.incrementTotalCount(this.medicationPart.medicationPartKey).subscribe(data=>{
          console.log(data,"this is the data with incremention succeffuly");
          console.log('totalCount',this.medicationPart.totalCount);

        }) */
