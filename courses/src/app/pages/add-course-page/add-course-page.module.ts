import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { CoursesModule } from '../../courses/courses.module';
import { SharedModule } from '../../courses/components/shared.module';
import { AddCoursePageComponent } from './add-course-page.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    CoursesModule, 
    SharedModule
  ],
  declarations: [
    AddCoursePageComponent
  ],
  exports: [
    AddCoursePageComponent
  ],
  providers: [],
})
export class AddCoursePageModule { }
