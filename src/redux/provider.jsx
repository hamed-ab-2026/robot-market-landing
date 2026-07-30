"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

/**
 * Client-side Redux provider. Wraps the app once in the root
 * layout. Uses a ref so the store is created exactly once per
 * client session, not on every render.
 */
export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
