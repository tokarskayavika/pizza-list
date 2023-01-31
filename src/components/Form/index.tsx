import React from "react";

import { Button } from "@mui/material";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  selectRestaurant,
  selectPizza,
  addSelectedItem,
} from "../../store/slice";
import {
  getPizzas,
  getProductsLoading,
  getRestaurants,
  getRestaurantsLoading,
  getSelectedPizza,
  getSelectedRestaurant,
} from "../../store/selectors";
import { AppDispatch } from "../../store";
import { Product, Restaurant } from "../../store/types";

import "./Form.css";

function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector(getRestaurants);
  const restaurantsLoading = useSelector(getRestaurantsLoading);
  const productsLoading = useSelector(getProductsLoading);
  const selectedRestaurant = useSelector(getSelectedRestaurant);
  const selectedPizza = useSelector(getSelectedPizza);
  const pizzas = useSelector(getPizzas);

  const loadRestaurants = () => {
    if (restaurants.length) {
      return;
    }

    dispatch(fetchRestaurants()); // if !value - cached
  };

  const changeRestaurant = (option: Restaurant | null) => {
    if (option?.id === selectedRestaurant?.id) {
      return;
    }
    dispatch(selectRestaurant(option));
  };

  const changePizza = (option: Product | null) => dispatch(selectPizza(option));
  const addItem = () => dispatch(addSelectedItem());

  return (
    <div className="form">
      <h2 className="form-header">Create new entry</h2>
      <Select
        onMenuOpen={loadRestaurants}
        options={restaurants}
        value={selectedRestaurant}
        onChange={changeRestaurant}
        getOptionLabel={({ name }) => name}
        isClearable
        isLoading={restaurantsLoading}
        isOptionSelected={(option) => option?.id === selectedRestaurant?.id}
        placeholder="Select restaurant"
        className="select"
      />
      <Select
        options={pizzas}
        value={selectedPizza}
        onChange={changePizza}
        getOptionLabel={({ name }) => name}
        isClearable
        isLoading={productsLoading}
        isDisabled={!selectedRestaurant}
        isOptionSelected={(option) => option?.id === selectedPizza?.id}
        placeholder="Select pizza"
        className="select"
      />
      <Button
        variant="contained"
        onClick={addItem}
        disabled={!selectedRestaurant || !selectedPizza}
      >
        Add to table
      </Button>
    </div>
  );
}

export default Form;
