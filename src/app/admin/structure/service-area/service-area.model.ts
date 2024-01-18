import { ExploitationUnit } from "../exploitation-unit/exploitation-unit.model";
import { Service } from "../service/service.model";

export interface ServiceArea {
  servAreaKy: number;
  servAreaNm: string;
  servAreaUnxTmCrt: Date;
  servAreaUnxTmUpdt: Date;
  servAreaRcrdSts: number;
  exploitationUnits: ExploitationUnit[];
}
