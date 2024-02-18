// src/app/store/user.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../index'; // Adjust the path as necessary

export const selectSessionState = (state: AppState) => state.sessionState;


export const selectIsEditModeOn = createSelector(
  selectSessionState,
  (sessionState) => sessionState.isEditModeOn
);

export const selectSession = createSelector(
  selectSessionState,
  (sessionState) => sessionState
);