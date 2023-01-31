import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import appReducer, { fetchProducts, selectRestaurant } from './slice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: selectRestaurant,
    effect: async (action, listenerApi) => {
      if (!action.payload) return;
      listenerApi.dispatch(fetchProducts(action.payload.id));
    },
  })

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});