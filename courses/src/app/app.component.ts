import { Component, ViewEncapsulation } from '@angular/core';

import '../assets/css/styles.css';
import { AuthService } from './courses/components/auth/auth.service';

@Component({
  selector: 'courses-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent { 

  constructor(private authService:AuthService) {

  }
}
