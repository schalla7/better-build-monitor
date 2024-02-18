// src/app/store/user.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../index'; // Adjust the path as necessary

export const selectUserState = (state: AppState) => state.userState;

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (userState) => userState.isAuthenticated
);

export const selectHasEditPermission = createSelector(
  selectUserState,
  (userState) => userState.permissions.includes('edit')
);

export const selectUserPermissions = createSelector(
  selectUserState,
  (userState) => userState.permissions
);

export const selectUser = createSelector(
  selectUserState,
  (userState) => userState
);

