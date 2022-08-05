import { combineReducers } from "redux";
import { cartReducer } from "./cart/cartSlice";


import { commonReducer, CommonSlice } from "./common/commonSlice";

export const reducers = combineReducers({
    common: commonReducer,
    cart: cartReducer
})


export type RootState = ReturnType<typeof reducers>