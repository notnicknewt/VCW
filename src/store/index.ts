import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

// Define project type
interface Project {
  id: string;
  title: string;
  createdAt: string;
  contentIdea?: string;
}

// Define initial state structure
const initialState = {
  projects: [] as Project[],
};

// Basic root reducer
function rootReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    default:
      return state;
  }
}

// Create the Redux store
export const store = configureStore({
  reducer: rootReducer,
});

// ✅ Export proper types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
