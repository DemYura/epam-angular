import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { AuthorizedHttp } from './auth/authorized-http.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { CourseAuthorsControl } from './controls/course-authors.control';
import { CourseDateControl } from './controls/course-date.control';
import { CourseDurationControl } from './controls/course-duration.control';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent,
    LoadingComponent,
    CourseAuthorsControl,
    CourseDateControl,
    CourseDurationControl
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    LoadingComponent,
    CourseAuthorsControl,
    CourseDateControl,
    CourseDurationControl
  ],
  providers: [ 
    AuthService,
    AuthGuard,
    {
      provide: AuthorizedHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions, authService: AuthService) => {
        return new AuthorizedHttp(backend, options, authService);
      },
      deps: [XHRBackend, RequestOptions, AuthService]
    },
    LoadingService,
  ]
})
export class SharedModule { }
