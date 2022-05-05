import {Component, Input, OnInit} from '@angular/core';
import {BookingService, Room} from "../../../shared/services/booking/booking-service.service";
import {MatDialog} from "@angular/material/dialog";
import {RoomFormComponent} from "../room-form/room-form.component";
import {Required} from "../../../../decorators/required-input.decorator";

@Component({
  selector: 'rooms-table',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.css']
})
export class RoomsTableComponent implements OnInit {

  @Input() @Required
  editRoomFunction!: ((room: Room) => void);
  private _rooms: Room[] = [];

  displayedColumns: string[] = ['type', 'num_available', 'base_price', "edit_action", "remove_action"];

  constructor(private _bookingService: BookingService, private _bookingDialog: MatDialog) {
    this.updateRooms();
  }

  ngOnInit(): void {
  }

  private updateRooms(): void {
    this._bookingService.getAllRooms()
      .then(rooms => this._rooms = [...rooms]);
  }

  public deleteRoom(id: string): void {
    this._bookingService.deleteRoom(id).subscribe(
      res => this.updateRooms()
    )
  }

  //    ==== GETTERS && SETTERS ====
  get rooms(): Room[] {
    return this._rooms;
  }

}
