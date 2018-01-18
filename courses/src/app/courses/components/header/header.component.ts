import { Component } from '@angular/core';

import '../../../../assets/css/styles.css';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { 
  private userName: string;

  constructor(public authService: AuthService) {
    this.userName = authService.getUserName();
  }

  public logoutClicked(): void {
    this.authService.logout();
  }
}
