// src/app/store/session.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ISession } from './session.interface';
import { setIsEditModeOn } from './session.actions';

export const initialSessionState: ISession = {
  isEditModeOn: false,
};

export const sessionReducer = createReducer(
  initialSessionState,
  on(setIsEditModeOn, (state, { isEditModeOn }) => ({
    ...state,
    isEditModeOn, // Directly update isEditModeOn in the state
  }))
);
