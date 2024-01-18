import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { PeopleComponent } from '../../people.component';
import { Patient } from '../patient.model';
import { AuthService } from '@core';
import { MyDoctorService } from './doctor.service';
import { Doctor } from './doctor.model';
import { surgeryType } from '../../surgeryType.model';
@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.scss']
})
export class AllPatientsListComponent implements OnInit {
  patients: Patient[]=[];
  patientss: Patient[]=[];

  docpatients: Patient[]=[];

  filteredPatients: any[]=[];
  searchQuery: any;
  searchQuery2: any;
  email: string;
  doctor: Doctor;
  error: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private PatientService: PatientService,
    private authService: AuthService ,
    private doctorService: MyDoctorService,
    //private snackBar: MatSnackBar
    ){}

    /*getDoctor(): void {
      this.doctorService.getDoctorByEmail(this.email).subscribe(
        (data) => {
          this.doctor = data;
          console.log("the doc infos :", this.doctor);
          this.getAllPatientsForDoctor();
          },
        (error) => {
          this.error = error.message;
        }
      );
    }*/

    pp:any[];
    getAllPatientsForDoctor() {
      this.doctorService.getDoctorByEmail(this.email).subscribe(
        (data)=>{
          this.doctor=data
          console.log('is it the doc ?',this.doctor)
          console.log('is it the doc patients ?',this.doctor.patients)
           this.pp=this.doctor.patients;

      this.doctorService.getAllPatientsForDoctor(this.doctor.userKey).subscribe(
        (data: Patient[]) => {
          this.patients = data;
          this.doctor.patients = this.patients,
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
    ngOnInit() {
   this.email = this.authService.currentUserValue.username;
    console.log("the doctor", this.email );
  // this.getDoctor();
   //this.getAllPatientsForDoctor();
   //console.log("the doctor infos",this.doctor);
      //this.loadPatients();
      this.getAllPatientsForDoctor();
      console.log("offff");
      //console.log('filterd patients', this.doctor.patients);
      console.log('filterd patients', this.pp);

    }
loadDoctorPatients(): void{

}




/*loadPatientsForDoctor(): Observable<Patient[]> {
  this.patients= this.doctorService.getAllPatientsForDoctor(this.doctor.userKey);
  // You can also subscribe here if needed
  // this.patients$.subscribe((data) => {
  //   this.filteredPatients = data;
  // });
}*/
    /*loadPatients(): void {
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

    }*/



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
          patients.bloodGroup.toLowerCase().includes(searchTerm)||
          patients.userFirstName.toLowerCase().includes(searchTerm) ||
          patients.userLastName.toLowerCase().includes(searchTerm)
          //surgeryType[patients.surgeryType].toLowerCase().includes(searchTerm)
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




}
