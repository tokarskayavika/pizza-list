import { createSelector } from '@reduxjs/toolkit';
import { Product, State } from './types';

export const getRestaurants = (state: State) => state.restaurants;
export const getRestaurantsLoading = (state: State) => state.restaurantsLoading;

export const getSelectedRestaurant = (state: State) => state.selectedRestaurant;
export const getSelectedPizza = (state: State) => state.selectedPizza;
export const getItems = (state: State) => state.selectedItems;
const getPrices = (state: State) => state.prices;

export const getPriceById = (id: string) => (state: State) => state.prices[id];

export const getProducts = (state: State) => {
    if (!getSelectedRestaurant(state)) {
        return [];
    }

    return state.products[getSelectedRestaurant(state)!.id] || [];
}
export const getProductsLoading = (state: State) => state.productsLoading;

export const getPizzas = createSelector(
    getProducts,
    (items) => items.filter((item: Product) => item.category === 'Pizza')
)

export const getSummary = createSelector(
    getPrices,
    (prices) => Object.values(prices)
    .reduce((partialSum: number, price: number) => partialSum + price, 0)
)