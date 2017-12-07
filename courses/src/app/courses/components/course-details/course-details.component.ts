import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../course';

import '../../../../assets/css/styles.css';


@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent { 
    @Input() course: Course;
    @Output("onDelete") onDeleteEmitter = new EventEmitter<number>(); 

    computeDurationLabel(minutes: number) {
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours}h ${minutes % 60}min`;
        } else {
            return `${minutes % 60}min`;
        }
    }

    deleteCourse(courseId: number) {
        this.onDeleteEmitter.emit(courseId);
    }
}
