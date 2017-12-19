import { Component } from '@angular/core';
import { Course } from '../../courses/course';
import { CoursesService } from '../../courses/courses.service';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';
import { ToolboxComponent } from '../../courses/components/toolbox/toolbox.component';
import { CourseDetailsComponent } from '../../courses/components/course-details/course-details.component';

import '../../../assets/css/styles.css';
import { CoursesOrderByDatePipe } from '../../courses/pipes/courses-order-by-date.pipe';
import { CourseSearchPipe } from '../../courses/pipes/course-search.pipe';

@Component({
  selector: 'courses-page',
  templateUrl: './courses-page.component.html',
  providers: [CourseSearchPipe],
  styles: [':host {display: block; margin: auto; width: 80%;}'],
})
export class CoursesPageComponent { 
  courses: Array<Course>;

  constructor(
      private coursesService:CoursesService, 
      private courseSearchPipe:CourseSearchPipe) {
    this.courses = [];
  }

  ngOnInit() {
    this.updateCoursesList();
  }

  private onSearchCriteriaChanged(criteria: string): void {
    this.courses = this.courseSearchPipe.transform(
        this.coursesService.listCourses(), criteria);
  }

  private updateCoursesList(): void {
    this.courses = this.coursesService.listCourses(); 
  }

  private deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId);
    this.updateCoursesList();
  }
}
