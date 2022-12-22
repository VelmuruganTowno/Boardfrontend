/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import BlockIcon from "@material-ui/icons/Block";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatter } from "../../utils/formatNumber";

const useStyles = makeStyles(() => ({
  root: {
    background: "#000",
    width: "18%",
    position: "fixed",
    height: "100vh",
    top: "68px",
    paddingTop: "20px",
  },
  bookingId: {
    background: "#f46d25",
    height: "50px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    paddingLeft: "20px",
  },
  title: {
    color: "#f46d25",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "5px 0px",
  },
  client: {
    paddingLeft: "20px",
  },
  p: {
    margin: "0px",
    display: "flex",
    alignItems: "flex-end",
    color: "#fff",
    fontSize: "14px",
    padding: "2px",
  },
  inside: {
    margin: "2px 2px 0px 10px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  insidep: {
    margin: "0px 2px 0px 5px",
    fontWeight: "600",
  },
  button: {
    width: "90%",
    height: "30px",
    marginTop: "10px",
    display: "flex",
    verticalAlign: "middle",
    alignItems: "center",
    cursor: "pointer",
    background: "#fff",
    border: "none",
    borderRadius: "2px",
  },
  icons: {
    color: "#f46d25",
    marginRight: "10px",
  },
}));

export default function DetailPanel() {
  const classes = useStyles();
  const [openCancel, setOpenCancel] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [openrefund, setOpenrefund] = useState(false);
  const [openref, setOpenref] = useState(false);
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );
  const [loading, setLoading] = useState(false);
  const agentName = localStorage.getItem("auth");

  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
  };
  const handleref = () => {
    setOpenref(false);
    setPaidAmount(0);
  };

  const Refund = () => {
    setOpenref(true);
  };

  const handleCloserefund = () => {
    setOpenrefund(false);
  };

  const Download = (data) => {
    setLoading(true);
    const data1 = data.bookingId;
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = `${data1}.pdf`;
    Api.get(`genpdf/${data1}.pdf/${data.uniqueId}/${data.bookingId}`, {
      responseType: "blob",
    }).then((res) => {
      setLoading(false);
      link.href = URL.createObjectURL(new Blob([res.data], { type: "pdf" }));
      link.click();
    });
  };
  const [cancelReason, setCancelReason] = useState("");
  const handleCkeditor = (event, editor) => {
    const data = editor.getData();
    setCancelReason(data);
  };
  // const createdBy = localStorage.getItem("auth");
  // const uniqueId = localStorage.getItem("unique_id");
  const handleSubmit = (e) => {
    e.preventDefault();
    const refunddatasend = {
      bookingId: bookingDetails.bookingId,
      cancelReason: cancelReason,
      refundAmount: paidAmount,
      isRefund: "Yes",
    };
    console.log(refunddatasend);
    Api.put("CancelRefundAmountReason", refunddatasend)
      .then((res) => {
        if (res.data === 1) {
          console.data(res.data);
          handleCloserefund();
        }
      });
    handleCloserefund();
  };
  const handlePaid = (e) => {
    setPaidAmount(e.target.value);
  };
  const cancelBooking = () => {
    Api.get(
      `bookingdetailsdelete/${bookingDetails.bookingId}/${agentName}`
    ).then((res) => {
      if (res.data === 1) {
        handleCloseCancel();
      }
    });
    setOpenrefund(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.bookingId}>
        <FileCopyIcon style={{ paddingRight: "10px" }} />
        {bookingDetails.bookingId}
      </div>
      <div className={classes.client}>
        <p className={classes.title}>Client Details</p>
        <p className={classes.p}>
          <PersonOutlineIcon />
          <span className={classes.inside}> : {bookingDetails.clientName}</span>
        </p>
        <p className={classes.p}>
          <PhoneIcon />
          <span className={classes.inside}>
            {" "}
            : {bookingDetails.clientMobile}
          </span>
        </p>
      </div>
      <hr style={{ margin: "10px 20px 10px 20px" }}></hr>
      <div className={classes.client}>
        <p className={classes.title}>Agent Details</p>
        <p className={classes.p}>
          <PersonOutlineIcon />
          <span className={classes.inside}> : {bookingDetails.createdBy}</span>
        </p>
      </div>
      <hr style={{ margin: "10px 20px 10px 20px" }}></hr>
      <div className={classes.client}>
        <p className={classes.title}>Payment Details</p>
        <p className={classes.p}>
          <span style={{ width: "40px" }}>Gross</span>
          <span className={classes.inside}>
            : Rs. {formatter.format(bookingDetails.totalGrossPrice)}
          </span>
        </p>
        <p className={classes.p}>
          <span style={{ width: "40px" }}>Net</span>
          <span className={classes.inside}>
            : Rs. {formatter.format(bookingDetails.totalNetPrice)}
          </span>
        </p>
        <p className={classes.p}>
          <span style={{ width: "40px" }}>Paid</span>
          <span className={classes.inside}>
            : Rs. {formatter.format(bookingDetails.paidAmount)}
          </span>
        </p>
      </div>
      <div className={classes.client}>
        {bookingDetails.bookingStatus == "Cancel" ? (
          <button className={classes.button} style={{ cursor: "none" }}>
            <BlockIcon className={classes.icons} />
            <span>Cancelled Booking</span>
          </button>
        ) : (
          <button className={classes.button} onClick={handleClickOpenCancel}>
            <BlockIcon className={classes.icons} />
            <span>Cancel Booking</span>
          </button>
        )}
        <Button
          component={Link}
          to={`/clientVoucher/${bookingDetails.bookingId}`}
          target="_blank"
          style={{
            margin: "5px 20px 0px 0px",
            width: "90%",
          }}
        >
          Client Voucher
        </Button>
        <Button
          component={Link}
          to={`/hotelVoucher/${bookingDetails.bookingId}`}
          target="_blank"
          style={{
            margin: "5px 20px 0px 0px",
            width: "90%",
          }}
        >
          Hotel Voucher
        </Button>

      </div>
      <div>
        <Dialog
          open={openCancel}
          onClose={handleCloseCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Cancel Booking"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure, you want to cancel the booking?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancel} color="secondary">
              No
            </Button>
            <Button onClick={cancelBooking} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openrefund}
          onClose={handleCloserefund}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {" "}
            <b>Refund Details</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={2}>
                <Grid item lg={12} sm={12} xs={12}>
                  <b>Are you sure, you want to Refund for the booking?</b>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                <Grid item lg={8} sm={8} xs={8}/>
                <Grid item lg={1} sm={1} xs={1}>
                    <Button onClick={Refund} color="primary" autoFocus>
                      Yes
                    </Button>
                    </Grid>
                  <Grid item lg={1} sm={1} xs={1}/>
                  <Grid item lg={1} sm={1} xs={1}>
                    {" "}
                    <Button onClick={handleref} color="secondary">
                      No
                    </Button>
                  </Grid>
                  </Grid>
                </Grid>
                {openref == true ? (
                  <Grid item lg={12} sm={12} xs={12}>
                    <TextField
                      name="paidAmount"
                      label="Refund Amount"
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
                ) : null}
                <Grid item lg={12} sm={12} xs={12}>
                  <b>Reason :</b>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                  <div>
                    <CKEditor
                      editor={ClassicEditor}
                      type="inline"
                      name="cancelReason"
                      onChange={handleCkeditor}
                      value={cancelReason}
                      content={cancelReason}
                      data={cancelReason}
                    />
                  </div>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloserefund} color="secondary">
              CANCEL
            </Button>
            <Button onClick={handleSubmit} color="primary" autoFocus>
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
