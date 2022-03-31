import { Context, createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, Reducer, Store } from "redux";
import { reducers } from "./store";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from 'redux-thunk';
import logger from "redux-logger";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";



//BINDING MIDDLEWARE
const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension');
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };



const makeConfiguredStore = (reducer: Reducer) =>
  createStore(reducer, undefined, bindMiddleware([logger, thunkMiddleware]) );

const persistConfig = {
  key: "root",
  storage,
};

// const makeStore = () => {
//   const isServer = typeof window === "undefined";
//   if (isServer) {
//     return makeConfiguredStore(reducers);
//   } else {
//     const persistedReducer = persistReducer(persistConfig, reducers);
//     const store = makeConfiguredStore(persistedReducer);
//     return store;
//   }
// };

const makeStore = () => {
    const persistedReducer = persistReducer(persistConfig, reducers);
    const store = makeConfiguredStore(persistedReducer);
    //@ts-ignore
    store.__persistor = persistStore(store);
    return store;
}

export const wrapper = createWrapper(makeStore, { debug: true });
