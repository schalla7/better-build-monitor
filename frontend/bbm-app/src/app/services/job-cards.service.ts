import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../store'; // Adjust path as needed
import { selectAllJobCards } from '../store/jobs/jobs.selectors'; // Adjust path as needed
import { IJobCard } from '../interfaces/jobcard.interface'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class JobCardsService {

  constructor(private store: Store<AppState>) { }

  isTitleUnique(jobTitle: string): Observable<boolean> {
    // Select all job cards from the store
    return this.store.select(selectAllJobCards).pipe(
      map((jobCards: IJobCard[]) => {
        // Check if any job card has the same title as the provided one
        const titleExists = jobCards.some(jobCard => jobCard.label_title.toLowerCase() === jobTitle.toLowerCase());
        // Return true if the title does not exist (i.e., is unique)
        return !titleExists;
      })
    );
  }
}
