import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState, getIsAuthenticated } from '../../../store/reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    const observable = this.store.select(getIsAuthenticated); 
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    })
    return observable;
  }

}