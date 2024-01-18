import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { SiteGroupService } from 'app/admin/structure/site-group/site-group.service';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../../equipment.model';
import { EquipmentService } from '../../equipment.service';
import { Room } from '../../../room/room.model';
import { RoomService } from '../../../room/room.service';

export interface DialogData {
  room: Room;
  equipments: Equipment[];//
  equipment: Equipment;//
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

  room: Room;
  equipments: Equipment[];
  equipment: Equipment;

  equipmentForm?: UntypedFormGroup;

  isAddEquipmentAction = false;
  isEditAction = false;

  equipmentTypes: String[] = [
    'Monitoring Equipment',
    'Surgical Equipment',
    'Diagnostic Equipment',
    'Therapy Equipment',
    'Home Care Equipment',
    'Rehabilitation Equipment'
  ];

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roomService: RoomService,
    public equipmentService: EquipmentService,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.room = data.room;

    this.equipments = data.equipments;
    this.equipment = data.equipment;
  }

  ngOnInit(): void {
    this.room = this.data.room;

    if (this.action === 'add-equipment') {
      this.dialogTitle = 'New Equipment';
      this.equipmentForm = this.createEquipmentForm();
      this.isAddEquipmentAction = true;
      this.isEditAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Equipment «'+ this.equipment.equipmentLabel +'»';
      this.equipmentForm = this.editEquipmentForm();
      this.isEditAction = true;
      this.isAddEquipmentAction = false;
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

  createEquipmentForm(): UntypedFormGroup {
      return this.fb.group({
        equipmentLabel: ['', [Validators.required],[this.checkDuplicateEquipmentName(this.room.equipments)]],
        addressIp: [''],
        addressMac: [''],
        description: [''],
        equipmentType: ['', [Validators.required]]
      });
  }


  editEquipmentForm(): UntypedFormGroup {
      return this.fb.group({
        equipmentLabel: [this.equipment.equipmentLabel, [Validators.required],[this.checkDuplicateEquipmentName(this.equipments)]],
        addressIp: [this.equipment.addressIp],
        addressMac: [this.equipment.addressMac],
        description: [this.equipment.description],
        equipmentType: [this.equipment.equipmentType, [Validators.required]]
      });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAddChild(): void{

    if (this.equipmentForm && this.equipmentForm.valid) {

      const newEquipment: Partial<Equipment> = {
        equipmentLabel: this.equipmentForm.get('equipmentLabel')?.value,
        addressIp: this.equipmentForm.get('addressIp')?.value,
        addressMac: this.equipmentForm.get('addressMac')?.value ?? null,
        description: this.equipmentForm.get('description')?.value ?? null,
        equipmentType: this.equipmentForm.get('equipmentType')?.value ?? null,
        equipmentUnxTmCrt: new Date(),
        equipmentUnxTmUpdt: new Date(),
        equipmentRcrdSts: 1,
      };

      this.roomService.addChildElement(this.room.roomKy,newEquipment).subscribe(
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

  checkDuplicateEquipmentName(equipmentList : Equipment[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputEquipmentName = control.value;
        if (!inputEquipmentName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = equipmentList.some(
            (equipmentItem) => equipmentItem.equipmentLabel.toLowerCase() === inputEquipmentName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  confirmEdit(): void {

    if (this.equipmentForm && this.equipmentForm.valid) {
      this.equipment.equipmentLabel = this.equipmentForm.get('equipmentLabel')?.value;
      this.equipment.description = this.equipmentForm.get('description')?.value;
      this.equipment.equipmentType = this.equipmentForm.get('equipmentType')?.value;
      this.equipment.addressIp = this.equipmentForm.get('addressIp')?.value;
      this.equipment.addressMac = this.equipmentForm.get('addressMac')?.value;
      this.equipment.equipmentUnxTmUpdt = new Date();

      this.equipmentService.updateEquipment(this.equipment.equipmentKy, this.equipment).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating equipment :', error);
        }
      );
    }
  }

}
