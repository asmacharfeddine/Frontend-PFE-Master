import { Staff } from "app/admin/staff/allstaff/staff.model";
import { StaffGroup } from "../staff-group/staff-group.model";

export interface StaffGroupLink {
  staffGrpLinkKy: number;
  staffGrpRef: StaffGroup;
  staffRef: Staff;
}
