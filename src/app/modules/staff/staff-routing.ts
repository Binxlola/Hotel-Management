import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModulesGuard} from "../authentication/guards/modules.guard";
import {StaffDashboardComponent} from "./staff-dashboard/staff-dashboard.component";


const routes: Routes = [
  {path: '', component: StaffDashboardComponent, canActivate: [ModulesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
