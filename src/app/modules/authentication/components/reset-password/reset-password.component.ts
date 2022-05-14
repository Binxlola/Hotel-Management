import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentican.service";

export interface ResetPasswordResult{
  email: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  private _resetPasswordForm: FormGroup = this.fb.group({
    email: ["", Validators.required],
  });


  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<ResetPasswordComponent, ResetPasswordResult>){

  }

  ngOnInit(): void {
  }

  public resetPassword(): void{
    this.matDialogRef.close({
      email: this._resetPasswordForm.value.email
    })
  }

  get resetPasswordForm(): FormGroup {
    return this._resetPasswordForm;
  }

}
