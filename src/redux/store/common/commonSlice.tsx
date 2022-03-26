import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import { CommonTypeState } from "./type";



const initialState: CommonTypeState = {
    toggle: true,
    profile: null,
    isAuthCheck: false
}

export const CommonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        saveProfile: (state: CommonTypeState, action) => {
            state.profile = action.payload;
        },
        clearProfile: (state: CommonTypeState) => {
            state.profile = null;
            storage.removeItem('persist:root');
        },
        isAuth: (state: CommonTypeState) => {
            state.isAuthCheck = !state.isAuthCheck
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.common,
            };
        },
    },

})

export const {saveProfile, isAuth, clearProfile} = CommonSlice.actions;

export const commonReducer = CommonSlice.reducer;

export const selectAuth = (state: any ) => state?.common?.isAuthCheck;

export const selectProfile = (state:any) => state?.common?.profile;

