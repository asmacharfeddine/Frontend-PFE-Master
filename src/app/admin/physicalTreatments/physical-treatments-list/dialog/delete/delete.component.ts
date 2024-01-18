import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhysicalTreatment } from '../../physicalTreatment.model';
import { PhysicalTreatmentService } from '../../physicalTreatment.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhysicalTreatment,
    public categoryService: PhysicalTreatmentService

    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
