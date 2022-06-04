import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaffComponent} from "./staff.component";
import {StaffRoutingModule} from "./staff-routing";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RoomFormComponent} from "./components/forms/room-form/room-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import { RoomsTableComponent } from './components/tables/rooms-table/rooms-table.component';
import {MatTableModule} from "@angular/material/table";
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { RoomOverviewCardComponent } from './components/cards/room-overview-card/room-overview-card.component';
import {StaffOverviewCardComponent} from "./components/cards/staff-overview-card/staff-overview-card.component";
import { BookingsCardComponent } from './components/cards/bookings-card/bookings-card.component';
import {SharedModule} from "../../shared/shared.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {StaffBookingFormComponent} from "./components/forms/staff-booking-form/staff-booking-form.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { BillableOverviewCardComponent } from './components/cards/billable-overview-card/billable-overview-card.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import { StaffFormComponent } from './components/forms/staff-form/staff-form.component';
import { StaffTableComponent } from './components/tables/staff-table/staff-table.component';

@NgModule({
  declarations: [
    StaffComponent,
    RoomFormComponent,
    RoomsTableComponent,
    StaffDashboardComponent,
    RoomOverviewCardComponent,
    StaffOverviewCardComponent,
    BookingsCardComponent,
    StaffBookingFormComponent,
    BillableOverviewCardComponent,
    StaffFormComponent,
    StaffTableComponent
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
        MatExpansionModule,
        MatChipsModule,
    ],
  exports: [
    StaffComponent,
    StaffRoutingModule
  ],
  providers: [],
})
export class StaffModule { }
