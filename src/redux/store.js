import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import uiReducer from "./slices/uiSlice";

/**
 * A fresh store per request/render is required for Next.js App
 * Router (no shared module-level singleton on the server), so this
 * is a factory rather than an exported instance. `StoreProvider`
 * calls it once per client mount via useRef.
 */
export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      products: productsReducer,
      ui: uiReducer,
    },
  });
}
