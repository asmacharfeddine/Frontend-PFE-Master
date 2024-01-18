import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SiteGroupService } from 'app/admin/structure/site-group/site-group.service';
import { SiteGroup } from 'app/admin/structure/site-group/site-group.model';
import { HttpClient } from '@angular/common/http';
import { Site } from 'app/admin/structure/site/site.model';
import { SiteService } from 'app/admin/structure/site/site.service';
import { Service } from '../../service.model';
import { ServiceService } from '../../service.service';

export interface DialogData {
  site: Site;
  services: Service[];
  service: Service;
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
  site: Site;
  services: Service[];
  service: Service;
  serviceForm?: UntypedFormGroup;

  isAddServiceAction = false;
  isEditAction = false;

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public siteGroupService: SiteGroupService,
    public siteService: SiteService,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.site = data.site;
    this.services = data.services;
    this.service = data.service;
  }

  ngOnInit(): void {
    this.site = this.data.site;
    this.service = this.data.service;

    if (this.action === 'add-service') {
      this.dialogTitle = 'New Service';
      this.serviceForm = this.createServiceForm();
      this.isAddServiceAction = true;
      this.isEditAction = false;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Service «'+ this.service.serviceNm +'»';
      this.serviceForm = this.editServiceForm();
      this.isEditAction = true;
      this.isAddServiceAction = false;
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

  createServiceForm(): UntypedFormGroup {
    return this.fb.group({
      serviceNm: ['', [Validators.required],[this.checkDuplicateServiceName(this.site.services)]],
      // Add other form fields as needed for the site group
    });
  }

  editServiceForm(): UntypedFormGroup {
    return this.fb.group({
      serviceNm: [this.service.serviceNm, [Validators.required],[this.checkDuplicateServiceName(this.services)]],
      // Add other form fields as needed for the site group
    });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAddChild(): void{
    if (this.serviceForm && this.serviceForm.valid) {
      const newService: Partial<Service> = {
        serviceNm: this.serviceForm.get('serviceNm')?.value,
        serviceUnxTmCrt: new Date(),
        serviceUnxTmUpdt: new Date(),
        serviceRcrdSts: 1,
        serviceAreas: []
      };
      if(this.site.siteKy){
      this.siteService.addChildElement(this.site.siteKy,newService).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          //this.site.services.push(response);
        },
        (error) => {
          console.error('Error adding service :', error);
        }
      );
      }
  }
  }

  checkDuplicateServiceName(serviceList : Service[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputServiceName = control.value;
        if (!inputServiceName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = serviceList.some(
            (serviceItem) => serviceItem.serviceNm.toLowerCase() === inputServiceName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  confirmEdit(): void {
    if (this.serviceForm && this.serviceForm.valid) {

      this.service.serviceNm = this.serviceForm.get('serviceNm')?.value;
      this.service.serviceUnxTmUpdt = new Date();

      this.serviceService.updateService(this.service.serviceKy, this.service).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating service:', error);
        }
      );
    }
  }

}
