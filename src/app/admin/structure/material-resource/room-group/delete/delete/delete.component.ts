import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomGroup } from '../../room-group.model';
import { RoomGroupService } from '../../room-group.service';

@Component({
  selector: 'app-delete-room-group',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  roomGroupNm: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomGroup,
    public roomGroupService: RoomGroupService
  ) {}

  ngOnInit(): void {
      this.roomGroupNm = this.data.roomGrpNm
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.roomGroupService.deleteRoomGroup(this.data.roomGrpKy);
  }
}
