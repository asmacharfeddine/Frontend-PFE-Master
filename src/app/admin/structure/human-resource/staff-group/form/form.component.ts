import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { StaffGroupService } from '../staff-group.service';
import { StaffGroup } from '../staff-group.model';

export interface DialogData {
  staffGroups: StaffGroup[];
  staffGroup: StaffGroup;
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
  staffGroups: StaffGroup[];
  staffGroup: StaffGroup;
  staffgroupForm?: UntypedFormGroup;

  updatedStaffGroup: StaffGroup | undefined;

  isAddAction = false;
  isEditAction = false;
  isAddChildAction = false;

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );

  staffGroupTypes: String[] = [
    'Surgery',
    'Internal Medicine',
    'Pediatrics',
    'Gynecology and Obstetrics',
    'Cardiology',
    'Dermatology',
    'Gastroenterology',
    'Neurology',
    'Radiology',
    'Anesthesiology',
    'Orthopedics',
    'Urology',
    'Otolaryngology (ENT)',
    'Ophthalmology',
    'Psychiatry',
    'Endocrinology',
    'Nephrology',
    'Pulmonology',
    'Hematology',
    'Infectious Diseases',
    'Rheumatology',
    'Oncology',
    'Emergency Medicine',
    'Sports Medicine',
    'Physical Medicine and Rehabilitation',
    'Allergy and Immunology',
    'Forensic Medicine',
    'Nuclear Medicine',
    'Clinical Immunology',
    'Neonatal Pediatrics'
  ];


  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public staffGroupService: StaffGroupService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.staffGroups = data.staffGroups;
    this.staffGroup = data.staffGroup;
  }

  ngOnInit(): void {
    this.staffGroup = this.data.staffGroup;

    if (this.action === 'add') {
      this.dialogTitle = 'New staff group';
      this.staffgroupForm = this.createStaffgroupForm();
      this.isAddAction = true;
      this.isEditAction = false;
      this.isAddChildAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update staff Group «'+ this.staffGroup.staffGrpName +'»';
      this.staffgroupForm = this.editStaffgroupForm();
      this.isAddAction = false;
      this.isEditAction = true;
      this.isAddChildAction = false;
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

  createStaffgroupForm(): UntypedFormGroup {
    return this.fb.group({
      staffGrpName: ['', [Validators.required],[this.checkDuplicateStaffGroupName()]],
      staffGrpType: ['', [Validators.required]]
    });
  }

  editStaffgroupForm(): UntypedFormGroup {
    return this.fb.group({
      staffGrpName: [this.staffGroup.staffGrpName, [Validators.required],[this.checkDuplicateStaffGroupName()]],
      staffGrpType: [this.staffGroup.staffGrpType, [Validators.required]]
    });
  }

  checkDuplicateStaffGroupName(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputStaffGrpName = control.value;
        if (!inputStaffGrpName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = this.staffGroups.some(
            (staffGroupItem) => staffGroupItem.staffGrpName.toLowerCase() === inputStaffGrpName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.staffgroupForm && this.staffgroupForm.valid) {
      const newStaffGroup: Partial<StaffGroup> = {
        staffGrpName: this.staffgroupForm.get('staffGrpName')?.value,
        staffGrpType: this.staffgroupForm.get('staffGrpType')?.value,
        staffGrpPrvlgd: 0,
        staffGrpUnxTmCrt: new Date(),
        staffGrpUnxTmUpdt: new Date(),
        staffGrpRcrdSts: 1,
        staffGrpLinks: []
      };

      this.staffGroupService.createStaffGrp(newStaffGroup).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          this.staffGroups.push(response);
        },
        (error) => {
          console.error('Error adding staff group:', error);
        }
      );
    }
  }

  confirmEdit(): void {
    if (this.staffgroupForm && this.staffgroupForm.valid) {

      this.staffGroup.staffGrpName = this.staffgroupForm.get('staffGrpName')?.value;
      this.staffGroup.staffGrpType = this.staffgroupForm.get('staffGrpType')?.value;
      this.staffGroup.staffGrpUnxTmUpdt = new Date();

      this.staffGroupService.updateStaffGrp(this.staffGroup.staffGrpKy, this.staffGroup).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating staff group:', error);
        }
      );
    }
  }

}
