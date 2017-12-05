import { Component } from '@angular/core';
import { Course } from '../../courses/course';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';
import { ToolboxComponent } from '../../courses/components/toolbox/toolbox.component';
import { CourseDetailsComponent } from '../../courses/components/course-details/course-details.component';

import '../../../assets/css/styles.css';

@Component({
  selector: 'courses-page',
  templateUrl: './courses-page.component.html',
  styles: [':host {display: block; margin: auto; width: 80%;}'],
})
export class CoursesPageComponent { 
  courses: Array<Course>;

  constructor() {
    this.courses = [];
  }

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        name: 'Video course 1',
        duration: 88,
        creationDate: Date.now(),
        description: this.getDescription()
      },
      {
        id: 2,
        name: 'Video course 2',
        duration: 15,
        creationDate: Date.now(),
        description: this.getDescription()
      },
      {
        id: 3,
        name: 'Video course 3',
        duration: 135,
        creationDate: Date.now(),
        description: this.getDescription()
      },
    ];
  }

  deleteCourse(courseId: number) {
    console.log(`Deleting course with id ${courseId}`);
  }

  getDescription() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
        deserunt mollit anim id est laborum.`;
  }
}
