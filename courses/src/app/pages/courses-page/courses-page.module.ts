import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { CoursesPageComponent } from './courses-page.component';
import { CoursesModule } from '../../courses/courses.module';
import { SharedModule } from '../../courses/components/shared.module';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    CoursesModule, 
    SharedModule
  ],
  declarations: [
    CoursesPageComponent
  ],
  exports: [
    CoursesPageComponent
  ],
  providers: [],
})
export class CoursesPageModule { }
