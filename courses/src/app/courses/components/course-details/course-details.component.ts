import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../course';
import { CourseBorderDirective } from '../../directives/course-border.directive';
import { CourseDurationPipe } from '../../pipes/course-duration.pipe';

import '../../../../assets/css/styles.css';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent { 
    @Input() course: Course;
    @Output("onDelete") onDeleteEmitter = new EventEmitter<number>(); 

    deleteCourse(courseId: number) {
        this.onDeleteEmitter.emit(courseId);
    }
}
