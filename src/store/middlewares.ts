import { Middleware } from "redux";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchProducts, selectRestaurant } from "./slice";
import { State } from "./types";

export const persistenceMiddleware: Middleware<{}, State> =
  (store) => (next) => (action) => {
    next(action);
    const { restaurantsLoading, productsLoading, ...state } = store.getState();
    localStorage.setItem("state", JSON.stringify(state));
  };

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: selectRestaurant,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    listenerApi.dispatch(fetchProducts(action.payload.id));
  },
});
