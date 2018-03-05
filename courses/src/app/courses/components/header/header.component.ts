import { Component } from '@angular/core';

import '../../../../assets/css/styles.css';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, NavigationEnd, Event, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { 

  public breadcrumbs: Breadcrumb[] = [];

  constructor(
      public authService: AuthService, 
      private activatedRoute: ActivatedRoute, 
      private router: Router) {  
    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          for (const child of this.activatedRoute.root.children) {
            this.breadcrumbs = child.snapshot.url
              .map((url: UrlSegment, index: number, urls: UrlSegment[]) => ({
                  path: urls.length > 1 ? 
                      urls.slice(0, index + 1)
                          .map(segment => segment.path)
                          .join('/') 
                      : url.path,
                  name: url.path
                })
              );
          }
        });
  }

  public logoutClicked(): void {
    this.authService.logout();
  }
}

interface Breadcrumb {
  path: string;
  name: string;
}
