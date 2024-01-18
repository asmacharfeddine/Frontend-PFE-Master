import { Component, OnInit } from '@angular/core';
import { RoomGroup } from './room-group.model';
import { ExploitationUnit } from '../../exploitation-unit/exploitation-unit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomGroupService } from './room-group.service';
import { MatDialog } from '@angular/material/dialog';
import { ExploitationUnitService } from '../../exploitation-unit/exploitation-unit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from './delete/delete/delete.component';
import { HttpResponse } from '@angular/common/http';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as RoomGroupFormComponent } from './form/form/form.component';
import { FormComponent as RoomFormComponent } from '../room/form/form/form.component';

@Component({
  selector: 'app-room-group',
  templateUrl: './room-group.component.html',
  styleUrls: ['./room-group.component.scss']
})
export class RoomGroupComponent implements OnInit {

  roomGroups: RoomGroup[] = [];
  exploitationUnitKey: number | undefined;

  exploitationUnit: ExploitationUnit | undefined;

  filtredRoomGroups: RoomGroup[] = [];

  page = 1;
  items = 5;
  searchQuery = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private exploitationUnitService : ExploitationUnitService,
    private dialog: MatDialog,
    private roomGroupService: RoomGroupService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.displayRoomGroups();
    this.getParent();
  }

  displayRoomGroups(): void {
    this.isLoading = true;
    const exploitationUnitKeyParam = this.route.snapshot.paramMap.get('expUnitKy');
    if (exploitationUnitKeyParam) {
      const explUnitKy = +exploitationUnitKeyParam;
      this.exploitationUnitService.getChildElements(explUnitKy).subscribe(
        (data: RoomGroup[]) => {
          this.roomGroups = [...data];;
          this.filtredRoomGroups = [...data];;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching room groups:', error);
          this.isLoading = false;
        }
      );
    }
  }

  refresh(){
    this.displayRoomGroups();
  }

  searchRoomGroups(): void {
    this.filtredRoomGroups = this.roomGroups.filter(roomGrp =>
      roomGrp.roomGrpNm.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasRoomElements(roomGroup: RoomGroup): boolean {
    return roomGroup.rooms?.length > 0;
  }

  getParent(): void {
    this.exploitationUnitKey = this.getCurrentExploitationUnitKey();
    this.exploitationUnitService.getExploitationUnitByKy(this.exploitationUnitKey).subscribe(
      (exploitationUnit: ExploitationUnit) => {
        this.exploitationUnit = exploitationUnit;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCurrentExploitationUnitKey(): number {
    const urlSegments = this.route.snapshot.url;
    const explUnitKeyIndex = urlSegments.findIndex(segment => segment.path === 'exploitation-unit');
    if (explUnitKeyIndex !== -1 && explUnitKeyIndex + 1 < urlSegments.length) {
      return +urlSegments[explUnitKeyIndex + 1].path;
    }
    return 0;
  }

  onDelete(roomGroup: RoomGroup): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: roomGroup // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.roomGroupService.deleteRoomGroup(roomGroup.roomGrpKy)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.refresh();
            this.openSuccessSnackBar(roomGroup.roomGrpNm + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting room group:', error);
            this.openErrorSnackBar('Error deleting room group: '+roomGroup.roomGrpNm);
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

  fetchRooms(roomGrpKy: number): void {
    this.router.navigate(['admin','structure', 'room-group', roomGrpKy, 'child-elements']);
  }

  edit(roomGroup : RoomGroup) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(RoomGroupFormComponent, {
      data: {
        roomGroups: this.filtredRoomGroups,
        roomGroup: roomGroup,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Room Group Updated Successfully !")
      }
    });
  }

  addChild(roomGroup : RoomGroup){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(RoomFormComponent, {
      data: {
        roomGroup: roomGroup,
        action: 'add-room',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Room Added Successfully !")
        this.refresh();
      }
    });
  }
}
