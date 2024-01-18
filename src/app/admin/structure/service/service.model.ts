import { ServiceArea } from "../service-area/service-area.model";
import { Site } from '../site/site.model';

export interface Service {
  serviceKy: number;
  serviceNm: string;
  serviceUnxTmCrt: Date;
  serviceUnxTmUpdt: Date;
  serviceRcrdSts: number;
  serviceAreas: ServiceArea[];
}
