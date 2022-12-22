import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import XLSX from "xlsx";
import Select from "react-select";
import _ from "lodash";
import { format } from "date-fns";

const FinanceOpition = [
  {
    id: "bookingId",
    label: "Booking Id",
  },
  {
    id: "hotelName",
    label: "Hotel Name",
  },
  {
    id: "agentName",
    label: "Agent Name",
  },
  { id: "customerName", label: "Client Name" },
  {
    id: "checkin",
    label: "Check In Date",
  },
  {
    id: "checkout",
    label: "Check Out Date",
  },
  {
    id: "bookingDate",
    label: "Booking Date",
  },
  {
    id: "noOfRooms",
    label: "No of Rooms",
  },
  {
    id: "noOfAdults",
    label: "No of Adults",
  },

  {
    id: "noOfChildren",
    label: "Number of Children",
  },
  {
    id: "paymentRecievingDate",
    label: "Payment Recieving Date",
  },
  {
    id: "paymentMode",
    label: "Payment Mode",
  },
  {
    id: "paymentReferenceNumber",
    label: "Payment Reference Number",
  },
  {
    id: "amountRecievedByTowno",
    label: "Amount Recieved By Towno ",
  },
  {
    id: "roomrentamount",
    label: "Total Room Rent",
  },
  {
    id: "net",
    label: "Net Booking Amount",
  },
  {
    id: "totalinclusionAmount",
    label: "Total inclusion Amount",
  },
  {
    id: "balancepayabletoTowno",
    label: "Balance payable to Towno",
  },
  {
    id: "customerToPayToHotel",
    label: "Customer To Pay To Hotel",
  },
  {
    id: "townoPayToHotel",
    label: "Towno Pay To The Hotel",
  },
  {
    id: "townotopaytoVendor",
    label: "Towno to pay to Vendor",
  },
  {
    id: "gross",
    label: "Gross Booking Amount",
  },
  {
    id: "townoProfit",
    label: "Towno Profit",
  },
  {
    id: "projector",
    label: "Projector Amount",
  },
  {
    id: "profitaftertax",
    label: "Profit After Tax",
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "#F46D25",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  background: "#F46D25",
  color: "#fff",
  fontSize: "12px",
  padding: "5px",
  lineHeight: "1rem",
  minWidth: "100px",
}));

const StyledTableCellInside = styled(TableCell)(({ theme }) => ({
  padding: "5px",
  fontSize: "12px",
  lineHeight: "15px",
}));

const columns = [
  {
    id: "bookingId",
    label: "Booking Id",
  },
  {
    id: "hotelName",
    label: "Hotel Name",
  },
  {
    id: "agentName",
    label: "Agent Name",
  },
  { id: "customerName", label: "Client Name" },
  {
    id: "checkin",
    label: "Check In Date",
  },
  {
    id: "checkout",
    label: "Check Out Date",
  },
  {
    id: "bookingDate",
    label: "Booking Date",
  },
  {
    id: "noOfRooms",
    label: "No of Rooms",
  },
  {
    id: "noOfAdults",
    label: "No of Adults",
  },
  {
    id: "noOfChildren",
    label: "Number of Children",
  },
  {
    id: "paymentRecievingDate",
    label: "Payment Recieving Date",
  },
  {
    id: "paymentMode",
    label: "Payment Mode",
  },
  {
    id: "paymentReferenceNumber",
    label: "Payment Reference Number",
  },
  {
    id: "amountRecievedByTowno",
    label: "Amount Recieved By Towno ",
  },
  {
    id: "roomrentamount",
    label: "Total Room Rent",
  },
  {
    id: "net",
    label: "Net Booking Amount",
  },
  {
    id: "totalinclusionAmount",
    label: "Total inclusion Amount",
  },
  {
    id: "balancepayabletoTowno",
    label: "Balance payable to Towno",
  },
  {
    id: "customerToPayToHotel",
    label: "Customer To Pay To Hotel",
  },
  {
    id: "townoPayToHotel",
    label: "Towno Pay To The Hotel",
  },
  {
    id: "townotopaytoVendor",
    label: "Towno to pay to Vendor",
  },
  {
    id: "gross",
    label: "Gross Booking Amount",
  },
  {
    id: "townoProfit",
    label: "Towno Profit",
  },
  {
    id: "projector",
    label: "Projector Amount",
  },
  {
    id: "profitaftertax",
    label: "Profit After Tax",
  },
];

export default function FinanceReport(props) {
  const [finalReport, setFinalReport] = useState(props.reportData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    setFinalReport(props.reportData);
  }, [props]);

  const HandleSort = (sort) => {
    setSort(sort);
    let sorted = _.orderBy(finalReport, [sort.value], ["asec"]);
    setFinalReport(sorted);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const downloadExcel = () => {
    const newData = finalReport.map((row) => {
      delete row.id;         
            return row;
    });
    //console.log(newData);
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Finance");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Finance.xlsx");
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        <Grid item md={8}>
          <b>Finance Report</b>
        </Grid>
        <Grid item md={2}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: "-9px",
                zIndex: "1",
                left: "12px",
                color: "#fff",
                background: "#F46D25",
                borderRadius: "4px",
                padding: "1px 4px",
                fontSize: "12px",
              }}
            >
              Sort By
            </span>
            <Select
              options={FinanceOpition}
              placeholder=""
              value={sort}
              onChange={HandleSort}
              styles={{
                container: (provided) => ({
                  ...provided,
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9,
                }),
                control: (base, state) => ({
                  ...base,
                  "&:hover": { borderColor: "#f46d25" },
                  borderColor: "#f46d25",
                  boxShadow: "none",
                }),
              }}
            />
          </div>
        </Grid>
        <Grid item md={2} style={{ textAlign: "right" }}>
          <Button onClick={downloadExcel}>
            Download As Excel
          </Button>
        </Grid>
      </Grid>

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
              {finalReport
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
                        {row.bookingId}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.hotelName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.agentName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.customerName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                      { (row.checkInDate !== null && (row.checkInDate||"").trim() !== "") ?
                      format(new Date(row.checkInDate), "dd-MM-yyyy"):""}
                        {/* {format(new Date(row.checkInDate), "dd-MM-yyyy")} */}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                      { (row.checkOutDate !== null && (row.checkOutDate||"").trim() !== "") ?
                      format(new Date(row.checkOutDate), "dd-MM-yyyy"):""}
                        {/* {format(new Date(row.checkOutDate), "dd-MM-yyyy")} */}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                      { (row.bookingDate !== null && (row.bookingDate||"").trim() !== "") ?
                      format(new Date(row.bookingDate), "dd-MM-yyyy"):""}
                        {/* {format(new Date(row.bookingDate), "dd-MM-yyyy")} */}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.numberofRooms}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.numberofAdults}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.numberofChildren}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                      { (row.paymentRecievingDate !== null && (row.paymentRecievingDate||"").trim() !== "") ?
                      format(new Date(row.paymentRecievingDate), "dd-MM-yyyy"):""}
                        {/* {format(new Date(row.paymentRecievingDate), "dd-MM-yyyy")} */}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.paymentMode}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.paymentReferenceNumber}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.amountRecievedByTowno}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.roomrentamount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.netBookingAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.totalInclusionAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.balancepayabletoTowno}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.customerToPayToHotel}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townoPayToHotel}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townotopaytoVendor}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.grossBookingAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townoProfit}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.projectorAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townoProfitTax}
                      </StyledTableCellInside>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={finalReport.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
