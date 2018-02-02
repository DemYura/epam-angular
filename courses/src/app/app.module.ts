import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesPageModule } from './pages/courses-page/courses-page.module';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { SharedModule } from './courses/components/shared.module';
import { AddCoursePageModule } from './pages/add-course-page/add-course-page.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule, 
    CoursesPageModule, 
    AddCoursePageModule,
    LoginPageModule, 
    SharedModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
