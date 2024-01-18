import { Equipment } from "../equipment/equipment.model";
import { RoomGroup } from "../room-group/room-group.model";

export interface Room {
  roomKy: number;
  roomLabel: string;
  roomType: string;
  roomClass: string;
  roomRcrdSts: number;
  roomUnxTmCrt: Date;
  roomUnxTmUpdt: Date;
  equipments: Equipment[];
}

// export enum RoomClass {
//   SINGLE = 'Single Room',
//   DOUBLE = 'Double Room',
//   SHARED = 'Shared Room'
// }
// export enum RoomType {
//   DRESSING = 'Dressing',
//   ANESTHESIA = 'Anesthesia',
//   INTENSIVE_CARE_UNIT = 'Intensive Care Unit',
//   BEDROOM = 'Bedroom'
// }
