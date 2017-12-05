import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { HeaderComponent } from './courses/components/header/header.component';
import { FooterComponent } from './courses/components/footer/footer.component';
import { ToolboxComponent } from './courses/components/toolbox/toolbox.component';
import { CourseDetailsComponent } from './courses/components/course-details/course-details.component';

@NgModule({
  imports: [
    BrowserModule, FormsModule
  ],
  declarations: [
    AppComponent,
    CoursesPageComponent, 
    HeaderComponent, 
    FooterComponent,
    ToolboxComponent, 
    CourseDetailsComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
