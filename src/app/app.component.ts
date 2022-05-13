import {Component, OnInit} from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  Required(target: object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        throw new Error(`Attribute ${propertyKey} is required`);
      },
      set(value) {
        Object.defineProperty(target, propertyKey, {
          value,
          writable: true,
          configurable: true,
        });
      },
      configurable: true
    });
  }

}
