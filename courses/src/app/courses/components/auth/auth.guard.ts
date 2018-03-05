import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
        return isAuthenticated;  
    });
  }

}