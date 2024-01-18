import { Userr } from "../../user.model";
import { Patient } from "../patient.model";
export interface Nurse extends Userr{
patients:Patient[]
}
