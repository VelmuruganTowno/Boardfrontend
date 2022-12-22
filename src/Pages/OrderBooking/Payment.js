/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useParams } from "react-router-dom";
import { formatter } from "../../utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { roomPaymentInitial } from "../../redux/actions/roomPaymentAction";
import EditIcon from "@material-ui/icons/Edit";
import AmountEdit from "./AmountEdit";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "20px 0px",
  },
  text: {
    fontSize: "15px",
    border: "1px solid #F4F4F4",
    background: "#F4F4F4",
    padding: "10px",
    borderRadius: "4px",
    position: "relative",
  },
  voucherBtn: {
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "50px",
  },
  edit: {
    marginRight: "20px",
  },
}));

let isMounted = false;

export default function Payment() {
  const classes = useStyles();
  const uniqueId = localStorage.getItem("unique_id");
  const Role = localStorage.getItem("role");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [editAmount, seteditAmount] = useState({});
  const [open, setOpen] = useState(false);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );

  const roomPayment = useSelector((state) => state.roomPaymentList.roomPayment);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    dispatch(roomPaymentInitial(uniqueId, id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OpenDialog = (payments) => {
    isMounted = true;
    setOpen(true);
    seteditAmount(payments);
  };
  const CloseDialog = () => {
    setOpen(false);
    isMounted = false;
  };

  return (
    <div className={classes.root}>
      {width <= 768 ? (
        <>
          {roomPayment.map((payment) => (
            <div key={payment.id} className="bookingvouchercard">
              <div className="split">
                <div className="preview">
                  <p>Payment Type </p>:<span>{payment.paymentType}</span>
                </div>
                <div className="preview">
                  <p>Amount</p> : {payment.amountReceivedFor} 
                  <span>Rs.{formatter.format(payment.amount)}</span>
                </div>
                <div className="preview">
                  <p>Reference Number</p> :
                  <span>
                    {payment.referenceNumber !== ""
                      ? payment.referenceNumber
                      : "-"}{" "}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <h4 style={{ margin: "0px", color: "#f46d25" }}>Payment Details</h4>
          </Grid>
          <Grid item lg={6}>
            <div className={classes.text}>
              <span
                style={{
                  position: "absolute",
                  top: "-11px",
                  background: "#ccc",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              >
                Total Room Rent (R)
              </span>
              Rs.{formatter.format(bookingDetails.totalRoomRentAmount)}
            </div>
          </Grid>
          <Grid item lg={6}>
            <div className={classes.text}>
              <span
                style={{
                  position: "absolute",
                  top: "-11px",
                  background: "#ccc",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              >
                Total Inclusion Amount (I)
              </span>
              {formatter.format(bookingDetails.totalInclusionAmount)}
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className={classes.text}>
              <span
                style={{
                  position: "absolute",
                  top: "-11px",
                  background: "#f46d25",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                Total Booking Amount (R+I)
              </span>
              {formatter.format(bookingDetails.totalGrossPrice)}
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className={classes.text}>
              <span
                style={{
                  position: "absolute",
                  top: "-11px",
                  background: "#000",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                
              Net Payout (H+V)
              </span>
              {formatter.format(bookingDetails.totalNetPrice)}
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className={classes.text}>
              <span
                style={{
                  position: "absolute",
                  top: "-11px",
                  background: "#00a300",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
               Commission
              </span>
              {formatter.format(bookingDetails.profit)}
            </div>
          </Grid>
          <Grid item lg={12}>
            <h4 style={{ margin: "0px", color: "#f46d25" }}>
              Payment Received
            </h4>
          </Grid>
          <Grid item lg={12}>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead style={{ background: "#c4c4c4" }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>Reference Number</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    {Role == "Admin" || Role == "Super Admin" ? (
                      <TableCell align="left">Edit</TableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomPayment.map((payments) => {
                    return (
                      <TableRow
                        style={{ background: "#F4F4F4" }}
                        key={payments.id}
                      >
                        <TableCell>{payments.createdAt}</TableCell>

                        <TableCell>{payments.paymentType}</TableCell>
                        <TableCell>
                          {payments.referenceNumber !== ""
                            ? payments.referenceNumber
                            : "-"}{" "}
                        </TableCell>
                        <TableCell align="left">
                        {payments.amountReceivedFor} 
                          Rs.{formatter.format(payments.amount)}
                        </TableCell>
                        {Role == "Admin" || Role == "Super Admin" ? (
                          <TableCell align="left">
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                OpenDialog(payments);
                              }}
                            />
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <table
              style={{
                width: "100%",
                padding: "5px",
                background: "#F4F4F4",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "90%",
                      fontWeight: "600",
                      paddingLeft: "30px",
                    }}
                  >
                    Total Amount Received
                  </td>
                  <td style={{ width: "10%" }}>
                    {formatter.format(bookingDetails.paidAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item lg={12}>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead style={{ background: "#c4c4c4" }}>
                  <TableRow>
                    <TableCell align="center">
                      Customer To Pay At Hotel on Arrival
                    </TableCell>
                    <TableCell align="center">
                      Balance Payable To Towno (if any)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow style={{ background: "#F4F4F4" }}>
                    <TableCell align="center">
                      {formatter.format(bookingDetails.hotelPending)}
                    </TableCell>
                    <TableCell align="center">
                      {formatter.format(bookingDetails.townoPending)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
      {isMounted ? (
        <AmountEdit open={open} onClose={CloseDialog} editAmount={editAmount} />
      ) : null}
    </div>
  );
}
