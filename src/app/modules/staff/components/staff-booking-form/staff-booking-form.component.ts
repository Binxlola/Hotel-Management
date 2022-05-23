import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {BookingService, Room} from "../../../../shared/services/booking/booking-service.service";
import {AuthService} from "../../../authentication/services/authentican.service";
import {Customer} from "../../services/staff/staff-service.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";

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

  private _selectedRoom: Room | undefined = undefined;
  private _options: Room[] = [];
  private _filteredOptions: Observable<Room[]> | undefined;

  private readonly _customer: Customer;
  private readonly _numAdults: number[];
  private readonly _numChildren: number[];
  private readonly _bookingDetails: FormGroup = this.fb.group({
    room: ["", Validators.required],
    numAdults: ["", Validators.required],
    numChildren: ["", Validators.required],
    resName: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    inTime: ["", Validators.required],
    outTime: ["", Validators.required],
    comments: [""],
  });
  // Build guest number options array from room limits
  // this._numAdults = [...Array(_data.room.max_adults + 1).keys()];
  // this._numChildren = [...Array(_data.room.max_adults + 1).keys()];

  constructor(
    public dialogRef: MatDialogRef<StaffBookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private fb: FormBuilder,
    private _bookingService: BookingService,
    private _authService: AuthService
  ) {
    this._customer = this._data.customer;
    this._numAdults = [];
    this._numChildren = [];
    this._selectedRoom = undefined;
    this.updateRooms();
  }

  ngOnInit(): void {
    // Subscribe to customer control change to apply filters to auto complete
    this._filteredOptions = this._bookingDetails.get("room")!.valueChanges.pipe(
      startWith(''),
      map((value: string | Room) => this._filter(value)),
    );

    // Subscribe to the customer control state change, to account for a valid selection that is manually typed
    this._bookingDetails.get("room")!.statusChanges.subscribe(
      (status: FormControlStatus) => {
        if(status === "INVALID") this._selectedRoom = undefined;
        else if(status === "VALID" && !this._selectedRoom) {
          this._selectedRoom = this.options.find((option: Room) => option.type == this._bookingDetails.get("room")!.value);
        }
      }
    )
  }

  /**
   * Use the booking service to query API for all existing rooms
   */
  public updateRooms(): void {
    this._bookingService.getAllRooms()
      .then(rooms => this._options = [...rooms]);
  }

  /**
   * Filter the options to be displayed in the room auto complete form control
   * @param value The value that is being used for filtering
   */
  private _filter(value: string | Room): Room[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.type;
    return this._options.filter((option: Room) => option.type.toLowerCase().includes(filterValue));
  }

  /**
   * Keep track of the room selected for a new booking
   * @param event The option select event, used to get the selected value
   */
  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this._selectedRoom = event.option.value
  }

  get filteredOptions(): Observable<Room[]> | undefined{
    return this._filteredOptions;
  }
  get roomControl(): FormControl {
    return <FormControl>this._bookingDetails.get("room")!;
  }

  public getOptionDisplay(value: Room): string {
    return value.type;
  }

  //  ==== GETTERS && SETTERS ====
  get customer(): Customer {
    return this._customer;
  }

  get options(): Room[] {
    return this._options;
  }

  get bookingDetails(): FormGroup {
    return this._bookingDetails;
  }

  get numAdults(): number[] {
    return this._numAdults;
  }

  get numChildren(): number[] {
    return this._numChildren;
  }

  get selectedRoom(): Room | undefined {
    return this._selectedRoom;
  }

}
