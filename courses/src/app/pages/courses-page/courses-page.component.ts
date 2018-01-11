import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'courses-page',
  templateUrl: './courses-page.component.html',
  providers: [CourseSearchPipe],
  styles: [':host {display: block; margin: auto; width: 80%;}'],
})
export class CoursesPageComponent implements OnInit { 
  public courses$: Observable<Course[]>;
  public searchCriteriaSubject$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
      public coursesService:CoursesService, 
      public courseSearchPipe:CourseSearchPipe) {
      
  }

  ngOnInit() {
    this.courses$ = 
        this.searchCriteriaSubject$
            .flatMap(
                criteria => 
                    this.coursesService.listCourses().pipe(
                        map(courses => this.courseSearchPipe.transform(courses, criteria)))
        );
  }

  private deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId);
  }
}
