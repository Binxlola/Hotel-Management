import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { AuthenticationComponent } from './modules/authentication/components/authentication/authentication.component';
import {CustomerModule} from "./modules/customer/customer.module";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GuestLandingComponent } from './guest/guest-landing/guest-landing.component';
import { ResetPasswordComponent } from './modules/authentication/components/reset-password/reset-password.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    GuestLandingComponent,
    ResetPasswordComponent,
  ],

  // added Forms Module and tried Ngbmodule and forms module >> imported this too
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    CustomerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatDialogModule,
    //FormsModule

  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
