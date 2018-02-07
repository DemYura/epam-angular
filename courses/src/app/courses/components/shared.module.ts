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
