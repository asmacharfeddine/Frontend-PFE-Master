import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SiteGroupService } from 'app/admin/structure/site-group/site-group.service';
import { HttpClient } from '@angular/common/http';
import { ServiceArea } from '../../service-area.model';
import { ServiceAreaService } from '../../service-area.service';
import { Service } from 'app/admin/structure/service/service.model';
import { ServiceService } from 'app/admin/structure/service/service.service';

export interface DialogData {
  service: Service;
  serviceAreas: ServiceArea[];//
  serviceArea: ServiceArea;//
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

  service: Service;
  serviceAreas: ServiceArea[];
  serviceArea: ServiceArea;

  serviceAreaForm?: UntypedFormGroup;

  isAddServiceAreaAction = false;
  isEditAction = false;

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public siteGroupService: SiteGroupService,
    public serviceService: ServiceService,
    public serviceAreaService: ServiceAreaService,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.service = data.service;

    this.serviceAreas = data.serviceAreas;
    this.serviceArea = data.serviceArea;
  }

  ngOnInit(): void {
    this.service = this.data.service;

    if (this.action === 'add-service-area') {
      this.dialogTitle = 'New Service Area';
      this.serviceAreaForm = this.createserviceAreaForm();
      this.isAddServiceAreaAction = true;
      this.isEditAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Service Area «'+ this.serviceArea.servAreaNm +'»';
      this.serviceAreaForm = this.editserviceAreaForm();
      this.isEditAction = true;
      this.isAddServiceAreaAction = false;
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

  createserviceAreaForm(): UntypedFormGroup {
    return this.fb.group({
      servAreaNm: ['', [Validators.required],[this.checkDuplicateServiceAreaName(this.service.serviceAreas)]],
      // Add other form fields as needed for the site group
    });
  }

  editserviceAreaForm(): UntypedFormGroup {
    return this.fb.group({
      servAreaNm: [this.serviceArea.servAreaNm, [Validators.required],[this.checkDuplicateServiceAreaName(this.serviceAreas)]],
      // Add other form fields as needed for the site group
    });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAddChild(): void{
    if (this.serviceAreaForm && this.serviceAreaForm.valid) {
      const newServiceArea: Partial<ServiceArea> = {

        servAreaNm: this.serviceAreaForm.get('servAreaNm')?.value,
        servAreaUnxTmCrt: new Date(),
        servAreaUnxTmUpdt: new Date(),
        servAreaRcrdSts: 1,
        exploitationUnits: []
      };
      this.serviceService.addChildElement(this.service.serviceKy,newServiceArea).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          //this.service.serviceAreas?.push(response);
        },
        (error) => {
          console.error('Error adding service area :', error);
        }
      );
  }
  }

  private findMaxSiteKy(): number {
    let maxServiceAreaKy = 0;
    for (const serviceArea of this.service.serviceAreas) {
      if (serviceArea.servAreaKy > maxServiceAreaKy) {
        maxServiceAreaKy = serviceArea.servAreaKy;
      }
    }
    return maxServiceAreaKy;
  }

  checkDuplicateServiceAreaName(serviceAreaList : ServiceArea[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputServiceAreaName = control.value;
        if (!inputServiceAreaName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = serviceAreaList.some(
            (serviceAreaItem) => serviceAreaItem.servAreaNm.toLowerCase() === inputServiceAreaName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  confirmEdit(): void {
    if (this.serviceAreaForm && this.serviceAreaForm.valid) {

      this.serviceArea.servAreaNm = this.serviceAreaForm.get('servAreaNm')?.value;
      this.serviceArea.servAreaUnxTmUpdt = new Date();

      this.serviceAreaService.updateServiceArea(this.serviceArea.servAreaKy, this.serviceArea).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating service area:', error);
        }
      );
    }
  }

}
