import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesPageModule } from './pages/courses-page/courses-page.module';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { SharedModule } from './courses/components/shared.module';
import { AddCoursePageModule } from './pages/add-course-page/add-course-page.module';
import { HttpModule } from '@angular/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './pages/add-course-page/add-course-page.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './courses/components/auth/auth.guard';

import { StoreModule } from '@ngrx/store';
import { EffectsModule, Effect } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { AuthEffects } from './courses/effects/auth.effects';

const ROUTES = [
  {path: '', component: LoginPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'courses', component: CoursesPageComponent, canActivate: [AuthGuard]},
  {path: 'courses/new', component: AddCoursePageComponent, canActivate: [AuthGuard]},
  {path: 'courses/:id', component: AddCoursePageComponent, canActivate: [AuthGuard]},
  {path: '**', component: CoursesPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule, 
    CoursesPageModule, 
    AddCoursePageModule,
    LoginPageModule, 
    SharedModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'Courses DevTools',
    }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
