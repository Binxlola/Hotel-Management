import {Component, Inject, OnInit} from '@angular/core';
import {Room, Staff} from "../../../../../shared/interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StaffService} from "../../../services/staff/staff-service.service";

export interface staffFormData {
  staff: Staff;
}

@Component({
  selector: 'staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {

  private readonly _isEdit: boolean = false;
  private readonly _staff: Staff | undefined;
  private readonly _staffFormGroup: FormGroup;

  private _staffRoles: String[] = [];

  constructor(
    private _dialogRef: MatDialogRef<StaffFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: staffFormData,
    private fb: FormBuilder,
    private _staffService: StaffService
  ) {
    this._staff = this._data.staff;

    // Staff data was passed in, so we are updating an existing staff
    if (this._staff) this._isEdit = true;
    this.updateStaffRoles();

    this._staffFormGroup = this.fb.group({
      firstName: [{value: this._staff ? this._staff?.first_name : "", disabled: this._isEdit}, Validators.required],
      lastName: [this._staff ? this._staff?.last_name : "", Validators.required],
      staffRole: [this._staff ? this._staff?.role : "", Validators.required],
      email: [this._staff ? this._staff?.email : "", Validators.required],
      mobile: [{value: this._staff ? this._staff?.mobile : "", disabled: this._isEdit}, Validators.required],
      taxCode: [{value: this._staff ? this._staff?.taxCode : "", disabled: this._isEdit}, Validators.required]
    })
  }

  private updateStaffRoles(): void {
    this._staffService.getAllStaffRoles()
      .then((res: String[]) => this._staffRoles = res);
  }

  get staff(): Staff | undefined {
    return this._staff;
  }

  get staffRoles(): String[] {
    return this._staffRoles;
  }

  get staffFormGroup(): FormGroup {
    return this._staffFormGroup
  }

  get dialogRef(): MatDialogRef<StaffFormComponent> {
    return this._dialogRef;
  }

  ngOnInit(): void {
  }

  public saveStaff(): void {
  }

  public updateStaff(): void {
  }

}
