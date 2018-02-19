import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../course';
import { CourseBorderDirective } from '../../directives/course-border.directive';
import { CourseDurationPipe } from '../../pipes/course-duration.pipe';

import '../../../../assets/css/styles.css';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent { 
    @Input() course: Course;
    @Output("onDelete") onDeleteEmitter = new EventEmitter<number>(); 
    @Output("onEdit") public onEditEmitter = new EventEmitter<Course>();

    deleteCourse(courseId: number) {
        this.onDeleteEmitter.emit(courseId);
    }
}
