import { Component, OnInit } from '@angular/core';
import {faFacebook, faTwitter, faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  // Font Awesome icons
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faLinkedin = faLinkedin;
  signupMode: boolean = false;
  modeClass = "sign-up-mode";

  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMode(toggleSignup: boolean): void {
    this.signupMode = toggleSignup;
  }

}
