import { Component } from '@angular/core';
import { HeaderComponent } from '../../courses/components/header/header.component';
import { FooterComponent } from '../../courses/components/footer/footer.component';

import '../../../assets/css/styles.css';
import { AuthService } from '../../courses/components/auth/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent { 
  private login: string;
  private password: string;

  constructor(private authService: AuthService) {

  }

  private authenticate(): void {
    this.authService.login(this.login, this.password);
  }
}
