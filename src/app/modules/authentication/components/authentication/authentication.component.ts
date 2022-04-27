import { Component, OnInit } from '@angular/core';
import {faFacebook, faTwitter, faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {AuthService, LoginRes} from "../../services/authentican.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private readonly _handleLoginResponseFunction: ((error: string | null) => void) = this.handleLoginResponse;

  private _customerLogin: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  // Font Awesome icons
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faLinkedin = faLinkedin;
  signupMode: boolean = false;
  modeClass = "sign-up-mode";

  hide = true;

  constructor( private _authenticationService: AuthService, private fb: FormBuilder){}

  ngOnInit(): void {}

  toggleMode(toggleSignup: boolean): void {
    this.signupMode = toggleSignup;
  }

  private handleLoginResponse( error: string | null ){
    console.log(error);
  }

  get handleLoginResponseFunction(): (error: string | null) => void{
    return this._handleLoginResponseFunction;
  }

  get authService(){
    return this._authenticationService;
  }

  get customerLogin(): FormGroup {
    return this._customerLogin;
  }
}
