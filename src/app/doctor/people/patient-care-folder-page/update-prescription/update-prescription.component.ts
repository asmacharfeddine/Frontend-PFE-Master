import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicationPart } from '../form/medicationPart.model';
import { Status } from 'app/doctor/prescription/status.model';
import { MedicationPartService } from 'app/doctor/prescription/medication-parts/medicationPart.service';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-update-prescription',
  templateUrl: './update-prescription.component.html',
  styleUrls: ['./update-prescription.component.scss']
})
export class UpdatePrescriptionComponent implements OnInit{
  updateForm: FormGroup;

  //statusTypes = Object.values(Status);
  selectedValue: Status;
  statusTypes = Object.keys(Status).filter(key => !isNaN(Number(Status[key])));

  //statusValue = Object.values(Status);




myMedicationPart: MedicationPart;

constructor(   public dialogRef: MatDialogRef<UpdatePrescriptionComponent>,
  private fb: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: MedicationPart,
  private medicationPartService : MedicationPartService,

  ){
    this.updateForm = this.fb.group({
      status:[''],
    })

}
ngOnInit(): void {
  this.updateForm.valueChanges.subscribe((values) => {
    console.log('values', values)
  })
  this.myMedicationPart=this.data
  console.log("myMedicationPart", this.myMedicationPart)
}



  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }
  Mystatus:Status
  /*updateStatus(){
    if (this.updateForm?.valid){
      this.Mystatus=this.updateForm.get('status')?.value
      this.medicationPartService.updateMedicationPartStatus(this.myMedicationPart.medicationPartKey,this.Mystatus)
    }
  }*/
  onValueSelected(event: MatSelectChange) {
    this.selectedValue = event.value;
    console.log('Selected value:', this.selectedValue);
    // Do whatever you need with the selected value here
  }
  updateStatus() {
    if (this.updateForm?.valid) {
      this.Mystatus = this.updateForm.get('status')?.value;
     console.log("this mystatusss",this.Mystatus);
     console.log("this keyyyyy",this.myMedicationPart.medicationPartKey);


      this.medicationPartService
        .updateMedicationPartStatus(this.myMedicationPart.medicationPartKey, this.Mystatus)
        .subscribe(
          (response) => {
            console.log('MedicationPart status updated successfully:', response);
            // Optionally close the dialog or perform other actions on success
            this.dialogRef.close(/* optional data to pass back */);
          },
          (error) => {
            console.error('Error updating MedicationPart status:', error);
            // Optionally handle the error or display a message to the user
          }
        );
    }
  }
}
