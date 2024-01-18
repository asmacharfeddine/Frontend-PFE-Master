import { Site } from "../site/site.model";

export interface SiteGroup {
  siteGrpKy: number;
  siteGrpNm: string;
  siteGrpUnxTmCrt: Date;
  siteGrpUnxTmUpdt: Date;
  siteGrpRcrdSts: number;
  sites: Site[];
}
