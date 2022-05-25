import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../services/staff/staff-service.service";
import {map, Observable, startWith} from "rxjs";
import {FormBuilder, FormControl, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Billable, BillableCategory, BillableGroup} from "../../../../shared/interfaces";

@Component({
  selector: 'billable-overview-card',
  templateUrl: './billable-overview-card.component.html',
  styleUrls: ['./billable-overview-card.component.css'],
})
export class BillableOverviewCardComponent implements OnInit {

  private _billableGroups: BillableGroup[] = [];

  private _selectedCategory: BillableCategory | undefined;
  private _categoryOptions: BillableCategory[] = [];
  private _filteredCategoryOptions: Observable<BillableCategory[]> | undefined;

  private readonly _newCategoryControl: FormControl = new FormControl('', [Validators.required]);
  private readonly _billableDetails: FormGroup = this.fb.group({
    category: ["", Validators.required],
    name: ["", Validators.required],
    cost: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
  });

  constructor(private fb: FormBuilder, private _staffService: StaffService) {
    this.updateBillableData();
  }

  ngOnInit(): void {
    // Subscribe to customer control change to apply filters to auto complete
    this._filteredCategoryOptions = this._billableDetails.get("category")!.valueChanges.pipe(
      startWith(''),
      map((value: string | BillableCategory) => this._filter(value)),
    );

    // Subscribe to the customer control state change, to account for a valid selection that is manually typed
    this._billableDetails.get("category")!.statusChanges.subscribe(
      (status: FormControlStatus) => {
        if(status === "INVALID") this._selectedCategory = undefined;
        else if(status === "VALID" && !this._selectedCategory) {
          this._selectedCategory = this._categoryOptions.find((option: BillableCategory) => option.name == this._billableDetails.get("category")!.value);
        }
      }
    )
  }

  /**
   * Filter the options to be displayed in the customer auto complete form control
   * @param value The value that is being used for filtering
   */
  private _filter(value: string | BillableCategory): BillableCategory[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.name;
    return this._categoryOptions.filter((option: BillableCategory) => option.name.toLowerCase().includes(filterValue));
  }

  /**
   * Keep track of the room selected for a new booking
   * @param event The option select event, used to get the selected value
   */
  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this._selectedCategory = event.option.value;
  }

  private updateBillableData(): void{
    this._staffService.getAllBillableCategories()
      .then(categories => this._categoryOptions = categories);

    this._staffService.getAllBillableGroups()
      .then(billableGroups => this._billableGroups = billableGroups)

  }


  /**
   * Takes the value of the new category form field and passes it to the staff service,
   * to make an API call which will attempt to save the new category
   */
  public saveNewCategory(): void {
    this._staffService.saveBillableCategory(this._newCategoryControl.value).subscribe(
      res => {
        if(res) this.updateBillableData();
        alert(res ? "Category saved": "Unable to save category");
      }
    )

    this._newCategoryControl.reset();
  }

  /**
   * Builds a new billable data object and passes it to the staff service.
   * The service will make a request to the backend to save the new billable.
   * Notify the user of save status and reset the form
   */
  public saveNewBillable(): void {
    const billable: Billable = {
      category: this._selectedCategory!._id,
      name: this._billableDetails.get("name")!.value,
      cost: Number(this.billableDetails.get("cost")!.value)
    }

    this._staffService.saveBillable(billable).subscribe(
      res => {
        if(res) this.updateBillableData();
        alert(res ? "Billable saved" : "Unable to save billable");
      }
    )

    this._billableDetails.reset();
  }

  /**
   * Uses the staff service to communicate a billable deletion
   * @param billable The billable to be deleted
   */
  public deleteBillable(billable: Billable): void {
    if(confirm("Are you sure you want to delete " + billable.name)) {
      this._staffService.deleteBillable(billable._id!).subscribe(
        res => {
          if(res) this.updateBillableData();
          alert(res ? "Billable deleted" : "Unable to delete billable");
        }
      )
    }
  }

  public deleteBillableGroup(group: BillableGroup): void {
    if(confirm("Are you sure you want to delete " + group.category.name)) {
      this._staffService.deleteBillableGroup(group).subscribe(
        res => {
          if(res) this.updateBillableData();
          alert(res ? "Group and all group items deleted" : "Unable to delete group and item");
        }
      )
    }
  }

  //    ==== GETTERS && SETTERS ====
  get billableGroups(): BillableGroup[] {
    return this._billableGroups;
  }

  get newCategoryControl(): FormControl {
    return this._newCategoryControl;
  }

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
