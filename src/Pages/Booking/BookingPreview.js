import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Dialog,
  Grid,
  Button,
} from "@material-ui/core";
import "./preview.css";
import _ from "lodash";
import { formatter } from "../../utils/formatNumber";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#d5d5d5c7",
    color: "#F46D25",
    fontWeight: "700",fontSize: 18,
    padding: "10px",
  },
  body: {fontWeight: "600",
    fontSize: 25,
  },
}))(TableCell);
const StyledTableCellb = withStyles((theme) => ({
  head: {
    backgroundColor: "#d5d5d5c7",
    color: "black",
    fontWeight: "700",fontSize: 18,
    padding: "10px",
  },
  body: {fontWeight: "600",
    fontSize: 25,
  },
}))(TableCell);
const StyledTableCellg = withStyles((theme) => ({
  head: {
    backgroundColor: "#d5d5d5c7",
    color: "#00a300",
    fontWeight: "700",fontSize: 18,
    padding: "10px",
  },
  body: {fontWeight: "600",
    fontSize: 25,
  },
}))(TableCell);

const StyledTableCell1 = withStyles((theme) => ({
  head: {
    backgroundColor: "#d5d5d5c7",
    color: "#fff",
    fontWeight: "700",fontSize: 18,
    padding: "6px",
  },
  body: {
    fontSize: 25,fontWeight: "600",
    padding: "6px",
  },
}))(TableCell);

const useStyles = makeStyles(() => ({
  insidepaper: {
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    marginTop: "-38px",
    padding: "10px",
    width: "75%",
  },

  paper: {
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "-8px",
    width: "101.5%",
  },
  titles: {
    marginTop: "-20px",
    fontWeight: "bold",
    fontSize: "32px",
    margin: "0px",
  },
  dialogPaper: {
    minHeight: "100%",
    minWidth: "90%",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
    padding: "20px",
    "@media (max-width: 767px)": {
      position: "relative",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100%",
      overflowY: "scroll",
      width: "100%",
      minHeight: "95%",
    },
  },
}));

