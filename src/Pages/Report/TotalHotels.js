import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import XLSX from "xlsx";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "#F46D25",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  background: "#F46D25",
  color: "#fff",
  fontSize: "13px",

  lineHeight: "1rem",
  minWidth: "100px",
}));

const StyledTableCellInside = styled(TableCell)(({ theme }) => ({
  fontSize: "13px",
  lineHeight: "15px",
}));

const columns = [
  {
    id: "hotelName",
    label: "Hotel Name",
  },
  {
    id: "hotelEmail",
    label: "Hotel Email",
  },
  {
    id: "HotelPhNo",
    label: "Hotel Ph. No",
  },

  {
    id: "HotelAddress",
    label: "Hotel Address",
  },
];

export default function TotalHotels(props) {
  const { reportData } = props;
  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const downloadExcel = () => {
    const newData = reportData.map((row) => {
      delete row.id;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Hotel");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Hotel.xlsx");
  };

  return (
    <div>
      <div
        style={{
          width: "50%",
          display: "inline-block",
          margin: "10px 0px",
          color: "#F46D25",
        }}
      >
        {" "}
        <b>Total Hotels Report</b>
      </div>
      <div
        style={{
          width: "50%",
          display: "inline-block",
          textAlign: "end",
          margin: "10px 0px",
        }}
      >
        <Button size="small" onClick={downloadExcel}>
          Download As Excel
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {reportData
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      <StyledTableCellInside
                        style={{ textTransform: "capitalize" }}
                      >
                        {row.displayName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.hotelEmail}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.hotelPhone}
                      </StyledTableCellInside>
                      <StyledTableCellInside>{row.city}</StyledTableCellInside>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={reportData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
