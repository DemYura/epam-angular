import { AuthState, authInitialState } from './../courses/reducers/auth.reducer';
import * as fromAuth from './../courses/reducers/auth.reducer';
import { createSelector } from 'reselect';

export interface AppState {
  auth: AuthState;
};

export const reducers = {
    auth: fromAuth.authReducer
}

export const initialState: AppState  = {
  auth: authInitialState
}

// AUTH
export const getAuthState = (state: AppState) => state.auth;

export const getUserName = createSelector(getAuthState, fromAuth.getUserName);
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getAuthError = createSelector(getAuthState, fromAuth.getError);