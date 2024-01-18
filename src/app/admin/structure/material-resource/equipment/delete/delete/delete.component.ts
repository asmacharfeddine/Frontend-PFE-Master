import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipmentService } from '../../equipment.service';
import { Equipment } from '../../equipment.model';
@Component({
  selector: 'app-delete-equipment',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  equipmentLabel: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Equipment,
    public equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
      this.equipmentLabel = this.data.equipmentLabel
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.equipmentService.deleteEquipment(this.data.equipmentKy);
  }
}
