import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomFormComponent} from "../room-form/room-form.component";
import {MatDialog} from "@angular/material/dialog";
import {RoomsTableComponent} from "../rooms-table/rooms-table.component";
import {Room} from "../../../../shared/interfaces";

@Component({
  selector: 'staff-roster',
  templateUrl: './staff-roster.component.html',
  styleUrls: ['./staff-roster.component.css']
})
export class StaffRosterComponent implements OnInit {

  @ViewChild('roomsTableComponent') private _roomsTable: RoomsTableComponent | undefined

  constructor(private _bookingDialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openRoomForm(room: Room | undefined) {
    const dialogRef = this._bookingDialog.open(RoomFormComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {room: room},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this._roomsTable?.updateRooms();
    });
  }

}
