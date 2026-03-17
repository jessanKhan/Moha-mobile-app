import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        toast: toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
