import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Staff} from "../../../../../shared/interfaces";
import {StaffFormComponent} from "../../forms/staff-form/staff-form.component";
import {StaffTableComponent} from "../../tables/staff-table/staff-table.component";

@Component({
  selector: 'staff-overview-card',
  templateUrl: './staff-overview-card.component.html',
  styleUrls: ['./staff-overview-card.component.css']
})
export class StaffOverviewCardComponent implements OnInit {

  @ViewChild('staffTableComponent') private _roomsTable: StaffTableComponent | undefined

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
      this._roomsTable?.updateStaff();
    });
  }

}
