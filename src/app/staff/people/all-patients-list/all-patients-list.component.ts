import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient-care-folder-page/patient.service';
import { PeopleComponent } from '../people.component';
import { AuthService } from '@core';
import { MyNurseService } from '../patient-care-folder-page/nurse.service';
import { Nurse } from '../patient-care-folder-page/nurse.model';
import { Patient } from '../patient-care-folder-page/patient.model';
@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.scss']
})
export class AllPatientsListComponent implements OnInit {
  patients: any[]=[];
  filteredPatients: any[]=[];
  searchQuery: any;
  searchQuery2: any;
  email: string;
nurse: Nurse;
error: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private PatientService: PatientService,
    private authService: AuthService ,
    private nurseService: MyNurseService,

    //private snackBar: MatSnackBar
    ){}





    ngOnInit(): void {
      this.email = this.authService.currentUserValue.username;
      console.log("the nurse", this.email );
      this.getAllPatientsForNurse();
      //this.loadPatients();
      console.log('filterd patients', this.patients);
    }





    pp:any[];
    getAllPatientsForNurse() {
      this.nurseService.getNurseByEmail(this.email).subscribe(
        (data)=>{
          this.nurse=data
          console.log('is it the nurse ?',this.nurse)
          console.log('is it the nurse patients ?',this.nurse.patients)
           this.pp=this.nurse.patients;

      this.nurseService.getAllPatientsForNurse(this.nurse.userKey).subscribe(
        (data: Patient[]) => {
          this.patients = data;
          this.nurse.patients = this.patients,
          this.filterPatients();

          //console.log("all patients for this doc", this.doctor.patients);

          console.log("all patients for this doc", this.patients);
        },
        (error) => {
          this.error = error.message;
        }
      );
    })
    }









    loadPatients(): void {
      this.PatientService.getAllPatients().subscribe(
        (data) => {
          console.log("all patients are here",data);
          this.patients=data;
          this.filterPatients();
        },
        (error) => {
            console.error('Error fetching patients, error ')
        }
        );

    }



    filterPatients() {
      const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

      if (!searchTerm) {
        // If the search query is empty, show all patients
        console.log("are we here ");
        this.filteredPatients = this.patients;
        console.log("are we here ",this.filteredPatients);

        //console.log("are we here ?",this.filteredPatients);
        return;
      }

      this.filteredPatients = this.patients.filter((patients) => {
        return (
          patients.bloodGroup.toLowerCase().includes(searchTerm) ||
          patients.userFirstName.toLowerCase().includes(searchTerm) ||
          patients.userLastName.toLowerCase().includes(searchTerm)
         //patients.surgeryTtpe.toLowerCase().includes(searchTerm)

        );
      });
    }



getSpecificPatientCard(data: any) {
  const dialogRef = this._dialog.open(PeopleComponent, {
    data,
  });
  // Programmatically navigate to the FirstComponent route

  /*this.router.navigate(['/doctor/patientInfos/:data', data]);
  console.log('patientId', data);*/
}


/*goToCalendar(data: any) {
  // Programmatically navigate to the FirstComponent route

  this.router.navigate(['calendar', data], { queryParams: { key: data } });

}*/
}
