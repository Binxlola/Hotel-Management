import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingsTableComponent} from "./components/bookings-table/bookings-table.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    BookingsTableComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    BookingsTableComponent
  ],
  providers: [],
})
export class SharedModule { }
