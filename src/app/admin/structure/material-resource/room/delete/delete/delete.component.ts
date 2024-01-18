import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from '../../room.service';
import { Room } from '../../room.model';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  roomLabel: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
      this.roomLabel = this.data.roomLabel
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.roomService.deleteRoom(this.data.roomKy);
  }
}
