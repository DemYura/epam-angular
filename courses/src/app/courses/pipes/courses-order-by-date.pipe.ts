import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course';

@Pipe({ name: 'coursesByDateSort' })
export class CoursesOrderByDatePipe implements PipeTransform {
  transform(courses: Array<Course>) {
    if (courses) {
      courses.sort((a: Course, b: Course) => {
          if (b.creationDate < a.creationDate) {
            return -1;
          } else if (b.creationDate > a.creationDate) {
            return 1;
          } else {
            return 0;
          }
        });
    }
    return courses;
  }
}