import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private authDetails: BehaviorSubject<AuthDetails> = 
      new BehaviorSubject({userName: '', password: ''});  
 
  public login(userName: string, password: string): void {
    this.authDetails.next({userName: userName, password: password});
    console.log('Successfully logged in!');
  }

  public logout(): void {
    this.authDetails.next({userName: '', password: ''});
    console.log('Successfully logged out!');
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authDetails.map(userDetails => Boolean(userDetails.userName));
  }

  public getUserName(): Observable<string> {
    return this.authDetails.map(userDetails => 
        userDetails ? userDetails.userName : null);
  }
}

interface AuthDetails {
    userName: string,
    password: string,
}
