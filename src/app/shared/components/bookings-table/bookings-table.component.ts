import { Component } from '@angular/core';
import {BookingService} from "../../services/booking/booking-service.service";
import {DatePipe} from "@angular/common";
import {Booking} from "../../interfaces";

@Component({
  selector: 'bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent {

  private _bookings: Booking[] = [];
  private _isLoadingResults = true;
  private _datePipe: DatePipe = new DatePipe('en-NZ');

  displayedColumns: string[] = ['type', 'check-in', 'check-out', 'guests', 'paid', 'cancel_action'];

  constructor(private _bookingService: BookingService) {
    this.updateBookings();
  }

  public updateBookings(): void {
    this._bookingService.getAllBookings()
      .then(bookings => {
          this._bookings = [...bookings];
          this._isLoadingResults = false;
      });
  }

  public cancelBooking(bookingId: string): void {
    this._bookingService.cancelBooking(bookingId).subscribe(
      () => {
        this.updateBookings();
        alert('Booking cancellation completed');
      }
    );
  }

  get bookings(): Booking[] {
    return this._bookings;
  }

  get isLoadingResults(): boolean {
    return this._isLoadingResults;
  }

  get datePipe(): DatePipe {return  this._datePipe;}

}
