import { Component } from '@angular/core';

import '../../../../assets/css/styles.css';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { 
  userName = "Admin"
}
