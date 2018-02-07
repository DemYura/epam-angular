import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Course } from '../../courses/course';
import { CoursesService } from '../../courses/courses.service';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';
import { ToolboxComponent } from '../../courses/components/toolbox/toolbox.component';
import { CourseDetailsComponent } from '../../courses/components/course-details/course-details.component';

import '../../../assets/css/styles.css';
import { CoursesOrderByDatePipe } from '../../courses/pipes/courses-order-by-date.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'courses-page',
  templateUrl: './courses-page.component.html',
  styles: [':host {display: block; margin: auto; width: 80%;}'],
})
export class CoursesPageComponent implements OnInit { 
  public pageSize = 5;  
  public pageNumber = 0;
  public courses$: Observable<Course[]>;
  public searchCriteriaSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  public pageSubject$: Subject<number> = new Subject();
  public deleteCourseSubject$: Subject<number> = new Subject();
  @Output("onAddCourse") onAddEmitter = new EventEmitter<void>(); 

  constructor(
      public coursesService:CoursesService) {
      
  }

  ngOnInit() {
    this.deleteCourseSubject$
        .subscribe(courseId => 
            this.coursesService.deleteCourse(courseId)
                .subscribe(() => this.pageSubject$.next(this.pageNumber))
        )

    this.courses$ = 
        this.searchCriteriaSubject$
            .map(criteria => { 
                this.pageNumber = 0;
                return {criteria: criteria, start: 0}
            })
        .merge(this.pageSubject$
            .map(pageNumber => {
                this.pageNumber = pageNumber;
                return { 
                    criteria: this.searchCriteriaSubject$.getValue(), 
                    start: pageNumber * this.pageSize
                }
            }))
        .mergeMap(
            (params: {criteria: string, start: number}) => 
                this.coursesService.listCoursesPage(
                    params.start, this.pageSize, params.criteria)
        )
        .share();
  }
}
