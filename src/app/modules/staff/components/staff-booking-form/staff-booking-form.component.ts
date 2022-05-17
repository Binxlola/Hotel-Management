import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {BookingService} from "../../../../shared/services/booking/booking-service.service";
import {AuthService} from "../../../authentication/services/authentican.service";
import {Customer} from "../../services/staff/staff-service.service";

export interface DialogData {
  customer: Customer;
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

  private readonly _customer: Customer;
  private readonly _roomFormGroup: FormGroup = this.fb.group({
    roomType: ["", Validators.required],
    numRooms: ["", Validators.required],
    descShort: ["", Validators.required],
    descFull: ["", Validators.required],
    maxAdults: ["", Validators.required],
    maxChildren: ["", Validators.required],
    minCheckIn: ["", Validators.required],
    maxCheckIn: ["", Validators.required],
    minCheckOut: ["", Validators.required],
    maxCheckOut: ["", Validators.required],
    baseCost: ["", Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<StaffBookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private fb: FormBuilder,
    private _bookingService: BookingService,
    private _authService: AuthService
  ) {
    this._customer = this._data.customer;
  }

  ngOnInit(): void {}

  //  ==== GETTERS && SETTERS ====
  get customer(): Customer {
    return this._customer;
  }

  get roomFormGroup(): FormGroup {
    return this._roomFormGroup
  }

}
