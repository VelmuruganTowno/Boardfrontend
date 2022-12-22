/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MaterialSelect from "../../components/Select/MaterialSelect";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "100px 10px",
  },
  title: {
    width: "80%",
  },
  rate: {
    width: "20%",
    background: "#fff",
    color: "#F46D25",
    textAlign: "center",
    borderRadius: "5px",
  },
  icon: {
    color: "#F46D25",
    verticalAlign: "middle",
    marginLeft: "10px",
  },
  heading: {
    margin: "0",
  },
}));

export default function RoomListView() {
  const classes = useStyles();

  const [date, changeDate] = useState(new Date());
  const [hotelList, setHotelList] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [roomList, setRoomList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [roleCheck, setRoleCheck] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");

  useEffect(() => {
    hotelFetch();
    if (hotelName) {
      RoomFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, hotelName]);

  const hotelFetch = () => {
    Api.get("propertybasicpropertydetailsall").then((res) => {
      setHotelList(res.data);
    });
  };

  const RoomFetch = async () => {
    const apiStartDate = format(date, "yyyy-MM-dd");
    await Api
      .get(
        `calenderview/${hotelName}/${apiStartDate}/${apiStartDate}`
      )
      .then((res) => {
        let AddRent = res.data.map((item) => ({
          cprate: +item.cprate + +item.roomRent,
          aprate: +item.aprate + +item.roomRent,
          calendarDate: item.calendarDate,
          displayName: item.displayName,
          id: item.id,
          maprate: +item.maprate + +item.roomRent,
          propertyId: item.propertyId,
          roomRent: item.roomRent,
          soldRoom: item.soldRoom,
          disable: item.soldRoom == 0 ? true : false,
        }));
        console.log(AddRent);
        setRoomList(AddRent);
      });
  };

  const handleChangeHotel = (option) => {
    setHotelName(option.value);
    let someValue = hotelList.filter((item) => item.propertyId == option.value);
    const Checked = someValue[0].uniqueId == uniqueid;
    setRoleCheck(Checked);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "75%" }}>
                <MaterialSelect
                  placeholder="Hotels"
                  options={hotelList.map((hotel) => ({
                    label: hotel.displayName,
                    value: hotel.propertyId,
                  }))}
                  onChange={handleChangeHotel}
                  value={hotelName}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth
                autoOk
                variant="static"
                openTo="date"
                value={date}
                disableToolbar={true}
                onChange={changeDate}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            {roomList.map((roomList) => (
              <>
                <Accordion
                  style={{ borderRadius: "6px", marginBottom: "10px" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                    style={{
                      background: "#F46D25",
                      color: "#fff",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography className={classes.heading}>
                      {roomList.displayName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      background: "#EEF1F3",
                      margin: "10px 0px",
                      borderRadius: "3px",
                      color: "#343A40",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className={classes.title}>Rooms Available </span>{" "}
                    <span className={classes.rate}>{roomList.soldRoom}</span>
                  </AccordionDetails>
                  <AccordionDetails
                    style={{
                      background: "#EEF1F3",
                      margin: "10px 0px",
                      borderRadius: "3px",
                      color: "#343A40",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className={classes.title}>
                      Base Price <PeopleIcon className={classes.icon} />{" "}
                    </span>{" "}
                    <span className={classes.rate}>{roomList.roomRent}</span>
                  </AccordionDetails>
                  <AccordionDetails
                    style={{
                      background: "#EEF1F3",
                      margin: "10px 0px",
                      borderRadius: "3px",
                      color: "#343A40",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className={classes.title}>
                      CP
                      <PersonIcon className={classes.icon} />
                    </span>{" "}
                    <span className={classes.rate}>{roomList.cprate}</span>
                  </AccordionDetails>
                  <AccordionDetails
                    style={{
                      background: "#EEF1F3",
                      margin: "10px 0px",
                      borderRadius: "3px",
                      color: "#343A40",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className={classes.title}>
                      MAP
                      <PersonIcon className={classes.icon} />
                    </span>{" "}
                    <span className={classes.rate}>{roomList.maprate}</span>
                  </AccordionDetails>
                  <AccordionDetails
                    style={{
                      background: "#EEF1F3",
                      margin: "10px 0px",
                      borderRadius: "3px",
                      color: "#343A40",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className={classes.title}>
                      AP
                      <PersonIcon className={classes.icon} />
                    </span>{" "}
                    <span className={classes.rate}>{roomList.aprate}</span>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
