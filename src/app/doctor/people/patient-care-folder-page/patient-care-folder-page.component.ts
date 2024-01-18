import { Component, Inject } from '@angular/core';
//import { DatePipe } from '@angular/common';
import { PatientService } from './patient.service';
import { DeletePrescriptionComponent } from './delete-prescription/delete-prescription.component';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
// tables part
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
  ApexGrid,
} from 'ng-apexcharts';
import { Patient } from './patient.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormPatientComponent } from './form/form.component';
import { Prescription } from 'app/doctor/prescription/prescription.model';
import { Medication } from 'app/admin/medications/medications-list/medication.model';
import { Direction } from '@angular/cdk/bidi';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicationPart } from './form/medicationPart.model';
import { UpdatePrescriptionComponent } from './update-prescription/update-prescription.component';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  grid: ApexGrid;
  colors: string[];
};
@Component({
  selector: 'app-patient-care-folder-page',
  templateUrl: './patient-care-folder-page.component.html',
  styleUrls: ['./patient-care-folder-page.component.scss']
})
export class PatientCareFolderPageComponent {
  patientId: any;
  patient: Patient;
  medications: Medication[] = [];
  prescriptions: Prescription[] = [];
  recievedData: any;
  bookingForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  isDisabled = true;
  //recievedPatient: Patient;
  // tables part
  public areaChartOptions!: Partial<ChartOptions>;
  public smallChart1Options!: Partial<ChartOptions>;
  public smallChart2Options!: Partial<ChartOptions>;
  public smallChart3Options!: Partial<ChartOptions>;
  public smallChart4Options!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  selectedPrescreption: Prescription | null = null;
  selectedMedicationPart: MedicationPart | null = null;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router,

    //private datePipe: DatePipe,

