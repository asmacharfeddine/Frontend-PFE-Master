import { Medication } from "app/admin/medications/medications-list/medication.model";
import { Patient } from "../patient.model";
import { MedicationPart } from "../form/medicationPart.model";
export interface DayTakes {
dayTakesKey: number;
takeDate: String;
takeTime: String;
medicationName: String;
takeNotes: String;
medicationParts: MedicationPart;

}
