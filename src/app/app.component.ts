import {Component, OnInit} from '@angular/core';
import {StatusService} from "./modules/shared/status.service";

export interface StatusResponse {
  status: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Hotel-Management';
  status = 'DOWN';

  constructor(private statusService: StatusService) {}

  ngOnInit() {
    this.statusService
      .getStatus()
      .subscribe(response => {
        this.status = response.status;
      });
  }

}
