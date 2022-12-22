/* eslint-disable default-case */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./agentDashboard.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Api from "../../Service/Api";
import _ from "lodash";
import Pagination from "@material-ui/lab/Pagination";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "name", label: "S.No" },
  { id: "clientName", label: "Client Name" },
  {
    id: "hotelName",
    label: "Hotel Name",
  },
  {
    id: "bookingId",
    label: "Booking Id",
  },
  {
    id: "checkIn",
    label: "Check In",
  },
  {
    id: "paidAmount",
    label: "Amount Received",
  },
  {
    id: "partialPayment",
    label: "Payable to Towno",
  },
  {
    id: "pendingAmount",
    label: "Payable to Hotel",
  },
];

export default function UpcomingAgentPayment() {
  const [isActive, setIsActive] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [upcomingPayment, setUpcomingPayment] = useState([]);
  const [daysChange, setDaysChange] = useState("today");
  const uniqueId = localStorage.getItem("unique_id");
  const Auth = localStorage.getItem("auth");
  const Role = localStorage.getItem("role");
  const notAdmin = _.indexOf(["Agent Admin"], Role, 0) === -1
  const [width, setWidth] = useState(window.innerWidth);
  const [pageNumber, setPageNumber] = useState(0);
  const DataPerPage = 10;
  const pagesVisited = pageNumber * DataPerPage;
  const pageCount = Math.ceil(upcomingPayment.length / DataPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    UpcomingCheckin();
  }, [daysChange]);

  const UpcomingCheckin = () => {
    // let url;
    // switch (true) {
    //   case daysChange == "today" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
    //     url = `TodayReminderBooking/${uniqueId}`;
    //     break;
    //   case daysChange == "week" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
    //     url = `WeekReminderBooking/${uniqueId}`;
    //     break;
    //   case daysChange == "month" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
    //     url = `MonthReminderBooking/${uniqueId}`;
    //     break;
    //   case daysChange == "today":
    //     url = `TodayAgentReminderBooking/${uniqueId}/${Auth}`;
    //     break;
    //   case daysChange == "week":
    //     url = `WeekAgentReminderBooking/${uniqueId}/${Auth}`;
    //     break;
    //   case daysChange == "month":
    //     url = `MonthAgentReminderBooking/${uniqueId}/${Auth}`;
    //     break;
    // }
    var url = `TravelAgentDashboardBookingReminder/${uniqueId}/${daysChange}`
    if (notAdmin) { url = `TravelAgentStaffDashboardBookingReminder/${uniqueId}/${daysChange}/${Auth}` }
    Api.get(url).then((res) => {
      setUpcomingPayment(res.data);
    });
  };

  return (
    <div>
      {width <= 768 ? (
        <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            style={{
              background: "#343A40",
              color: "#fff",
              borderRadius: "6px",
            }}
          >
            <Typography> Upcoming Payment Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "5px" }}>
            <Grid container>
              <Grid item xs={12} style={{ margin: "5px 0px" }}>
                <select
                  name="daysChange"
                  style={{
                    scrollBehavior: "smooth",
                    padding: "6px",
                    borderRadius: "2px",
                    width: "100%",
                  }}
                  value={daysChange}
                  onChange={(e) => {
                    setDaysChange(e.target.value);
                  }}
                >
                  <option value="today">Today</option>
                  <option value="week">Next 7 days</option>
                  <option value="month">Next 30 days</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                {upcomingPayment
                  .slice(pagesVisited, pagesVisited + DataPerPage)
                  .map((row) => {
                    const {
                      id,
                      clientName,
                      hotelName,
                      bookingId,
                      checkIn,
                      paidAmount,
                      partialPayment,
                      pendingAmount,
                    } = row;
                    return (
                      <div
                        key={id}
                        style={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#f46d25",
                            color: "#fff",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "50%",
                              textTransform: "capitalize",
                              backgroundColor: "#f46d25",
                              display: "inline-block",
                            }}
                          >
                            {clientName}
                          </div>
                          <div
                            style={{ width: "50%", display: "inline-block" }}
                          >
                            {bookingId}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "50%",
                              textTransform: "capitalize",
                              marginBottom: "5px",
                              display: "inline-block",
                            }}
                          >
                            checkIn :{checkIn}
                          </div>
                          <div
                            style={{
                              width: "50%",
                              display: "inline-block",
                              marginBottom: "5px",
                            }}
                          >
                            Amount Paid : {paidAmount}
                          </div>
                          <div
                            style={{
                              width: "50%",
                              display: "inline-block",
                              marginBottom: "5px",
                            }}
                          >
                            Towno Pending : {partialPayment}
                          </div>
                          <div
                            style={{
                              width: "50%",
                              display: "inline-block",
                              marginBottom: "5px",
                            }}
                          >
                            Hotel Pending : {pendingAmount}
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "inline-block",
                              marginBottom: "5px",
                            }}
                          >
                            {hotelName}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Grid>
              {_.isEmpty(upcomingPayment) ? null :  <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Pagination
                  count={pageCount}
                  color="primary"
                  onPageChange={changePage}
                />
              </Grid>}
              
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className="accordion-item">
          <div className="accordion-title">
            <div style={{ color: "#fff", fontWeight: "600" }}>
              Upcoming Payment Status
            </div>
            <div>
              <select
                name="daysChange"
                style={{
                  border: "none",
                  outline: "none",
                  scrollBehavior: "smooth",
                  padding: "4px",
                  borderRadius: "5px",
                  marginRight: "25px",
                }}
                value={daysChange}
                onChange={(e) => {
                  setDaysChange(e.target.value);
                }}
              >
                <option value="today">Today</option>
                <option value="week">Next 7 days</option>
                <option value="month">Next 30 days</option>
              </select>
              {isActive ? (
                <KeyboardArrowDownIcon
                  className="keyIcon"
                  onClick={() => setIsActive(!isActive)}
                />
              ) : (
                <KeyboardArrowUpIcon
                  className="keyIcon"
                  onClick={() => setIsActive(!isActive)}
                />
              )}
            </div>
          </div>
          {isActive && (
            <div className="accordion-content">
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {column.label}
                          </TableCell>
                        ))}
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {upcomingPayment
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow key={row.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell
                                style={{ textTransform: "capitalize" }}
                              >
                                {row.clientName}
                              </TableCell>
                              <TableCell>{row.hotelName}</TableCell>
                              <TableCell>{row.bookingId}</TableCell>
                              <TableCell>{row.checkIn}</TableCell>
                              <TableCell>{row.paidAmount}</TableCell>
                              <TableCell>{row.partialPayment}</TableCell>
                              <TableCell>{row.pendingAmount}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                    {_.isEmpty(upcomingPayment) && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                            <Typography
                              gutterBottom
                              align="center"
                              variant="subtitle1"
                            >
                              No Upcoming Payments
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={upcomingPayment.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
