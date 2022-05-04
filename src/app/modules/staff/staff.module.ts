import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaffDashboardComponent} from "./staff-dashboard/staff-dashboard.component";
import {StaffRoutingModule} from "./staff-routing";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CreateRoomFormComponent} from "./room-create-form/room-create-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    StaffDashboardComponent,
    CreateRoomFormComponent
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
  ],
  exports: [
    StaffDashboardComponent,
    StaffRoutingModule
  ],
  providers: [],
})
export class StaffModule { }
