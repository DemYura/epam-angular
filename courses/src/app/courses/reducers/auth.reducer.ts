import { AuthActionTypes, AuthAction } from '../actions/auth.actions';

export interface AuthState {
    authenticated: boolean;
    loading: boolean;
    error?: string;
    token?: string;  
    userName?: string;
}

export const authInitialState: AuthState = {
    authenticated: false,
    loading: false,
};

export function authReducer(
    state = authInitialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUESTED:
        case AuthActionTypes.LOGOUT_REQUESTED:
        case AuthActionTypes.USER_INFO_REQUESTED: {
            return Object.assign({}, state, {
                loading: true,
            })
        }

        case AuthActionTypes.LOGIN_COMPLETED: {
            return Object.assign({}, state, {
                token: action.payload.token,
                error: null,
            });
        }

        case AuthActionTypes.AUTH_ERROR: {
            return Object.assign({}, state, {
                error: action.payload.error,
                loading: false,
            });
        }

        case AuthActionTypes.USER_INFO_COMPLETED: {
            return Object.assign({}, state, {
                token: action.payload.token,
                userName: action.payload.userName,
                authenticated: true,
                loading: false,
            })
        }

        case AuthActionTypes.LOGOUT_COMPLETED: {
            return Object.assign({}, state, {
                authenticated: false,
                userName: null,
                token: null,
                loading: false,
            });
        }

        default: {
            return state;
        }
    }
}

export const getUserName = (state: AuthState) => state.userName;
export const getIsAuthenticated = (state: AuthState) => state.authenticated;
export const getError = (state: AuthState) => state.error;