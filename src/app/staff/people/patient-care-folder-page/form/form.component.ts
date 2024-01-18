    import { Component, Inject, OnInit } from '@angular/core';
    import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
    import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
    import { MedicationsService } from 'app/admin/medications/medications-list/medications.service';
    import { Medication } from 'app/admin/medications/medications-list/medication.model';
    import { Observable, map, startWith } from 'rxjs';
    import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
    import { MedicationDetailsComponent } from './medication-details/medication-details.component';
    import { DatePipe } from '@angular/common';
    import { Prescription } from 'app/doctor/prescription/prescription.model';
    import { PatientService } from '../patient.service';
    import { ActivatedRoute, Router} from '@angular/router';
import { MedicationPart } from './medicationPart.model';
    @Component({
      selector: 'app-form',
      templateUrl: './form.component.html',
      styleUrls: ['./form.component.scss']
    })
    export class FormPatientComponent implements OnInit{
      medicationParts: FormArray; // Ajoutez cette ligne
      prescriptions: Prescription[];
      patient: any;
      patientId:any;
      prescriptionForm: FormGroup;
      medications: Medication[]=[];
      medicationsNames: String[]=[];
      filteredMedications: Observable<Medication[]>;
      searchTerm: string = '';
      myControl = new FormControl<Medication>(null);
      filteredOptions: Observable<Medication[]> ;
      now: string;
      days: number[]=[1,2,3,4,5]
      //route: any;
      //prescriptionDate:FormGroup;
      constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<FormPatientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder,
        private medicationsService: MedicationsService,
        private patientService : PatientService,
        private route: ActivatedRoute ,// Inject ActivatedRoute here
        private router: Router,


    ){
      //this.prescriptions = data.prescriptions;
      console.log('checking prescs', this.prescriptions);
      this.patientId = data.user_Key;

      setInterval(() => {
      this.now = new Date().toString().split(' ')[4];
    }, 1);

    this.route.params.subscribe((data) => {
      this.patient = data; // Access the data passed as route parameters
    });

      this.medicationParts= this.fb.array([]),
      this.prescriptionForm = this.fb.group({
        dosage: [''],
        treatmentDuration: [''],
       // myControl: [''],
        prescriptionDate: [''], //new Date().toISOString().substring(0, 10)
        prescriptionTime: [''],
        specialInstructions: [''],
        // medicationPart
        medicationParts: this.medicationParts, // Associez medicationParts au formulaire
      });


    }

    divs: any[] = [];



      onCloseClick(): void {
        // You can optionally pass data back to the component that opened the dialog
        this.dialogRef.close(/* optional data to pass back */);
      }

      ngOnInit(): void {
        //console.log('checking prescs', this.prescriptions);

    console.log("recieveee", this.data.receivedData);
    console.log("recieveee2222", this.data.uniquePrescriptions);

        /*this.prescriptionDate = new FormGroup({
          'presentDate': new FormControl((new Date()).toISOString().substring(0,10))
        });*/
        this.loadMedications();



        console.log("loaded : ",this.medications);
        //this.filterMedications();
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string):this.medications.slice();
          }),
        );
        /*this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );*/
      }

      private _filter(name: string): Medication[] {
        const filterValue = name.toLowerCase();

        return this.medications.filter(option => option.name.toLowerCase().includes(filterValue));
      }
      displayMed(med: Medication): string {
        return med && med.name ? med.name : '';
      }
      loadMedications(){
        this.medicationsService.getAllMedications().subscribe(
          (response) => {
            this.medications = response;
            console.log("medicaaations",this.medications)
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
      const medicationPartControl = this.fb.group({
        period: [''],
        takes: [''],
        quantity: [''],
        notes: [''],
        //medication: [''],
        myControl: [''],
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




    addPrescriptionToPatientWithMedicationParts(){
       // Get the patient ID from the route parameters
       const patientId = this.patientId;


  // Create an array to hold the medication parts
        const medicationPartsArray = this.prescriptionForm.get('medicationParts') as FormArray;
        const medicationParts: MedicationPart[] = [];

          // Iterate through the form controls and construct MedicationPart objects
  for (const control of medicationPartsArray.controls) {
    const medicationPart: Partial<MedicationPart> = {
      period: control.get('period').value,
      takes: control.get('takes').value,
      quantity: control.get('quantity').value,
      notes: control.get('notes').value,
      //medication: control.get('myControl').value || null, // Use the selected medication from the autocomplete or set to null if not provided
      medication: this.myControl.value? this.myControl.value : null, // Assuming you have an 'id' property in Medication model

    };
    medicationParts.push(medicationPart);
  }





       // Create a Prescription object from form inputs
         const prescription:Partial<Prescription>={


         dosage: this.prescriptionForm.get('dosage').value,
         treatmentDuration: this.prescriptionForm.get('treatmentDuration').value,
         //medication: this.myControl.value? this.myControl.value : null, // Assuming you have an 'id' property in Medication model
         prescriptionDate: this.prescriptionForm.get('prescriptionDate').value,
         prescriptionTime: this.prescriptionForm.get('prescriptionTime').value,
         specialInstructions: this.prescriptionForm.get('specialInstructions').value,
         //period: this.prescriptionForm. get('period').value,
         medicationParts: medicationParts//this.prescriptionForm.get('medicationParts').value,

         //patient: this.patient,
       };
       if (this.prescriptionForm.valid) {
       console.log('p2000',prescription);
         this.patientService.createPrescription(prescription).subscribe(
           (createdPrescription) => {

             console.log('Prescription created successfully',createdPrescription);
   // Add the newly created prescription at the beginning of the array
          //this.prescriptions.unshift(createdPrescription);

       console.log ('pppppp', prescription);
       // Call your service method to add the prescription to the patient
       this.patientService.addPrescriptionToPatientWithMedicationParts(this.data.user_Key,createdPrescription)
         .subscribe(
           (response) => {
             console.log('Prescription added successfully', response);
              // Add the newly created prescription to the existing prescriptions array
        this.prescriptions.unshift(createdPrescription); // Add to the beginning of the array
         //this.data.uniquePrescriptions = this.prescriptions;
             // Handle success here (e.g., show a success message)
             /*const resultData = {
              uniquePrescriptions: this.prescriptions,
              receivedData: this.data.receivedData, // Pass the receivedData back
            };*/
             this.dialogRef.close(1); // Return 1 to indicate successful addition
            // this.router.navigate(['/doctor/patientInfos/'])


             //this.goToPrescriptionsList();

           },
           (error) => {
             console.error('Error adding prescription to the patient', error);
             // Handle error here (e.g., show an error message)
           }

             );
           },
           (error) => {
             console.error('Error adding prescription', error);
             // Handle error here (e.g., show an error message)
           }
         );
     }

    }

    goToPrescriptionsList(){
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


    }
