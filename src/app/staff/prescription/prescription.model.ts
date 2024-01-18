import { Medication } from "app/admin/medications/medications-list/medication.model";
import { Patient } from "../people/patient-care-folder-page/patient.model";
import { MedicationPart } from "../people/patient-care-folder-page/form/medicationPart.model";
import { Status } from "./status.model";
export interface Prescription {
prescriptionKey: number;
status: Status;
treatmentDuration: String;
dosage: String;
specialInstructions: String;
prescriptionDate: Date;
prescriptionTime: Date;
//medication: Medication;
patient: Patient;
medicationParts: MedicationPart[];

}




