import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Customer, StaffService} from "../../services/staff/staff-service.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {StaffBookingFormComponent} from "../staff-booking-form/staff-booking-form.component";

@Component({
  selector: 'bookings-card',
  templateUrl: './bookings-card.component.html',
  styleUrls: ['./bookings-card.component.css']
})
export class BookingsCardComponent implements OnInit {

  private _customerControl: FormControl = new FormControl('', Validators.required);
  private _options: Customer[] = [];
  private _filteredOptions: Observable<Customer[]> | undefined;

  constructor(private _bookingDialog: MatDialog, private _staffService: StaffService) {
    this.updateCustomers();
  }

  ngOnInit(): void {
    this._filteredOptions = this._customerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  public updateCustomers(): void {
    this._staffService.getAllCustomers()
      .then(customers => this._options = [...customers]);
  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: Customer) => option.username.toLowerCase().includes(filterValue));
  }

  public makeBooking() {
    const dialogRef = this._bookingDialog.open(StaffBookingFormComponent, {
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("closed");
    });
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
