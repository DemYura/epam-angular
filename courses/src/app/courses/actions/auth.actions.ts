import { Action } from '@ngrx/store';
import { type } from '../../store/util';

export const AuthActionTypes = {
    LOGIN_REQUESTED: type("[Auth] -LOGIN Requested-"),
    LOGIN_COMPLETED: type("[Auth] -LOGIN Completed-"),

    USER_INFO_REQUESTED: type("[Auth] -USER_INFO Requested-"),
    USER_INFO_COMPLETED: type("[Auth] -USER_INFO Completed-"),

    LOGOUT_REQUESTED: type("[Auth] -LOGOUT Requested-"),
    LOGOUT_COMPLETED: type("[Auth] -LOGOUT Completed-"),  
  
    AUTH_ERROR: type("[Auth] -Auth Error-")
  };
  
  export class LoginRequestedAction implements Action {
    readonly type = AuthActionTypes.LOGIN_REQUESTED;
  
    constructor(public payload: {login: string, password: string}) {}
  }
  
  export class LoginCompletedAction implements Action {
    readonly type = AuthActionTypes.LOGIN_COMPLETED;
  
    constructor(public payload: {token: string, userName: string}) {}
  }

  export class AuthenticatedAction implements Action {
    readonly type = AuthActionTypes.USER_INFO_REQUESTED;
  
    constructor(public payload: {token?: string}) {}
  }
  
  export class AuthenticatedCompletedAction implements Action {
    readonly type = AuthActionTypes.USER_INFO_COMPLETED;
  
    constructor(public payload: {authenticated: boolean, userName: string}) {}
  }
  
  export class AuthErrorAction implements Action {
    readonly type = AuthActionTypes.AUTH_ERROR;
  
    constructor(public payload: any) {}
  }
  
  export class LogoutRequestedAction implements Action {
    readonly type = AuthActionTypes.LOGOUT_REQUESTED;
  
    constructor(public payload?: null) {}
  }
  
  export class LogoutCompletedAction implements Action {
    readonly type = AuthActionTypes.LOGOUT_COMPLETED;
  
    constructor(public payload?: null) {}
  }

  export type AuthAction =
    | LoginRequestedAction
    | LoginCompletedAction
    | AuthenticatedAction
    | AuthenticatedCompletedAction
    | LogoutRequestedAction
    | LogoutCompletedAction
    | AuthErrorAction;