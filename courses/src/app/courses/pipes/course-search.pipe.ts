import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course';

@Pipe({
  name : 'courseSearch',
})
export class CourseSearchPipe implements PipeTransform {
  public transform(courses: Array<Course>, input: string) {
    const regExp = new RegExp('\\b' + input, 'gi');
    return courses.filter((item) => {
      return regExp.test(item.name);
    });
  }
}