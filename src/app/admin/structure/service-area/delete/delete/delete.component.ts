import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ServiceAreaService } from '../../service-area.service';
import { ServiceArea } from '../../service-area.model';

@Component({
  selector: 'app-delete-service-area',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})

export class DeleteComponent implements OnInit {

  servAreaName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceArea,
    public serviceAreaService: ServiceAreaService
  ) {}

  ngOnInit(): void {
      this.servAreaName = this.data.servAreaNm
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.serviceAreaService.deleteServiceArea(this.data.servAreaKy);
  }
}
