/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Dialog, Button,  InputAdornment, TextField } from "@material-ui/core";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import axios from "axios";
import MaterialSelect from "../../components/Select/MaterialSelect";
import { formatter } from "../../utils/formatNumber";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  bookingDetialInitial,
  historyListInitial,
} from "../../redux/actions/bookingActions";
import { useDispatch } from "react-redux";
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
  { value: "creditnote", label: "Credit Note" },
];
export default function RecievePayment(props) {
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
  const [bendingAmount, setBendingAmount] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [hotelPendingAmount, setHotelPendingAmount] = useState(0);
  const [townoPending, settownoPending] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const handleClose = () => {
    onClose(true);
    setPaymentType("");
    setPaidAmount(0);
    setBendingAmount(0);
    setReferenceNumber("");
    setHotelPendingAmount(0);
    settownoPending(0);
  };

  const handlePaid = (e) => {
    setPaidAmount(e.target.value);
    let totalPaid =
      parseInt(bookingDetails.paidAmount) + parseInt(e.target.value);
    let setpend = parseInt(bookingDetails.totalGrossPrice) - totalPaid;
    setBendingAmount(setpend);
    setHotelPendingAmount(setpend);
   
  };
 
  const handleReference = (e) => {
    setReferenceNumber(e.target.value);
  };
  const handlePayment = (selectedOption) => {
    setPaymentType(selectedOption.value);
  };

  const ChangetownoBending = (e) => {
    settownoPending(e.target.value);
    setHotelPendingAmount(bendingAmount - e.target.value);

  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const total = parseInt(paidAmount) + parseInt(bookingDetails.paidAmount);
    const Amountdata = {
      bookingId: bookingDetails.bookingId,
      createdBy: createdBy,
      paid: total,
      paymentType: paymentType,
      referenceNumber: referenceNumber,
      townoPending: townoPending,
      hotelPending: hotelPendingAmount,
      pending: `${parseInt(townoPending) + parseInt(hotelPendingAmount)}`,
    };
    const roomdata = {
      bookingId: bookingDetails.bookingId,
      createdBy: createdBy,
      amount: paidAmount,
      paymentType: paymentType,
      referenceNumber: referenceNumber,
      uniqueId: uniqueId,
      propertyId: bookingDetails.propertyId,
      townoPending: townoPending,
      hotelPending: hotelPendingAmount,
      pending: `${parseInt(townoPending) + parseInt(hotelPendingAmount)}`,
    };

    Api.post("roompayment", roomdata);
    Api.post("paidamountModify", Amountdata).then((res) => {
      if (res.data === 1) {
        handleClose();
        dispatch(bookingDetialInitial(id, uniqueId));
        dispatch(historyListInitial(uniqueId, id));
        dispatch(roomPaymentInitial(uniqueId, id));
        toast.success("Payment Added SuccessFull");
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2}><Grid item sm={12} xs={12}>
                <p className={classes.title}>ADD PAYMENT</p>
              </Grid>
              <Grid item sm={12} xs={12}  style={{
                marginTop: "-25px",
                marginLeft: "-15px",
                        backgroundColor: "#f46d25",
                        borderRadius: "8px",
                        color: "#fff",
                      }}>
                <p className={classes.titles}>Amount Details</p>
              </Grid> 
              <Grid
                        container
                        item
                        sm={12}
                        className={classes.insidepaper}
                        spacing={2}
                      >
              <Grid item sm={12} xs={12} >
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
                </ul>
              </Grid></Grid><Grid item sm={12} xs={12}  style={{
                        marginTop: "25px",
                        marginLeft: "-15px",
                        backgroundColor: "#f46d25",
                        borderRadius: "8px",
                        color: "#fff",
                      }}>
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
                <TextField
                  name="paidAmount"
                  label="Received Amount"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
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
                  type="number"
                  value={paidAmount || ""}
                  onChange={handlePaid}
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
                  name="hotelPendingAmount"
                  value={hotelPendingAmount}
                  label="Customer to pay to hotel"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  disabled
                  size="small"
                  type="number"
                  autoComplete="off"
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
              <Grid item lg={6} sm={12} xs={12}>
                <TextField
                  name="townoPending"
                  value={townoPending || ""}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
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
                  label="Balance payable to Towno"
                  variant="outlined"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  onChange={ChangetownoBending}
                />
              </Grid>
              
              </Grid>
              <Grid item sm={12} xs={12} style={{  marginTop: "6px",textAlign: "center" }}>
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
        </div>
      </Dialog>
    </>
  );
}
