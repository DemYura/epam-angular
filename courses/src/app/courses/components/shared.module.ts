import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseBorderDirective } from '../directives/course-border.directive';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent,
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
  ],
  providers: [ AuthService ]
})
export class SharedModule { }
