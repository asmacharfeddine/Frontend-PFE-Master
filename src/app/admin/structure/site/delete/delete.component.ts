import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Site } from '../site.model';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-delete-site',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})

export class DeleteComponent implements OnInit {

  siteName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Site,
    public siteService: SiteService
  ) {}

  ngOnInit(): void {
      this.siteName = this.data.siteNm
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.siteService.deleteSite(this.data.siteKy);
  }
}
