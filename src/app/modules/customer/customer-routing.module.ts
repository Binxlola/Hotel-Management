import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {ModulesGuard} from "../authentication/guards/modules.guard";


const routes: Routes = [
  {path: '', component: CustomerDashboardComponent, canActivate: [ModulesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
