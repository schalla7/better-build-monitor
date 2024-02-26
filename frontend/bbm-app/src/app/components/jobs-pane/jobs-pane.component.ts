import { JobCardComponent } from '../job-card/job-card.component';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store';
import { selectAllJobCards } from '../../store/jobs/jobs.selectors'; // Adjust path as needed
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { reorderJobCards } from '../../store/jobs/jobs.actions';
import { isAppGlobalEditModeOn } from '../../store/session/session.selectors';

@Component({
  selector: 'app-jobs-pane',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    JobCardComponent,
    AsyncPipe
  ],
  templateUrl: './jobs-pane.component.html',
  styleUrl: './jobs-pane.component.scss'
})
export class JobsPaneComponent implements OnInit {
  
  selectedJobCardId: number | null = null;
  jobCards$: Observable<IJobCard[]>;
  isAppGlobalEditModeOn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    // Initialize the Observable
    this.jobCards$ = this.store.select(selectAllJobCards);
    this.isAppGlobalEditModeOn$ = this.store.select(isAppGlobalEditModeOn);
  }

  ngOnInit(): void {
    // No need to subscribe here if you're using the async pipe in your template
  }

  onJobCardSelected(jobCardId: number) {
    // Set the selectedJobCardId to the emitted job card ID
    // If the same card is clicked again, you can toggle the selection off by setting it to null
    this.selectedJobCardId = this.selectedJobCardId === jobCardId ? null : jobCardId;
  }

  drop(event: CdkDragDrop<IJobCard[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      this.store.dispatch(reorderJobCards({previousIndex: event.previousIndex, currentIndex: event.currentIndex}));
    }
  }


}
