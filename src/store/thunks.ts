import { createAsyncThunk } from "@reduxjs/toolkit";
import { cachingFetch } from "../services";
import { Product, Restaurant } from "./types";

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
