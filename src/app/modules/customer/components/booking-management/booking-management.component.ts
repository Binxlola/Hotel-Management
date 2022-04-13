import {Component, OnInit, Renderer2} from '@angular/core';
import {Autoplay, Pagination, Swiper, SwiperOptions} from "swiper";
import {MatDialog} from "@angular/material/dialog";
import {BookingFormComponent} from "./booking-form/booking-form.component";
import {BookingService, Room} from "../../../shared/services/booking/booking-service.service";

@Component({
  selector: 'customer-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {

  private _openBookingFunction:  (room: Room) => void;
  public swiperConfig: SwiperOptions = {
    cssMode: true,
    direction: "vertical",
    slidesPerView: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  }

  constructor(private renderer: Renderer2, private _bookingService: BookingService, private _bookingDialog: MatDialog) {
   this._openBookingFunction = this.openBooking;
  }

  ngOnInit(): void {
    Swiper.use([Autoplay]);
  }

  private openBooking(room: Room) {
    const dialogRef = this._bookingDialog.open(BookingFormComponent, {
      disableClose: false,
      hasBackdrop: true,
      data: {room: room},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log("result");
    });
  }

  get openBookingFunction(): (room: Room) => void {return this._openBookingFunction.bind(this);}
  get rooms(): Room[] {return this._bookingService.rooms;}
}
