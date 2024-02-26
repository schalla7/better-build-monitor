import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { NgClass, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as JobActions from '../../store/jobs/jobs.actions';
import { Observable, combineLatest, of } from 'rxjs';
import { isAppGlobalEditModeOn } from '../../store/session/session.selectors';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';



// In job-card.component.ts
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
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
    AsyncPipe
  ]
})
export class JobCardComponent {
  @Input() jobCard!: IJobCard;
  @Input() isSelected: boolean = false;

  @Output() selected = new EventEmitter<number>();

  isAppGlobalEditModeOn$: Observable<boolean>;
  displayActions$: Observable<boolean>;


  // Inject Store if needed for dispatching actions
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.isAppGlobalEditModeOn$ = this.store.select(isAppGlobalEditModeOn);
    this.displayActions$ = combineLatest([this.isAppGlobalEditModeOn$, of(this.isSelected)]).pipe(
      map(([isEditMode, isSelected]) => isEditMode && isSelected)
    );
  }

  toggleSelection() {
    // this.isSelected = !this.isSelected;
    // Update displayActions$ if necessary
    this.displayActions$ = combineLatest([this.isAppGlobalEditModeOn$, of(this.isSelected)]).pipe(
      map(([isEditMode, isSelected]) => isEditMode && isSelected)
    );
    this.selected.emit(this.jobCard.id);
  }

  setCardEditMode() {
    // Dispatch an action or navigate to edit this card
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation(); // Prevent triggering selection toggle
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: "Are you sure you want to delete this job?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Dispatch action to delete the job card
        this.store.dispatch(JobActions.deleteJobCard({ jobCard: this.jobCard }));
        // this.store.dispatch(addJobCard({ jobCard: newJobCard })); // Dispatch the action
      }
    });
  }
}
