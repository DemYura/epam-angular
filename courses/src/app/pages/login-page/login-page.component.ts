import { Component } from '@angular/core';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';

import '../../../assets/css/styles.css';
import { AuthService } from '../../courses/components/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, private router: Router) { 
  }

  public authenticate(): void {
    this.authService.login(this.user.login, this.user.password)
        .subscribe(loggedIn => {
          if (loggedIn) {
            this.router.navigate(['courses']);
          }
        });
  }
}
