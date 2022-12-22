/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import Select from "react-select";
import {
  format,
  addDays,
  addWeeks,
  subWeeks,
  subDays,
  startOfDay,
} from "date-fns";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KingBedOutlinedIcon from "@material-ui/icons/KingBedOutlined";
import axios from "axios";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import { useHistory } from "react-router-dom";
import moment from "moment";
import PeopleIcon from "@material-ui/icons/People";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function RoomListView() {
  const classes = useStyles();
  const history = useHistory();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const date = new Date();
  const start = startOfDay(date);
  const [roomRent, setRoomRent] = useState([]);
  const [startDate, setStartDate] = useState(start);
  const [hotelList, setHotelList] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [roomDisplayName, setRoomDisplayName] = useState([]);

  const myNext = addDays(start, 525);
  const myPrev = subDays(start, 63);
  const endDay = addDays(startDate, 6);
  let hasAdmin = localStorage.getItem("role");

  useEffect(() => {
    hotelFetch();
    if (hotelName) {
      RoomFetch();
      DisplayNameGet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelName, startDate]);

  const DisplayNameGet = async () => {
    await Api.get("getdisplayname/" + hotelName).then((res) => {
      setRoomDisplayName(res.data);
    });
  };

  const handleSoldroom = (e, id) => {
    var result = [...roomList];
    const result1 = result.map((x) => {
      if (x.id === id) x.soldRoom = e.target.value;
      return x;
    });
    var found = result1.filter(function (item) {
      return item.id === id;
    });
    setRoomRent(found);
  };

  const handleroom = (e, id) => {
    var result = [...roomList];
    const result1 = result.map((x) => {
      if (x.id === id) x.roomRent = e.target.value;
      return x;
    });
    var found = result1.filter(function (item) {
      return item.id === id;
    });
    setRoomRent(found);
  };

  const updateRent = (e) => {
    const RoomRentUpdate = {
      calendarDate: e.map((item) => item.calendarDate).toString(),
      displayName: e.map((item) => item.displayName).toString(),
      id: e.map((item) => item.id).toString(),
      propertyId: e.map((item) => item.propertyId).toString(),
      roomRent: e.map((item) => item.roomRent).toString(),
    };
    Api.post("calenderviewupdate", RoomRentUpdate).then((res) => {
      if (res.data) {
        RoomFetch();
      }
    });
  };
  const updateSold = (e) => {
    const RoomRentUpdate = {
      calendarDate: e.map((item) => item.calendarDate).toString(),
      displayName: e.map((item) => item.displayName).toString(),
      id: e.map((item) => item.id).toString(),
      propertyId: e.map((item) => item.propertyId).toString(),
      roomRent: e.map((item) => item.soldRoom).toString(),
    };
    Api
      .post("calenderviewsoldupdate", RoomRentUpdate)
      .then((res) => {
        if (res.data) {
          RoomFetch();
        }
      });
  };

  const hotelFetch = () => {
    Api.get("propertybasicpropertydetailsall").then((res) => {
      setHotelList(res.data);
    });
  };

  const RoomFetch = async () => {
    const apiStartDate = format(startDate, "yyyy-MM-dd");
    const end = addDays(startDate, 6);
    const apiEndDate = format(end, "yyyy-MM-dd");
    await Api
      .get(
        `calenderviewall/${hotelName}/${apiStartDate}/${apiEndDate}`
      )
      .then((res) => {
        let AddRent = res.data.map((item) => ({
          eprate: +item.roomRent - +item.cprate,
          aprate: +item.aprate * item.adultBase + +item.roomRent,
          maprate: +item.roomRent + +item.maprate * item.adultBase,
          calendarDate: item.calendarDate,
          displayName: item.displayName,
          id: item.id,
          propertyId: item.propertyId,
          roomRent: item.roomRent,
          soldRoom: item.soldRoom,
          roomRentGold: item.roomRentGold,
          roomRentSilver: item.roomRentSilver,
          roomRentBronze: item.roomRentBronze,
          adultBase: item.adultBase,
          disable: item.soldRoom == 0 ? true : false,
        }));
        setRoomList(AddRent);
      });
  };

  const handleChangeHotel = (option) => {
    setHotelName(option.value);
  };
  const bulkUpdate = () => {
    if (hotelName !== "" && hotelName !== null && hotelName !== undefined) {
      history.push(`/bulkupdate/${hotelName}`);
    }
  };

  const DatePickerCustom = React.forwardRef(({ onClick }, ref) => (
    <CalendarTodayIcon
      className={classes.Dateicon}
      onClick={onClick}
      ref={ref}
    />
  ));

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setStartDate((date) => {
        return subDays(date, 7);
      });

      setCurrentMonth(subWeeks(currentMonth, 1));
      RoomFetch();
    }
    if (btnType === "next") {
      setStartDate((date) => {
        return addDays(date, 7);
      });
      setCurrentMonth(addWeeks(currentMonth, 1));
      RoomFetch();
    }
  };

  let days = [];

  const renderCells = () => {
    const dateFormat = "d";
    const dateFormatMonth = " MMM ";
    const dateFormatWeek = "EEE";
    const rows = [];
    let day = startDate;
    let formattedDate = "";
    let formattedDateMonth = "";
    let formattedDateWeek = "";

    if (myPrev <= startDate && myNext >= startDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        formattedDateMonth = format(day, dateFormatMonth);
        formattedDateWeek = format(day, dateFormatWeek);
        days.push(
          <div key={day} className={classes.view}>
            <div className={classes.week}>{formattedDateWeek}</div>
            <div className={classes.day}>{formattedDate}</div>
            <div>{formattedDateMonth}</div>
          </div>
        );
        var nextDateTime = new Date(day);
        if (myNext == nextDateTime && myNext == endDay) {
          break;
        }
        if (myPrev == day) {
          break;
        }
        day = addDays(day, 1);
      }
    }
    rows.pop();
    rows.push(
      <div className={classes.calendar} key={day}>
        {days}
      </div>
    );

    return (
      <div className={classes.main}>
        <Grid container>
          <Grid item md={3} lg={3}>
            <div className={classes.roomRent}>
              <h4>
                <KingBedOutlinedIcon style={{ verticalAlign: "middle" }} />
                Rooms & Rates
              </h4>
            </div>
          </Grid>
          <Grid item md={9} lg={9}>
            {rows}
          </Grid>
        </Grid>
      </div>
    );
  };

  const myPrev2 = subDays(start, 56);
  const myNext2 = addDays(start, 518);

  var Next = moment(myNext).isSame(startDate);
  const Previous = moment(myPrev).isSame(startDate);
  let extraDisablePre = myPrev2 <= startDate;
  let extraDisableNex = myNext2 >= startDate;

  return (
    <>
      <div className={classes.root}>
        <Paper
          className={classes.paper}
          variant="outlined"
          style={{ width: "100%" }}
        >
          <Grid container spacing={2} style={{ margin: "20px 0px" }}>
            <Grid item sm={6}>
              <h4 className={classes.heading}>Room Rate</h4>
            </Grid>
            <Grid item sm={2}>
              <Select
                placeholder="Hotels"
                options={hotelList.map((hotel) => ({
                  label: hotel.displayName,
                  value: hotel.propertyId,
                }))}
                onChange={handleChangeHotel}
              />
            </Grid>

            <Grid item sm={2}>
              {hasAdmin === "Admin" || hasAdmin === "Super Admin"||hasAdmin == "Data Manger" ? (
                <h3>
                 <Button onClick={bulkUpdate} style={{ float: "right", margin: "0px",marginTop: "-20px", color: "#F46D25" }}>BULK UPDATE</Button> 
                </h3>
              ) : null}
            </Grid>
            <Grid item sm={2}>
              <div style={{ float: "right", marginRight: "24px" }}>
                <div style={{ display: "inline-block" }}>
                  <ArrowBackIosIcon
                    onClick={() => changeWeekHandle("prev")}
                    className={`${
                      Previous
                        ? classes.iconDisable
                        : classes.icon && extraDisablePre
                        ? classes.icon
                        : classes.iconDisable
                    }`}
                    // className={classes.icon}
                  />
                </div>
                <div style={{ display: "inline-block" }}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<DatePickerCustom />}
                    minDate={subDays(new Date(), 56)}
                    maxDate={addDays(new Date(), 514)}
                  />
                </div>
                <div style={{ display: "inline-block" }}>
                  <ArrowForwardIosIcon
                    onClick={() => changeWeekHandle("next")}
                    className={`${
                      Next
                        ? classes.iconDisable
                        : classes.icon && extraDisableNex
                        ? classes.icon
                        : classes.iconDisable
                    }`}
                    // className={classes.icon}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <div className={classes.layout}>{renderCells()}</div>

          <div className={classes.layout}>
            <div className={classes.main1}>
              <Grid container>
                {roomDisplayName.map((roomData) => {
                  return (
                    <>
                      <Grid item md={3} sm={3} lg={3}>
                        <div className={classes.roomType}>
                          <div style={{ position: "relative" }}>
                            <h4
                              style={{
                                margin: "0px",
                                position: "absolute",
                                top: "-22px",
                                color: "#F46D25",
                                left: "10px",
                              }}
                            >
                              {roomData.displayName}
                            </h4>
                            <Paper
                              key={roomData.id}
                              style={{
                                borderRadius: "0px",
                              }}
                            >
                              <h4 className={classes.roomTypeContent}>
                                Rooms Available
                              </h4>
                              <h4 className={classes.roomTypeContent}>
                                <span style={{ width: "50%" }}>
                                  Base Price (CP){" "}
                                </span>
                                <span className={classes.man}>
                                  <PeopleIcon />
                                </span>
                              </h4>
                            </Paper>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        md={9}
                        sm={9}
                        lg={9}
                        className={classes.roomrateList}
                      >
                        {days.map((roomDate, index) => (
                          <Paper className={classes.paperList}>
                            <div className={classes.list}>
                              {roomList.find(
                                (item) =>
                                  item.calendarDate ===
                                    format(
                                      new Date(roomDate.key),
                                      "yyyy-MM-dd"
                                    ) &&
                                  item.displayName === roomData.displayName
                              ) ? (
                                roomList
                                  .filter(
                                    (item) =>
                                      item.calendarDate ===
                                        format(
                                          new Date(roomDate.key),
                                          "yyyy-MM-dd"
                                        ) &&
                                      item.displayName === roomData.displayName
                                  )
                                  .map((item) => (
                                    <>
                                      <input
                                        name="soldroom"
                                        type="text"
                                        autoComplete="off"
                                        value={item.soldRoom || ""}
                                        onChange={(e) =>
                                          handleSoldroom(e, item.id)
                                        }
                                        onBlur={() => updateSold(roomRent)}
                                        className={classes.roomavailable}
                                      />
                                    </>
                                  ))
                              ) : (
                                <input
                                  name="roomRent"
                                  type="text"
                                  autoComplete="off"
                                  disabled
                                  className={classes.roomavailabledisable}
                                />
                              )}
                            </div>

                            <div className={classes.list}>
                              {roomList.find(
                                (item) =>
                                  item.calendarDate ===
                                    format(
                                      new Date(roomDate.key),
                                      "yyyy-MM-dd"
                                    ) &&
                                  item.displayName === roomData.displayName
                              ) ? (
                                roomList
                                  .filter(
                                    (item) =>
                                      item.calendarDate ===
                                        format(
                                          new Date(roomDate.key),
                                          "yyyy-MM-dd"
                                        ) &&
                                      item.displayName === roomData.displayName
                                  )
                                  .map((item) => (
                                    <>
                                      <input
                                        name="roomRent"
                                        type="text"
                                        autoComplete="off"
                                        value={item.roomRent || ""}
                                        onChange={(e) => handleroom(e, item.id)}
                                        onBlur={() => updateRent(roomRent)}
                                        disabled={item.disable}
                                        className={
                                          item.disable
                                            ? classes.roomavailabledisable
                                            : classes.roomavailable
                                        }
                                      />
                                    </>
                                  ))
                              ) : (
                                <input
                                  name="roomRent"
                                  type="text"
                                  autoComplete="off"
                                  disabled
                                  className={classes.roomavailabledisable}
                                />
                              )}
                            </div>
                          </Paper>
                        ))}
                      </Grid>
                      <Grid item md={12} sm={3} lg={12}>
                        <Accordion style={{ borderRadius: "0px" }}>
                          <AccordionSummary
                            style={{ borderRadius: "0px" }}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <h4
                              style={{
                                margin: "0px",
                                color: "#F46D25",
                              }}
                            >
                              Meal Plan
                            </h4>
                          </AccordionSummary>
                          <AccordionDetails style={{ padding: "0px" }}>
                            <Grid container>
                              <Grid item md={3} sm={3} lg={3}>
                                <div className={classes.roomType}>
                                  <div style={{ position: "relative" }}>
                                    <Paper
                                      key={roomData.id}
                                      style={{
                                        borderRadius: "0px",
                                      }}
                                    >
                                      <h4 className={classes.roomTypeContent}>
                                        <span style={{ width: "50%" }}>EP</span>
                                        <span className={classes.man}>
                                          {" "}
                                          <PeopleIcon />
                                        </span>
                                      </h4>
                                      <h4 className={classes.roomTypeContent}>
                                        <span style={{ width: "50%" }}>
                                          MAP
                                        </span>
                                        <span className={classes.man}>
                                          <PeopleIcon />
                                        </span>
                                      </h4>
                                      <h4 className={classes.roomTypeContent}>
                                        <span style={{ width: "50%" }}>AP</span>
                                        <span className={classes.man}>
                                          <PeopleIcon />
                                        </span>
                                      </h4>
                                    </Paper>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                md={9}
                                sm={9}
                                lg={9}
                                className={classes.roomrateList}
                              >
                                {days.map((roomDate, index) => (
                                  <Paper className={classes.paperList}>
                                    <div className={classes.list}>
                                      {roomList.find(
                                        (item) =>
                                          item.calendarDate ===
                                            format(
                                              new Date(roomDate.key),
                                              "yyyy-MM-dd"
                                            ) &&
                                          item.displayName ===
                                            roomData.displayName
                                      ) ? (
                                        roomList
                                          .filter(
                                            (item) =>
                                              item.calendarDate ===
                                                format(
                                                  new Date(roomDate.key),
                                                  "yyyy-MM-dd"
                                                ) &&
                                              item.displayName ===
                                                roomData.displayName
                                          )
                                          .map((item) => (
                                            <>
                                              <p
                                                disabled={item.disable}
                                                className={
                                                  item.disable
                                                    ? classes.roomavailabledisable
                                                    : classes.roomavailables
                                                }
                                              >
                                                {item.eprate || ""}
                                              </p>
                                            </>
                                          ))
                                      ) : (
                                        <input
                                          name="cprate"
                                          type="text"
                                          autoComplete="off"
                                          disabled
                                          className={
                                            classes.roomavailabledisable
                                          }
                                        />
                                      )}
                                    </div>
                                    <div className={classes.list}>
                                      {roomList.find(
                                        (item) =>
                                          item.calendarDate ===
                                            format(
                                              new Date(roomDate.key),
                                              "yyyy-MM-dd"
                                            ) &&
                                          item.displayName ===
                                            roomData.displayName
                                      ) ? (
                                        roomList
                                          .filter(
                                            (item) =>
                                              item.calendarDate ===
                                                format(
                                                  new Date(roomDate.key),
                                                  "yyyy-MM-dd"
                                                ) &&
                                              item.displayName ===
                                                roomData.displayName
                                          )
                                          .map((item) => (
                                            <>
                                              <p
                                                disabled={item.disable}
                                                className={
                                                  item.disable
                                                    ? classes.roomavailabledisable
                                                    : classes.roomavailables
                                                }
                                              >
                                                {item.maprate || ""}
                                              </p>
                                            </>
                                          ))
                                      ) : (
                                        <input
                                          type="text"
                                          autoComplete="off"
                                          disabled
                                          className={
                                            classes.roomavailabledisable
                                          }
                                        />
                                      )}
                                    </div>
                                    <div className={classes.list}>
                                      {roomList.find(
                                        (item) =>
                                          item.calendarDate ===
                                            format(
                                              new Date(roomDate.key),
                                              "yyyy-MM-dd"
                                            ) &&
                                          item.displayName ===
                                            roomData.displayName
                                      ) ? (
                                        roomList
                                          .filter(
                                            (item) =>
                                              item.calendarDate ===
                                                format(
                                                  new Date(roomDate.key),
                                                  "yyyy-MM-dd"
                                                ) &&
                                              item.displayName ===
                                                roomData.displayName
                                          )
                                          .map((item) => (
                                            <>
                                              <p
                                                disabled={item.disable}
                                                className={
                                                  item.disable
                                                    ? classes.roomavailabledisable
                                                    : classes.roomavailables
                                                }
                                              >
                                                {item.aprate}
                                              </p>
                                            </>
                                          ))
                                      ) : (
                                        <input
                                          type="text"
                                          autoComplete="off"
                                          disabled
                                          className={
                                            classes.roomavailabledisable
                                          }
                                        />
                                      )}
                                    </div>
                                  </Paper>
                                ))}
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion
                          style={{
                            marginBottom: "50px",
                            marginTop: "0px",
                            borderRadius: "0px",
                          }}
                        >
                          <AccordionSummary
                            style={{ borderRadius: "0px" }}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <h4
                              style={{
                                margin: "0px",
                                color: "#F46D25",
                              }}
                            >
                              Travel Agent (CPAI)
                            </h4>
                          </AccordionSummary>
                          <AccordionDetails style={{ padding: "0px" }}>
                            <Grid container>
                              <Grid item md={3} sm={3} lg={3}>
                                <div className={classes.roomType}>
                                  <div style={{ position: "relative" }}>
                                    <Paper
                                      key={roomData.id}
                                      style={{
                                        borderRadius: "0px",
                                      }}
                                    >
                                      <h4 className={classes.roomTypeContent}>
                                        <span style={{ width: "50%" }}>
                                          Gold
                                        </span>
                                        <span className={classes.man}>
                                          {" "}
                                          <PeopleIcon />
                                        </span>
                                      </h4>
                                      <h4 className={classes.roomTypeContent}>
                                        <span style={{ width: "50%" }}>
                                          Silver
                                        </span>
                                        <span className={classes.man}>
                                          <PeopleIcon />
                                        </span>
                                      </h4>
                                      <h4 className={classes.roomTypeContent}>
                                        <span style={{ width: "50%" }}>
                                          Bronze
                                        </span>
                                        <span className={classes.man}>
                                          <PeopleIcon />
                                        </span>
                                      </h4>
                                    </Paper>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                md={9}
                                sm={9}
                                lg={9}
                                className={classes.roomrateList}
                              >
                                {days.map((roomDate, index) => (
                                  <Paper className={classes.paperList}>
                                    <div className={classes.list}>
                                      {roomList.find(
                                        (item) =>
                                          item.calendarDate ===
                                            format(
                                              new Date(roomDate.key),
                                              "yyyy-MM-dd"
                                            ) &&
                                          item.displayName ===
                                            roomData.displayName
                                      ) ? (
                                        roomList
                                          .filter(
                                            (item) =>
                                              item.calendarDate ===
                                                format(
                                                  new Date(roomDate.key),
                                                  "yyyy-MM-dd"
                                                ) &&
                                              item.displayName ===
                                                roomData.displayName
                                          )
                                          .map((item) => (
                                            <p
                                              disabled={item.disable}
                                              className={
                                                item.disable
                                                  ? classes.roomavailabledisable
                                                  : classes.roomavailables
                                              }
                                            >
                                              {item.roomRentGold}
                                            </p>
                                          ))
                                      ) : (
                                        <input
                                          name="roomRentGold"
                                          type="text"
                                          autoComplete="off"
                                          disabled
                                          className={
                                            classes.roomavailabledisable
                                          }
                                        />
                                      )}
                                    </div>
                                    <div className={classes.list}>
                                      {roomList.find(
                                        (item) =>
                                          item.calendarDate ===
                                            format(
                                              new Date(roomDate.key),
                                              "yyyy-MM-dd"
                                            ) &&
                                          item.displayName ===
                                            roomData.displayName
                                      ) ? (
                                        roomList
                                          .filter(
                                            (item) =>
                                              item.calendarDate ===
                                                format(
                                                  new Date(roomDate.key),
                                                  "yyyy-MM-dd"
                                                ) &&
                                              item.displayName ===
                                                roomData.displayName
                                          )
                                          .map((item) => (
                                            <p
                                              disabled={item.disable}
                                              className={
                                                item.disable
                                                  ? classes.roomavailabledisable
                                                  : classes.roomavailables
                                              }
                                            >
                                              {item.roomRentSilver || ""}
                                            </p>
                                          ))
                                      ) : (
                                        <input
                                          type="text"
                                          autoComplete="off"
                                          disabled
                                          className={
                                            classes.roomavailabledisable
                                          }
                                        />
                                      )}
                                    </div>
                                    <div className={classes.list}>
                                      {roomList.find(
                                        (item) =>
                                          item.calendarDate ===
                                            format(
                                              new Date(roomDate.key),
                                              "yyyy-MM-dd"
                                            ) &&
                                          item.displayName ===
                                            roomData.displayName
                                      ) ? (
                                        roomList
                                          .filter(
                                            (item) =>
                                              item.calendarDate ===
                                                format(
                                                  new Date(roomDate.key),
                                                  "yyyy-MM-dd"
                                                ) &&
                                              item.displayName ===
                                                roomData.displayName
                                          )
                                          .map((item) => (
                                            <p
                                              disabled={item.disable}
                                              className={
                                                item.disable
                                                  ? classes.roomavailabledisable
                                                  : classes.roomavailables
                                              }
                                            >
                                              {item.roomRentBronze || ""}
                                            </p>
                                          ))
                                      ) : (
                                        <input
                                          type="text"
                                          autoComplete="off"
                                          disabled
                                          className={
                                            classes.roomavailabledisable
                                          }
                                        />
                                      )}
                                    </div>
                                  </Paper>
                                ))}
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: "calc(100% / 7)",
    minWidth: "132px",
    height: "50px",
    textAlign: "center",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #F4F4F4",
    display: "flex",
    borderRight: "0",
  },
  paperList: {
    borderRadius: "0px",
    display: "inline-block",
    width: "calc(100% / 7)",
  },
  roomrateList: {
    alignItems: "center",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    // paddingTop: "100px",
    padding:'5.8% 1% 1% 1%',
    "& > *": {
      // margin: "20px 20px",
      // width: theme.spacing(16),
      height: "auto",
      background: "#F4F4F4",
    },
  },

  heading: {
    margin: "0px",
    fontSize: "20px",
    marginLeft: "10px",
    color: "#F46D25",
  },
  layout: {
    margin: "40px 20px",
  },
  icon: {
    padding: "5px",
    color: "#F46D25",
    cursor: "pointer",
  },
  iconDisable: {
    padding: "5px",
    color: "#000",
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  Dateicon: {
    display: "inline-block",
    padding: "5px",
    color: "#F46D25",
    cursor: "pointer",
  },
  calendar: {
    display: "flex",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },

  view: {
    border: "1px solid #ffffff91",
    width: "calc(100% / 7)",
  },

  week: {
    color: "#fff",
    textTransform: "uppercase",
  },
  roomavailables: {
    color: "#000",
    fontWeight: "500",
    fontSize: "18px",
    border: "1px solid #b1afaf",
    textAlign: "center",
    width: "60px",
    borderRadius: "5px",
    "&focusVisible": {
      border: "1px solid #F46D25",
    },
  },
  roomavailable: {
    color: "#000",
    fontWeight: "500",
    fontSize: "18px",
    border: "1px solid #F46D25",
    textAlign: "center",
    width: "60px",
    borderRadius: "5px",
    "&focusVisible": {
      border: "1px solid #F46D25",
    },
  },

  roomavailabledisable: {
    color: "#aeaeae",
    background: "#fff",
    fontWeight: "500",
    fontSize: "17px",
    border: "1px solid #aeaeae73",
    textAlign: "center",
    width: "60px",
    borderRadius: "5px",
    "&focusVisible": {
      border: "1px solid #aeaeae73",
    },
  },
  main: {
    background: "#000",
    height: "100%",
    color: "#fff",
    width: "100%",
  },

  roomRent: {
    border: "1px solid #ffffff91",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    verticalAlign: "middle",
  },
  RoomListViewForwardIcon: {
    verticalAlign: "middle",
    color: "blue",
    marginLeft: "50px",
    fontSize: "12px",
    border: "1px solid blue",
    borderRadius: "50%",
    padding: "5px",
    backgroundColor: "#8080802b",
  },
  roomTypeContent: {
    height: "50px",
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center",
    margin: "0px",
    paddingLeft: "20px",
    justifyContent: "flex-start",
    border: "1px solid #F4F4F4",
  },
  man: {
    color: "#F46D25",
    width: "40%",
    textAlign: "end",
  },
}));
