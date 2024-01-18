import { Medication } from "app/admin/medications/medications-list/medication.model";
import { Prescription } from "app/doctor/prescription/prescription.model";
import { DayTakes } from "../day-takes/dayTakes.model";
import { Status } from "app/doctor/prescription/status.model";
export class MedicationPart {
  medicationPartKey?: number;
  status?: Status;
  period?: number;
  takes?: number;
  quantity?: number;
  notes?: string;
  takesCount?: number;
  daysCount?: number;
  totalTakesCount?: number;
  totalCount?: number;
  startDate?: Date;
  endDate?: Date;
  medication?: Medication;
  dayTakes?: DayTakes[];
  //prescription: Prescription;
}
