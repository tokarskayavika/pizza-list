import React from "react";

import { TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { getSummary } from "../../store/selectors";

const Summary = () => {
  const summary = useSelector(getSummary);

  return (
    <TableRow>
      <TableCell colSpan={2}>Summary</TableCell>
      <TableCell colSpan={2}>{summary}</TableCell>
    </TableRow>
  );
};

export default Summary;
