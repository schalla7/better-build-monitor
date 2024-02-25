import { createReducer, on } from '@ngrx/store';
import { IJobCard } from '../../interfaces/jobcard.interface';
// import { addJobCard, setJobCards } from './jobs.actions';
import * as JobActions from './jobs.actions';


export const initialState: IJobCard[] = [];

export const jobCardsReducer = createReducer(
  initialState,
  
  // Handle setting the entire list
  on(JobActions.setJobCards, (_, { jobCards }) => jobCards),
  
  // Handle adding a single job card
  on(JobActions.addJobCard, (state, { jobCard }) => [...state, jobCard]),

  // Handle deleting a single job card
  on(JobActions.deleteJobCard, (state, { jobCard }) => 
    state.filter(card => card.id !== jobCard.id)
  ),
);

// src/app/store/reducers/viewConfig.reducer.ts
// import { setViewConfig } from '../actions/viewConfig.actions';
// import { ViewConfig } from '../models/viewConfig.interface';

// export const initialViewConfigState: ViewConfig = { columns: 3, filters: [] };

// export const viewConfigReducer = createReducer(
//   initialViewConfigState,
//   on(setViewConfig, (_, { viewConfig }) => viewConfig)
// );
