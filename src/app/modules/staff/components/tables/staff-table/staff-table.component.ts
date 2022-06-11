import {Component, Input} from '@angular/core';
import {Staff} from "../../../../../shared/interfaces";
import {StaffService} from "../../../services/staff/staff-service.service";
import {Required} from "../../../../../decorators/required-input.decorator";
import {AuthService} from "../../../../authentication/services/authentican.service";

@Component({
  selector: 'staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.css']
})
export class StaffTableComponent {

  @Input() @Required
  public editStaffFunction!: ((staff: Staff) => void);

  private _staff: Staff[] = [];
  private readonly _displayedColumns: string[] = ['name', 'role'];
  private readonly _adminOnlyColumns: string[] = ["edit_action", "remove_action"];

  constructor(private _staffService: StaffService, private _authService: AuthService) {
    this.updateStaff();
    if(this.isAdmin) this._displayedColumns = [...this._displayedColumns, ...this._adminOnlyColumns];
  }

  public updateStaff(): void {
    this._staffService.getAllStaff()
      .then(staff => this._staff = [...staff]);
  }

  public deleteStaff(id: string): void {
    this._staffService.deleteStaff(id).subscribe(
      res => this.updateStaff()
    )
  }

  get staff(): Staff[] {
    return this._staff;
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  get isAdmin(): boolean {
    return this._authService.isAdmin;
  }

}
