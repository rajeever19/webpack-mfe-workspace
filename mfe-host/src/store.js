import { useState, useEffect } from "react";

// A global event bus state using Vanilla JavaScript
let state = {
  selectedEngagement: null,
  notifications: 0,
};

const listeners = new Set();

export const setGlobalState = (newState) => {
  state = { ...state, ...newState };
  listeners.forEach((listener) => listener(state));
};

export const getGlobalState = () => state;

// Custom React hook to subscribe to the state across any MFE
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
