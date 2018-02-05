import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers, RequestMethod, Request } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private baseUrl: string;
  private authDetails: BehaviorSubject<AuthDetails> = 
      new BehaviorSubject({userName: '', password: ''});  
  public tokenSubject$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:3004';
  }
 
  public login(userName: string, password: string): void {
    const requestOptions = new RequestOptions();
    requestOptions.url = `${this.baseUrl}/auth/login`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.body = { login: userName, password: password };       
    this.http.request(new Request(requestOptions))
        .subscribe(response => {
            if (response) {
              this.tokenSubject$.next(response.json().token);
              const authRequestOptions = new RequestOptions();
              authRequestOptions.url = `${this.baseUrl}/auth/userInfo`;
              authRequestOptions.method = RequestMethod.Post;
              authRequestOptions.headers = new Headers({
                  'Authorization': response.json().token
              });
              this.http.request(new Request(authRequestOptions))
                  .subscribe(userInfoResponse => {
                      if (userInfoResponse) {
                          const name = userInfoResponse.json().name;
                          this.authDetails.next({
                              userName: `${name.first} ${name.last}`, 
                              password: password,
                          });
                          console.log('Successfully logged in!');
                      }
                    },
                    err => console.log(err));
            }
          },
          err => console.log(err));
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
