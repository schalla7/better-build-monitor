import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../store/user/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { loginSuccess, logout } from '../store/user/user.actions';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    
    private isAuthenticated = false;
    private userAuthorisedPermissions: string[] = [];
    
    constructor(private store: Store<AppState>) {}
    
    
    login(credentials: { email: string, password: string }): Observable<IUser> {
        // Mocking the HTTP call
        const mockedResponse = {
            success: true,
            message: 'Authentication successful',
            user: {
                id: 1,
                username: credentials.email,
                isAuthenticated: true,
                permissions: ['edit'],
            },
        };
        
        return new Observable<IUser>((observer) => {
            // Simulating the HTTP call
            setTimeout(() => {
                if (mockedResponse.success) {
                    
                    this.store.dispatch(loginSuccess({ user: mockedResponse.user }));

                    
                    this.isAuthenticated = true;
                    this.userAuthorisedPermissions = mockedResponse.user.permissions;
                    observer.next(mockedResponse.user);
                } else {
                    // observer.next(null); // or observer.error({ message: 'Authentication failed' });
                    observer.error(new Error('Authentication failed'));
                }
                observer.complete();
            }, 300);
        });
    }
    
    logout(): void {
        // Here you would normally make an API call

        this.store.dispatch(logout());
        
        this.isAuthenticated = false;
        this.userAuthorisedPermissions = [];
    }
    
    get isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
    
    hasPermissions(permissions: string[]): boolean {
        return permissions.every(permission => this.userAuthorisedPermissions.includes(permission));
    }
    
    
}




