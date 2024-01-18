import { StaffGroupLink } from "../staff-group-link/staff-group-link.model";
import { User } from "../user.model";

export interface Staff extends User {
  staffGrpLinks: StaffGroupLink[];
}
