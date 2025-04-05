import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

// Define the initial state type
interface Project {
  id: string;
  title: string;
  createdAt: string;
  contentIdea?: string;
}

interface RootState {
  projects: Project[];
}

const initialState: RootState = {
  projects: []
};

function rootReducer(state = initialState, action: AnyAction): RootState {
  switch (action.type) {
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
