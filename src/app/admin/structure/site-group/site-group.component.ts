import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from '../site/site.model';
import { SiteGroup } from './site-group.model';
import { SiteGroupService } from './site-group.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as SiteGroupFormComponent } from './form/form.component';
import { FormComponent as SiteFormComponent} from '../site/form/form.component';

@Component({
  selector: 'app-site-group',
  templateUrl: './site-group.component.html',
  styleUrls: ['./site-group.component.scss'],
})

export class SiteGroupComponent implements OnInit {

  siteGroups: SiteGroup[] = [];
  page = 1;
  items = 5;

  filteredSiteGroups: SiteGroup[] = [];
  searchQuery = '';

  sites: Site[] | undefined;
  isLoading: boolean = false;

  constructor(
    private siteGroupService: SiteGroupService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.siteGroupService.getAllSiteGroups().subscribe(
      (data: SiteGroup[]) => {
        this.siteGroups = [...data];
        this.filteredSiteGroups = [...data];
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Ensure loading state is cleared even in case of error
      }
    );
  }


  refresh() {
    this.searchQuery = ''; // Clear the search query
    this.fetchData();
  }


  searchSiteGroups(): void {
    this.filteredSiteGroups = this.siteGroups.filter(siteGroup =>
      siteGroup.siteGrpNm.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasSiteGroups(): boolean {
    return this.filteredSiteGroups.length > 0;
  }

  fetchSites(siteGrpKy: number): void {
    //this.router.navigate([`/site-group/${siteGrpKy}/child-elements`]);
    this.router.navigate(['admin','structure', 'site-group', siteGrpKy, 'child-elements']);
  }

  hasSitesElements(siteGroup: SiteGroup): boolean {
    //this.refresh();
    return siteGroup.sites?.length > 0;
  }

  onDelete(siteGrp: SiteGroup): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: siteGrp // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.siteGroupService.deleteSiteGrp(siteGrp.siteGrpKy)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.refresh();
            this.openSuccessSnackBar(siteGrp.siteGrpNm + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting site group:', error);
            this.openErrorSnackBar('Error deleting site group: '+siteGrp.siteGrpNm);
          }
        );
      }
    });
  }

  openSuccessSnackBar(message: string): void {
      this.snackBar.open(message,'',{
        duration: 3000,
        horizontalPosition: 'start',
        panelClass: ["snackbar-success"]
      });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }

  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(SiteGroupFormComponent, {
      data: {
        siteGroups: this.filteredSiteGroups,
        action: 'add',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Site Group Added Successfully !")
        //this.refresh();
      }
    });
  }

  edit(siteGroup : SiteGroup) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(SiteGroupFormComponent, {
      data: {
        siteGroups: this.filteredSiteGroups,
        siteGroup: siteGroup,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Site Group Updated Successfully !")
      }
    });
  }

  addChild(siteGroup : SiteGroup){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(SiteFormComponent, {
      data: {
        siteGroup: siteGroup,
        action: 'add-site',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Site Added Successfully !")
        this.refresh();
      }
    });
    
  }


}
