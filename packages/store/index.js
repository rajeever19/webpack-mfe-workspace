import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Vanilla JS event-bus store — framework-agnostic, singleton across all MFEs
// when shared via Webpack Module Federation's `shared` singleton config.
// ---------------------------------------------------------------------------

let state = {
  selectedEngagement: null,
  notifications: 0,
};

const listeners = new Set();

/** Merge partial state and notify all subscribers. */
export const setGlobalState = (newState) => {
  state = { ...state, ...newState };
  listeners.forEach((listener) => listener(state));
};

/** Read the current state snapshot synchronously (no re-render). */
export const getGlobalState = () => state;

/** React hook — subscribes to the store and re-renders on changes. */
export const useGlobalState = () => {
  const [localState, setLocalState] = useState(state);

  useEffect(() => {
    listeners.add(setLocalState);
    return () => {
      listeners.delete(setLocalState);
    };
  }, []);

  return localState;
};
