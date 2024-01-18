import { ExploitationUnit } from "../../exploitation-unit/exploitation-unit.model";
import { Room } from "../room/room.model";

export interface RoomGroup {
  roomGrpKy: number;
  roomGrpNm: string;
  roomGrpUnxTmCrt: Date;
  roomGrpUnxTmUpdt: Date;
  roomGrpRcrdSts: number;
  rooms: Room[];
}
