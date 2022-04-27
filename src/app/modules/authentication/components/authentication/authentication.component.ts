import { Component, OnInit } from '@angular/core';
import {faFacebook, faTwitter, faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {AuthService} from "../../services/authentican.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    password: ["", Validators.required],
  });

  // Font Awesome icons
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faLinkedin = faLinkedin;
  signupMode: boolean = false;

  hide = true;

  constructor(private _router: Router, private _authenticationService: AuthService, private fb: FormBuilder){
    this.isCustomer = this._router.url === "/login";
  }

  ngOnInit(): void {}

  toggleMode(toggleSignup: boolean): void {
    this.signupMode = toggleSignup;
  }

  public handleErrorResponse(error: HttpErrorResponse): void {
    console.log(error);
  }

  get authService(){
    return this._authenticationService;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }
}
