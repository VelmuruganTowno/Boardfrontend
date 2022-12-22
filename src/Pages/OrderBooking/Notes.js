import React, { useState, useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "20px 0px",
  },
  li: {
    fontSize: "15px",
  },
}));

export default function Notes() {
  const [bookingDetails, setbookingDetails] = useState([]);
  const uniqueId = localStorage.getItem("unique_id");
  const { id } = useParams();

  useEffect(() => {
    Api.get("bookingnote/" + uniqueId + "/" + id).then((res) => {
      setbookingDetails(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
          {bookingDetails.map((booking) => (
            <ul key={booking.id}>
              <li className={classes.li}>{booking.note}</li>
            </ul>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
