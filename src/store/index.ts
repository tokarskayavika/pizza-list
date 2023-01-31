import { configureStore } from "@reduxjs/toolkit";
import { getPreloadedState } from "./init";
import { fetchProductsListener, persistenceMiddleware } from "./middlewares";
import appReducer, { initialState } from "./slice";

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: appReducer,
  preloadedState: getPreloadedState(initialState),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(fetchProductsListener.middleware)
      .prepend(persistenceMiddleware),
});
