import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule,
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent,
    LoadingComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    LoadingComponent,
  ],
  providers: [ 
    AuthService,
    LoadingService 
  ]
})
export class SharedModule { }
