import { Component, ViewEncapsulation } from '@angular/core';

import '../assets/css/styles.css';
import { AuthService } from './courses/components/auth/auth.service';
import { LoadingComponent } from './courses/components/loading/loading.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'courses-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent { 
  public addingCourse$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(public authService:AuthService) {

  }
}
