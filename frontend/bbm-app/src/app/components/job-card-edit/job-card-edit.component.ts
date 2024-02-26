import { AsyncPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from '../../store';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { Store } from '@ngrx/store';
import { isAppGlobalEditModeOn } from '../../store/session/session.selectors';
import * as JobActions from '../../store/jobs/jobs.actions';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-job-card-edit',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DatePipe,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    JobCardEditComponent,
  ],
  templateUrl: './job-card-edit.component.html',
  styleUrl: './job-card-edit.component.scss'
})
export class JobCardEditComponent {
  
  // isAppGlobalEditModeOn$: Observable<boolean>;
  isAppGlobalEditModeOn$: Observable<boolean>;
  jobCard: IJobCard;
  
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { jobCard: IJobCard },
    ) {
    this.isAppGlobalEditModeOn$ = this.store.select(isAppGlobalEditModeOn);
    this.jobCard = this.data.jobCard;
  }

  editJobCard() {
    
  }

  deleteJobCard(event: MouseEvent) {
    event.stopPropagation(); // Prevent triggering selection toggle
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: "Are you sure you want to delete this job?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(JobActions.deleteJobCard({ jobCard: this.jobCard }));
      }
    });
  }
}
