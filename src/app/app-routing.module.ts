import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthenticationComponent} from "./modules/authentication/components/authentication/authentication.component";
import {CustomerModule} from "./modules/customer/customer.module";
import {CustomerDashboardComponent} from "./modules/customer/customer-dashboard.component";
import {StaffAuthenticationComponent} from "./modules/authentication/components/staff-authentication/staff-authentication.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'dashboard',
    component: CustomerDashboardComponent
  },
  {
    path: 'staff-login',
    component:StaffAuthenticationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
