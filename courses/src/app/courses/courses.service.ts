import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendCourse } from './course.backend';
import { LoadingService } from './components/loading/loading.service';


@Injectable()
export class CoursesService {
  private coursesSubject: BehaviorSubject<BackendCourse[]> = new BehaviorSubject([]);
  private nextId = 1;
  
  constructor(private loadingService: LoadingService) {
    const nowDate = new Date();
    this.addCourseWithDetails(
        'Video course 1', this.getDescription(), 88, nowDate.getTime(), true);
    this.addCourseWithDetails(
        'Video course 2', 
        this.getDescription(), 
        15,
        new Date().setDate(nowDate.getDate() + 1),
        false);
    this.addCourseWithDetails(
        'Video course 3', 
        this.getDescription(), 
        135, 
        new Date().setDate(nowDate.getDate() - 15), 
        false);
  }

  public listCourses(): Observable<Course[]> {
    // map backend courses to frontend courses model with loading + delay
    return this.coursesSubject.map(backendCourses => {
        this.loadingService.show();
        return backendCourses;
    }).delay(1000).map(backendCourses => {
        this.loadingService.hide();
        return backendCourses.map(backendCourse => {
            return this.toFrontendCourse(backendCourse)
        })
    });
  }

  private toFrontendCourse(backendCourse: BackendCourse) {
    return {
      id: backendCourse.id,
      duration: backendCourse.duration,
      creationDate: backendCourse.date,
      name: backendCourse.name,
      description: backendCourse.description,
      topRated: backendCourse.topRated
    };
  }

  public addCourse(course: Course): void {
    this.addCourseWithDetails(
        course.name, course.description, course.duration, Date.now(), false);
  }

  public addCourseWithDetails(
      name: string, 
      description: string, 
      duration: number, 
      creationDate: number,
      topRated: boolean): void {
    const coursesArray = this.coursesSubject.getValue();
    coursesArray.push({
      id: this.nextId++,
      name: name,
      duration: duration,
      date: creationDate,
      description: description,
      topRated: topRated,
    });
    this.coursesSubject.next(coursesArray);
  }

  public updateCourse(courseWithNewData: Course): void {
    const coursesArray = this.coursesSubject.getValue();
    coursesArray.forEach(course => {
      if (course.id === courseWithNewData.id) {
        course.name = courseWithNewData.name;
        course.description = courseWithNewData.description;
        course.duration = courseWithNewData.duration;
      }
    });
    this.coursesSubject.next(coursesArray);
  }

  public getCourse(courseId: number): Observable<Course> {
    const foundCourses = 
        this.coursesSubject.getValue().filter(course => course.id === courseId);
    if (foundCourses.length != 1) {
      throw new Error(
          `${foundCourses.length} courses found with id=${courseId}`);
    }
    return Observable.of(this.toFrontendCourse(foundCourses[0]));
  }

  public deleteCourse(courseId: number): void {
    this.coursesSubject.next(
        this.coursesSubject.getValue().filter(course => course.id !== courseId));
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