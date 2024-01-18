import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MedicationsService } from 'app/admin/medications/medications-list/medications.service';
import { Medication } from 'app/admin/medications/medications-list/medication.model';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MedicationDetailsComponent } from './medication-details/medication-details.component';
import { DatePipe } from '@angular/common';
import { Prescription } from 'app/doctor/prescription/prescription.model';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicationPart } from './medicationPart.model';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormPatientComponent implements OnInit {

  @Output() prescriptionAdded: EventEmitter<void> = new EventEmitter<void>();

  medicationParts: FormArray; // Ajoutez cette ligne
  prescriptions: Prescription[];
  uniquePrescriptions: Prescription[] = [];

  patient: any;
  patientId: any;
  prescriptionForm: FormGroup;
  initialMedicationPart: FormGroup;
  medications: Medication[] = [];
  medicationsNames: String[] = [];
  filteredMedications: Observable<Medication[]>;
  searchTerm: string = '';
  myControl = new FormControl<Medication>(null);
  filteredOptions: Observable<Medication[]>;
  now: string;
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  takesNumber: number[] = [1, 2, 3];
  quantities: number[] = [1, 2, 3];
  prescList: Prescription[];
  //route: any;
  //prescriptionDate:FormGroup;
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<FormPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,
    private medicationsService: MedicationsService,
    private patientService: PatientService,
    private route: ActivatedRoute,// Inject ActivatedRoute here
    private router: Router,
    //private datePipe: DatePipe,


  ) {
    const currentTime = new Date().toLocaleTimeString();

    //this.prescriptions = data.prescriptions;
    console.log('checking prescs', this.prescriptions);
    //this.patientId = data.userKey;

    this.patientId = data.patient.userKey;
    this.prescList = data.prescList;

    console.log("PrescList *** :", this.prescList);
    console.log("Patient recieved *** :", data.patient.userKey)

    setInterval(() => {
      this.now = new Date().toString().split(' ')[4];
    }, 1);

    this.route.params.subscribe((data) => {
      this.patient = data; // Access the data passed as route parameters
    });
    const currentDate = new Date();
    this.medicationParts = this.fb.array([]),
      this.prescriptionForm = this.fb.group({
        dosage: [''],
        treatmentDuration: [''],
        // myControl: [''],
        prescriptionDate: [currentDate.toISOString().substring(0, 10),[Validators.required]], //new Date().toISOString().substring(0, 10),
        prescriptionTime: [currentTime],
        specialInstructions: [],
        // medicationPart
        medicationParts: this.medicationParts, // Associez medicationParts au formulaire
      });

       /// const currentDate = new Date();
         this.initialMedicationPart = this.fb.group({
          period: [''],
          takes: [''],
          quantity: [''],
          notes: [''],
          startDate: [currentDate.toISOString().substring(0, 10)],
          endDate: [currentDate.toISOString().substring(0, 10)],
          myControl: [''], // Assuming this is for medication selection
        });
  }

  divs: any[] = [];

  goToFirstComponent(data: any) {
    // Programmatically navigate to the FirstComponent route

    this.router.navigate(['/doctor/patientInfos', data]);
    console.log('daaaaaataaaa of patient with prescription', data);
    this.dialogRef.close();

  }

  onCloseClick(): void {


    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

  ngOnInit(): void {

    //console.log('checking prescs', this.prescriptions);
    this.uniquePrescriptions = this.prescriptions;
console.log("the patientId",this.patientId);
    console.log("recieveee", this.data.receivedData);
    console.log("recieveee2222", this.uniquePrescriptions);

    /*this.prescriptionDate = new FormGroup({
      'presentDate': new FormControl((new Date()).toISOString().substring(0,10))
    });*/
    this.loadMedications();



    console.log("loaded : ", this.medications);
    //this.filterMedications();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.medications.slice();
      }),
    );
    /*this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );*/

    // ... your other initialization code


  }

  private _filter(name: string): Medication[] {
    const filterValue = name.toLowerCase();

    return this.medications.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayMed(med: Medication): string {
    return med && med.name ? med.name : '';
  }
  loadMedications() {
    this.medicationsService.getAllMedications().subscribe(
      (response) => {
        this.medications = response;
        console.log("medicaaations", this.medications)
        this.medicationsNames = this.medications.map(medication => medication.name);
      },
      (error) => {
        console.error('Error getting medications', error)
      }
    )
  }

  // Add a method to update the filtered list based on the search term




  searchQuery: any;




  openDetailsForm(selectedMedication: Medication) {
    const dialogRef = this.dialog.open(MedicationDetailsComponent, {
      data: selectedMedication, // Pass the selected medication as data
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the form result if needed
    });
  }

  onMedicationSelected(event: MatAutocompleteSelectedEvent): void {
    // Clear the input field value to prevent the selected medication from being added automatically

    // Your code to handle opening the details form here
    // You can access the selected medication using event.option.value
    const selectedMedication = event.option.value;
    // Add your logic here to handle the selected medication
  }


  // Add this function to your component
  convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    return inputDate;
  }



  addMedicationPart() {
    const currentDate = new Date();
    const medicationPartControl = this.fb.group({
      period: [''],
      takes: [''],
      quantity: [''],
      notes: [''],
      //medication: [''],
      myControl: [''],
      startDate: [currentDate.toISOString().substring(0, 10)],
      endDate: [currentDate.toISOString().substring(0, 10)],
    });
    this.medicationParts.push(medicationPartControl);
  }


  // this method dosne't work anymore in the frontend because i deleted medication
  /* createAndAddPrescription() {

       // Get the patient ID from the route parameters
       const patientId = this.patientId;

       // Create a Prescription object from form inputs
         const prescription:Partial<Prescription>={



         dosage: this.prescriptionForm.get('dosage').value,
         treatmentDuration: this.prescriptionForm.get('treatmentDuration').value,
         medication: this.myControl.value? this.myControl.value : null, // Assuming you have an 'id' property in Medication model
         prescriptionDate: this.prescriptionForm.get('prescriptionDate').value,
         prescriptionTime: this.prescriptionForm.get('prescriptionTime').value,
         specialInstructions: this.prescriptionForm.get('specialInstructions').value,

       };
       if (this.prescriptionForm.valid) {
       console.log('p2000',prescription);
         this.patientService.createPrescription(prescription).subscribe(
           (createdPrescription) => {
             console.log('Prescription created successfully',createdPrescription);

       console.log ('pppppp', prescription);
       // Call your service method to add the prescription to the patient
       this.patientService.addPrescriptionToPatient(this.data.user_Key, prescription.medication?.medication_Key,createdPrescription)
         .subscribe(
           (response) => {
             console.log('Prescription added successfully', response);

           },
           (error) => {
             console.error('Error adding prescription to the patient', error);
           }

             );
           },
           (error) => {
             console.error('Error adding prescription', error);
           }
         );
     }

   }*/




  addPrescriptionToPatientWithMedicationParts() {
    // Get the patient ID from the route parameters
    const patientId = this.patientId;


    // Create an array to hold the medication parts
    const medicationPartsArray = this.prescriptionForm.get('medicationParts') as FormArray;
    const medicationParts: MedicationPart[] = [];
    medicationPartsArray.push(this.initialMedicationPart);

    // Iterate through the form controls and construct MedicationPart objects
    for (const control of medicationPartsArray.controls) {
      const medicationPart: Partial<MedicationPart> = {
        period: control.get('period').value,
        takes: control.get('takes').value,
        quantity: control.get('quantity').value,
        notes: control.get('notes').value,
        startDate: control.get('startDate').value,
        endDate: control.get('endDate').value,
        //status:.get('status').value,
        //medication: control.get('myControl').value || null, // Use the selected medication from the autocomplete or set to null if not provided
        medication: this.myControl.value ? this.myControl.value : null, // Assuming you have an 'id' property in Medication model

      };
      medicationParts.push(medicationPart);
    }




    // Convert the date to a Date object
    const selectedDate = new Date(this.prescriptionForm.get('prescriptionDate').value);


    // Create a Prescription object from form inputs
    const prescription: Partial<Prescription> = {


      dosage: this.prescriptionForm.get('dosage').value,
      treatmentDuration: this.prescriptionForm.get('treatmentDuration').value,
      //medication: this.myControl.value? this.myControl.value : null, // Assuming you have an 'id' property in Medication model
      prescriptionDate: this.prescriptionForm.get('prescriptionDate').value,
      prescriptionTime: this.prescriptionForm.get('prescriptionTime').value,
      specialInstructions: this.prescriptionForm.get('specialInstructions').value,
      //patient: this.data.patient,
      //period: this.prescriptionForm. get('period').value,
      medicationParts: medicationParts//this.prescriptionForm.get('medicationParts').value,

      //patient: this.patient,
    };

    console.log("****** Recieved patienr : ", this.data.patient)

    if (this.prescriptionForm.valid) {
      console.log('p2000', prescription);
      this.patientService.createPrescription(prescription).subscribe(
        (createdPrescription) => {

          console.log('Prescription created successfully', createdPrescription);
          // Add the newly created prescription at the beginning of the array


          console.log('prescriptions', this.prescriptions);
          console.log('iiiiii', this.patientId);
          console.log('hello are we here ', this.data.userKey);

          // Call your service method to add the prescription to the patient
          this.patientService.addPrescriptionToPatientWithMedicationParts(this.data.patient.userKey, createdPrescription)
            .subscribe(
              (response) => {
                console.log('Prescription added successfully', response);

                //this.uniquePrescriptions.push(createdPrescription);

                // Add the newly created prescription to the existing prescriptions array
                //this.prescriptions.unshift(createdPrescription); // Add to the beginning of the array
                //this.data.uniquePrescriptions = this.prescriptions;
                // Handle success here (e.g., show a success message)
                /*const resultData = {
                 uniquePrescriptions: this.prescriptions,
                 receivedData: this.data.receivedData, // Pass the receivedData back
               };*/
                this.dialogRef.close(1); // Return 1 to indicate successful addition
                // this.router.navigate(['/doctor/patientInfos/'])


                this.goToPrescriptionsList();
                //this.prescriptionAdded.emit();

              },
              (error) => {
                console.error('Error adding prescription to the patient', error);
                // Handle error here (e.g., show an error message)
              }

            );
            this.prescList.push(createdPrescription);
        },
        (error) => {
          console.error('Error adding prescription', error);
          // Handle error here (e.g., show an error message)
        }

      );
    }
  }

  goToPrescriptionsList() {
    this.router.navigate(['/doctor/patientInfos/'])
  }


  removeMedicationPart(index: number) {
    this.medicationParts.removeAt(index);
  }

  addDiv() {
    //const newDiv = { ...this.prescriptionForm.value };
    this.prescriptionForm.reset();
    //newDiv.medication= '';


    this.divs.push({}); // Add an empty object to the array

  }


  precsiptionDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputPrescriptionDate = control.value;
        if (!inputPrescriptionDate) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = this.prescList.some(
            (p) => p.prescriptionDate.toISOString().toLowerCase() === inputPrescriptionDate.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
}


  /* to use when to initiate the medicationPartForm before adding a new one (medicationPartForm)
   resetFormField() {
  this.taskForm.controls['name'].reset();
  this.taskForm.controls['title'].reset();
  this.taskForm.controls['done'].reset();
  this.taskForm.controls['priority'].reset();
  this.taskForm.controls['due_date'].reset();
  this.taskForm.controls['note'].reset();
} */

}
