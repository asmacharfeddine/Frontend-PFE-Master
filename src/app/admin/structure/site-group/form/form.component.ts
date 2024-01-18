import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SiteGroupService } from '../site-group.service';
import { SiteGroup } from '../site-group.model';
import { ChangeDetectorRef } from '@angular/core';


export interface DialogData {
  siteGroups: SiteGroup[];
  siteGroup: SiteGroup;
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
  siteGroups: SiteGroup[];
  siteGroup: SiteGroup;
  sitegroupForm?: UntypedFormGroup;

  updatedSiteGroup: SiteGroup | undefined;

  isAddAction = false;
  isEditAction = false;
  isAddChildAction = false;

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );


  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public siteGroupService: SiteGroupService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.action = data.action;
    this.siteGroups = data.siteGroups;
    this.siteGroup = data.siteGroup;
  }

  ngOnInit(): void {
    this.siteGroup = this.data.siteGroup;

    if (this.action === 'add') {
      this.dialogTitle = 'New site group';
      this.sitegroupForm = this.createSiteGroupForm();
      this.isAddAction = true;
      this.isEditAction = false;
      this.isAddChildAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Site Group «'+ this.siteGroup.siteGrpNm +'»';
      this.sitegroupForm = this.editSiteGroupForm();
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

  createSiteGroupForm(): UntypedFormGroup {
    return this.fb.group({
      siteGrpNm: ['', [Validators.required],[this.checkDuplicateSiteGroupName()]]
      // Add other form fields as needed for the site group
    });
  }

  editSiteGroupForm(): UntypedFormGroup {
    return this.fb.group({
      siteGrpNm: [this.siteGroup.siteGrpNm, [Validators.required],[this.checkDuplicateSiteGroupName()]]
      // Add other form fields as needed for the site group
    });
  }

  checkDuplicateSiteGroupName(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputSiteGrpName = control.value;
        if (!inputSiteGrpName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = this.siteGroups.some(
            (siteGroupItem) => siteGroupItem.siteGrpNm.toLowerCase() === inputSiteGrpName.toLowerCase()
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
    if (this.sitegroupForm && this.sitegroupForm.valid) {
      const newSiteGroup: SiteGroup = {
        siteGrpKy: this.findMaxSiteGrpKy() + 1,
        siteGrpNm: this.sitegroupForm.get('siteGrpNm')?.value,
        siteGrpUnxTmCrt: new Date(),
        siteGrpUnxTmUpdt: new Date(),
        siteGrpRcrdSts: 1,
        sites: [],
      };

      this.siteGroupService.createSiteGrp(newSiteGroup).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          this.siteGroups.push({ ...response });
        },
        (error) => {
          console.error('Error adding site group:', error);
        }
      );
    }
  }
  // Helper function to find the maximum siteGrpKy in this.siteGroups array
  private findMaxSiteGrpKy(): number {
    let maxSiteGrpKy = 0;
    for (const siteGroup of this.siteGroups) {
      if (siteGroup.siteGrpKy > maxSiteGrpKy) {
        maxSiteGrpKy = siteGroup.siteGrpKy;
      }
    }
    return maxSiteGrpKy;
  }

  confirmEdit(): void {
    if (this.sitegroupForm && this.sitegroupForm.valid) {

      this.siteGroup.siteGrpNm = this.sitegroupForm.get('siteGrpNm')?.value;
      this.siteGroup.siteGrpUnxTmUpdt = new Date();

      this.siteGroupService.updateSiteGrp(this.siteGroup.siteGrpKy, this.siteGroup).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating site group:', error);
        }
      );
    }
  }

}
