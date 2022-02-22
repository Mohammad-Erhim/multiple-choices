import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authSlice from "./auth";
 
import searchSlice from "./app";
import appSlice from "./app";
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','app'],

};
export const authActions = authSlice.actions;
export const appActions = appSlice.actions;
 
export const searchAction = searchSlice.actions;
const reducers = combineReducers({ auth: authSlice.reducer,  app: appSlice.reducer });
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
