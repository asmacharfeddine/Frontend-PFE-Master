import { StaffGroupLink } from "../staff-group-link/staff-group-link.model";

export interface StaffGroup {
  staffGrpKy: number;
  staffGrpName: string;
  staffGrpType: string;
  staffGrpPrvlgd: number;
  staffGrpUnxTmCrt: Date;
  staffGrpUnxTmUpdt: Date;
  staffGrpRcrdSts: number;
  staffGrpLinks: StaffGroupLink[];
}
