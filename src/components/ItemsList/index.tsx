import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedItem } from "../../store/slice";
import { getItems } from "../../store/selectors";
import { AppDispatch } from "../../store";
import { Item } from "../../store/types";

import PriceInput from "../../components/PriceInput";
import Summary from "../../components/Summary";

import "./ItemsList.css";

const columnNames = ["Restaurant", "Product", "Cost", "Actions"];

function ItemsList() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(getItems);

  const removeItem = (index: number, id: string) =>
    dispatch(removeSelectedItem({ index, id }));

  return (
    <div className="list-container">
      {items.length ? (
        <>
          <h2 className="list-header">Calculation</h2>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columnNames.map((name) => (
                  <TableCell key={name}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(({ restaurant, pizza, id }: Item, index: number) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{pizza.name}</TableCell>
                  <TableCell className="price">
                    <PriceInput id={id} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => removeItem(index, id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <Summary />
            </TableFooter>
          </Table>
        </>
      ) : null}
    </div>
  );
}

export default ItemsList;
