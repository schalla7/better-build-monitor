// src/app/store/user.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../index'; // Adjust the path as necessary

export const selectSessionState = (state: AppState) => state.sessionState;


export const isAppGlobalEditModeOn = createSelector(
  selectSessionState,
  (sessionState) => sessionState.isAppGlobalEditModeOn
);

export const selectSession = createSelector(
  selectSessionState,
  (sessionState) => sessionState
);