    //@Inject(MAT_DIALOG_DATA) public data: any,

  ) {

    this.route.params.subscribe((data) => {

      this.recievedData = data; // Access the data passed as route parameters
      this.patientId = this.recievedData.userKey;
    });
    // this.recievedPatient = this.data;
    this.bookingForm = this.fb.group({
      userFirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      userLastName: [''],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      bloodGroup: [
        '',
        [Validators.required],
      ],
      patientBirthDate: ['', [Validators.required]],
      surgeryType: ['', [Validators.required]],
      surgeryDate: ['', [Validators.required]],
      timeSlot: ['', [Validators.required]],
      injury: [''],
      note: [''],
      uploadFile: [''],
    });
  }

  goToPatientData() {
    // Navigate to the "patientInfos" page and pass the patient data as a query parameter
    this.router.navigate(['/doctor/patientInfos'], {
      queryParams: {
        patientData: JSON.stringify(this.recievedData), // Pass the entire received data as JSON
        uniquePrescriptions: JSON.stringify(this.uniquePrescriptions),

      },
    });

  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.recievedData = data; // Access the data passed as route parameters
      this.patientId = this.recievedData.userKey;

      // Load data based on the updated route parameters here, e.g., load prescriptions
      this.loadPrescriptionsOfPatient();
    });



    /*this.route.queryParams.subscribe((params) => {
      const patientData = params['patientData'];
      //const uniquePrescriptions = params['uniquePrescriptions'];

      if (patientData) {
        this.recievedData = JSON.parse(patientData);
        // Now, you have the patient data back in this.recievedData
        //this.uniquePrescriptions = JSON.parse(uniquePrescriptions);
      }
    });*/
    console.log("patientIddddd", this.patientId);
    console.log("All prescriptions for this patient", this.recievedData.prescriptions)
    this.loadPrescriptionsOfPatient();
    //this.goToPrescriotionsList();


    console.log('prescriptions of this patient', this.uniquePrescriptions);

    if (this.recievedData) {
      console.log('aaaaaaaaaaaaaaa', this.recievedData);

      //const formattedBirthDate = this.datePipe.transform(this.recievedData.patientBirthDate, 'yyyy-MM-dd');
      this.bookingForm.patchValue({
        userFirstName: this.recievedData.userFirstName,
        userLastName: this.recievedData.userLastName,
        gender: this.recievedData.gender,
        phoneNumber: this.recievedData.phoneNumber,
        address: this.recievedData.address,
        bloodGroup: this.recievedData.bloodGroup,
        patientBirthDate: this.recievedData.patientBirthDate,
        surgeryType: this.recievedData.surgeryType,
        surgeryDate: this.recievedData.surgeryDate,
      })

    }

    /* this.smallChart1();
     this.smallChart2();
     this.smallChart3();
     this.smallChart4();
     this.chart1();
     this.chart2();*/
  }

  openEditForm(data: any){
    console.log(data, 'data');

    this._dialog.open(UpdatePrescriptionComponent, {
      data,
    });
    this._dialog.afterAllClosed.subscribe(()=>{
     // this.loadPhysicalTreatments();

    })
  }







  onSubmit() {
    console.log('Form Value', this.bookingForm.value);
  }

  get f() {
    return this.bookingForm.controls;
  }

  openAddForm(data: any) {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    console.log(data, 'data');
    console.log("the recieved prescreptions for this patient", this.uniquePrescriptions)

    const dialogRef = this._dialog.open(FormPatientComponent, {
      //data: data,

      data: {
        patient: data,
        prescList: this.uniquePrescriptions,
      },

      /// panelClass: 'custom-dialog', // Use the custom CSS class
      // data: this.recievedData, // Pass the patient data to the dialog
      // direction: tempDirection,


    }
    );
    console.log(data, 'i openennnnn');
    /*this._dialog.open(FormPatientComponent, {
    data: this.recievedData.user_Key,
    });*/
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Prescription Added Succefully!");
        //this.goToCategoryList();
        this.recievedData.push(data.patient);
        //this.goToPatientData();
        //this.uniquePrescriptions = data.prescList;
        //window.location.reload();

        this.refreshTable()
        //window.location.reload();

      }
      // Handle any logic after the dialog is closed if needed
    });

    //this.goToPatientData();
  }


  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }

  uniquePrescriptions: Prescription[] = [];

  loadPrescriptionsOfPatient() {
    console.log("ky:", this.recievedData)
    this.patientService.getAllPrescriptionsForPatient(this.recievedData.userKey).subscribe(
      (data: Prescription[]) => {
        this.prescriptions = data // all
        console.log("alllllllllllll paaaaaa presc", this.prescriptions);
        for (const prescription of data) {
          // Check if the prescription is already in the uniquePrescriptions array
          const existingPrescription = this.uniquePrescriptions.find(
            (p) =>
              p.prescriptionKey === prescription.prescriptionKey
            // Add other conditions to check for uniqueness based on your data structure
          );

          // If the prescription is not in the uniquePrescriptions array, add it
          if (!existingPrescription) {
            this.uniquePrescriptions.push(prescription);

            this.uniquePrescriptions.sort((a, b) => {
              const dateA = new Date(a.prescriptionDate).getTime();
// this
              const timeA = new Date(`1970-01-01T${a.prescriptionTime}`).getTime();

              const dateB = new Date(b.prescriptionDate).getTime();
      // this

              const timeB = new Date(`1970-01-01T${b.prescriptionTime}`).getTime();
              if (dateB - dateA === 0) {
                return timeB - timeA;
              }
              return dateB - dateA;
            });
//to here

            //this.uniquePrescriptions = data.reverse();
            //this.goToPrescriotionsList();
          }
        }
      },
      (error) => {
        console.error('Error fetching prescriptions');
      }
    )

  }



  DeletePrescription(prescription: Prescription) {
    const dialogRef = this._dialog.open(DeletePrescriptionComponent, {
      data: prescription,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) {
        this.patientService.deletePrescriptionById(prescription.prescriptionKey).subscribe(
          () => {
            this.loadPrescriptionsOfPatient(); // Assuming you have a method to load prescriptions
            window.location.reload();            //this.getPrescriptionsList(); // the method getPrescriptionsList() is to define to get the list after closing the dialog
          },
          (error: any) => {
            console.error('Error while deleting prescription:', error);
          }
        )
      }
    })
  }

  refreshTable() {
    // You can fetch or update the data as needed
    // For example, if uniquePrescriptions is a property in your component:
    this.loadPrescriptionsOfPatient(); // Assuming you have a method to load prescriptions
  }




  showPrescriptionMedicationParts(data:any){
   this.router.navigate(['/doctor/prescriptionMedicationParts',data]);
  console.log('prescriptionKey',data);
   }




   toggleMedicationParts(prescreption: Prescription){
    //this.selectedPrescreption = prescreption;

    this.selectedPrescreption = this.selectedPrescreption === prescreption ? null : prescreption;
 }

 toggleDayTakes(medPart: MedicationPart){
  //this.selectedPrescreption = prescreption;

  this.selectedMedicationPart = this.selectedMedicationPart === medPart ? null : medPart;
}


isDeleteButtonDisabled(prescription: any): boolean {
  // Check if any medp of the prescription has at least one dayTake
  return prescription.medicationParts.some((medp: any) => medp.dayTakes.length > 0);
}






  private smallChart1() {
    this.smallChart1Options = {
      series: [
        {
          name: 'Appointments',
          data: [
            50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62,
          ],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#6F42C1'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private smallChart2() {
    this.smallChart2Options = {
      series: [
        {
          name: 'Operations',
          data: [5, 6, 8, 5, 7, 5, 6, 4, 3, 4, 7, 4, 9, 6, 5, 6],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FD7E14'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private smallChart3() {
    this.smallChart3Options = {
      series: [
        {
          name: 'New Patients',
          data: [
            50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62,
          ],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#4CAF50'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private smallChart4() {
    this.smallChart4Options = {
      series: [
        {
          name: 'Earning',
          data: [
            150, 161, 180, 150, 172, 152, 160, 141, 130, 145, 170, 140, 193,
            163, 150, 162,
          ],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#2196F3'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Patients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Patients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#407fe4', '#908e8e'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Colds and Flu',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Headaches',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Malaria',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'Typhoid',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ['#01B8AA', '#374649', '#FD625E', '#F2C80F'],
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }



}
