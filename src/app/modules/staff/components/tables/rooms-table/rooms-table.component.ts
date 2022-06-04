import {Component, Input, OnInit} from '@angular/core';
import {BookingService} from "../../../../../shared/services/booking/booking-service.service";
import {MatDialog} from "@angular/material/dialog";
import {Required} from "../../../../../decorators/required-input.decorator";
import {Room} from "../../../../../shared/interfaces";
import {AuthService} from "../../../../authentication/services/authentican.service";

@Component({
  selector: 'rooms-table',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.css']
})
export class RoomsTableComponent implements OnInit {

  @Input() @Required
  public editRoomFunction!: ((room: Room) => void);
  private readonly _displayedColumns: string[] = ['type', 'num_available', 'base_price'];
  private readonly _adminOnlyColumns: string[] = ["edit_action", "remove_action"];

  constructor(private _bookingService: BookingService, private _bookingDialog: MatDialog, private _authService: AuthService) {
    this.updateRooms();
    if (this.isAdmin) this._displayedColumns = [...this._displayedColumns, ...this._adminOnlyColumns];
  }

  private _rooms: Room[] = [];

  get rooms(): Room[] {
    return this._rooms;
  }

  get isAdmin(): boolean {
    return this._authService.isAdmin;
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  ngOnInit(): void {
  }

  public updateRooms(): void {
    this._bookingService.getAllRooms()
      .then(rooms => this._rooms = [...rooms]);
  }

  public deleteRoom(id: string): void {
    this._bookingService.deleteRoom(id).subscribe(
      res => this.updateRooms()
    )
  }

}
