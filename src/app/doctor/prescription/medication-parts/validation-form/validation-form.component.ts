import { Component, Inject, Input, OnInit } from '@angular/core';
import { MedicationPartService } from '../medicationPart.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { DayTakes } from 'app/staff/people/patient-care-folder-page/day-takes/dayTakes.model';
import { MedicationPart } from 'app/staff/people/patient-care-folder-page/form/medicationPart.model';
import { Status } from '../../status.model';
import { PatientService } from 'app/staff/people/patient-care-folder-page/patient.service';
//import { PrescriptionService } from '../../prescription.service';
@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent  {
  takeForm: FormGroup;

/*   // Increment TotalCount by 1
        this.medicationpartService.incrementTotalCount(this.medicationPart.medicationPartKey).subscribe(data=>{
          console.log(data,"this is the data with incremention succeffuly");
          console.log('totalCount',this.medicationPart.totalCount);

        })   // Increment TotalCount by 1
        this.medicationpartService.incrementTotalCount(this.medicationPart.medicationPartKey).subscribe(data=>{
          console.log(data,"this is the data with incremention succeffuly");
          console.log('totalCount',this.medicationPart.totalCount);

        }) */
}
