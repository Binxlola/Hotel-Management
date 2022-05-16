import { Component, OnInit } from '@angular/core';
import {Room} from "../../../../shared/services/booking/booking-service.service";
import {RoomFormComponent} from "../room-form/room-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'bookings-card',
  templateUrl: './bookings-card.component.html',
  styleUrls: ['./bookings-card.component.css']
})
export class BookingsCardComponent implements OnInit {

  constructor(private _bookingDialog: MatDialog) { }

  ngOnInit(): void {
  }

  public makeBooking() {
    const dialogRef = this._bookingDialog.open(RoomFormComponent, {
      disableClose: true,
      hasBackdrop: true,
    });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this._roomsTable?.updateRooms();
    // });
  }

}