export default function BookingPreview(props) {
  const classes = useStyles();
  const { onClose, open, selectme, loading, WithoutMail } = props;
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  console.log(selectme);
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleClose = () => {
    onClose(true);
  };
  const PersonFind = { name: "", mobile: "", altMobile: "", email: "" };
  const InclusionFind = { inclusion: "", amount: 0 };

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        {width <= 768 ? (
          <div>
            <div className="bookingcardnew">
              <div className="title">
                <h2>Client Details</h2>
              </div>
              <div className="split">
                <table style={{ width: "100%", padding: "10px" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "38%" }}>Name</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%", textTransform: "capitalize" }}>
                        {selectme.clientName}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "38%" }}>Mobile</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%" }}>{selectme.clientMobile}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "38%" }}>Email</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%" }}>{selectme.clientEmail}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "38%" }}>Address</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%", textTransform: "uppercase" }}>
                        {selectme.clientAddress}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "38%" }}>Vaccinated</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%" }}>
                        {selectme.vacinated ? "Yes" : "No"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bookingcardnew">
              <div className="title">
                <h2>Hotel Details</h2>
              </div>

              <table style={{ width: "100%", padding: "10px" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "38%" }}>Name</td>
                    <td style={{ width: "2%" }}>:</td>
                    <td style={{ width: "60%", textTransform: "capitalize" }}>
                      {selectme.hotelName}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "38%" }}>Star Rating</td>
                    <td style={{ width: "2%" }}>:</td>
                    <td style={{ width: "60%" }}>{selectme.starRating}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "38%" }}>Phone</td>
                    <td style={{ width: "2%" }}>:</td>
                    <td style={{ width: "60%" }}>{selectme.hotelContact}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "38%" }}>Address</td>
                    <td style={{ width: "2%" }}>:</td>
                    <td style={{ width: "60%", textTransform: "uppercase" }}>
                      {selectme.hotelAddress}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "38%" }}>Email</td>
                    <td style={{ width: "2%" }}>:</td>
                    <td style={{ width: "60%" }}>{selectme.hotelEmail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableContainer component={Paper} style={{ margin: "5px 0px" }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell1 align="center">Checkin</StyledTableCell1>
                    <StyledTableCell1 align="center">Checkout</StyledTableCell1>
                    <StyledTableCell1 align="center">
                      No of Nights
                    </StyledTableCell1>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="center">{selectme.checkin}</TableCell>
                  <TableCell align="center">{selectme.checkout}</TableCell>
                  <TableCell align="center">{selectme.night}</TableCell>
                </TableBody>
              </Table>
            </TableContainer>
            {selectme.roomInputs.map((room, index) => (
              <div className="bookingcardnew">
                <div className="title">
                  <h2>
                    {index + 1} {room.roomType}
                  </h2>
                </div>
                <table style={{ width: "100%", padding: "10px" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "38%" }}>Meal Plan</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%", textTransform: "uppercase" }}>
                        {room.boardBasic}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "38%" }}>No of Adults</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%" }}>{room.adult}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "38%" }}>No of Child</td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "60%", textTransform: "uppercase" }}>
                        {room.child}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
            {selectme.personInput.some((item) =>
              _.isEqual(item, PersonFind)
            ) ? null : (
              <>
                {selectme.personInput.map((person, index) => (
                  <div className="bookingcardnew">
                    <div className="title">
                      <h2>{index + 1} Lead Details</h2>
                    </div>
                    <div className="preview">
                      <p>Name</p> :<span>{person.name}</span>
                    </div>
                    <div className="preview">
                      <p>Mobile</p> :<span>{person.mobile}</span>
                    </div>
                    <div className="preview">
                      <p>Alt Mobile</p> :<span>{person.altMobile}</span>
                    </div>
                    <div className="preview">
                      <p>Email</p> :<span>{person.email}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {selectme.inclusionInput.some((item) =>
              _.isEqual(item, InclusionFind)
            ) ? null : (
              <Grid item sm={12}>
                <TableContainer
                  component={Paper}
                  style={{ marginBottom: "20px" }}
                >
                  <Table>
                    <TableHead className="tableHead">
                      <TableRow>
                        <StyledTableCell1>Sl.No</StyledTableCell1>
                        <StyledTableCell1>Inclusion</StyledTableCell1>
                        <StyledTableCell1>Vender Amount</StyledTableCell1>
                        <StyledTableCell1>Amount</StyledTableCell1>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectme.inclusionInput.map((inc, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{inc.inclusion}</TableCell>
                          <TableCell>{formatter.format(inc.amount)}</TableCell>
                          <TableCell>
                            {formatter.format(inc.vendorAmount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
              <Table>
                <TableHead className="tableHead">
                  <TableRow>
                    <StyledTableCell1 align="center">
                      Total Room Rent
                    </StyledTableCell1>
                    <StyledTableCell1 align="center">
                      Total Inclusion Amount
                    </StyledTableCell1>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="center">{selectme.totalRoomRent}</TableCell>
                  <TableCell align="center">
                    {selectme.totalInclusionAmount}
                  </TableCell>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
              <Table>
                <TableHead className="tableHead">
                  <TableRow>
                    <StyledTableCell1 align="center">Gross</StyledTableCell1>
                    <StyledTableCell1 align="center">Nett</StyledTableCell1>
                    <StyledTableCell1 align="center">
                      PaymentType
                    </StyledTableCell1>
                    <StyledTableCell1 align="center">
                      Amount Received
                    </StyledTableCell1>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {formatter.format(selectme.totalGrossPrice)}
                    </TableCell>
                    <TableCell align="center">
                      {formatter.format(selectme.totalNetPrice)}
                    </TableCell>
                    <TableCell align="center">{selectme.paymentType}</TableCell>
                    <TableCell>
                      {formatter.format(selectme.paidAmount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table>
                <TableHead className="tableHead">
                  <TableRow>
                    <StyledTableCell1 align="center">
                      Balance payable to Towno
                    </StyledTableCell1>
                    <StyledTableCell1 align="center">
                      Customer to pay to hotel
                    </StyledTableCell1>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      {formatter.format(selectme.townoPending)}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {formatter.format(selectme.hotelPending)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Grid
              item
              sm={12}
              style={{ textAlign: "center", margin: "10px 0px" }}
            >
              {loading ? (
                <Button variant="contained" color="primary" disabled>
                  <i className="fa fa-refresh fa-spin"></i>
                  Booking
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={WithoutMail}
                >
                  Book Now
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "10px", background: "#121212" }}
                onClick={handleClose}
              >
                Edit Booking
              </Button>
            </Grid>
          </div>
        ) : (
          <>
            <div>
              <Grid container  spacing={2}
                      style={{
                        marginLeft: "5px",
                     
                      }}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    style={{
                      color: "#f46d25",
                      marginTop: "40px",
                    }}
                  >
                    <p className={classes.titles}>Basic Information</p>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      style={{
                        marginLeft: "2px",
                        marginRight: "15px",
                      }}
                    >
                      <Grid
                        item
                        lg={12}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#d5d5d5c7",marginBottom: "40px",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginLeft: "12px",
                          }}
                        >
                          <Grid
                            item
                            lg={6}
                            style={{
                              color: "black",
                              marginTop: "-20px",marginBottom: "-20px",
                              marginRight: "-15px",fontSize: 20,
                            }}
                          >
                            <h3>Client Details</h3>
                          </Grid>
                          <Grid
                            item
                            lg={6}
                            style={{
                              marginTop: "-20px",
                              marginLeft: "20px",
                              marginRight: "-5px",marginBottom: "-20px",
                              color: "black",fontSize: 20,
                            }}
                          >
                            <h3>Hotel Details</h3>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12} className={classes.insidepaper}>
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginLeft: "20px",
                            marginBottom: "12px",
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item lg={5}>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Name
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.clientName}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Mobile
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.clientMobile}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Email
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.clientEmail}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Vaccinated
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.vacinated ? "Yes" : "No"}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item lg={1} />
                            <Grid
                              item
                              lg={6}
                              style={{
                                marginLeft: "-2px",
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Name
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.hotelName}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Star Rating
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.starRating}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Address
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.hotelAddress}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Phone
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.hotelContact}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  lg={3}
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Email
                                </Grid>
                                <Grid
                                  item
                                  lg={1}
                                  style={{
                                    color: "#f46d25",
                                  }}
                                >
                                  {" "}
                                  :
                                </Grid>{" "}
                                <Grid item lg={7}>
                                  {selectme.hotelEmail}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {selectme.personInput.some((item) =>
                    _.isEqual(item, PersonFind)
                  ) ? null : (
                    <Grid item lg={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 750 }} aria-label="simple table">
                          <TableHead className="tableHead">
                            <TableRow>
                              <StyledTableCell align="center">
                                Serial No.
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                |
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Name
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                |
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Mobile No.
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                |
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Alternate Mobile
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                |
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Email Id.
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectme.personInput.map((person, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 1,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="center" />
                                <TableCell align="center">
                                  {person.name}
                                </TableCell>
                                <TableCell align="center" />
                                <TableCell align="center">
                                  {person.mobile}
                                </TableCell>
                                <TableCell align="center" />
                                <TableCell align="center">
                                  {person.altMobile}
                                </TableCell>
                                <TableCell align="center" />
                                <TableCell align="center">
                                  {person.email}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}
                </Grid>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    style={{
                      color: "#f46d25",
                      marginTop: "40px",
                    }}
                  >
                    <p className={classes.titles}>Booking Information</p>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    style={{
                      marginTop: "-15px",
                    }}
                  >
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">
                              Checkin
                            </StyledTableCell>{" "}
                            <StyledTableCell align="center">|</StyledTableCell>
                            <StyledTableCellb align="center">
                              No of Nights
                            </StyledTableCellb>{" "}
                            <StyledTableCell align="center">|</StyledTableCell>
                            <StyledTableCell align="center">
                              Checkout
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell align="center">
                            {selectme.checkin}
                          </TableCell>{" "}
                          <TableCell align="center" />
                          <TableCell align="center">
                            {selectme.night}
                          </TableCell>{" "}
                          <TableCell align="center" />
                          <TableCell align="center">
                            {selectme.checkout}
                          </TableCell>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      style={{
                        marginLeft: "2px",
                        marginRight: "15px",
                      }}
                    >
                      <Grid
                        item
                        lg={12}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#d5d5d5c7",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginLeft: "12px",
                          }}
                        >
                          <Grid
                            item
                            lg={12}
                            style={{
                              color: "black",
                              marginTop: "-20px",
                              marginRight: "-15px",
                              marginBottom: "-20px",fontSize: 20,
                            }}
                          >
                            <h3>Room Details</h3>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        style={{
                          marginTop: "-20px",
                        }}
                      >
                        {selectme.roomInputs.map((room, index) => (
                          <Grid container spacing={2} className={classes.paper}>
                            <Grid item sm={6}>
                              <Grid container spacing={2}>
                                <Grid item lg={12}>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={5}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#f46d25",
                                      }}
                                    >
                                      No of Rooms
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={6}>
                                      {room.rooms}
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={5}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#f46d25",
                                      }}
                                    >
                                      No of Adults
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={6}>
                                      {room.adult}
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={5}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#f46d25",
                                      }}
                                    >
                                      No of Childern
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={6}>
                                      {room.child}
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={5}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#f46d25",
                                      }}
                                    >
                                      Room Type
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={6}>
                                      {room.roomType}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item sm={5}>
                              <Grid container spacing={2}>
                                <Grid item lg={12}>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={6}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#f46d25",
                                      }}
                                    >
                                      Meal Plan
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={4}>
                                      {room.boardBasic}
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={6}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#f46d25",
                                      }}
                                    >
                                      Selling Price
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={4}>
                                    {formatter.format(room.totalGrossRoomRent)}
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={6}
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Net to Hotel per Night(P)
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={4}>
                                    {formatter.format(room.perRoomRent)}
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      lg={6}
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Net to Hotel Total(H = N*P)
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      style={{
                                        color: "#f46d25",
                                      }}
                                    >
                                      {" "}
                                      :
                                    </Grid>{" "}
                                    <Grid item lg={4}>
                                    {formatter.format(room.totalNetRoomRent)}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  {selectme.inclusionInput.some((item) =>
                    _.isEqual(item, InclusionFind)
                  ) ? null : (
                    <Grid item lg={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Inclusion
                              </StyledTableCell>{" "}
                              <StyledTableCell align="center">
                                |
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Inclusion Selling Price
                              </StyledTableCell>{" "}
                              <StyledTableCell align="center">
                                |
                              </StyledTableCell>
                              <StyledTableCellb align="center">
                                Net to Vendor
                              </StyledTableCellb>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectme.inclusionInput.map((inc, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  {inc.inclusion}
                                </TableCell>
                                <TableCell align="center" />
                                <TableCell align="center">
                                  {formatter.format(inc.amount)}
                                </TableCell>
                                <TableCell align="center" />
                                <TableCell align="center">
                                  {formatter.format(inc.vendorAmount)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}
                </Grid>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    style={{
                      color: "#f46d25",
                      marginTop: "40px",
                    }}
                  >
                    <p className={classes.titles}>Payment Details</p>
                  </Grid>
                  <Grid item lg={6}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        lg={12}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#d5d5d5c7",
                          marginLeft: "5px",
                        }}
                      >
                        {" "}
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginLeft: "12px",
                          }}
                        >
                          <Grid
                            item
                            lg={12}
                            style={{
                              color: "black",
                              marginTop: "-20px",
                              marginRight: "-15px",
                              marginBottom: "-20px",
                            }}
                          >
                            <h3>Payment Breakup</h3>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        style={{
                          marginTop: "-20px",
                          marginLeft: "8px",
                        }}
                      >
                        <Grid container spacing={2} className={classes.paper}>
                          <Grid item sm={12}>
                            <Grid container spacing={2}>
                              <Grid item lg={12}>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={5}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#f46d25",
                                    }}
                                  >
                                    Total Room Rent(R)
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={6}>
                                  {formatter.format(selectme.totalRoomRent)}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={5}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#f46d25",
                                    }}
                                  >
                                    Total Inclusion Amount
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={6}>{formatter.format(selectme.totalInclusionAmount)}
                                   
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={5}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#f46d25",
                                    }}
                                  >
                                    Total Booking Amount(R+I)
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={6}>
                                  {formatter.format(selectme.totalGrossPrice)}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={5}
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    Net Payout (H+V)
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={6}>
                                  {formatter.format(selectme.totalNetPrice)}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={5}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#00a300",
                                    }}
                                  >
                                    Commission
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={6}>
                                  {formatter.format(selectme.profit)} 
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={6}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        lg={12}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#d5d5d5c7",
                          marginLeft: "5px",
                        }}
                      >
                        {" "}
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginLeft: "12px",
                          }}
                        >
                          <Grid
                            item
                            lg={12}
                            style={{
                              color: "black",
                              marginTop: "-20px",
                              marginRight: "-15px",
                              marginBottom: "-20px",
                            }}
                          >
                            <h3>Transaction Summary</h3>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        style={{
                          marginTop: "-20px",
                          marginLeft: "8px",
                        }}
                      >
                        <Grid container spacing={2} className={classes.paper}>
                          <Grid item sm={12}>
                            <Grid container spacing={2}>
                              <Grid item lg={12}>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={6}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#f46d25",
                                    }}
                                  >
                                    Amount Received
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={5}>
                                  {formatter.format(selectme.paidAmount)}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={6}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#f46d25",
                                    }}
                                  >
                                    Balance Payable on Arrival (BPAH)
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={5}>
                                  {formatter.format(selectme.hotelPending)}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={6}
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    Payment Mode
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={5}>
                                  {selectme.paymentType}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={6}
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    Reference Number
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={5}>
                                    {selectme.referenceNumber}
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    lg={6}
                                    style={{
                                      fontWeight: "bold",
                                      color: "#f46d25",
                                    }}
                                  >
                                    Balance payable to Towno (if any)
                                  </Grid>
                                  <Grid
                                    item
                                    lg={1}
                                    style={{
                                      color: "#f46d25",
                                    }}
                                  >
                                    {" "}
                                    :
                                  </Grid>{" "}
                                  <Grid item lg={5}>
                                  {formatter.format(selectme.townoPending)}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">
                              Towno Gross Amount (Projected)
                            </StyledTableCell>{" "}
                            <StyledTableCell align="center">|</StyledTableCell>
                            <StyledTableCellg align="center">
                              Profit After Tax
                            </StyledTableCellg>
                            <StyledTableCell align="center" />
                            <StyledTableCell align="center" />
                            <StyledTableCell align="center" />
                            <StyledTableCell align="center" />
                            <StyledTableCell align="center" />
                            <StyledTableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell align="center">
                          {formatter.format(selectme.projectorAmount)}
                          </TableCell>
                          <TableCell align="center" />
                          <TableCell align="center">
                          {formatter.format(selectme.profitTax)}
                          </TableCell>
                          <TableCell align="center" />
                          <TableCell align="center" />
                          <TableCell align="center" />
                          <TableCell align="center" />
                          <TableCell align="center" />
                          <TableCell align="center" />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Grid item lg={12} />
                <Grid item lg={12} />
                <Grid item sm={12} style={{ textAlign: "center" }}>
                  {loading ? (
                    <Button variant="contained" color="primary" disabled>
                      <i className="fa fa-refresh fa-spin"></i>
                      Book Now
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={WithoutMail}
                    >
                      Book Now
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginLeft: "10px", background: "#121212" }}
                    onClick={handleClose}
                  >
                    Edit Booking
                  </Button>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
