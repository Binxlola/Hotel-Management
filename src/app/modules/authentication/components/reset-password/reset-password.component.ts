import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/authentican.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {of} from "rxjs";

export interface DialogData {
  id: string | null;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private readonly _usernameControl : FormControl;
  private readonly _passwordControl : FormControl;


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authenticationService: AuthService,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private _route: ActivatedRoute
  ) {
    this._usernameControl = new FormControl('', [Validators.required]);
    this._passwordControl = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
  }


  public resetPassword(isNewReset: boolean): void{
    const control: FormControl = isNewReset ? this._usernameControl : this._passwordControl;
    if(control.valid) {
      this._authenticationService.resetPassword({
        value: control!.value,
        resetID: this._data.id,
        isNewReset
      }).subscribe({
        complete : () => {alert("complete")}
      });
    }
  }

  get data(): DialogData {
    return this._data;
  }

  get usernameControl(): FormControl {
    return this._usernameControl;
  }

  get passwordControl(): FormControl {
    return this._passwordControl;
  }

}
