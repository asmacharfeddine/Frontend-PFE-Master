import { Userr } from "../user.model";
import { Patient } from "./patient.model";
export interface Doctor extends Userr{
patients:Patient[]
}
