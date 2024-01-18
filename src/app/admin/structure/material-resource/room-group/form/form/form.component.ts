import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SiteGroupService } from 'app/admin/structure/site-group/site-group.service';
import { HttpClient } from '@angular/common/http';
import { RoomGroup } from '../../room-group.model';
import { RoomGroupService } from '../../room-group.service';
import { ExploitationUnit } from 'app/admin/structure/exploitation-unit/exploitation-unit.model';
import { ExploitationUnitService } from 'app/admin/structure/exploitation-unit/exploitation-unit.service';

export interface DialogData {
  exploitationUnit: ExploitationUnit;
  roomGroups: RoomGroup[];//
  roomGroup: RoomGroup;//
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

  exploitationUnit: ExploitationUnit;
  roomGroups: RoomGroup[];
  roomGroup: RoomGroup;

  roomGroupForm?: UntypedFormGroup;

  isAddRoomGroupAction = false;
  isEditAction = false;

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public exploitationUnitService: ExploitationUnitService,
    public roomGroupService: RoomGroupService,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.exploitationUnit = data.exploitationUnit;

    this.roomGroups = data.roomGroups;
    this.roomGroup = data.roomGroup;
  }

  ngOnInit(): void {
    this.exploitationUnit = this.data.exploitationUnit;

    if (this.action === 'add-room-group') {
      this.dialogTitle = 'New Room Group';
      this.roomGroupForm = this.createRoomGroupForm();
      this.isAddRoomGroupAction = true;
      this.isEditAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Room Group «'+ this.roomGroup.roomGrpNm +'»';
      this.roomGroupForm = this.editRoomGroupForm();
      this.isEditAction = true;
      this.isAddRoomGroupAction = false;
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

  createRoomGroupForm(): UntypedFormGroup {
    return this.fb.group({
      roomGrpNm: ['', [Validators.required],[this.checkDuplicateRoomGrpName(this.exploitationUnit.roomGrps)]],
      // Add other form fields as needed for the site group
    });
  }

  editRoomGroupForm(): UntypedFormGroup {
    return this.fb.group({
      roomGrpNm: [this.roomGroup.roomGrpNm, [Validators.required],[this.checkDuplicateRoomGrpName(this.roomGroups)]],
      // Add other form fields as needed for the site group
    });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAddChild(): void{
    if (this.roomGroupForm && this.roomGroupForm.valid) {
      const newRoomGroup: Partial<RoomGroup> = {
        roomGrpNm: this.roomGroupForm.get('roomGrpNm')?.value,
        roomGrpUnxTmCrt: new Date(),
        roomGrpUnxTmUpdt: new Date(),
        roomGrpRcrdSts: 1,
        rooms: []
      };
      this.exploitationUnitService.addChildElement(this.exploitationUnit.explUnitKy,newRoomGroup).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          //this.exploitationUnit.roomGrps.push(response);
        },
        (error) => {
          console.error('Error adding room group :', error);
        }
      );
  }
  }

  checkDuplicateRoomGrpName(roomGrpList : RoomGroup[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputRoomGrpName = control.value;
        if (!inputRoomGrpName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = roomGrpList.some(
            (roomGrpItem) => roomGrpItem.roomGrpNm.toLowerCase() === inputRoomGrpName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  confirmEdit(): void {
    if (this.roomGroupForm && this.roomGroupForm.valid) {

      this.roomGroup.roomGrpNm = this.roomGroupForm.get('roomGrpNm')?.value;
      this.roomGroup.roomGrpUnxTmUpdt = new Date();

      this.roomGroupService.updateRoomGroup(this.roomGroup.roomGrpKy, this.roomGroup).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating room group:', error);
        }
      );
    }
  }

}
