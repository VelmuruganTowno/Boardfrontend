/* eslint-disable eqeqeq */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, useRouteMatch } from "react-router-dom";
import Api from "../../Service/Api";
import Itienary from "./Itienary";
import Passenger from "./Passenger";
import Payment from "./Payment";
import History from "./History";
import Notes from "./Notes";
import Document from "./Document";
import TopSection from "./TopSection";
import axios from "axios";
import { baseurl } from "../../Service/httpCommon";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Stack } from '@mui/material';

export default function MobileDetailPanel() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [openCancel, setOpenCancel] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // const Download = (data) => {
  //   setLoading(true);
  //   const data1 = data.bookingId;
  //   const link = document.createElement("a");
  //   link.target = "_blank";
  //   link.download = `${data1}.pdf`;
  //   axios
  //     .get(`${baseurl}genpdf/${data1}.pdf/${data.uniqueId}/${data.bookingId}`, {
  //       responseType: "blob",
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //       link.href = URL.createObjectURL(new Blob([res.data], { type: "pdf" }));
  //       link.click();
  //     });
  // };

  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );
  const agentName = localStorage.getItem("auth");

  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  const cancelBooking = () => {
    Api.get(
      `bookingdetailsdelete/${bookingDetails.bookingId}/${agentName}`
    ).then((res) => {
      if (res.data === 1) {
        handleCloseCancel();
      }
    });
  };
  var formatter = new Intl.NumberFormat("en-IN", {
    // style: "currency",
    currency: "INR",
  });
  return (
    <div className={classes.root}>
      <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          style={{
            background: "#343A40",
            color: "#fff",
            borderRadius: "6px",
          }}
        >
          <Typography className={classes.heading}>Client Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block" }}>
          <div className={classes.bookingcard}>
            <div className={classes.title}>Client Details</div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>Name: {bookingDetails.clientName}</p>
            </div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>Email: {bookingDetails.clientEmail}</p>
            </div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>Mobile: {bookingDetails.clientMobile}</p>
            </div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>
                Address: {bookingDetails.clientAddress}
              </p>
            </div>
          </div>
          <div className={classes.bookingcard}>
            <div className={classes.title}>Agent Details</div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>Name: {agentName}</p>
            </div>
          </div>
          <div className={classes.bookingcard}>
            <div className={classes.title}>Payment Details</div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>
                Gross: : {formatter.format(bookingDetails.totalGrossPrice)}
              </p>
            </div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>
                Net: : {formatter.format(bookingDetails.totalNetPrice)}
              </p>
            </div>
            <div className={classes.bookingContent}>
              <p className={classes.p}>
                Paid: : {formatter.format(bookingDetails.paidAmount)}
              </p>
            </div>
          </div>

          {bookingDetails.bookingStatus == "Cancel" ? (
            <Button
              className={classes.button}
              color="secondary"
              fullWidth
              style={{ marginBottom: "10px", cursor: "none" }}
            >
              Cancelled Booking
            </Button>
          ) : (
            <Button
              className={classes.button}
              onClick={handleClickOpenCancel}
              color="secondary"
              fullWidth
              style={{ marginBottom: "10px" }}
            >
              Cancel Booking
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      <TopSection />
      <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          style={{
            background: "#F46D25",
            color: "#fff",
            borderRadius: "6px",
          }}
        >
          <Typography className={classes.heading}>
            {location.pathname == `${url}` ? "Itienary " : null}
            {location.pathname == `${url}/passenger` ? "Client Details " : null}
            {location.pathname == `${url}/payment` ? "Payment" : null}
            {location.pathname == `${url}/document` ? "Documents " : null}
            {location.pathname == `${url}/history` ? "History" : null}
            {location.pathname == `${url}/notes` ? "Notes" : null}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block" }}>
          <li className={classes.li}>
            <Link to={`${url}`} className={classes.link}>
              Itinerary
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={`${url}/passenger`} className={classes.link}>
              Client Details
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={`${url}/payment`} className={classes.link}>
              Payment
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={`${url}/document`} className={classes.link}>
              Documents
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={`${url}/history`} className={classes.link}>
              History
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={`${url}/notes`} className={classes.link}>
              Note
            </Link>
          </li>
        </AccordionDetails>
      </Accordion>
      {location.pathname == `${url}` ? <Itienary /> : null}
      {location.pathname == `${url}/passenger` ? <Passenger /> : null}
      {location.pathname == `${url}/payment` ? <Payment /> : null}
      {location.pathname == `${url}/document` ? <Document /> : null}
      {location.pathname == `${url}/history` ? <History /> : null}
      {location.pathname == `${url}/notes` ? <Notes /> : null}
      {/* {loading ? (
          <Button variant="contained">
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginLeft: "0px", marginRight: "8px" }}
            ></i>
            Loading
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => Download(bookingDetails)}>
              Print Voucher
            </Button>
          </>
        )} */}
      <Stack direction='row' justifyContent='right'  spacing={2}>
        <Button
          component={Link}
          to={`/clientVoucher/${bookingDetails.bookingId}`}
          target="_blank"
          // style={{
          //   width: '33%', height: '10%'
          // }}
        >
          Client Voucher
        </Button>
        <Button
          component={Link}
          to={`/hotelVoucher/${bookingDetails.bookingId}`}
          target="_blank"
          // style={{
          //   width: '32%', height: '10%'
          // }}
        >
          Hotel Voucher
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/bookinglist"
          style={{
            background: "#121212",
            color: "#fff"
          }}
        >
          Back
        </Button>
      </Stack>
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

    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    padding: "0px 10px",
  },
  bookingcard: {
    width: "100%",
    background: "#FFFFFF",
    boxShadow: "0px 1px 5px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "7px",
    margin: "10px 0px",
  },
  title: {
    background: "#F46D25",
    borderRadius: "7px 7px 0px 0px",
    padding: "0px 10px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#fff",
  },
  bookingContent: {
    display: "flex",
    padding: "0px 20px",
  },
  p: {
    margin: "3px 0px",
  },
  li: {
    listStyle: "none",
  },
  link: {
    fontFamily: "Poppins",
    color: "#000",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "28px",
  },
  bottom: {
    textAlign: "end",
  },
}));
