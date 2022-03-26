import { combineReducers } from "redux";


import { commonReducer, CommonSlice } from "./common/commonSlice";

export const reducers = combineReducers({
    common: commonReducer
})