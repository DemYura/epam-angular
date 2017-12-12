import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
 
  public login(userName: string, password: string): void {
    localStorage.setItem('userName', userName);
    console.log('Successfully logged in!');
  }

  public logout(): void {
    localStorage.removeItem('userName');
    console.log('Successfully logged out!');
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getUserName());
  }

  public getUserName(): string {
    return localStorage.getItem('userName');
  }
}
