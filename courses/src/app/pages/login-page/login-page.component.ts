import { Component } from '@angular/core';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';

import '../../../assets/css/styles.css';
import { AuthService } from '../../courses/components/auth/auth.service';
import { Router } from '@angular/router';
import { AppState, getAuthError } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { LoginRequestedAction } from '../../courses/actions/auth.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent { 
  public user = {
    login:'', 
    password:''
  };

  public authError$: Observable<string>;

  constructor(public store:Store<AppState>) { 
    this.authError$ = store.select(getAuthError);
  }

  public authenticate(): void {
    this.store.dispatch(new LoginRequestedAction({
        login: this.user.login, 
        password: this.user.password
      }));
  }
}
