import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService, ResetPasswordError} from "../../services/authentican.service";

export interface ResetPasswordResult{
  username: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  private _resetPasswordForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authenticationService: AuthService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe( params => console.log(params));
  }

  ngOnInit(): void {
  }


  public resetPassword(event: SubmitEvent): void{
    event.preventDefault();

    if(this._resetPasswordForm.valid) {
      this._authenticationService.resetPassword({
        username: this._resetPasswordForm.get('username')!.value
      }).subscribe({
        error : (err: ResetPasswordError) => {alert("Error")},
        complete : () => {alert("complete")}
      });
    }
  }

  get resetPasswordForm(): FormGroup {
    return this._resetPasswordForm;
  }

}
