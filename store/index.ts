/* eslint-disable @typescript-eslint/no-explicit-any */
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {setupListeners} from '@reduxjs/toolkit/query/react';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {AuthSlice} from './Auth';
import {ContentSlice} from './Content';
import {ModalSlice} from './Modal';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['AuthSlice', 'ContentSlice']
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    AuthSlice: AuthSlice.reducer,
    ContentSlice: ContentSlice.reducer,
    ModalSlice: ModalSlice.reducer
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
