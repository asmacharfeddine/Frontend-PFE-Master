import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from '../staff/staff.model';
import { StaffGroup } from './staff-group.model';
import { StaffGroupService } from './staff-group.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as staffGroupFormComponent } from './form/form.component';
import { FormComponent as staffFormComponent} from '../staff/form/form.component';

@Component({
  selector: 'app-staff-group',
  templateUrl: './staff-group.component.html',
  styleUrls: ['./staff-group.component.scss'],
})

export class StaffGroupComponent implements OnInit {

  @Input('data') staffGroups: StaffGroup[] = [];
  page = 1;
  items = 5;

  filteredStaffGroups: StaffGroup[] = [];
  searchQuery = '';

  staffs: Staff[] | undefined;
  isLoading: boolean = false;

  constructor(
    private staffGroupService: StaffGroupService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
      this.fetchData();
  }

  ngOnInit(): void {

  }

  fetchData(): void {
    this.isLoading = true;
    this.staffGroupService.getAllStaffGroups().subscribe(
      (data: StaffGroup[]) => {
        this.staffGroups = data;
        this.filteredStaffGroups = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Ensure loading state is cleared even in case of error
      }
    );
  }


  refresh() {
    this.fetchData();
  }

  searchStaffGroups(): void {
    this.filteredStaffGroups = this.staffGroups.filter(staffGroup =>
      staffGroup.staffGrpName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasStaffGroups(): boolean {
    return this.filteredStaffGroups.length > 0;
  }

  fetchStaffs(staffGrpKy: number): void {
    //this.router.navigate([`/staff-group/${staffGrpKy}/child-elements`]);
    this.router.navigate(['admin','structure', 'staff-group', staffGrpKy, 'child-elements']);
  }

  hasStaffsElements(staffGroup: StaffGroup): boolean {
    return staffGroup.staffGrpLinks?.length > 0;
  }

  onDelete(staffGrp: StaffGroup): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: staffGrp // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.staffGroupService.deleteStaffGrp(staffGrp.staffGrpKy)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.refresh();
            this.openSuccessSnackBar(staffGrp.staffGrpName + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting staff group:', error);
            this.openErrorSnackBar('Error deleting staff group: '+staffGrp.staffGrpName);
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
    const dialogRef = this.dialog.open(staffGroupFormComponent, {
      data: {
        staffGroups: this.filteredStaffGroups,
        action: 'add',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("staff Group Added Successfully !")
      }
    });
  }

  edit(staffGroup : StaffGroup) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(staffGroupFormComponent, {
      data: {
        staffGroups: this.filteredStaffGroups,
        staffGroup: staffGroup,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("staff Group Updated Successfully !")
      }
    });
  }

  addChild(staffGroup : StaffGroup){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(staffFormComponent, {
      data: {
        staffGroup: staffGroup,
        action: 'add-staff',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("staff Added Successfully !")
        this.refresh();
      }
    });
  }


}
