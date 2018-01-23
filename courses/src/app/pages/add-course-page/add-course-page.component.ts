import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Course } from '../../courses/course';
import { CoursesService } from '../../courses/courses.service';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';
import { ToolboxComponent } from '../../courses/components/toolbox/toolbox.component';
import { CourseDetailsComponent } from '../../courses/components/course-details/course-details.component';

import '../../../assets/css/styles.css';
import { CoursesOrderByDatePipe } from '../../courses/pipes/courses-order-by-date.pipe';
import { CourseSearchPipe } from '../../courses/pipes/course-search.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
})
export class AddCoursePageComponent { 
  public course:Course = {
      id:0, 
      name:'', 
      creationDate: 0, 
      description: '', 
      duration: 0, 
      topRated: false
  };

  @Output("onCancelAdding") onCancelEmitter = new EventEmitter<void>(); 
    
  constructor(public coursesService:CoursesService) {    
  }
}
