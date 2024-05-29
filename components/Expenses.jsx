"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableCellWithButtons,
} from "@styles/StyledTableComponents";

import React from "react";

const ExpenseList = ({
  expenses,
  onArchive,
  onEdit,
  archives,
  onPermaDelete,
  onRestore,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Date Due</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }} align="right">
                  {row.amount}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }} align="right">
                  {row.dateDueOrPayed}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }} align="right">
                  {row.isPaid ? "PAID" : "NOT PAID"}
                </StyledTableCell>
                <StyledTableCellWithButtons align="center">
                  {archives ? (
                    <>
                      <button
                        color="primary"
                        style={{ marginRight: "30px" }}
                        onClick={() => {
                          onRestore(row._id);
                        }}
                      >
                        Restore
                      </button>
                      <button
                        color="primary"
                        onClick={() => {
                          onPermaDelete(row._id);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        color="primary"
                        style={{ marginRight: "30px" }}
                        onClick={() => {
                          onEdit(row._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        color="primary"
                        onClick={() => {
                          onArchive(row._id);
                        }}
                      >
                        Archive
                      </button>
                    </>
                  )}
                </StyledTableCellWithButtons>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

ExpenseList.defaultProps = {
  onPermaDelete: () => {},
  onEdit: () => {},
  onArchive: () => {},
  onRestore: () => {},
};

export default ExpenseList;
