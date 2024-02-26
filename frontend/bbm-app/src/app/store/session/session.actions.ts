// src/app/store/session.actions.ts
import { createAction, props } from '@ngrx/store';

export const setAppGlobalEditModeOn = createAction(
  '[Session] Set isEditModeOn',
  props<{ isAppGlobalEditModeOn: boolean }>()
);
