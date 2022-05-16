import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Booking, BookingService, Room} from "../../../../shared/services/booking/booking-service.service";
import {AuthService} from "../../../authentication/services/authentican.service";

export interface DialogData {
  room: Room;
}

@Component({
  selector: 'app-booking-form',
  templateUrl: './staff-booking-form.component.html',
  styleUrls: ['./staff-booking-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}
    },
  ],
})
export class StaffBookingFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StaffBookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private fb: FormBuilder,
    private _bookingService: BookingService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  // ==== SIMPLE GETTERS AND SETTERS

}
