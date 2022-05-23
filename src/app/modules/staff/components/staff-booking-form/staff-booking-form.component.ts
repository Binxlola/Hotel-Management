import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlStatus,
  FormGroup, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Booking, BookingService, Room} from "../../../../shared/services/booking/booking-service.service";
import {AuthService} from "../../../authentication/services/authentican.service";
import {Customer} from "../../services/staff/staff-service.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";

export interface DialogData {
  customer: Customer;
}

@Component({
  selector: 'booking-form',
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
  private _numAdults: number[];
  private _numChildren: number[];

  private readonly _customer: Customer;
  private readonly _bookingDetails: FormGroup = this.fb.group({
    room: ["", [Validators.required, , this.validCustomerSelectedValidator()]],
    numAdults: [{value: "", disabled: true}, Validators.required],
    numChildren: [{value: "", disabled: true}, Validators.required],
    resName: [{value: "", disabled: true}, Validators.required],
    startDate: [{value: "", disabled: true}, Validators.required],
    endDate: [{value: "", disabled: true}, Validators.required],
    inTime: [{value: "", disabled: true}, Validators.required],
    outTime: [{value: "", disabled: true}, Validators.required],
    comments: [{value: "", disabled: true}],
  });

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
    //Default the reservation name
    this._bookingDetails.get("resName")!.patchValue(this._customer.first_name + " " + this._customer.last_name);

    // Subscribe to customer control change to apply filters to auto complete
    this._filteredOptions = this._bookingDetails.get("room")!.valueChanges.pipe(
      startWith(''),
      map((value: string | Room) => this._filter(value)),
    );

    // Subscribe to the customer control state change, to account for a valid selection that is manually typed
    this._bookingDetails.get("room")!.statusChanges.subscribe(
      (status: FormControlStatus) => {
        if(status === "INVALID") {
          this.updateSelectedRoom(undefined);
          this.disableBookingControls();
        }
        else if(status === "VALID" && !this._selectedRoom) {
          this.enableBookingControls();
          this.updateSelectedRoom(
            this._selectedRoom = this.options.find((option: Room) => option.type == this._bookingDetails.get("room")!.value)
          );
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
   * Disables individual form controls at the same time
   */
  private disableBookingControls(): void {
    this._bookingDetails.get("numAdults")!.disable();
    this._bookingDetails.get("numChildren")!.disable();
    this._bookingDetails.get("resName")!.disable();
    this._bookingDetails.get("startDate")!.disable();
    this._bookingDetails.get("inTime")!.disable();
    this._bookingDetails.get("outTime")!.disable();
    this._bookingDetails.get("comments")!.disable();
  }

  /**
   * Enables individual form controls at the same time
   */
  private enableBookingControls(): void {
    this._bookingDetails.get("numAdults")!.enable();
    this._bookingDetails.get("numChildren")!.enable();
    this._bookingDetails.get("resName")!.enable();
    this._bookingDetails.get("startDate")!.enable();
    this._bookingDetails.get("inTime")!.enable();
    this._bookingDetails.get("outTime")!.enable();
    this._bookingDetails.get("comments")!.enable();
  }

  /**
   * When a room is selected, logic is required further than just setting the room.
   * This method encapsulates that, such that is may be used in a variety of places without duplicated code
   * @param room The room that has been selected ( can be undefined)
   */
  private updateSelectedRoom(room: Room | undefined): void {
    this._selectedRoom = room;
    if(room !== undefined) {
      // Build guest number options array from room limits
      this._numAdults = [...Array(this._selectedRoom!.max_adults + 1).keys()];
      this._numChildren = [...Array(this._selectedRoom!.max_adults + 1).keys()];
    }
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
   * Room validator to account for user potentially adding a valid room manually.
   * Or unlocking extra logic with invalid input
   */
  private validCustomerSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlVal: string | Room = control.value;
      const customerExists = this._options.filter(
        (option: Room) => option.type == (typeof controlVal === "string" ? controlVal : controlVal.type)
      ).length == 1;
      return !customerExists ? {invalidCustomer: {value: controlVal}} : null;
    }
  }

  /**
   * Keep track of the room selected for a new booking
   * @param event The option select event, used to get the selected value
   */
  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this.updateSelectedRoom(event.option.value);
  }

  public makeBooking(): void {
    let booking: Booking = {
      user: this._customer._id,
      bookingName: this.bookingDetails.get("resName")?.value,
      room: this._selectedRoom!._id!,
      totalPaid: this._selectedRoom!.base_price,
      checkInDate: this.bookingDetails.get("startDate")?.value,
      checkOutDate: this.bookingDetails.get("endDate")?.value,
      checkInTime: this.bookingDetails.get("inTime")?.value,
      checkOutTime: this.bookingDetails.get("outTime")?.value,
      numAdults: this.bookingDetails.get("numAdults")?.value,
      numChildren: this.bookingDetails.get("numChildren")?.value,
      comments: this.bookingDetails.get("comments")?.value,
    }

    this._bookingService.makeBooking(booking)
      .then(res => {
        alert(res !== undefined ? "Booking made, customer will be notified" : "Booking was unable to be made");
        this.dialogRef.close();
      });
  }

  //  ==== GETTERS && SETTERS ====
  get filteredOptions(): Observable<Room[]> | undefined{
    return this._filteredOptions;
  }

  get roomControl(): FormControl {
    return <FormControl>this._bookingDetails.get("room")!;
  }

  public getOptionDisplay(value: Room): string {
    return value.type;
  }

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
