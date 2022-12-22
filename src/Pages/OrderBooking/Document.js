import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "20px 0px",
    height: "60px",
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Itienary({ BookingData }) {
  const classes = useStyles();
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );
  return (
    <Paper className={classes.root}>
      <h4>{bookingDetails.vacinated ? "Yes Vaccinated" : "Not Vaccinated"}</h4>
    </Paper>
  );
}
