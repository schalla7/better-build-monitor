// header.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { setIsEditModeOn } from '../../store/session/session.actions';

import { NgIf } from '@angular/common';
import { Store } from "@ngrx/store";
import { AppState, selectAppState } from '../../store';
import { Subject, takeUntil } from 'rxjs';
import { selectIsAuthenticated, selectUserPermissions } from '../../store/user/user.selectors';
import { selectIsEditModeOn } from '../../store/session/session.selectors';

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
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    
    private unsubscribe$ = new Subject();
    isAuthenticated: boolean = false;
    hasEditPermission: boolean = false;
    editModeOn: boolean = false;
    
    
    constructor(public dialog: MatDialog, private store: Store<AppState>) {}
    
    ngOnInit(): void {
        
        // this.store.select(selectAppState)
        // .pipe(takeUntil(this.unsubscribe$))
        // .subscribe((appState: AppState) => {
        //     if (appState) {
        //         this.isAuthenticated = appState.userState.isAuthenticated;
        //         this.hasEditPermission = appState.userState.permissions.includes('edit');
        //         this.editModeOn = appState.sessionState.isEditModeOn;
        //     }
        // });


        this.store.select(selectIsAuthenticated)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

        this.store.select(selectUserPermissions)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(permissions => this.hasEditPermission = permissions.includes('edit'));

        this.store.select(selectIsEditModeOn)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(isEditModeOn => this.editModeOn = isEditModeOn);
    }
    
    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }
    
    isEditModeOn(): boolean {
        return this.hasEditPermission && this.editModeOn;
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
    
    toggleEditMode(isEditModeOn: boolean): void {
        isEditModeOn = !isEditModeOn;
        console.log('in toggleEditMode(), setting isEditModeOn in the store to: ', isEditModeOn);
        this.store.dispatch(setIsEditModeOn({ isEditModeOn }));
        // this.editModeOn = !this.editModeOn;
        
    }
}
