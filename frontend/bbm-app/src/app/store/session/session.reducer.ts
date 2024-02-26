// src/app/store/session.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ISession } from '../../interfaces/session.interface';
import { setAppGlobalEditModeOn } from './session.actions';

export const initialSessionState: ISession = {
  isAppGlobalEditModeOn: false,
};

export const sessionReducer = createReducer(
  initialSessionState,
  on(setAppGlobalEditModeOn, (state, { isAppGlobalEditModeOn }) => ({
    ...state,
    isAppGlobalEditModeOn, // Directly update isEditModeOn in the state
  }))
);
