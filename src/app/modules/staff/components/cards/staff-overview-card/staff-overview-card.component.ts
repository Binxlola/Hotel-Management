import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RoomsTableComponent} from "../../tables/rooms-table/rooms-table.component";
import {Staff} from "../../../../../shared/interfaces";
import {StaffFormComponent} from "../../forms/staff-form/staff-form.component";

@Component({
  selector: 'staff-overview-card',
  templateUrl: './staff-overview-card.component.html',
  styleUrls: ['./staff-overview-card.component.css']
})
export class StaffOverviewCardComponent implements OnInit {

  @ViewChild('roomsTableComponent') private _roomsTable: RoomsTableComponent | undefined

  constructor(private _staffDialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openStaffForm(staff: Staff | undefined) {
    const dialogRef = this._staffDialog.open(StaffFormComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {staff: staff},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this._roomsTable?.updateRooms();
    });
  }

}
