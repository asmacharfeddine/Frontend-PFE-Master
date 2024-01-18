import { Component, OnInit } from '@angular/core';
import { Room } from './room.model';
import { RoomGroup } from '../room-group/room-group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './room.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from './delete/delete/delete.component';
import { HttpResponse } from '@angular/common/http';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as RoomFormComponent } from './form/form/form.component';
import { FormComponent as EquipmentFormComponent } from '../equipment/form/form/form.component';
import { RoomGroupService } from '../room-group/room-group.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit  {
  rooms: Room[] = [];
  roomGroupKey: number | undefined;

  roomGroup: RoomGroup | undefined;

  filtredRooms: Room[] = [];

  page = 1;
  items = 5;
  searchQuery = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private roomGroupService : RoomGroupService,
    private dialog: MatDialog,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.displayRooms();
    this.getParent();
  }

  displayRooms(): void {
    this.isLoading = true;
    const roomGroupKeyParam = this.route.snapshot.paramMap.get('roomGrpKy');
    if (roomGroupKeyParam) {
      const roomGrpKy = +roomGroupKeyParam;
      this.roomGroupService.getChildElements(roomGrpKy).subscribe(
        (data: Room[]) => {
          this.rooms = [...data];;
          this.filtredRooms = [...data];;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching room :', error);
          this.isLoading = false;
        }
      );
    }
  }

  refresh(){
    this.displayRooms();
  }

  searchRooms(): void {
    this.filtredRooms = this.rooms.filter(room =>
      room.roomLabel.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      room.roomType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      room.roomClass.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasEquipmentElements(room: Room): boolean {
    return room.equipments?.length > 0;
  }

  getParent(): void {
    this.roomGroupKey = this.getCurrentRoomGroupKey();
    this.roomGroupService.getRoomGroupByKy(this.roomGroupKey).subscribe(
      (roomGrp: RoomGroup) => {
        this.roomGroup = roomGrp;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCurrentRoomGroupKey(): number {
    const urlSegments = this.route.snapshot.url;
    const roomGroupKeyIndex = urlSegments.findIndex(segment => segment.path === 'room-group');
    if (roomGroupKeyIndex !== -1 && roomGroupKeyIndex + 1 < urlSegments.length) {
      return +urlSegments[roomGroupKeyIndex + 1].path;
    }
    return 0;
  }

  onDelete(room: Room): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: room // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.roomService.deleteRoom(room.roomKy)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.refresh();
            this.openSuccessSnackBar(room.roomLabel + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting room :', error);
            this.openErrorSnackBar('Error deleting room : '+room.roomLabel);
          }
        );
      }
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
}

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }

  fetchEquipments(roomKy: number): void {
    this.router.navigate(['admin','structure', 'room', roomKy, 'child-elements']);
  }

  edit(room : Room) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(RoomFormComponent, {
      data: {
        rooms: this.filtredRooms,
        room: room,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Room Updated Successfully !")
      }
    });
  }

  addChild(room : Room){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(EquipmentFormComponent, {
      data: {
        room: room,
        action: 'add-equipment',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Equipment Added Successfully !")
        this.refresh();
      }
    });
  }
}
