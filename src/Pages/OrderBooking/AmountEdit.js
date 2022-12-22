import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Api from "../../Service/Api";
import { formatter } from "../../utils/formatNumber";
import { roomPaymentInitial } from "../../redux/actions/roomPaymentAction";
import { bookingDetialInitial } from "../../redux/actions/bookingActions";

const useStyles = makeStyles((theme) => ({
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
  heading: {
    fontSize: "24px",
    margin: "20px 0px",
  },
}));

export default function AmountEdit(props) {
  const classes = useStyles();
  const { onClose, open, editAmount } = props;
  const dispatch = useDispatch();
  const Auth = localStorage.getItem("auth");
  const uniqueId = localStorage.getItem("unique_id");
  const [loading, setLoading] = useState(false);
  const [townoPending, setTownoPending] = useState(0);
  const [hotelPending, setHotelPending] = useState(0);
  const [amount, setAmount] = useState(0);
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );

  useEffect(() => {
    setAmount(editAmount.amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClose = () => {
    onClose(true);
    setTownoPending(0);
    setHotelPending(0);
    setAmount(0);
  };

  const onSubmit = (data) => {
    // setLoading(true);
    const create = {
      uniqueId: uniqueId,
      propertyId: bookingDetails.propertyId,
      bookingId: bookingDetails.bookingId,
      amount: amount,
      townoPending: townoPending,
      hotelPending: hotelPending,
      updatedBy: Auth,
      id: editAmount.id,
      paymentType: editAmount.paymentType,
      referenceNumber: editAmount.referenceNumber,
    };

    let paidAmount;
    if (editAmount.amount <= amount) {
      paidAmount = bookingDetails.paidAmount;
    } else if (editAmount.amount < amount) {
      paidAmount = parseInt(bookingDetails.paidAmount) + parseInt(amount);
    } else {
      const Cal = parseInt(bookingDetails.paidAmount) - parseInt(amount);
      paidAmount = parseInt(bookingDetails.paidAmount) - Cal;
    }

    const Amountdata = {
      bookingId: bookingDetails.bookingId,
      pendingAmount: `${parseInt(townoPending) + parseInt(hotelPending)}`,
      townoPending: townoPending,
      hotelPending: hotelPending,
      updatedBy: Auth,
      paymentType: editAmount.paymentType,
      referenceNumber: editAmount.referenceNumber,
      paid: paidAmount,
    };
    Api.put(`roompayment/${editAmount.id}`, create).then((res) => {
      Api.post("paidamountModify", Amountdata);
      onClose(true);
      setLoading(false);
      dispatch(roomPaymentInitial(uniqueId, bookingDetails.bookingId));
      dispatch(bookingDetialInitial(bookingDetails.bookingId, uniqueId));
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
        <Typography variant="h5" component="h5" className={classes.heading}>
          Amount
        </Typography>
        <Grid item sm={12} xs={12}>
          <ul>
            <li>
              <span>Gross Amount</span>
              <span>
                &nbsp;:&nbsp; Rs.
                {formatter.format(bookingDetails.totalGrossPrice)}
              </span>
            </li>
            <li>
              <span>Paid Amount</span>
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
              <span> Payment Type</span>
              <span>
                &nbsp;:&nbsp;
                {editAmount.paymentType}
              </span>
            </li>
            <li>
              <span> Reference Number</span>
              <span>
                &nbsp;:&nbsp;
                {editAmount.referenceNumber}
              </span>
            </li>
          </ul>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={4}>
            <TextField
              name="amount"
              value={amount}
              type="number"
              label="Received Amount"
              variant="outlined"
              fullWidth
              size="small"
              autoComplete="off"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Grid>

          <Grid item lg={4}>
            <TextField
              name="townoPending"
              value={townoPending}
              type="number"
              label="Balance payable to Towno"
              variant="outlined"
              fullWidth
              size="small"
              autoComplete="off"
              onChange={(e) => {
                setTownoPending(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              name="hotelPending"
              value={hotelPending}
              label="Customer to pay to hotel"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              autoComplete="off"
              onChange={(e) => {
                setHotelPending(e.target.value);
              }}
            />
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
              <Button
                type="submit"
                className={classes.button}
                onClick={onSubmit}
              >
                Submit
              </Button>
            )}
            <Button
              color="secondary"
              onClick={handleClose}
              style={{
                background: "#121212",
                color: "#fff",
                margin: "10px",
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
