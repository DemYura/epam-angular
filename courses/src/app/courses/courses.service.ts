import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendCourse } from './course.backend';
import { LoadingService } from './components/loading/loading.service';
import { Http, RequestOptions, RequestMethod, URLSearchParams, Request } from '@angular/http';
import { AuthorizedHttp } from './components/auth/authorized-http.service';


@Injectable()
export class CoursesService {
  private baseUrl: string;
  
  constructor(
      private loadingService: LoadingService,
      private http: AuthorizedHttp) {
    this.baseUrl = 'http://localhost:3004'; 
  }

  public listCoursesPage(startIndex: number, count: number, searchCriteria: string): Observable<Course[]> {
    const requestOptions = new RequestOptions();
    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Get;
    const params = new URLSearchParams();
    params.set('start', String(startIndex));
    params.set('count', String(count));
    params.set('search', searchCriteria);
    requestOptions.params = params;

    this.loadingService.show()

    return this.http.request(new Request(requestOptions))
        .map(backendCourses => {
            this.loadingService.hide();
            return (<BackendCourse[]>backendCourses.json())
                .map(backendCourse => this.toFrontendCourse(backendCourse))
        });
  }

  private toFrontendCourse(backendCourse: BackendCourse): Course {
    return {
      id: backendCourse.id,
      duration: backendCourse.length,
      creationDate: Date.parse(backendCourse.date),
      name: backendCourse.name,
      description: backendCourse.description,
      topRated: backendCourse.isTopRated
    };
  }

  public deleteCourse(courseId: number): Observable<any> {
    this.loadingService.show();

    return this.http.delete(`${this.baseUrl}/courses/${courseId}`)
        .map((result) => {
          this.loadingService.hide();
          return result;
        });
  }
}