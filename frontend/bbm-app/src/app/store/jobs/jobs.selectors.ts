// src/app/store/selectors/jobCards.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../index'; // Adjust path as needed

export const selectJobCardsState = (state: AppState) => state.jobCardsState;

export const selectAllJobCards = createSelector(
  selectJobCardsState,
  (jobCardsState) => jobCardsState 
);
