// header.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { setIsEditModeOn } from '../../store/session/session.actions';

import { CommonModule, NgIf } from '@angular/common';
import { Store } from "@ngrx/store";
import { AppState, selectAppState } from '../../store';
import { Subject, takeUntil } from 'rxjs';
import { selectIsAuthenticated, selectUserPermissions } from '../../store/user/user.selectors';
import { selectIsEditModeOn } from '../../store/session/session.selectors';
import { AddJobCardModalComponent } from '../add-job-card-modal/add-job-card-modal.component';

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
        CommonModule,
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    
    private unsubscribe$ = new Subject();
    isAuthenticated: boolean = false;
    hasEditPermission: boolean = false;
    editModeOn: boolean = false;
    use_account_icon: string = 'no_accounts';
    
    
    constructor(public dialog: MatDialog, private store: Store<AppState>) {}
    
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

        this.store.select(selectIsEditModeOn)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(isEditModeOn => {
                this.editModeOn = isEditModeOn;
                // DEVTEST:
                // this.editModeOn = true;
                // this.hasEditPermission = true;
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
        this.store.dispatch(setIsEditModeOn({ isEditModeOn }));   
    }

    toggleAccountModal(): void {
        const dialogRef = this.dialog.open(LoginModalComponent, {
            width: '250px',
            position: { top: '64px', right: '16px' } // Adjust 'top' as needed to align under the account icon
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The login modal was closed');
            // Handle authentication logic here
        });
    }

    toggleAddModal(): void {
        const dialogRef = this.dialog.open(AddJobCardModalComponent, {
            width: '600px',
            // position: { top: '64px', right: '16px' } // Adjust 'top' as needed to align under the account icon
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The Add Job Card modal was closed');
        });
    }
}
