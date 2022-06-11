import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBookingFormComponent } from './staff-booking-form.component';

describe('BookingFormComponent', () => {
  let component: StaffBookingFormComponent;
  let fixture: ComponentFixture<StaffBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffBookingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
