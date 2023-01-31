import React from "react";

import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../store/slice";
import { getPriceById } from "../../store/selectors";
import { AppDispatch } from "../../store";

type PriceInputProps = {
  id: string;
};

const PriceInput = ({ id }: PriceInputProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const price = useSelector(getPriceById(id));

  const changePrice = (
    {
      target: { value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => dispatch(setPrice({ id, value }));

  return (
    <TextField
      type="number"
      inputProps={{ min: 0 }}
      size="small"
      variant="standard"
      value={price}
      onChange={(event) => changePrice(event, id)}
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default PriceInput;
