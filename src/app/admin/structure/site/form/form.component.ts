import { Component, Inject, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SiteGroupService } from '../../site-group/site-group.service';
import { SiteGroup } from '../../site-group/site-group.model';
import { HttpClient } from '@angular/common/http';
import { Site } from '../site.model';
import { SiteService } from '../site.service';

export interface DialogData {
  siteGroup: SiteGroup; //from site group add child
  sites: Site[]; // from site for edit
  site: Site; // from site for edit
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
  sites: Site[]; //
  site: Site;
  siteGroup: SiteGroup;
  siteForm?: UntypedFormGroup;

  isAddSiteAction = false;
  isEditAction = false;

  countriesUrl = 'https://restcountries.com/v3.1/all';
  countries: any[] | undefined; // Array to store the list of countries

  formControl = new UntypedFormControl('', [
    Validators.required,
  ], );


  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public siteGroupService: SiteGroupService,
    public siteService: SiteService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.siteGroup = data.siteGroup;
    this.sites = data.sites;
    this.site = data.site;
  }

  ngOnInit(): void {
    this.siteGroup = this.data.siteGroup;
    this.site = this.data.site;
    //this.sites = this.siteGroup.sites;

    if (this.action === 'add-site') {
      this.dialogTitle = 'New Site';
      this.siteForm = this.createSiteForm();
      this.isAddSiteAction = true;
    }
    if (this.action === 'edit') {
      this.dialogTitle = 'Update Site «'+ this.site.siteNm +'»';
      this.siteForm = this.editSiteForm();
      this.isEditAction = true;
      this.isAddSiteAction = false;
    }

    this.getCountries();
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

  createSiteForm(): UntypedFormGroup {
    return this.fb.group({
      siteNm: ['', [Validators.required],[this.checkDuplicateSiteName(this.siteGroup.sites)]],
      siteCountry: ['', [Validators.required]]
      // Add other form fields as needed for the site group
    });
  }

  editSiteForm(): UntypedFormGroup {
    return this.fb.group({
      siteNm: [this.site.siteNm, [Validators.required],[this.checkDuplicateSiteName(this.sites)]],
      siteCountry: [this.site.siteCountry, [Validators.required]]
      // Add other form fields as needed for the site group
    });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCountries() {
    this.http.get<any[]>(this.countriesUrl).subscribe(
      (response) => {
        this.countries = response.map((country) => country.name.common);
        this.countries.sort(); // Sort the countries alphabetically
      },
      (error) => {
        console.log('Error fetching countries:', error);
      }
    );
  }

  confirmAddChild(): void{
    if (this.siteForm && this.siteForm.valid) {
      const newSite: Partial<Site> = {
        // Map the form values to the Site model properties
        siteNm: this.siteForm.get('siteNm')?.value,
        siteCountry: this.siteForm.get('siteCountry')?.value,
        siteUnxTmCrt: new Date(),
        siteUnxTmUpdt: new Date(),
        siteRcrdSts: 1,
        services: [],
      };
      this.siteGroupService.addChildElement(this.siteGroup.siteGrpKy,newSite).subscribe(
        (response) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          //this.siteGroup.sites.push(response);
        },
        (error) => {
          console.error('Error adding site :', error);
        }
      );
  }
  }

  checkDuplicateSiteName(siteList : Site[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const inputSiteName = control.value;
        if (!inputSiteName) {
          resolve(null); // If the field is empty, no need to check for duplicates
        } else {
          const isDuplicate = siteList.some(
            (siteItem) => siteItem.siteNm.toLowerCase() === inputSiteName.toLowerCase()
          );

          resolve(isDuplicate ? { duplicated: true } : null);
        }
      });
    };
  }

  confirmEdit(): void {
    if (this.siteForm && this.siteForm.valid) {
      this.site.siteNm = this.siteForm.get('siteNm')?.value;
      this.site.siteCountry = this.siteForm.get('siteCountry')?.value;
      this.site.siteUnxTmUpdt = new Date(); // Fixed the missing semicolon here

      this.siteService.updateSite(this.site.siteKy, this.site).subscribe(
        (response: Site) => { // Assuming the response is of type Site, replace 'Site' with the actual type if needed
          this.dialogRef.close(1); // Return 1 to indicate successful update
        },
        (error) => {
          console.error('Error updating site:', error);
        }
      );
    }
  }


}
