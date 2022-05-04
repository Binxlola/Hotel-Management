import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {DialogData} from "../../customer/components/booking-management/booking-form/booking-form.component";
import {Booking, BookingService, Room} from "../../shared/services/booking/booking-service.service";

@Component({
  selector: 'room-create-form',
  templateUrl: './room-create-form.component.html',
  styleUrls: ['./room-create-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}
    },
  ],
})
export class CreateRoomFormComponent {

  private _roomFormGroup: FormGroup = this.fb.group({
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
    public dialogRef: MatDialogRef<CreateRoomFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private fb: FormBuilder,
    private _bookingService: BookingService
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public createRoom(): void {
    if(this._roomFormGroup.valid) {
      const room: Room = {
        type: this._roomFormGroup.get("roomType")?.value,
        num_available: this._roomFormGroup.get("numRooms")?.value,
        description_short: this._roomFormGroup.get("descShort")?.value,
        description_full: this._roomFormGroup.get("descFull")?.value,
        max_adults: this._roomFormGroup.get("maxAdults")?.value,
        max_children: this._roomFormGroup.get("maxChildren")?.value,
        minCheckIn: this._roomFormGroup.get("minCheckIn")?.value,
        maxCheckIn: this._roomFormGroup.get("maxCheckIn")?.value,
        minCheckOut: this._roomFormGroup.get("minCheckOut")?.value,
        maxCheckOut: this._roomFormGroup.get("maxCheckOut")?.value,
        checkInOutInterval: 30,
        base_price: this._roomFormGroup.get("baseCost")?.value,
      }

      this._bookingService.createRoom(room).subscribe(
        res => console.log(res)
      )
    }
  }

  //  ==== GETTERS && SETTERS ====

  get roomFormGroup(): FormGroup {
    return this._roomFormGroup
  }


}
