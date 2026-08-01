import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

// Singleton store for the client (App Router renders providers on the client tree).
export const store = makeStore();
