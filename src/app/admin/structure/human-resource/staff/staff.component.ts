import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Direction } from "@angular/cdk/bidi";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormComponent as StaffFormComponent } from "./form/form.component";
import { DeleteComponent } from "./delete/delete.component";
import { StaffGroupService } from "../staff-group/staff-group.service";
import { StaffGroup } from "../staff-group/staff-group.model";
import { StaffService } from "./staff.service";
import { Staff } from "./staff.model";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  @Input('data') staffs: Staff[] = [];

  page = 1;
  items = 6;
  filteredStaffs: Staff[] = [];
  searchQuery = '';

  staffGroupKey: number | undefined;
  staffGroup: StaffGroup | undefined;
  isLoading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private staffGroupService: StaffGroupService,
    private staffService: StaffService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.displayStaffs();
    this.getParent();
  }

  displayStaffs(): void {
    this.isLoading = true;
    const staffGrpKyParam = this.route.snapshot.paramMap.get('staffGrpKy');
    if (staffGrpKyParam) {
      const staffGrpKy = +staffGrpKyParam;
      this.staffGroupService.getChildElements(staffGrpKy).subscribe(
        (data: Staff[]) => {
          this.staffs = data;
          this.filteredStaffs = data;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching staffs:', error);
          this.isLoading = false;
        }
      );
    }
  }

  searchStaffs(): void {
    this.filteredStaffs = this.staffs.filter(staff =>
      staff.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getParent(): void {
    this.staffGroupKey = this.getCurrentStaffGroupKey();
    this.staffGroupService.getStaffGrpByKy(this.staffGroupKey).subscribe(
      (staffGroup: StaffGroup) => {
        this.staffGroup = staffGroup;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCurrentStaffGroupKey(): number {
    const urlSegments = this.route.snapshot.url;
    const staffGroupKeyIndex = urlSegments.findIndex(segment => segment.path === 'staff-group');
    if (staffGroupKeyIndex !== -1 && staffGroupKeyIndex + 1 < urlSegments.length) {
      return +urlSegments[staffGroupKeyIndex + 1].path;
    }
    return 0;
  }

  onDelete(staff: Staff): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: staff // Pass the site as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.staffService.deleteStaff(staff.userKy)
        .subscribe(
          () => {
            this.refresh();
            this.openSuccessSnackBar(staff.firstName +' '+ staff.lastName + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting staff:', error);
            this.openErrorSnackBar('Error deleting staff: ' + staff.firstName +' '+ staff.lastName);
          }
        );
      }
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }

  refresh() {
    this.displayStaffs();
  }

  edit(staff: Staff) {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(StaffFormComponent, {
      data: {
        staffs: this.filteredStaffs,
        staff: staff,
        action: 'edit',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Site Updated Successfully!");
      }
    });
  }

  getImagePath(staff: Staff): string {
    if(!staff.userImage){
      if (staff.gender === 'female') {
        return 'https://images.squarespace-cdn.com/content/v1/56de5b86b654f9dacd9f6456/719d9e09-a9cc-4ef0-9cd5-dd7b6d1b3a4c/Screen+Shot+2022-09-24+at+12.19.30+AM.png'; // Replace with the actual path
      } else if (staff.gender === 'male') {
        return 'https://i0.wp.com/www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg?ssl=1'; // Replace with the actual path
      }
    }

      return staff.userImage;
  }

}
