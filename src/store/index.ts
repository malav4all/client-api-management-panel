import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';

// Load state from localStorage
const loadState = (): { auth: AuthState } | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error: any) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: { auth: AuthState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error: any) {
    console.error('Error saving state:', error);
  }
};

// Load persisted state
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure authReducer matches the slice name
  },
  preloadedState: persistedState, // Use the persisted state
});

// Save state changes to localStorage
store.subscribe(() => {
  saveState({
    auth: store.getState().auth, // Persist only the auth slice
  });
});

// Define types for RootState and AppDispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
