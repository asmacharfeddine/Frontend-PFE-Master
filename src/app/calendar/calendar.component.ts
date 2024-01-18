import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Calendar } from './calendar.model';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
//import { INITIAL_EVENTS } from './events-util';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'app/doctor/people/patient-care-folder-page/patient.service';
import { Prescription } from 'app/doctor/prescription/prescription.model';
import { MedicationPart } from 'app/doctor/people/patient-care-folder-page/form/medicationPart.model';
import { MedicationPartService } from 'app/doctor/prescription/medication-parts/medicationPart.service';
import  {PrescriptionService} from 'app/staff/prescription/prescription.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: UntypedFormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData!: Calendar;
  filterItems: string[] = [
    'work',
    'personal',
    'important',
    'travel',
    'friends',
  ];

  calendarEvents?: EventInput[];
  tempEvents?: EventInput[];

  public filters: Array<{ name: string; value: string; checked: boolean }> = [
    { name: 'work', value: 'Work', checked: true },
    { name: 'personal', value: 'Personal', checked: true },
    { name: 'important', value: 'Important', checked: true },
    { name: 'travel', value: 'Travel', checked: true },
    { name: 'friends', value: 'Friends', checked: true },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medicationPartService: MedicationPartService,
    private prescriptionService: PrescriptionService,
  ) {
    super();
    this.dialogTitle = 'Add New Event';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar(blankObject);
    this.addCusForm = this.createCalendarForm(this.calendar);
  }
   patientId:any
  public ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
       this.patientId = params['key'];
        console.log("????",this.patientId)
      }
       );
       this.getAllPrescriptions();
      this.getMedicationPartsforCalendar ()
      // this.loadPrescriptionsOfPatient();
    //this.calendarEvents = INITIAL_EVENTS;
    this.tempEvents = this.calendarEvents;
    this.calendarOptions.initialEvents = this.calendarEvents;
  }




  patientPresc:Prescription[]=[]
  /*getMedicationParts() {
      this.patientPresc = this.prescriptions;
      console.log('PatientPrescss:', this.patientPresc);
      this.patientPresc.forEach((PP) => {
        const event: EventInput = {
          title: 'MedicationPart', // Vous pouvez personnaliser le titre
          start: PP.medicationPart.startDate, // Date de debut de medicationPart
          end:PP.medicationPart.endDate,
          category: 'PrescriptionMedication', // Catégorie de l'événement
          className: "fc-event-success", // Couleur de fond de l'événement (personnalisez la couleur ici)
        };
        console.log('BackgroundColor of MedicationPart event:', event.backgroundColor);
        this.calendarEvents.push(event);
      });
      console.log('Calendar Events:', this.calendarEvents);
      //this.addEventSource(this.calendarEvents);

  }*/







  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };



// my part
prescriptions: Prescription[]=[];
/*loadPrescriptionsOfPatient() {
  console.log("ky:", this.patientId)
  this.patientService.getAllPrescriptionsForPatient(this.patientId).subscribe(
    (data: Prescription[]) => {
      this.prescriptions = data
      console.log("alllllllllllll paaaaaa presc", this.prescriptions);
    },
    (error) => {
      console.error('Error fetching prescriptions');
    }
  )

}*/

/*getMedicationPartsforCalendar() {
  this.patientService.getAllPrescriptionsForPatient(this.patientId).subscribe(
    (data: Prescription[]) => {
      this.prescriptions = data
      console.log("alllllllllllll paaaaaa presc", this.prescriptions);
      this.patientPresc = this.prescriptions;
      this.calendarEvents = this.mapMedicationPartsToEvents(this.medicationPartService.getMedicationPartsForPrescription())
    },
    (error) => {
      console.error('Error fetching prescriptions');
    })

  }

  // After adding the medication parts events, update the FullCalendar events.


mapMedicationPartsToEvents(medParts:MedicationPart[]): EventInput[]{
  return medParts.map((medPart)=> ({
    start:medPart.startDate,
    end: medPart.endDate,
    details: medPart.takes
  }))
}*/
allPrescriptions: Prescription[]=[];
getAllPrescriptions(){
  this.prescriptionService.getAllPrescriptions().subscribe((data:Prescription[])=>{
    this.allPrescriptions=data;
    console.log("all prescriptions for all patients", this.allPrescriptions);
  })
}


getMedicationPartsforCalendar() {
  this.prescriptionService.getAllPrescriptions().subscribe(
    (data: Prescription[]) => {
      this.prescriptions = data;
      console.log(' Prescriptions:', this.prescriptions);

      this.calendarEvents = this.mapMedicationPartsToEvents(this.prescriptions);
    },
    (error) => {
      console.error('Error fetching prescriptions');
    });
}

mapMedicationPartsToEvents(prescriptions: Prescription[]): EventInput[] {
  const events: EventInput[] = [];

  prescriptions.forEach((prescription) => {
    prescription.medicationParts.forEach((medicationPart) => {
      const event: EventInput = {
        title: 'MedicationPart for Patient ',
        start: medicationPart.startDate,
        end: medicationPart.endDate,
        details: medicationPart.takes,
        category: 'PrescriptionMedication',
        className: 'fc-event-success',
      };
      events.push(event);
    });
  });

  return events;
}






















  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDateSelect(selectInfo: DateSelectArg) {
    this.addNewEvent();
  }

  addNewEvent() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        console.log(this.calendarData.startDate);
        this.calendarEvents = this.calendarEvents?.concat({
          // add new event data. must create new array
          id: this.calendarData.id,
          title: this.calendarData.title,
          start: this.calendarData.startDate,
          end: this.calendarData.endDate,
          className: this.getClassNameValue(this.calendarData.category),
          groupId: this.calendarData.category,
          details: this.calendarData.details,
        });
        this.calendarOptions.events = this.calendarEvents;
        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }









  changeCategory(event: MatCheckboxChange, filter: { name: string }) {
    if (event.checked) {
      this.filterItems.push(filter.name);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
  }

  filterEvent(element: string[]) {
    const list = this.calendarEvents?.filter((x) =>
      element.map((y?: string) => y).includes(x.groupId)
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row: EventClickArg) {
    const calendarData = {
      id: row.event.id,
      title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      endDate: row.event.end,
      details: row.event.extendedProps['details'],
    };
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },

      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents?.forEach((element, index) => {
          if (this.calendarData.id === element.id) {
            this.editEvent(index, this.calendarData);
          }
        }, this);
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents?.forEach((element) => {
          if (this.calendarData.id === element.id) {
            row.event.remove();
          }
        }, this);

        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editEvent(eventIndex: number, calendarData: Calendar) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const calendarEvents = this.calendarEvents!.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent['details'] = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar: Calendar): UntypedFormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      category: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getClassNameValue(category: string) {
    let className;

    if (category === 'work') className = 'fc-event-success';
    else if (category === 'personal') className = 'fc-event-warning';
    else if (category === 'important') className = 'fc-event-primary';
    else if (category === 'travel') className = 'fc-event-danger';
    else if (category === 'friends') className = 'fc-event-info';
    else if (category === 'PrescriptionMedication') className = 'fc-event-info';

    return className;
  }
}
