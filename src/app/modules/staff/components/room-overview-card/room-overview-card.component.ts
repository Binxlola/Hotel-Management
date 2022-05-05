import { Component, OnInit } from '@angular/core';
import {Room} from "../../../shared/services/booking/booking-service.service";
import {RoomFormComponent} from "../room-form/room-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'room-overview-card',
  templateUrl: './room-overview-card.component.html',
  styleUrls: ['./room-overview-card.component.css']
})
export class RoomOverviewCardComponent implements OnInit {

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
      console.log('The dialog was closed');
      console.log("result");
    });
  }

}
