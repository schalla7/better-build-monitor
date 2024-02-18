// src/app/store/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { IUser } from './user.interface';
import { loginSuccess, logout, } from './user.actions';


export const initialState: IUser = {
    id: 0,
    username: 'Anonymous',
    isAuthenticated: false,
    permissions: ['read'],   
};

export const userReducer = createReducer(
    initialState,
    on(loginSuccess, (_, { user }) => user), // Replace the entire state with the new user
    on(logout, (_) => ({ ...initialState })) // Return to initial state on logout
);