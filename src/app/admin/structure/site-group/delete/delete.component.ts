import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { SiteGroupService } from '../site-group.service';
import { SiteGroup } from '../site-group.model';

@Component({
  selector: 'app-delete-site-group',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})

export class DeleteComponent implements OnInit {

  siteGroupName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SiteGroup,
    public siteGroupService: SiteGroupService
  ) {}

  ngOnInit(): void {
      this.siteGroupName = this.data.siteGrpNm
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.siteGroupService.deleteSiteGrp(this.data.siteGrpKy);
  }
}
