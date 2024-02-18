// src/app/store/session.actions.ts
import { createAction, props } from '@ngrx/store';

export const setIsEditModeOn = createAction(
  '[Session] Set isEditModeOn',
  props<{ isEditModeOn: boolean }>()
);
