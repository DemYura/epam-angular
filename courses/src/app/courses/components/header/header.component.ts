import { Component } from '@angular/core';

import '../../../../assets/css/styles.css';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, NavigationEnd, Event, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getIsAuthenticated, getUserName } from '../../../store/reducers';
import { LogoutRequestedAction } from '../../actions/auth.actions';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { 

  public isAuthenticated$: Observable<boolean>;
  public userName$: Observable<string>;
  public breadcrumbs: Breadcrumb[] = [];

  constructor(
      public store: Store<AppState>,
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
    this.isAuthenticated$ = this.store.select(getIsAuthenticated);
    this.userName$ = this.store.select(getUserName);
  }

  public logoutClicked(): void {
    this.store.dispatch(new LogoutRequestedAction());
  }
}

interface Breadcrumb {
  path: string;
  name: string;
}
