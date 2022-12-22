/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NoteIcon from "@material-ui/icons/Note";
import HotelIcon from "@material-ui/icons/Hotel";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { historyListInitial } from "../../redux/actions/bookingActions";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "20px 0px",
  },
  li: {
    fontSize: "15px",
    listStyle: "none",
    textTransform: "capitalize",
  },
  icon: {
    width: "20px",
    verticalAlign: "middle",
  },
  head: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "2",
    verticalAlign: "middle",
    marginLeft: "5px",
  },
  be: {
    fontWeight: "400",
  },
}));

export default function History() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingHistory = useSelector((state) => state.historyList.historyLists);
  var uniqueid = localStorage.getItem("unique_id");

  useEffect(() => {
    dispatch(historyListInitial(uniqueid, id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, uniqueid]);

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
          {bookingHistory.map((booking) => (
            <ul key={booking.id}>
              {booking.type == "New Payment Recived" ? (
                <>
                  <li className={classes.li}>
                    <MonetizationOnIcon className={classes.icon} />
                    <span className={classes.head}>New Payment Details</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "Room Occupied Changed" ? (
                <>
                  <li className={classes.li}>
                    <HotelIcon className={classes.icon} />
                    <span className={classes.head}>Room Changes</span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.be}>Before :</span>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                  <li className={classes.li}>
                    <span className={classes.be}>After</span>
                    {booking.afterChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "New Room Occupied Added" ? (
                <>
                  <li className={classes.li}>
                    <HotelIcon className={classes.icon} />
                    <span className={classes.head}>New Room Added </span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "Room Lead Changed" ? (
                <>
                  <li className={classes.li}>
                    <GroupAddIcon className={classes.icon} />
                    <span className={classes.head}>Room Lead Changes</span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.be}>Before :</span>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                  <li className={classes.li}>
                    <span className={classes.be}>After :</span>
                    {booking.afterChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "New Room Lead Added" ? (
                <>
                  <li className={classes.li}>
                    <GroupAddIcon className={classes.icon} />
                    <span className={classes.head}>New Room Lead Added</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "Inclusion Changed" ? (
                <>
                  <li className={classes.li}>
                    <AddCircleOutlineIcon className={classes.icon} />
                    <span className={classes.head}>Inclusion Changes</span>
                  </li>
                  <span></span>
                  <li className={classes.li}>
                    <span className={classes.be}>Before : </span>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                  <li className={classes.li}>
                    <span className={classes.be}>After:</span>
                    {booking.afterChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "New Inclusion Added" ? (
                <>
                  <li className={classes.li}>
                    <AddCircleOutlineIcon className={classes.icon} />
                    <span className={classes.head}>New Inclusion Added</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "New Note Added" ? (
                <>
                  <li className={classes.li}>
                    <NoteIcon className={classes.icon} />
                    <span className={classes.head}>New Note Details</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "Inclusion Deleted" ? (
                <>
                  <li className={classes.li}>
                    <DeleteIcon className={classes.icon} />
                    <span className={classes.head}>Inclusion Cancelled</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "Room Occupied Deleted" ? (
                <>
                  <li className={classes.li}>
                    <DeleteIcon className={classes.icon} />
                    <span className={classes.head}>Room Cancelled</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
              {booking.type == "Room Lead Deleted" ? (
                <>
                  <li className={classes.li}>
                    <DeleteIcon className={classes.icon} />
                    <span className={classes.head}>Room Lead Deleted</span>
                  </li>
                  <li className={classes.li}>
                    {booking.beforeChange.split("&&").toString()}
                  </li>
                </>
              ) : null}
            </ul>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
