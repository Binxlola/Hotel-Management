import { Component, OnInit } from '@angular/core';
import {Booking, BookingService} from "../../../../shared/services/booking/booking-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  private _bookings: Booking[] = [];
  private readonly _isLoadingResults;
  private _datePipe: DatePipe = new DatePipe('en-NZ');

  displayedColumns: string[] = ['type', 'check-in', 'check-out', 'guests', 'paid'];

  constructor(private _bookingService: BookingService) {
    this._bookingService.getAllBookings()
      .then(bookings => this._bookings = [...bookings]);
    // Notify loading is complete
    this._isLoadingResults = false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  get bookings(): Booking[] {
    return this._bookings;
  }

  get isLoadingResults(): boolean {
    return this._isLoadingResults;
  }

  get datePipe(): DatePipe {return  this._datePipe;}

}
