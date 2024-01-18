import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { StaffGroupService } from '../staff-group.service';
import { StaffGroup } from '../staff-group.model';

@Component({
  selector: 'app-delete-staff-group',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})

export class DeleteComponent implements OnInit {

  siteGroupName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffGroup,
    public staffGroupService: StaffGroupService
  ) {}

  ngOnInit(): void {
      this.siteGroupName = this.data.staffGrpName
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.staffGroupService.deleteStaffGrp(this.data.staffGrpKy);
  }
}
