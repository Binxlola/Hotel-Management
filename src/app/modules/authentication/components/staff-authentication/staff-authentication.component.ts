import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, LoginRes} from "../../services/authentican.service";

@Component({
  selector: 'app-staff-authentication',
  templateUrl: './staff-authentication.component.html',
  styleUrls: ['./staff-authentication.component.css']
})
export class StaffAuthenticationComponent implements OnInit {

  private readonly _handleLoginResponseFunction: ((error: string | null) => void) = this.handleLoginResponse;

  private _staffLogin: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  signupMode: boolean = false;
  modeClass = "sign-up-mode";

  hide = true;

  constructor(
    private _authenticationService: AuthService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {}

  toggleMode(toggleSignup: boolean): void {
    this.signupMode = toggleSignup;
  }
  onLoginSubmit(){
    console.log(this._staffLogin.value)
  }

  private handleLoginResponse( error: string | null){
    console.log(error);
  }

  get handleLoginResponseFunction(): (error: string | null) => void{
    return this._handleLoginResponseFunction;
  }

  get staffLogin(): FormGroup {
    return this._staffLogin;
  }

  get authService(){
    return this._authenticationService;
  }
}
