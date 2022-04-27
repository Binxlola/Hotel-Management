import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from "./customer-dashboard.component";
import {ModulesGuard} from "../authentication/guards/modules.guard";


const routes: Routes = [
  {path: 'customer', component: CustomerDashboardComponent, canActivate: [ModulesGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
