import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Service } from '../../service.model';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})

export class DeleteComponent implements OnInit {

  serviceName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    public serviceService: ServiceService
  ) {}

  ngOnInit(): void {
      this.serviceName = this.data.serviceNm
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.serviceService.deleteService(this.data.serviceKy);
  }
}
