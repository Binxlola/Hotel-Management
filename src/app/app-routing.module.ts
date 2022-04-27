import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthenticationComponent} from "./modules/authentication/components/authentication/authentication.component";
import {ModulesGuard} from "./modules/authentication/guards/modules.guard";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: AuthenticationComponent},
  {path: 'staff-login', component: AuthenticationComponent},
  {
    path: "customer",
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
    canLoad: [ModulesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
