import { LogoutCompletedAction } from './../actions/auth.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { AuthService } from './../components/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as auth from './../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private router: Router
    ) { }

    @Effect()
    loginAction$: Observable<Action> = this.actions$
        .ofType(auth.AuthActionTypes.LOGIN_REQUESTED)
        .map((action:auth.LoginRequestedAction) => action.payload)
        .switchMap(payload => 
            this.authService.login(payload.login, payload.password))
        .map(res => {
            if (res) {
                return new auth.AuthenticatedAction({
                    token: this.authService.tokenSubject$.getValue()
                });
            } else {
                return new auth.AuthErrorAction({
                    error: this.authService.authErrorSubject$.getValue()
                });
            }
        })
        .do(() => this.router.navigate(['/courses']))
        .catch((error) => Observable.of(new auth.AuthErrorAction({error: error})));

    @Effect()
    getUserDataAction$: Observable<Action> = this.actions$
        .ofType(auth.AuthActionTypes.USER_INFO_REQUESTED)
        .switchMap(() => this.authService.getUserName())
        .map(userName => {
            if (userName) {
                return new auth.AuthenticatedCompletedAction({
                    authenticated: true, userName: userName
                });
            } else {
                return new auth.AuthErrorAction({
                    error: this.authService.authErrorSubject$.getValue()
                });
            }
        })
        .do(() => this.router.navigate(['/courses']))
        .catch((error) => Observable.of(new auth.AuthErrorAction({error: error})));
    

    @Effect()
    logoutAction$: Observable<Action> = this.actions$
        .ofType(auth.AuthActionTypes.LOGOUT_REQUESTED)
        .do(payload => this.authService.logout())
        .map(res => (new auth.LogoutCompletedAction()))
        .do(() => this.router.navigate(['/']))
        .catch((error) => Observable.of(new auth.AuthErrorAction({error: error})));
}