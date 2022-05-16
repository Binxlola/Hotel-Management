import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaffComponent} from "./staff.component";
import {StaffRoutingModule} from "./staff-routing";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RoomFormComponent} from "./components/room-form/room-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import { RoomsTableComponent } from './components/rooms-table/rooms-table.component';
import {MatTableModule} from "@angular/material/table";
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { RoomOverviewCardComponent } from './components/room-overview-card/room-overview-card.component';
import {StaffRosterComponent} from "./components/staff-roster/staff-roster.component";
import { BookingsCardComponent } from './components/bookings-card/bookings-card.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
      StaffComponent,
      RoomFormComponent,
      RoomsTableComponent,
      StaffDashboardComponent,
      RoomOverviewCardComponent,
      StaffRosterComponent,
      BookingsCardComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    SharedModule,
  ],
  exports: [
    StaffComponent,
    StaffRoutingModule
  ],
  providers: [],
})
export class StaffModule { }
