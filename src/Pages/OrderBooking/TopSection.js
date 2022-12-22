/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NoteIcon from "@material-ui/icons/Note";
import NoteAdd from "./NoteAdd";
import AddPax from "./AddPax";
import RecievePayment from "./RecievePayment";
import { useSelector } from "react-redux";
import ReturnPayment from "./ReturnPayment";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "inline-flex",
  },
  button: {
    width: "160px",
    height: "30px",
    marginLeft: "2px",
    marginRight: "5px",
    display: "flex",
    verticalAlign: "middle",
    alignItems: "center",
    border: "1px solid #f46d25",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#F4F4F4",
  },
  icons: {
    color: "#f46d25",
    marginRight: "6px",
  },
}));

let isMounted = false;
export default function TopSection() {
  const [openPax, setOpenPax] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openPaymentReturn, setOpenPaymentReturn] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );

  const OpenDialogPayment = () => {
    setOpenPayment(true);
  };

  const CloseDialogPayment = () => {
    setOpenPayment(false);
  };

  const OpenDialogPaymentReturn = () => {
    setOpenPaymentReturn(true);
  };

  const CloseDialogPaymentReturn = () => {
    setOpenPaymentReturn(false);
  };
  const OpenDialogNote = () => {
    setOpenNote(true);
  };
  const CloseDialogNote = () => {
    setOpenNote(false);
  };

  const OpenDialogPax = () => {
    isMounted = true;
    setOpenPax(true);
  };

  const CloseDialogPax = () => {
    isMounted = false;
    setOpenPax(false);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {bookingDetails.bookingStatus == "Cancel" ||
      bookingDetails.bookingStatus == "Completed" ? null : width <= 768 ? (
        <>
          <Button
            size="small"
            onClick={OpenDialogPax}
            style={{ margin: "10px 2px 10px 0px" }}
          >
            Add Pax
          </Button>
        </>
      ) : (
        <>
          <button className={classes.button} onClick={OpenDialogPax}>
            <GroupAddIcon className={classes.icons} />
            <span>Add Pax</span>
          </button>
        </>
      )}

      {bookingDetails.bookingStatus == "Cancel" ? (
        <button className={classes.button} onClick={OpenDialogPaymentReturn}>
          <MonetizationOnIcon className={classes.icons} />
          <span>Refund Details</span>
        </button>
      ) : bookingDetails.bookingStatus == "Completed" ? null : width <= 768 ? (
        <>
          <Button
            size="small"
            onClick={OpenDialogPayment}
            style={{ margin: "10px 10px 10px 10px" }}
          >
            Recieve Payment
          </Button>
        </>
      ) : (
        <>
          <button className={classes.button} onClick={OpenDialogPayment}>
            <MonetizationOnIcon className={classes.icons} />
            <span>Recieve Payment</span>
          </button>
        </>
      )}

      {width <= 768 ? (
        <>
          <Button
            size="small"
            onClick={OpenDialogNote}
            style={{ margin: "10px 5px 10px 0px" }}
          >
            Add Note
          </Button>
        </>
      ) : (
        <>
          <button className={classes.button} onClick={OpenDialogNote}>
            <NoteIcon className={classes.icons} />
            <span>Add Note</span>
          </button>
        </>
      )}
      {isMounted ? <AddPax open={openPax} onClose={CloseDialogPax} /> : null}
      <NoteAdd open={openNote} onClose={CloseDialogNote} />
      <RecievePayment open={openPayment} onClose={CloseDialogPayment} />
      <ReturnPayment
        open={openPaymentReturn}
        onClose={CloseDialogPaymentReturn}
      />
    </div>
  );
}
