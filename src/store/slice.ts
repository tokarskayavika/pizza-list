import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cachingFetch } from "../services";
import { State, Product, Restaurant } from "./types";

export const initialState: State = {
  restaurants: [],
  restaurantsLoading: false,
  selectedRestaurant: null,
  selectedPizza: null,
  products: {},
  productsLoading: false,
  selectedItems: [],
  prices: {},
};

export const fetchRestaurants = createAsyncThunk(
  "fetchRestaurants",
  async () => {
    const response: Restaurant[] = await cachingFetch(
      "https://private-anon-da5e25541c-pizzaapp.apiary-mock.com/restaurants/"
    );
    return response;
  }
);

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (restaurantId: number) => {
    const response: Product[] = await cachingFetch(
      `https://private-anon-da5e25541c-pizzaapp.apiary-mock.com/restaurants/${restaurantId}/menu?category=Pizza&orderBy=name`
    );
    return { response, restaurantId };
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectRestaurant: (
      state: State,
      action: PayloadAction<Restaurant | null>
    ) => {
      state.selectedRestaurant = action.payload;
      state.selectedPizza = null;
    },
    selectPizza: (state: State, action: PayloadAction<Product | null>) => {
      state.selectedPizza = action.payload;
    },
    addSelectedItem: (state: State) => {
      const id = Math.random().toString().slice(2);

      state.prices[id] = state.selectedPizza!.price;
      state.selectedItems.push({
        restaurant: state.selectedRestaurant!,
        pizza: state.selectedPizza!,
        id,
      });
    },
    removeSelectedItem: (
      state: State,
      action: PayloadAction<{ index: number; id: string }>
    ) => {
      state.selectedItems.splice(action.payload.index, 1);
      delete state.prices[action.payload.id];
    },
    setPrice: (
      state: State,
      { payload: { id, value } }: PayloadAction<{ id: string; value: string }>
    ) => {
      state.prices[id] = +value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state: State) => {
        state.restaurantsLoading = true;
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state: State, action: PayloadAction<Restaurant[]>) => {
          state.restaurants = action.payload;
          state.restaurantsLoading = false;
        }
      )
      .addCase(fetchRestaurants.rejected, (state: State) => {
        state.restaurantsLoading = false;
      })
      .addCase(fetchProducts.pending, (state: State) => {
        state.productsLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state: State,
          {
            payload: { restaurantId, response },
          }: PayloadAction<{ response: Product[]; restaurantId: number }>
        ) => {
          state.products[restaurantId] = response;
          state.productsLoading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state: State) => {
        state.productsLoading = false;
      });
  },
});

export const {
  selectRestaurant,
  selectPizza,
  addSelectedItem,
  removeSelectedItem,
  setPrice,
} = appSlice.actions;

export default appSlice.reducer;
