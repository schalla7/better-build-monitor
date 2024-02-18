import { ActionReducerMap } from "@ngrx/store";


import { ISession } from "./session/session.interface";
import { IUser } from "./user/user.interface";

// import * as fromUserStore from "./user/user.reducer";
// import * as fromSessionStore from "./session/session.reducer";

import { userReducer } from "./user/user.reducer";
import { sessionReducer } from "./session/session.reducer";

export interface AppState {
    userState: IUser;
    sessionState: ISession;
}

export const reducers: ActionReducerMap<AppState> = {
    userState: userReducer,
    sessionState: sessionReducer,
};


export const selectAppState = (state: AppState) => state;