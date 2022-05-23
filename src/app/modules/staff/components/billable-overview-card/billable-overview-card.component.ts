import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../services/staff/staff-service.service";
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingsTableComponent} from "../../../../shared/components/bookings-table/bookings-table.component";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {BillableCategory, Room} from "../../../../shared/services/booking/booking-service.service";

@Component({
  selector: 'billable-overview-card',
  templateUrl: './billable-overview-card.component.html',
  styleUrls: ['./billable-overview-card.component.css']
})
export class BillableOverviewCardComponent implements OnInit {

  private _selectedCategory: BillableCategory | undefined;
  private _categoryOptions: BillableCategory[] = [];
  private _filteredCategoryOptions: Observable<BillableCategory[]> | undefined;

  private readonly _billableDetails: FormGroup = this.fb.group({
    category: ["", Validators.required],
    name: ["", Validators.required],
    cost: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * Keep track of the room selected for a new booking
   * @param event The option select event, used to get the selected value
   */
  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this._selectedCategory = event.option.value;
  }

  //    ==== GETTERS && SETTERS ====
  get billableDetails(): FormGroup {
    return this._billableDetails;
  }

  get categoryControl(): FormControl {
    return <FormControl>this._billableDetails.get("category")!;
  }

  get filteredCategoryOptions(): Observable<BillableCategory[]> | undefined {
    return this._filteredCategoryOptions;
  }

  public getOptionDisplay(value: BillableCategory): string {
    return value.name;
  }

}
