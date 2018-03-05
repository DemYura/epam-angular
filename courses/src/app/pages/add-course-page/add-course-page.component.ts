import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
})
export class AddCoursePageComponent { 
  @Input() public course: Course = {
    id:0, 
    name:'', 
    creationDate: 0, 
    description: '', 
    duration: 0, 
    topRated: false,
    authors: [],
  };;
  public authors$: Observable<string[]>;
  private isNewCourse: boolean;
    
  constructor(
      public coursesService:CoursesService, 
      private router: Router,
      private activatedRoute: ActivatedRoute) { 
    this.authors$ = coursesService.listAuthors();
    this.activatedRoute.url.subscribe(segments => {
        this.isNewCourse = segments.map(segment => segment.path)
            .filter(segment => segment.indexOf('new') >= 0)
            .length > 0;
    });
    this.activatedRoute.params
        .map(param => param.id)
        .filter(id => id != null)
        .switchMap(id => this.coursesService.getById(id))
        .subscribe(course => this.course = course);
  }

  onFormSubmit(form:any) {
    if (form.valid) {
      if (this.isNewCourse) {
        this.coursesService.createCourse(this.course)
        .subscribe(() => this.router.navigate(['courses']));
      } else {
        this.coursesService.updateCourse(this.course)
        .subscribe(() => this.router.navigate(['courses']));
      }
    }
  }

  onCancelClicked() {
    this.router.navigate(['courses']);
  }
}
