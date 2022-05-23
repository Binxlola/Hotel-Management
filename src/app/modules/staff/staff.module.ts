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
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {StaffBookingFormComponent} from "./components/staff-booking-form/staff-booking-form.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { BillableOverviewCardComponent } from './components/billable-overview-card/billable-overview-card.component';

@NgModule({
  declarations: [
    StaffComponent,
    RoomFormComponent,
    RoomsTableComponent,
    StaffDashboardComponent,
    RoomOverviewCardComponent,
    StaffRosterComponent,
    BookingsCardComponent,
    StaffBookingFormComponent,
    BillableOverviewCardComponent
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
    MatAutocompleteModule,
    MatStepperModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  exports: [
    StaffComponent,
    StaffRoutingModule
  ],
  providers: [],
})
export class StaffModule { }
