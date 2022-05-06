import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogData} from "../../../customer/components/booking-management/booking-form/booking-form.component";
import {BookingService, Room} from "../../../shared/services/booking/booking-service.service";

@Component({
  selector: 'room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent {

  private readonly _isEdit: boolean = false;
  private readonly _room: Room | undefined;
  private readonly _roomFormGroup: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private fb: FormBuilder,
    private _bookingService: BookingService
  ) {
    this._room = this._data.room;

    // Room data was passed in, so we are updating an existing room
    if(this._room) this._isEdit = true;

    this._roomFormGroup = this.fb.group({
      roomType: [{value: this._room ? this._room?.type : "", disabled: this._isEdit}, Validators.required],
      numRooms: [this._room ? this._room?.num_available : "", Validators.required],
      descShort: [this._room ? this._room?.description_short : "", Validators.required],
      descFull: [this._room ? this._room?.description_full : "", Validators.required],
      maxAdults: [{value: this._room ? this._room?.max_adults : "", disabled: this._isEdit}, Validators.required],
      maxChildren: [{value: this._room ? this._room?.max_children : "", disabled: this._isEdit}, Validators.required],
      minCheckIn: [this._room ? this._room?.minCheckIn : "", Validators.required],
      maxCheckIn: [this._room ? this._room?.maxCheckIn : "", Validators.required],
      minCheckOut: [this._room ? this._room?.minCheckOut : "", Validators.required],
      maxCheckOut: [this._room ? this._room?.maxCheckOut : "", Validators.required],
      baseCost: [this._room ? this._room?.base_price : "", Validators.required],
    })
  }

  /**
   * Take the room form data and create a new room object to be posted to the backed
   * for saving. The post only happens once the room form group is valid.
   */
  public createRoom(): void {
    if(this._roomFormGroup.valid) {
      const roomToSave: Room = {
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

      this._bookingService.createRoom(roomToSave).subscribe(
        res => console.log(res)
      )
    }
  }

  /**
   * Take the room form data and create a new room object to be posted to the backed
   * for saving. The post only happens once the room form group is valid.
   */
  public updateRoom(): void {
    if(this._roomFormGroup.valid) {
      const roomToUpdate: Room = {
        _id: this._room?._id,
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

      this._bookingService.updateRoom(roomToUpdate).subscribe(
        res => {
          alert(res ? "Update was completed": "Update was not completed");
          this._dialogRef.close();
        }
      )
    }
  }

  //  ==== GETTERS && SETTERS ====

  get room(): Room | undefined {
    return this._room;
  }

  get roomFormGroup(): FormGroup {
    return this._roomFormGroup
  }

  get dialogRef(): MatDialogRef<RoomFormComponent> {
    return this._dialogRef;
  }


}
