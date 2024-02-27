// header.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

import { CommonModule, NgIf } from '@angular/common';
import { Store } from "@ngrx/store";
import { AppState } from '../../store';
import { Subject, takeUntil } from 'rxjs';
import { selectIsAuthenticated, selectUser, selectUserPermissions } from '../../store/user/user.selectors';
import { isAppGlobalEditModeOn } from '../../store/session/session.selectors';
import { AddJobCardModalComponent } from '../job-card-add/add-job-card-modal.component';
import { setAppGlobalEditModeOn } from '../../store/session/session.actions';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../store/user/user.interface';
import { LogoutComponent } from '../logout/logout.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule,
        NgIf,
        LoginModalComponent,
        LogoutComponent,
        CommonModule,
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    
    private unsubscribe$ = new Subject();
    isAuthenticated: boolean = false;
    hasEditPermission: boolean = false;
    editModeOn: boolean = false;
    use_account_icon: string = 'no_accounts';
    
    
    constructor(
        public dialog: MatDialog,
        private store: Store<AppState>,
        private authService: AuthService,
    ) { }
    
    ngOnInit(): void {

        this.store.select(selectIsAuthenticated)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(isAuthenticated => {
                this.isAuthenticated = isAuthenticated
                if (this.isAuthenticated) {
                    this.use_account_icon = 'account_circle';
                }
                else {
                    this.use_account_icon = 'account_box';
                }
            });

        this.store.select(selectUserPermissions)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(permissions => this.hasEditPermission = permissions.includes('edit'));

        this.store.select(isAppGlobalEditModeOn)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(isEditModeOn => {
                this.editModeOn = isEditModeOn;
            });
        
        // DEVTEST, auto-login:
        this.authService.login({email: "DevTest", password: "DevTest"}).subscribe({
            next: (user: IUser) => {
                console.log('Login successful', user.username);
            },
            error: (error) => {
                console.error('Login failed', error.message);
                // this.loginError = 'Invalid credentials provided. Please try again.';
                // Show an error message
                // This could be setting an error message in a variable and displaying it in the template
            }
        });
    }
    

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }
    

    isEditModeOn(): boolean {
        return this.hasEditPermission && this.editModeOn;
    }


    toggleEditMode(isEditModeOn: boolean): void {
        isEditModeOn = !isEditModeOn;
        console.log('in toggleEditMode(), setting isEditModeOn in the store to: ', isEditModeOn);
        this.store.dispatch(setAppGlobalEditModeOn({ isAppGlobalEditModeOn: isEditModeOn }));   
    }

    
    onAccountModalClicked(): void {
        if (this.isAuthenticated) {
            this.logoutModal();
        }
        else {
            this.loginModal();
        }
    }

    
    loginModal(): void {
        const dialogRef = this.dialog.open(LoginModalComponent, {
            width: '250px',
            position: { top: '64px', right: '16px' } // Adjust 'top' as needed to align under the account icon
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The login modal was closed');
        });
    
    }

    logoutModal(): void {
        const dialogRef = this.dialog.open(LogoutComponent, {
            width: '250px',
            position: { top: '64px', right: '16px' } 
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The logout modal was closed');
        });
    }

    toggleAddModal(): void {
        const dialogRef = this.dialog.open(AddJobCardModalComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The Add Job Card modal was closed');
        });
    }
}
