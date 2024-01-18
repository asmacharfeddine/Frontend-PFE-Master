import { Userr } from "../user.model";
import { surgeryType } from "../surgeryType.model";
import { Prescription } from "app/doctor/prescription/prescription.model";
import { Doctor } from "./doctor.model";
import { Nurse } from "./nurse.model";
export interface Patient extends Userr{
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
