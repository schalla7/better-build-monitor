// src/app/store/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { IUser } from './user.interface';

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: IUser }>()
);

export const logout = createAction('[User] Logout');

