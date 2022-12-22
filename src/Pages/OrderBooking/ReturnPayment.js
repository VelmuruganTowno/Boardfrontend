/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Dialog,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import axios from "axios";
import MaterialSelect from "../../components/Select/MaterialSelect";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  bookingDetialInitial,
  historyListInitial,
} from "../../redux/actions/bookingActions";
import { useDispatch } from "react-redux";
import { formatter } from "../../utils/formatNumber";
import { toast } from "react-toastify";
import { roomPaymentInitial } from "../../redux/actions/roomPaymentAction";
const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "94vh",
    maxHeight: "100vh",
    minWidth: "80%",
    padding: "20px 40px",
    position: "absolute",
    margin: "0px",
    right: "0",
  },
  error: {
    color: "red",
  },
  icon: {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "1.5rem",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    position: "absolute",
    right: "15px",
    top: "5px",
    color: "#f46d25",
  },
  insidepaper: {
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    marginTop: "5px",
    fontSize: "20px",
    marginLeft: "-15px",
    background: "#eaeaea",
    padding: "10px",
    width: "100%",
  },
  title: {
    marginTop: "-10px",
    fontWeight: "bold",
    fontSize: "30px",
    color: "#F46D25",
    marginLeft: "-15px",
    margin: "0px 0px 20px 0px",
  },
  titles: {
    marginLeft: "15px",
    fontWeight: "bold",
    fontSize: "23px",
    color: "#fff",
    margin: "0px",
  },
}));
const paymentMode = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
  { value: "BankTransfer", label: "Bank Transfer" },
  { value: "Instamojo", label: "Instamojo" },
];
export default function ReturnPayment(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );
  const createdBy = localStorage.getItem("auth");
  const uniqueId = localStorage.getItem("unique_id");

  //Payment Detials
  const [paymentType, setPaymentType] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [refunddate, setRefunddate] = useState(null);
  const [disable, setDisable] = useState(false);
  const handleClose = () => {
    onClose(true);
  };
  const handleRefund = (data) => {
    setRefunddate(data);
    setDisable(true);
    setPaidAmount(bookingDetails.refundAmount);
  };
  // Payment Handle
  const handleReference = (e) => {
    setReferenceNumber(e.target.value);
  };
  const handlePayment = (selectedOption) => {
    setPaymentType(selectedOption.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const roomdata = {
      bookingId: bookingDetails.bookingId,
      createdBy: createdBy,
      amount: paidAmount,
      refunddate: refunddate,
      paymentType: paymentType,
      referenceNumber: referenceNumber,
      uniqueId: uniqueId,
      propertyId: bookingDetails.propertyId,
    };
    console.log(roomdata);
    Api.post("refundpayment", roomdata).then((res) => {
      dispatch(bookingDetialInitial(id, uniqueId));
    dispatch(historyListInitial(uniqueId, id));
    dispatch(roomPaymentInitial(uniqueId, id));
      if (res.data === 1) {
        console.data(res.data);
        onClose(true);
    dispatch(bookingDetialInitial(id, uniqueId));
    dispatch(historyListInitial(uniqueId, id));
    dispatch(roomPaymentInitial(uniqueId, id));
    setLoading(false);
      }
    });
    dispatch(bookingDetialInitial(id, uniqueId));
    dispatch(historyListInitial(uniqueId, id));
    dispatch(roomPaymentInitial(uniqueId, id));
    setLoading(false);
    onClose(true);
    toast.success("Amount Refunded SuccessFull");

    const bookingsenddata = {
      bookingId: bookingDetails.bookingId,
      refundAmount: paidAmount,
      refundDate: refunddate,
      refundMode: paymentType,
      refundBy:disable,
    };
    Api.put(baseurl + "RefundDatebookingdetails", bookingsenddata)
      .then((res) => {
        if (res.data === 1) {
          console.data(res.data);
   dispatch(bookingDetialInitial(id, uniqueId));
    dispatch(historyListInitial(uniqueId, id));
    dispatch(roomPaymentInitial(uniqueId, id));
    setLoading(false);
        }
      });
  };

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <div className={classes.root}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <p className={classes.title}>REFUND PAYMENT</p>
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  style={{
                    marginTop: "-25px",
                    marginLeft: "-15px",
                    backgroundColor: "#f46d25",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  <p className={classes.titles}>Amount Details</p>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  className={classes.insidepaper}
                  spacing={2}
                >
                  <Grid item sm={12} xs={12}>
                    <ul>
                      <li>
                        <span>Total Booking Amount (R+I)</span>
                        <span>
                          &nbsp;:&nbsp; Rs.
                          {formatter.format(bookingDetails.totalGrossPrice)}
                        </span>
                      </li>
                      <li>
                        <span>Received Amount</span>
                        <span>
                          &nbsp;:&nbsp; Rs.
                          {formatter.format(bookingDetails.paidAmount)}
                        </span>
                      </li>
                      <li>
                        <span>Customer to pay to hotel</span>
                        <span>
                          &nbsp;:&nbsp; Rs.
                          {formatter.format(bookingDetails.hotelPending)}
                        </span>
                      </li>
                      <li>
                        <span> Balance payable to Towno</span>
                        <span>
                          &nbsp;:&nbsp; Rs.
                          {formatter.format(bookingDetails.townoPending)}
                        </span>
                      </li>
                      <li>
                        <span> Refund Amount</span>
                        <span>
                          &nbsp;:&nbsp; Rs.
                          {formatter.format(bookingDetails.refundAmount)}
                        </span>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  style={{
                    marginTop: "25px",
                    marginLeft: "-15px",
                    backgroundColor: "#f46d25",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  <p className={classes.titles}>Payment Detail</p>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  className={classes.insidepaper}
                  spacing={2}
                >
                  <Grid item lg={6} sm={12} xs={12}>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        required
                        label="Refund Date"
                        inputVariant="outlined"
                        fullWidth
                        size="small"
                        value={refunddate}
                        onChange={handleRefund}
                        animateYearScrolling
                        format="dd/MM/yyyy"
                        variant="inline"
                        autoOk="true"
                      />
                      <DateRangeIcon className={classes.icon} />
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={12} xs={12}>
                    <TextField
                      name="paidAmount"
                      label="Refund Amount"
                      variant="outlined"
                      fullWidth
                      size="small"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"> ₹</InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: "#fff",
                          background: "#f46d25",
                          borderRadius: "4px",
                          padding: "2px 4px",
                        },
                      }}
                      disabled
                      type="number"
                      value={paidAmount}
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item lg={6} sm={12} xs={12}>
                    <MaterialSelect
                      placeholder="Payment Mode"
                      isSearchable
                      options={paymentMode}
                      onChange={handlePayment}
                      value={paymentType}
                    />
                  </Grid>
                  <Grid item lg={6} sm={12} xs={12}>
                    <TextField
                      name="referenceNumber"
                      value={referenceNumber || ""}
                      label="Reference Number"
                      onChange={handleReference}
                      variant="outlined"
                      fullWidth
                      size="small"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
                <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                  {loading ? (
                    <Button type="submit" className={classes.button} disabled>
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{
                          marginRight: "8px",
                        }}
                      ></i>
                      Submit
                    </Button>
                  ) : (
                    <Button type="submit" className={classes.button}>
                      Submit
                    </Button>
                  )}
                  <Button
                    onClick={handleClose}
                    style={{
                      margin: "10px",
                    }}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </MuiPickersUtilsProvider>
        </div>
      </Dialog>
    </>
  );
}
