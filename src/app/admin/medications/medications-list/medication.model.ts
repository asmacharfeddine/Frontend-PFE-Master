import { formatDate } from '@angular/common';
import { ActiveIngredient } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredient.model';
import { MedicationPart } from 'app/doctor/people/patient-care-folder-page/form/medicationPart.model';
import { Prescription } from 'app/doctor/prescription/prescription.model';
export interface Medication {
  medication_Key: number;
  code: string;
  name: string;
  dosageForm: string;
  type: string;
  force: number;
  activeIngredients: ActiveIngredient[];
  prescriptions: Prescription[];
  medicationParts: MedicationPart[];

}
