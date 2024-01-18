import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicationsService } from 'app/admin/medications/medications-list/medications.service';
import { Medication } from 'app/admin/medications/medications-list/medication.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.component.html',
  styleUrls: ['./medication-details.component.scss']
})
export class MedicationDetailsComponent implements OnInit {
medicationDetailsForm :FormGroup;
recievedMedication: Medication;
selectedMedication: string | undefined; // Initialize as undefined


constructor(
  @Inject(MAT_DIALOG_DATA) public data: Medication,
  public dialogRef: MatDialogRef<MedicationDetailsComponent>,
  private fb: FormBuilder,
  private medicationsService: MedicationsService,

){
this.recievedMedication = this.data;
this.medicationDetailsForm = this.fb.group({
 code: [''],
 name: [''],
 dosageForm: [''],
 type: [''],
 force: [''],
 activeIngredients: [''],
});
}

ngOnInit(): void {
  if (this.recievedMedication) {
    this.medicationDetailsForm.patchValue({
      code: this.recievedMedication.code,
      name: this.recievedMedication.name,
      dosageForm: this.recievedMedication.dosageForm,
      type: this.recievedMedication.type,
      force: this.recievedMedication.force,
      activeIngredients: this.recievedMedication.activeIngredients.map(c => c.valueName),
    })
  }
}


onCloseClick(): void {
  // You can optionally pass data back to the component that opened the dialog
  this.dialogRef.close();
}

onMedicationSelected(event: MatAutocompleteSelectedEvent): void {
  this.selectedMedication = event.option.value;
}
}



