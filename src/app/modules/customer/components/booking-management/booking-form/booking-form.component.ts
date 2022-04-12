import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {faCcVisa, faCcMastercard, faCcPaypal, faCcApplePay} from "@fortawesome/free-brands-svg-icons";
import {MatStepper} from "@angular/material/stepper";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {group} from "@angular/animations";
import {DatePipe} from "@angular/common";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}
    },
  ],
})
export class BookingFormComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper | undefined;

  private _datePipe: DatePipe = new DatePipe('en-NZ');
  private _onSummary = false;
  private _stepNextLabel: string = "next";
  private _occupantsArray: number[] = [0, 1, 2, 3];
  private _paymentMethods: {value: string, icon: IconDefinition}[] = [
    {value: "visa", icon: faCcVisa},
    {value: "master", icon: faCcMastercard},
    {value: "paypal", icon: faCcPaypal},
    {value: "apple", icon: faCcApplePay}
  ];

  private _bookingDetails: FormGroup = this.fb.group({
    numAdults: ["", Validators.required],
    numChildren: ["", Validators.required],
    resName: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    inTime: ["", Validators.required],
    outTime: ["", Validators.required],
    comments: [""],
  });

  private _paymentDetails: FormGroup = this.fb.group({
    paymentMethod: ["visa", Validators.required],
    bnkAcct: ["", Validators.compose(
      [Validators.required, Validators.pattern("(\\d{4}( - )?){4}")]
    )],
    cardName: ["", Validators.required],
    cardExpiry: ["", Validators.compose(
      [Validators.required, Validators.pattern("(\\d{2}(\/)?){2}")]
    )],
    cvv: ["", Validators.compose(
      [Validators.required, Validators.pattern("\\d{3}")])
    ],
  });

  constructor(public dialogRef: MatDialogRef<BookingFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) { }

  ngOnInit(): void {

    // Subscribe to Bank Account input and format where needed
    this.paymentDetails.get("bnkAcct")?.valueChanges.subscribe((value: string) => {
      let acctParts: string[] = value.split(" - ");

      // Add a hyphen with a space on each side between each section of bank account and stop further input past valid account
      if(acctParts.length > 0) {
        let lastGroup: string = acctParts[acctParts.length - 1];
        if(acctParts.length <= 3 && lastGroup.length == 4) {
          value += " - ";
        } else if(acctParts.length == 4 && lastGroup.length > 4) {
          value = this.paymentDetails.value.bnkAcct;
        }
      }

      this.paymentDetails.get("bnkAcct")?.setValue(value, {emitEvent: false});
    });

    // Subscribe to Expiry date input and format where needed
    this.paymentDetails.get("cardExpiry")?.valueChanges.subscribe((value: string) => {
      let expiryParts: string[] = value.split("/");

      // Add a backslash between the expiry date sections
      if(expiryParts.length > 0) {
        let lastGroup: string = expiryParts[expiryParts.length - 1];
        if(expiryParts.length == 1 && lastGroup.length == 2) {
          value += "/";
        } else if(expiryParts.length == 2 && lastGroup.length > 2) {
          value = this.paymentDetails.value.cardExpiry;
        }
      }

      this.paymentDetails.get("cardExpiry")?.setValue(value, {emitEvent: false});
    });

    // Subscribe to security cvv input and format where needed
    this.paymentDetails.get("cvv")?.valueChanges.subscribe((value: string) => {

      // Prevent user from entering more than 3 digits
      if(value.length > 3) {
        value = this.paymentDetails.value.cvv;
      }

      this.paymentDetails.get("cvv")?.setValue(value, {emitEvent: false});
    });


  }

  public onNoClick(): void {
    this.dialogRef.close();
  }


  /**
   * Helper method to navigate the forms in the Material Stepper.
   * Changes the label of button used to control forward steps, based on current step.
   * @param isForward Boolean stating if the stepper is moving forwards
   */
  public formNavigate(isForward: boolean) {

    // Change Step
    isForward? this.myStepper?.next() : this.myStepper?.previous();
    let currentStep: number | undefined = this.myStepper?.selectedIndex;
    let numStep: number | undefined = this.myStepper?.steps.length;

    // On final step (can close now)
    if(isForward && this._onSummary) this.dialogRef.close();

    // Change dynamic stepper label (update current step as step was changed)
    currentStep = this.myStepper?.selectedIndex;
    if(currentStep == numStep! - 1) {
      this.stepNextLabel = "Book";
      this._onSummary = true;
      this.bookingDetails.disable();
      this.paymentDetails.disable();
    } else if (currentStep == numStep! - 2) {
      this.stepNextLabel = "confirm";
    } else {
      this.stepNextLabel = "next";
    }

  }

  get stepNextLabel(): string {return this._stepNextLabel;}
  set stepNextLabel(label: string) {this._stepNextLabel = label;}

  get datePipe(): DatePipe {return  this._datePipe;}
  get occupantsArray(): number[] {return this._occupantsArray;}
  get paymentMethods(): {value: string, icon: IconDefinition}[] {
    return this._paymentMethods;
  }

  get bookingDetails(): FormGroup {
    return this._bookingDetails;
  }

  get paymentDetails(): FormGroup {
    return this._paymentDetails;
  }

}
