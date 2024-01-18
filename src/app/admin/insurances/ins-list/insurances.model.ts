
export interface insurance {
  insKy: number;
  insNm: string ;
  insNumber: number;
  policyNum: number ;
  policyNm: string ;
  policyType: string ;
  website: string ;
  contactPersonName: string ;
  phone :number;
  contactPersonEmail: string ;
  insuranceRcrdSts: number;
  insuranceUnxTmCrt: Date; // Ajoutez cette ligne
 insuranceUnxTmUpdt: Date;
}
