import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  selector: 'courses-page',
  templateUrl: './courses-page.component.html',
  providers: [CourseSearchPipe],
  styles: [':host {display: block; margin: auto; width: 80%;}'],
})
export class CoursesPageComponent implements OnInit { 
  public courses$: Observable<Course[]>;
  public searchCriteriaSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  @Output("onAddCourse") onAddEmitter = new EventEmitter<void>(); 

  constructor(
      public coursesService:CoursesService, 
      public courseSearchPipe:CourseSearchPipe) {
      
  }

  ngOnInit() {
    this.courses$ = 
        this.searchCriteriaSubject$
            .flatMap(
                criteria => 
                    this.coursesService.listCourses()
                        .map(courses => 
                            this.courseSearchPipe
                                .transform(courses, criteria)
                                // filter the result by date
                                .filter((course: Course) => {
                                    const currentDate = new Date();
                                    const lastTwoWeeks = new Date();
                                    lastTwoWeeks.setDate(currentDate.getDate() - 14);
                                    return new Date(course.creationDate) > lastTwoWeeks;
                                })
                        )
        );
  }

  private deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId);
  }
}
