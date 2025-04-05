import { configureStore } from '@reduxjs/toolkit';

// Create a simple reducer
const initialState = {
  projects: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// Create and export the store
export const store = configureStore({
  reducer: rootReducer
});
