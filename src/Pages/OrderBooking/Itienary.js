import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Rating from "./Rating";
import moment from "moment";
import "./Voucher.scss";
import Api from "../../Service/Api";
import { useParams } from "react-router-dom";
import { formatter } from "../../utils/formatNumber";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    padding: "10px",
  },
  text: {
    fontSize: "15px",
    margin: "10px 20px",
    border: "1px solid #F4F4F4",
    background: "#F4F4F4",
    padding: "10px",
    borderRadius: "4px",
  },
  textRoom: {
    fontSize: "15px",
    margin: "10px 20px 0px 20px",
    border: "1px solid #F4F4F4",
    background: "#c4c4c4",
    padding: "10px",
    borderRadius: "4px",
    fontWeight: "500",
  },
  textcontent: {
    margin: "0px 20px",
    border: "1px solid #F4F4F4",
    background: "#F4F4F4",
    borderRadius: "4px",
    padding: "10px",
  },
  voucherBtn: {
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "50px",
  },
}));

export default function Itienary() {
  const classes = useStyles();
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );
  const { id } = useParams();
  const uniqueid = localStorage.getItem("unique_id");
  const selectedCheckin = moment(bookingDetails.checkin).toDate();
  const selectedCheckout = moment(bookingDetails.checkout).toDate();
  const [width, setWidth] = useState(window.innerWidth);
  const [roomoccupied, setRoomoccupied] = useState([]);
  const [inclusion, setInclusion] = useState([]);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    RoomData();
    InclusionData();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RoomData = () => {
    Api.get(`roomoccupied/${uniqueid}/${id}`).then((res) => {
      setRoomoccupied(res.data);
    });
  };
  const InclusionData = () => {
    Api.get(`bookinginclusion/${uniqueid}/${id}`).then((res) => {
      if (res.data.length > 0) {
        setInclusion(res.data);
      }
    });
  };

  return (
    <>
      {width <= 768 ? (
        <div className="bookingvouchercard">
          <div className="title">
            <h2>{bookingDetails.hotelName}</h2>
            <p>
              <Rating rating={bookingDetails.starRating}></Rating>
            </p>
          </div>
          <div className="split">
            <div className="preview">{bookingDetails.hotelAddress}</div>
            <div className="preview">
              <p>No of Rooms </p>:<span>{bookingDetails.noofRooms}</span>
            </div>
            <div className="preview">
              <p>No of Guest</p> :
              <span>
                {bookingDetails.noOfAdults} Adult ,{bookingDetails.noOfChildren}{" "}
                Childern
              </span>
            </div>
            <div className="preview">
              <p>Check-In</p> :
              <span>{format(selectedCheckin, "d MMM yy")}</span>
            </div>
            <div className="preview">
              <p>Check-Out</p> :
              <span>{format(selectedCheckout, "d MMM yy")}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Grid container>
            <Grid item lg={6}>
              <div className={classes.text}>
                Hotel Name : {bookingDetails.hotelName}{" "}
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className={classes.text}>
                Star Rating :{" "}
                <Rating rating={bookingDetails.starRating}></Rating>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className={classes.text}>
                <span>No of Rooms</span> : {bookingDetails.noofRooms}
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className={classes.text}>
                <span>No of Guest</span> : {bookingDetails.noOfAdults} Adult ,
                {bookingDetails.noOfChildren} Childern
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className={classes.text}>
                <span>Check-In :</span>
                {format(selectedCheckin, "d MMM yy")}
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className={classes.text}>
                <span>Check-Out :</span>
                {format(selectedCheckout, "d MMM yy")}
              </div>
            </Grid>
            <Grid item lg={12}>
              <div className={classes.text}>
                Hotel Address : {bookingDetails.hotelAddress}
              </div>
            </Grid>
            <Grid item lg={12}>
              <h4
                style={{ margin: "0px", color: "#f46d25", padding: "0px 20px" }}
              >
                Room Details
              </h4>
            </Grid>
            <Grid item lg={12}>
              <div className={classes.textRoom}>
                <span>Total No of Rooms</span> : {bookingDetails.noofRooms}
              </div>
            </Grid>
            <Grid container item lg={12} className={classes.textcontent}>
              {roomoccupied.map((item) => (
                <Grid item lg={4}>
                  <ul
                    key={item.id}
                    style={{
                      listStyle: "none",
                      margin: "0px",
                      fontWeight: "500",
                      paddingLeft: "10px",
                      fontSize: "14px",
                      borderRight: "1px solid #c4c4c4",
                    }}
                  >
                    <li>{item.roomType}</li>
                    <li>
                      <span>No of Rooms</span> : {item.rooms}
                    </li>
                    <li>
                      <span>Room Rent</span> :{" "}
                      {formatter.format(item.perRoomRent)}
                    </li>
                    <li>
                      <span>Net Room Rent</span> :{" "}
                      {formatter.format(item.totalNetRoomRent)}
                    </li>
                    <li>
                      <span>Gross Room Rent</span> :{" "}
                      {formatter.format(item.totalGrossRoomRent)}
                    </li>
                  </ul>
                </Grid>
              ))}
            </Grid>
            <Grid item lg={12}>
              <h4
                style={{
                  marginBottom: "0px",
                  color: "#f46d25",
                  padding: "0px 20px",
                }}
              >
                Inclusion Details
              </h4>
            </Grid>
            <Grid item lg={12}>
              <div className={classes.textRoom}>
                <span>Total Inclusion Amount</span> :{" "}
                {formatter.format(bookingDetails.totalInclusionAmount)}
              </div>
            </Grid>
            <Grid container item lg={12} className={classes.textcontent}>
              <table
                style={{
                  width: "100%",
                  padding: "5px",
                  background: "#F4F4F4",
                  borderRadius: "8px",
                }}
              >
                <tbody>
                  {inclusion.map((item) => (
                    <tr key={item.id}>
                      <td style={{ width: "30%", fontWeight: "600" }}>
                        {item.inclusion}
                      </td>
                      <td style={{ width: "2%" }}>:</td>
                      <td style={{ width: "68%" }}>
                        {formatter.format(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
