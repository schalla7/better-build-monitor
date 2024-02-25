// src/app/store/actions/jobs.actions.ts
import { createAction, props } from '@ngrx/store';
import { IJobCard } from '../../interfaces/jobcard.interface';

export const loadJobCards = createAction('[Job Cards] Load');
export const setJobCards = createAction('[Job Cards] Set', props<{ jobCards: IJobCard[] }>());
export const addJobCard = createAction('[Job Cards] Add One', props<{ jobCard: IJobCard }>());


// src/app/store/actions/viewConfig.actions.ts
// export const loadViewConfig = createAction('[View Config] Load');
// export const setViewConfig = createAction('[View Config] Set', props<{ viewConfig: ViewConfig }>());
