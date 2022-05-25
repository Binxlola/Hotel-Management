import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faFacebook, faTwitter, faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {AuthService} from "../../services/authentican.service";
import {FormBuilder, FormControlDirective, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {exitCodeFromResult} from "@angular/compiler-cli";
import {addBodyClass} from "@angular/cdk/schematics";
import {
  BookingFormComponent
} from "../../../customer/components/booking-management/booking-form/booking-form.component";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public readonly _isCustomer: boolean;
  private _resetID: string | null = null;

  // loginFormGroup requires username and password
  private _loginFormGroup: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  // signUpFormGroup requires customer object
  private _signupFormGroup: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    first_name: ["", Validators.required],
    last_name: ["", Validators.required],
    email: ["", Validators.required]

  })

  // Font Awesome icons
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faLinkedin = faLinkedin;
  signupMode: boolean = false;

  hide = true;


  @ViewChild('signUpError', {static: false} ) public signUpError!: ElementRef;
  @ViewChild('signInError', {static: false}) public signInError!: ElementRef;

  constructor(private _matDialog: MatDialog,
              private _router: Router,
              private _authenticationService: AuthService, private fb: FormBuilder,
              private _renderer : Renderer2,
              private _route: ActivatedRoute ){
    this._isCustomer = this._router.url === "/login";
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this._resetID = params.get('id');
    });

    if (this._resetID) this.resetPassword();
  }

  toggleMode(toggleSignup: boolean): void {
    this.signupMode = toggleSignup;
  }
//making method that is called when dialog is closed
  public resetPassword(): void {
    const dialogRef = this._matDialog.open(ResetPasswordComponent, {
      disableClose: false,
      hasBackdrop: true,
      data: {id: this._resetID},
    });
  }

  /**
   * Given an error box element reference, will render a container around the error
   * message and append it as a child the provided error box
   * @param error The error to be displayed to the user
   * @param view The view for which the error should be appended to
   */
  public handleErrorResponse(error: HttpErrorResponse, view : ElementRef): void {
    Array.from(view.nativeElement.children).forEach((child: any) => {
      this._renderer.removeChild(view.nativeElement, child);
    });

    // Create the error container and append
    let child = this._renderer.createElement("div");
    this._renderer.setProperty(child, "innerText", error.error);
    this._renderer.setStyle(view.nativeElement, "display", "block");
    this._renderer.appendChild(view.nativeElement, child);
  }

  /**
   * Handles the login submit logic, will manually call a post request to the back for login
   * given that the login form group is valid.
   * Will always return false to prevent default form submission logic
   */
  public login(event: SubmitEvent): boolean {
    event.preventDefault();

    if(this._loginFormGroup.valid) {

      // Call login and subscribe to being post request
      this._authenticationService.login(
        {
          username: this._loginFormGroup.get('username')?.value,
          password: this._loginFormGroup.get('password')?.value,
          isCustomer: this._isCustomer
        },
        this._isCustomer ? '/customer' : '/staff',
        this.handleErrorResponse.bind(this),
        this.signInError
      ).subscribe();
    }

    return false;
  }

  /**
   * Handles the signup submit logic, will manually call a post request to the back for signup
   * given that the signup form group is valid.
   * Will always return false to prevent default form submission logic
   */
  public signup(event: SubmitEvent): boolean {
    event.preventDefault();

    if(this._signupFormGroup.valid) {

      // Call signup and subscribe to being post request
      this._authenticationService.signup(
        {
          username: this._signupFormGroup.get('username')?.value,
          password: this._signupFormGroup.get('password')?.value,
          firstName: this._signupFormGroup.get('first_name')?.value,
          lastName: this._signupFormGroup.get('last_name')?.value,
          email: this._signupFormGroup.get('email')?.value
        },
        this.isCustomer ? '/customer' : '/staff',
        this.handleErrorResponse.bind(this),
        this.signUpError
      ).subscribe();
    }

    return false
  }

  // Encapsulation
  get isCustomer(): boolean {
    return this._isCustomer;
  }

  get authService(){
    return this._authenticationService;
  }

  get loginForm(): FormGroup {
    return this._loginFormGroup;
  }

  get signupForm(): FormGroup {
    return this._signupFormGroup;
  }
}
