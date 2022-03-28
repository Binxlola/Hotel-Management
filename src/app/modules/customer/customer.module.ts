import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatBadgeModule} from "@angular/material/badge";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CustomerDashboardComponent} from "./customer-dashboard.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { BookingManagementComponent } from './components/booking-management/booking-management.component';
import {MatCardModule} from "@angular/material/card";
import {SwiperModule} from "swiper/angular";
import {MatChipsModule} from "@angular/material/chips";
import { BookingFormComponent } from './components/booking-management/booking-form/booking-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookingManagementComponent,
    BookingFormComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    SwiperModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule
  ],
  exports: [
    CustomerDashboardComponent
  ],
  providers: [],
})
export class CustomerModule { }
