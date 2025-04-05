import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
