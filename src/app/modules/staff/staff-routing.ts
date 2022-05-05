import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModulesGuard} from "../authentication/guards/modules.guard";
import {StaffComponent} from "./staff.component";


const routes: Routes = [
  {path: '', component: StaffComponent, canActivate: [ModulesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
