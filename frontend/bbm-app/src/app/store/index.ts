import { ActionReducerMap } from "@ngrx/store";


import { ISession } from "../interfaces/session.interface";
import { IUser } from "./user/user.interface";

// import * as fromUserStore from "./user/user.reducer";
// import * as fromSessionStore from "./session/session.reducer";

import { userReducer } from "./user/user.reducer";
import { sessionReducer } from "./session/session.reducer";
import { IJobCard } from "../interfaces/jobcard.interface";
import { jobCardsReducer } from "./jobs/jobs.reducer";

export interface AppState {
    userState: IUser;
    sessionState: ISession;
    jobCardsState: IJobCard[];
}

export const reducers: ActionReducerMap<AppState> = {
    userState: userReducer,
    sessionState: sessionReducer,
    jobCardsState: jobCardsReducer,
};


export const selectAppState = (state: AppState) => state;