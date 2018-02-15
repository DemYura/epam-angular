import { Component, ViewEncapsulation } from '@angular/core';

import '../assets/css/styles.css';
import { AuthService } from './courses/components/auth/auth.service';
import { LoadingComponent } from './courses/components/loading/loading.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course } from './courses/course';

@Component({
  selector: 'courses-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent { 
  public addingCourse$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private emptyCourse: Course = {
    id:0, 
    name:'', 
    creationDate: 0, 
    description: '', 
    duration: 0, 
    topRated: false,
    authors: [],
  };

  public courseSubject$: Subject<Course> =
     new BehaviorSubject<Course>(this.emptyCourse);
  
  constructor(public authService:AuthService) {

  }

  onAddCourse() {
    this.courseSubject$.next(this.emptyCourse)
    this.addingCourse$.next(true);
  }

  onEditCourse(course: Course) {
    this.courseSubject$.next(course);
    this.addingCourse$.next(true);
  }
}
