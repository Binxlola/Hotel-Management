import {Injectable} from '@angular/core';
import {catchError, lastValueFrom, mapTo, Observable, of, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Billable, BillableCategory, BillableGroup, Customer, Room, Staff} from "../../../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly STAFF_URL: string = `${environment.API_URL}/staff`;
  private readonly USERS_URL: string = `${environment.API_URL}/customer`;
  private readonly BOOKING_URL: string = `${environment.API_URL}/booking`;

  constructor(private http: HttpClient) {}

  /**
   * Queries the backend API to retrieve all existing customers
   */
  public getAllCustomers = async (): Promise<Customer[]> =>
    await lastValueFrom(
      this.http.get<Customer[]>(`${this.USERS_URL}/all-customers`).pipe(
        catchError(this.handleError)
      )
    );

  /**
   * Queries the backend API to retrieve all existing customers
   */
  public getAllStaff = async (): Promise<Staff[]> =>
    await lastValueFrom(
      this.http.get<Staff[]>(`${this.STAFF_URL}/all-staff`).pipe(
        catchError(this.handleError)
      )
    );

  /**
   * Post a staff document ID to the backend API for deletion.
   * Will return a boolean representing the process status
   * @param staffID The document ID of the staff that is being deleted
   */
  public deleteStaff = (staffID: string): Observable<boolean> =>
    this.http.post<boolean>(`${this.STAFF_URL}/delete-staff`, {id: staffID}).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Queries the backend API to retrieve all existing and active billable categories
   */
  public getAllBillableCategories = async (): Promise<BillableCategory[]> =>
    await lastValueFrom(
      this.http.get<BillableCategory[]>(`${this.STAFF_URL}/all-billable-categories`).pipe(
        catchError(this.handleError)
      )
    );

  /**
   * Queries the backend API to retrieve all existing and active billable categories
   */
  public getAllBillableGroups = async (): Promise<BillableGroup[]> =>
    await lastValueFrom(
      this.http.get<BillableGroup[]>(`${this.STAFF_URL}/all-billable-groups`).pipe(
        catchError(this.handleError)
      )
    );

  /**
   * Saves a new billable category to the database
   * @param name The name of the new category being saved
   */
  public saveBillableCategory = (name: string): Observable<boolean> =>
    this.http.post<boolean>(`${this.STAFF_URL}/save-billable-category`, {categoryName: name}).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Saves a new billable category to the database
   * @param billable The name of the new category being saved
   */
  public saveBillable = (billable: Billable): Observable<boolean> =>
    this.http.post<boolean>(`${this.STAFF_URL}/save-billable`, billable).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Posts a billable ID to the backend API for deletion.
   * Will return a boolean representing process status
   * @param billableID The ID of the billable to be deleted
   */
  public deleteBillable = (billableID: string): Observable<boolean> =>
    this.http.post<boolean>(`${this.STAFF_URL}/delete-billable`, {id: billableID}).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Post a billable group object to the backend API for deletion.
   * Will returns a boolean representing the process status
   * @param group
   */
  public deleteBillableGroup = (group: BillableGroup): Observable<boolean> =>
    this.http.post<boolean>(`${this.STAFF_URL}/delete-billable-group`, group).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  /**
   * Queries the backend API to retrieve all existing customers
   */
  public getAllStaffRoles = async (): Promise<String[]> =>
    await lastValueFrom(
      this.http.get<String[]>(`${this.STAFF_URL}/all-staff-roles`).pipe(
        catchError(this.handleError)
      )
    );

  public saveOrUpdateStaff = (staff: Staff, staffID: string | undefined): Observable<boolean> =>
    this.http.post<boolean>(`${this.STAFF_URL}/save-update-staff`, {staff, staffID}).pipe(
      mapTo(true),
      catchError((error, caught) => {
        this.handleError(error, caught);
        return of(false);
      })
    );

  private handleError(error: HttpErrorResponse, caught: Observable<any>) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
