import { Component, ViewEncapsulation } from '@angular/core';

import '../assets/css/styles.css';
import { AuthService } from './courses/components/auth/auth.service';
import { LoadingComponent } from './courses/components/loading/loading.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course } from './courses/course';
import { HeaderComponent } from './courses/components/header/header.component';
import { FooterComponent } from './courses/components/footer/footer.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AddCoursePageComponent } from './pages/add-course-page/add-course-page.component';


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
}
