import { State } from "./types";

export const getPreloadedState = (initialState: State) => {
  const savedState = localStorage.getItem("state");

  return savedState
    ? {
        ...JSON.parse(savedState),
        restaurantsLoading: false,
        productsLoading: false,
      }
    : initialState;
};
