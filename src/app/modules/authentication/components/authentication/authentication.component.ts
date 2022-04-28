import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faFacebook, faTwitter, faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {AuthService} from "../../services/authentican.service";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public readonly isCustomer: boolean;

  private _loginForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  private _signupForm: FormGroup = this.fb.group({
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

  @ViewChild('signUpError' ) public signUpError!: ElementRef;
  @ViewChild('signInError') public signInError!: ElementRef;

  constructor(private _router: Router, private _authenticationService: AuthService, private fb: FormBuilder, private _renderer : Renderer2){
    this.isCustomer = this._router.url === "/login";

  }

  ngOnInit(): void {}

  toggleMode(toggleSignup: boolean): void {
    this.signupMode = toggleSignup;
  }

  public handleErrorResponse(error: HttpErrorResponse, view : HTMLDivElement): void {
    let child = document.createElement('div');
    child.style.color = "red";
    child.innerText = error.error;
    view.appendChild(child);
  }

  get authService(){
    return this._authenticationService;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  get signupForm(): FormGroup {
    return this._signupForm;
  }
}
