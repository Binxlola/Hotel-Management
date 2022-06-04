export interface Token {
  token: string,
  expiresIn: number
}

export interface LoggedInUser {
  _id: string,
  jwt: Token,
  role: string | undefined
}

export interface Staff {
  _id?: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  mobile: number,
  taxCode: string,
  role: string
}

export interface Customer {
  _id: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  last_logon: Date,
  registration_date: Date
}

export interface Room {
  _id?: string,
  type: string,
  description_short: string,
  description_full: string,
  max_adults: number,
  max_children: number,
  num_available: number,
  base_price: number,
  minCheckIn: string,
  maxCheckIn: string,
  minCheckOut: string,
  maxCheckOut: string,
  checkInOutInterval: number
}

export interface Booking {
  _id?: string,
  user?: string,
  bookingName: string,
  room: string,
  uuid?: string | undefined,
  totalPaid: number,
  checkInDate: Date | string,
  checkOutDate: Date | string,
  checkInTime: string,
  checkOutTime: string,
  numAdults: number,
  numChildren: number,
  comments: string,
}

export interface BillableCategory {
  _id?: string,
  name: string
}

export interface Billable {
  _id?: string,
  category?: string,
  name: string,
  cost: number
}

export interface BillableGroup {
  category: BillableCategory,
  items: Billable[],
}
