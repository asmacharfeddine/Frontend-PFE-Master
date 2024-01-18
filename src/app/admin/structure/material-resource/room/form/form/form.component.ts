import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { SiteGroupService } from 'app/admin/structure/site-group/site-group.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../room.model';
import { RoomService } from '../../room.service';
import { RoomGroup } from '../../../room-group/room-group.model';
import { RoomGroupService } from '../../../room-group/room-group.service';

export interface DialogData {
  roomGroup: RoomGroup;
  rooms: Room[];//
  room: Room;//
  action: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  action: string;
  dialogTitle?: string;

  roomGroup: RoomGroup;
  rooms: Room[];
  room: Room;

  roomForm?: UntypedFormGroup;

  isAddRoomAction = false;
  isEditAction = false;

  roomTypes: String[] = [
    'Dressing',
    'Anesthesia',
    'Intensive Care Unit',
    'Bedroom'
  ];

  roomClasses: String[] = [
    'Single Room',
    'Double Room',
    'Shared Room'
  ];

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roomService: RoomService,
    public roomGroupService: RoomGroupService,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.roomGroup = data.roomGroup;

    this.rooms = data.rooms;
    this.room = data.room;
  }

  ngOnInit(): void {
    this.roomGroup = this.data.roomGroup;

    if (this.action === 'add-room') {
      this.dialogTitle = 'New Room';
      this.roomForm = this.createRoomForm();
      this.isAddRoomAction = true;
      this.isEditAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Room «'+ this.room.roomLabel +'»';
      this.roomForm = this.editRoomForm();
      this.isEditAction = true;
      this.isAddRoomAction = false;
    }

  }

  getErrorMessage() {
    if (this.formControl.hasError('required')) {
      return 'Required field';
    }

    if (this.formControl.hasError('duplicated')) {
      return 'duplicated field';
    }

    return '';
  }

  createRoomForm(): UntypedFormGroup {

      return this.fb.group({
        roomLabel: ['', [Validators.required],[this.checkDuplicateRoomName(this.roomGroup.rooms)]],
        roomType: ['', [Validators.required]],
        roomClass: [''],
      });

  }


  editRoomForm(): UntypedFormGroup {

      return this.fb.group({
        roomLabel: [this.room.roomLabel, [Validators.required],[this.checkDuplicateRoomName(this.rooms)]],
        roomType: [this.room.roomType, [Validators.required]],
        roomClass: [this.room.roomClass],
        // Add other form fields as needed for the site group
      });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAddChild(): void{

    if (this.roomForm && this.roomForm.valid) {
      const newRoom: Partial<Room> = {
        roomLabel: this.roomForm.get('roomLabel')?.value,
        roomType: this.roomForm.get('roomType')?.value,
        roomClass: this.roomForm.get('roomClass')?.value ?? null,
        roomUnxTmCrt: new Date(),
        roomUnxTmUpdt: new Date(),
        roomRcrdSts: 1,
        equipments: []
      };

      this.roomGroupService.addChildElement(this.roomGroup.roomGrpKy,newRoom).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          //this.roomGroup.rooms.push(response);
        },
        (error) => {
          console.error('Error adding room :', error);
        }
      );
  }
  }

  checkDuplicateRoomName(roomList : Room[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputRoomName = control.value;
        if (!inputRoomName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = roomList.some(
            (roomItem) => roomItem.roomLabel.toLowerCase() === inputRoomName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  confirmEdit(): void {

    if (this.roomForm && this.roomForm.valid) {
      this.room.roomLabel = this.roomForm.get('roomLabel')?.value;
      this.room.roomType = this.roomForm.get('roomType')?.value;

      if (this.roomForm.get('roomType')?.value !== 'Bedroom') {
        this.room.roomClass = ''; // Set roomClass to null if roomType is not 'Bedroom'
      } else {
        // RoomType is 'Bedroom', so take the input value for roomClass
          this.room.roomClass = this.roomForm.get('roomClass')?.value;
      }

      this.room.roomUnxTmUpdt = new Date();

      this.roomService.updateRoom(this.room.roomKy, this.room).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating room :', error);
        }
      );
    }
  }

}
