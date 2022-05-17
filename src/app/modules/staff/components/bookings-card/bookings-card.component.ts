import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Customer, StaffService} from "../../services/staff/staff-service.service";
import {map, Observable, startWith} from "rxjs";
import {
  AbstractControl,
  FormControl,
  FormControlStatus,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {StaffBookingFormComponent} from "../staff-booking-form/staff-booking-form.component";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'bookings-card',
  templateUrl: './bookings-card.component.html',
  styleUrls: ['./bookings-card.component.css']
})
export class BookingsCardComponent implements OnInit {

  private _selectedCustomer: Customer | undefined;
  private _options: Customer[] = [];
  private _filteredOptions: Observable<Customer[]> | undefined;
  private _customerControl: FormControl = new FormControl('', [Validators.required, this.validCustomerSelectedValidator()]);

  constructor(private _bookingDialog: MatDialog, private _staffService: StaffService) {
    this.updateCustomers();
  }

  ngOnInit(): void {

    // Subscribe to customer control change to apply filters to auto complete
    this._filteredOptions = this._customerControl.valueChanges.pipe(
      startWith(''),
      map((value: string | Customer) => this._filter(value)),
    );

    // Subscribe to the customer control state change, to account for a valid selection that is manually typed
    this._customerControl.statusChanges.subscribe(
      (status: FormControlStatus) => {
        if(status === "INVALID") this._selectedCustomer = undefined;
        else if(status === "VALID" && !this._selectedCustomer) {
          this._selectedCustomer = this.options.find((option: Customer) => option.username == this._customerControl.value);
        }
      }
    )
  }

  /**
   * Use the staff service to query API for all existing customers
   */
  public updateCustomers(): void {
    this._staffService.getAllCustomers()
      .then(customers => this._options = [...customers]);
  }

  /**
   * Filter the options to be displayed in the customer auto complete form control
   * @param value The value that is being used for filtering
   */
  private _filter(value: string | Customer): Customer[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.username;
    return this.options.filter((option: Customer) => option.username.toLowerCase().includes(filterValue));
  }

  public makeBooking() {
    const dialogRef = this._bookingDialog.open(StaffBookingFormComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {customer: this._selectedCustomer},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this._customerControl.setValue("");
      this._customerControl.reset();
    });
  }

  /**
   * Custom validator to account for user potentially adding a valid customer manually.
   * Or unlocking extra logic with invalid input
   */
  private validCustomerSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlVal: string | Customer = control.value;
      const customerExists = this._options.filter(
        (option: Customer) => option.username == (typeof controlVal === "string" ? controlVal : controlVal.username)
      ).length == 1;
      return !customerExists ? {invalidCustomer: {value: controlVal}} : null;
    }
  }

  /**
   * Keep track of the customer selected for a new booking
   * @param event The option select event, used to get the selected value
   */
  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this._selectedCustomer = event.option.value
  }

  public getOptionDisplay(value: Customer): string {
    return value.username;
  }

  //    ==== GETTERS && SETTERS ====
  get options(): Customer[] {
    return this._options;
  }
  get filteredOptions(): Observable<Customer[]> | undefined{
    return this._filteredOptions;
  }
  get customerControl(): FormControl {
    return this._customerControl;
  }

}
