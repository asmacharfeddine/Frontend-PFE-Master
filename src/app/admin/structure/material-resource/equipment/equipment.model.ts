import { Room } from "../room/room.model";

export interface Equipment {
  equipmentKy: number;
  equipmentLabel: string;
  addressIp: string;
  addressMac: string;
  description: string;
  equipmentType: string;
  equipmentUnxTmCrt: Date;
  equipmentUnxTmUpdt: Date;
  equipmentRcrdSts: number;
}

