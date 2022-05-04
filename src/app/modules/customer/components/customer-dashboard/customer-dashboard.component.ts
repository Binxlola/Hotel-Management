import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../authentication/services/authentican.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
