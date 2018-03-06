import 'bootstrap/dist/css/bootstrap.css';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SharedModule } from './components/shared.module';

import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesService } from './courses.service';
import { CourseBorderDirective } from './directives/course-border.directive';
import { CourseDurationPipe } from './pipes/course-duration.pipe';
import { CoursesOrderByDatePipe } from './pipes/courses-order-by-date.pipe';
import { CourseSearchPipe } from './pipes/course-search.pipe';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' 
    }),
  ],
  declarations: [
    ToolboxComponent, 
    CourseDetailsComponent,
    CourseBorderDirective,
    CourseDurationPipe,
    CoursesOrderByDatePipe,
    CourseSearchPipe,
  ],
  exports: [
    ToolboxComponent, 
    CourseDetailsComponent,
    CourseBorderDirective,
    CourseDurationPipe,
    CoursesOrderByDatePipe,
    CourseSearchPipe,
  ],
  providers: [ CoursesService ]
})
export class CoursesModule { }
