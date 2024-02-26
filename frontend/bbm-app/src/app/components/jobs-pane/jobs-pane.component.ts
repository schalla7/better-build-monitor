import { JobCardComponent } from '../job-card/job-card.component';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store';
import { selectAllJobCards } from '../../store/jobs/jobs.selectors'; // Adjust path as needed
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs-pane',
  standalone: true,
  imports: [
    CommonModule,
    JobCardComponent,
    AsyncPipe
  ],
  templateUrl: './jobs-pane.component.html',
  styleUrl: './jobs-pane.component.scss'
})
export class JobsPaneComponent implements OnInit {
  
  selectedJobCardId: number | null = null;

  jobCards$: Observable<IJobCard[]>;

  constructor(private store: Store<AppState>) {
    // Initialize the Observable
    this.jobCards$ = this.store.select(selectAllJobCards);
  }

  ngOnInit(): void {
    // No need to subscribe here if you're using the async pipe in your template
  }

  onJobCardSelected(jobCardId: number) {
  // Set the selectedJobCardId to the emitted job card ID
  // If the same card is clicked again, you can toggle the selection off by setting it to null
  this.selectedJobCardId = this.selectedJobCardId === jobCardId ? null : jobCardId;
}
}
