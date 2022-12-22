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
    value: "bookingId",
    label: "Booking value",
  },
  {
    value: "bookingDate",
    label: "Booking Date",
  },
  { value: "customerName", label: "Client Name" },
  {
    value: "hotelName",
    label: "Hotel Name",
  },
  {
    value: "checkInDate",
    label: "Check In Date",
  },
  {
    value: "checkOutDate",
    label: "Check Out Date",
  },
  {
    value: "numberofRooms",
    label: "No of Rooms",
  },
  {
    value: "numberofAdults",
    label: "No of Adults",
  },

  {
    value: "numberofChildren",
    label: "Number of Children",
  },
  {
    value: "agentName",
    label: "Agent Name",
  },
  {
    value: "amountRecievedByTowno",
    label: "Amount Recieved By Towno ",
  },
  {
    value: "paymentMode",
    label: "Payment Mode",
  },
  {
    value: "paymentReferenceNumber",
    label: "Payment Reference Number",
  },
  {
    value: "paymentRecievingDate",
    label: "Payment Recieving Date",
  },
  {
    value: "grossBookingAmount",
    label: "Gross Booking Amount",
  },
  {
    value: "netBookingAmount",
    label: "Net Booking Amount",
  },
  {
    value: "totalRoomRent",
    label: "Total Room Rent",
  },
  {
    value: "totalInclusionAmount",
    label: "Total inclusion Amount",
  },
  {
    value: "townoToPayToTheHotel",
    label: "Towno To Pay To The Hotel",
  },
  {
    value: "townotopaytoVendor",
    label: "Towno to pay to Vendor",
  },
  {
    value: "customerToPayToHotel",
    label: "Customer To Pay To Hotel",
  },
  {
    value: "balancepayabletoTowno",
    label: "Balance payable to Towno",
  },
  {
    value: "townoProfit",
    label: "Towno Profit",
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
    id: "bookingDate",
    label: "Booking Date",
  },
  { id: "customerName", label: "Client Name" },
  {
    id: "hotelName",
    label: "Hotel Name",
  },
  {
    id: "checkin",
    label: "Check In Date",
  },
  {
    id: "checkout",
    label: "Check Out Date",
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
    id: "agentName",
    label: "Agent Name",
  },
  {
    id: "amountRecievedByTowno",
    label: "Amount Recieved By Towno ",
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
    id: "paymentRecievingDate",
    label: "Payment Recieving Date",
  },
  {
    id: "gross",
    label: "Gross Booking Amount",
  },
  {
    id: "net",
    label: "Net Booking Amount",
  },
  {
    id: "totalRoomRent",
    label: "Total Room Rent",
  },
  {
    id: "totalinclusionAmount",
    label: "Total inclusion Amount",
  },
  {
    id: "townoToPayToTheHotel",
    label: "Towno To Pay To The Hotel",
  },
  {
    id: "townotopaytoVendor",
    label: "Towno to pay to Vendor",
  },
  {
    id: "customerToPayToHotel",
    label: "Customer To Pay To Hotel",
  },
  {
    id: "balancepayabletoTowno",
    label: "Balance payable to Towno",
  },
  {
    id: "townoProfit",
    label: "Towno Profit",
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
    const Data = finalReport.map((row) => {
      row.amountRecievedByTowno=Number(row.amountRecievedByTowno);
      row.balancepayabletoTowno=Number(row.balancepayabletoTowno);
      row.customerToPayToHotel=Number(row.customerToPayToHotel);
      row.grossBookingAmount=Number(row.grossBookingAmount);
      row.netBookingAmount=Number(row.netBookingAmount);
      row.totalInclusionAmount=Number(row.totalInclusionAmount);
      row.totalRoomRent=Number(row.totalRoomRent);
      row.townoProfit=Number(row.townoProfit);
      row.townoToPayToTheHotel=Number(row.townoToPayToTheHotel);
      row.townotopaytoVendor=Number(row.townotopaytoVendor);
       return row;
    });
    console.log(Data);
    const newData = Data.map((row) => {
      delete row.id;
      return row;
    });
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
          <Button size="small" onClick={downloadExcel}>
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
                  finalReport * rowsPerPage,
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
                        {format(new Date(row.bookingDate), "dd-MM-yyyy")}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.customerName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.hotelName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {format(new Date(row.checkInDate), "dd-MM-yyyy")}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {format(new Date(row.checkOutDate), "dd-MM-yyyy")}
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
                        {row.agentName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.amountRecievedByTowno}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.paymentMode}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.paymentReferenceNumber}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.paymentRecievingDate}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.grossBookingAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.netBookingAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.totalRoomRent}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.totalInclusionAmount}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townoToPayToTheHotel}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townotopaytoVendor}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.customerToPayToHotel}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.balancepayabletoTowno}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.townoProfit}
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
