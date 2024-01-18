import { SiteGroup } from "../site-group/site-group.model";
import { Service } from "../service/service.model";

export interface Site {
  siteKy: number;
  siteNm: string;
  siteCountry: string;
  siteUnxTmCrt: Date;
  siteUnxTmUpdt: Date;
  siteRcrdSts: number;
  services: Service[];
}
