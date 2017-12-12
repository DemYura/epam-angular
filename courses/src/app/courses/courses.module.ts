import 'bootstrap/dist/css/bootstrap.css';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SharedModule } from './components/shared.module';

import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesService } from './courses.service';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' 
    })
  ],
  declarations: [
    ToolboxComponent, 
    CourseDetailsComponent
  ],
  exports: [
    ToolboxComponent, 
    CourseDetailsComponent
  ],
  providers: [ CoursesService ]
})
export class CoursesModule { }
