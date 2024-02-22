// src/app/store/reducers/jobCards.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { setJobCards } from './jobs.actions';

export const initialState: IJobCard[] = [];

export const jobCardsReducer = createReducer(
  initialState,
  on(setJobCards, (_, { jobCards }) => jobCards)
);

// src/app/store/reducers/viewConfig.reducer.ts
// import { setViewConfig } from '../actions/viewConfig.actions';
// import { ViewConfig } from '../models/viewConfig.interface';

// export const initialViewConfigState: ViewConfig = { columns: 3, filters: [] };

// export const viewConfigReducer = createReducer(
//   initialViewConfigState,
//   on(setViewConfig, (_, { viewConfig }) => viewConfig)
// );
