import { Userr } from "../user.model";
import { surgeryType } from "../surgeryType.model";
import { Prescription } from "app/doctor/prescription/prescription.model";
import { Doctor } from "./all-patients-list/doctor.model";
import { Nurse } from "./all-patients-list/nurse.model";
export interface Patient extends Userr{
 // userKey: number;
    gender : String;
    surgeryDate : String;
    patientBirthDate : Date;
    bloodGroup : String;
    phoneNumber : number;
    address : String;
   surgeryType : surgeryType;
   prescriptions: Prescription[];
   doctors: Doctor[];
   nurses: Nurse[];
}
