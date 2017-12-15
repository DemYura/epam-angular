import { Injectable } from '@angular/core';
import { Course } from './course';


@Injectable()
export class CoursesService {
  private courses: Array<Course> = [];
  private nextId = 1;
  
  constructor() {
    this.addCourseWithDetails('Video course 1', this.getDescription(), 88);
    this.addCourseWithDetails('Video course 2', this.getDescription(), 15);
    this.addCourseWithDetails('Video course 3', this.getDescription(), 135);
  }

  public listCourses(): Array<Course> {
    return this.courses.slice();
  }

  public addCourse(course: Course): void {
    this.addCourseWithDetails(
        course.name, course.description, course.duration);
  }

  public addCourseWithDetails(
      name: string, description: string, duration: number): void {
    this.courses.push({
      id: this.nextId++,
      name: name,
      duration: duration,
      creationDate: Date.now(),
      description: description
    });
  }

  public updateCourse(courseWithNewData: Course): void {
    this.courses.forEach(course => {
      if (course.id === courseWithNewData.id) {
        course.name = courseWithNewData.name;
        course.description = courseWithNewData.description;
        course.duration = courseWithNewData.duration;
      }
    });
  }

  public getCourse(courseId: number): Course {
    const foundCourses = this.courses.filter(course => course.id === courseId);
    if (foundCourses.length != 1) {
      throw new Error(
          `${foundCourses.length} courses found with id=${courseId}`);
    }
    return foundCourses[0];
  }

  public deleteCourse(courseId: number): void {
    this.courses = this.courses.filter(course => course.id !== courseId);
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