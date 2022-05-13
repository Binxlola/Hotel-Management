import { Component, OnInit } from '@angular/core';
import {AuthService} from "../authentication/services/authentican.service";

@Component({
  selector: 'staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
