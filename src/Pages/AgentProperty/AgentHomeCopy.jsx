/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import ImageSlider from "./ImgaeSlider";
import { baseurl } from "../../Service/httpCommon";
import DateFnsUtils from "@date-io/date-fns";
import Clock from "../../assets/logo/Clock.png";
import ImageSliderLast from "./ImageSliderLast";
import Api from "../../Service/Api";
import AgentHotel from "./AgentHotel";
import { format } from "date-fns";
import _ from "lodash";
import Select from "react-select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Hidden, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Agent.css";
import HOtel1 from '../../assets/pictures/HOtel1.jpg'
import { twnButtonStyles } from "../../utils/townoStyle";


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    paddingBottom: "40px",
    margin: "0px 40px",
    "@media (max-width: 767px)": {
      margin: "0px",
      paddingBottom: "100px",
    },
  },
  paper: {
    padding: "10px 20px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  paper1: {
    padding: "10px 30px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
    marginTop: "20px",
    display: "block",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "0px",
      background: "none",
    },
  },
  paper2: {
    padding: "30px 30px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
    marginTop: "20px",
    display: "block",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
      background: "none",
    },
  },
  image: {
    width: "100%",
    height: "250px",
    "@media (max-width: 767px)": {
      height: "150px",
    },
  },
  lastMinute: {
    width: "80%",
    background: "#f46d25",
    padding: "15px",
    borderRadius: "10px",
    height: "86%",
    marginTop: "10px",
  },
  toptext: {
    position: "relative",
    top: "20px",
    background: "#000",
    color: "#fff",
    margin: "0px",
    width: "100px",
    fontWeight: "500",
    paddingLeft: "3px",
  },
  topBorder: {
    position: "absolute",
    top: "-9px",
    zIndex: "10",
    left: "12px",
    color: "rgb(0 0 0 / 54%)",
    background: "#fff",
    borderRadius: "4px",
    padding: "1px 4px",
    fontSize: "12px",
  },
  icon: {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "1.5rem",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    position: "absolute",
    right: "15px",
    top: "5px",
    color: "#f46d25",
  },
}));

export default function AgentHome() {
  const classes = useStyles();
  const uniqueId = localStorage.getItem("unique_id");
  const AgentType = localStorage.getItem("agent");
  const [bestSelling, setbestSelling] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [FormData, setFormData] = useState({
    city: null,
    checkin: null,
    checkout: null,
    propertyId: null,
    adult: "",
    children: "",
  });

  const [dealofweek, setDealofweek] = useState([])

  const { city, checkin, checkout, propertyId, adult, children } = FormData;
  useEffect(() => {
    Api.get("agentbestsellingdestinationsactive").then((res) => {
      setbestSelling(res.data);
    });
    HotelList();
    CityList();
    Dealofweek()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CityList = () => {
    Api.get(`agentcitypropertylist/${uniqueId}`).then((res) => {
      setCityList(res.data);

    });
  };
  const Dealofweek = () => {
    Api.get(`agentdealoftheweekactive`).then((res) => {
      setDealofweek(res.data);
    });
  };

  const HotelList = () => {
    Api.get(`agentidpropertynamelist/${uniqueId}`).then((res) => {
      setHotelList(res.data);
      console.log(res.data);
    });
  };

  const ResetData = () => {
    setFormData({
      city: null,
      checkin: null,
      checkout: null,
      propertyId: null,
      adult: "",
      children: "",
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    const data = {
      checkin: checkin !== null ? format(checkin, "yyyy-MM-dd") : "",
      checkout: checkout !== null ? format(checkout, "yyyy-MM-dd") : "",
      city: city !== null ? city.value : "",
      propertyId: propertyId !== null ? propertyId.value : "",
      adult: adult,
      children: children,
      uniqueId: uniqueId,
      agentType: AgentType,
    };
    Api.post("AgentCommonSearch", data).then((res) => {
      setSearchList(res.data);
      console.log(res.data);
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <div className={classes.root}> */}
      <div>
      <div className={classes.paper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form onSubmit={Submit}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={6}>
                  <div style={{ position: "relative" }}>
                    <span className={classes.topBorder}>City</span>
                    <Select
                      name="city"
                      className={classes.select}
                      value={city}
                      onChange={(value) => {
                        setFormData({
                          ...FormData,
                          city: value,
                        });
                        Api.get(
                          `/AgentSearchcitypropertyidnamelist/${uniqueId}/${value.value}`
                        ).then((res) => {
                          setHotelList(res.data);
                        });
                      }}
                      placeholder=""
                      options={cityList.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          "&:hover": { borderColor: "#f46d25" },
                          boxShadow: "none",
                          borderColor: "#f46d25",
                        }),
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                        indicatorsContainer: (styles, { data }) => ({
                          ...styles,
                          color: "#f46d25",
                        }),
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={3} xs={6}>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      label="Check-In"
                      inputVariant="outlined"
                      fullWidth
                      size="small"
                      animateYearScrolling
                      format="dd/MM/yyyy"
                      variant="inline"
                      autoOk="true"
                      value={checkin}
                      onChange={(e) => setFormData({ ...FormData, checkin: e })}
                    />
                    <CalendarTodayIcon className={classes.icon} />
                  </div>
                </Grid>
                <Grid item md={3} xs={6}>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      label="Check-Out"
                      inputVariant="outlined"
                      size="small"
                      fullWidth
                      format="dd/MM/yyyy"
                      animateYearScrolling
                      variant="inline"
                      autoOk="true"
                      value={checkout}
                      onChange={(e) =>
                        setFormData({ ...FormData, checkout: e })
                      }
                    />
                    <CalendarTodayIcon className={classes.icon} />
                  </div>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <div style={{ position: "relative" }}>
                    <span className={classes.topBorder}>Hotel Name</span>
                    <Select
                      name="propertyId"
                      className={classes.select}
                      onChange={(value) => {
                        setFormData({ ...FormData, propertyId: value });
                      }}
                      placeholder=""
                      value={propertyId}
                      options={hotelList.map((item) => ({
                        label: item.displayName,
                        value: item.propertyId,
                      }))}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          "&:hover": { borderColor: "#f46d25" },
                          boxShadow: "none",
                          borderColor: "#f46d25",
                        }),
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                        indicatorsContainer: (styles, { data }) => ({
                          ...styles,
                          color: "#f46d25",
                        }),
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={3} xs={6}>
                  <TextField
                    name="adult"
                    value={adult}
                    variant="outlined"
                    size="small"
                    label="Adults"
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...FormData, adult: e.target.value })
                    }
                  />
                </Grid>
                <Grid item md={3} xs={6}>
                  <TextField
                    name="children"
                    value={children}
                    variant="outlined"
                    size="small"
                    label="Childrens"
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...FormData, children: e.target.value })
                    }
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <center>
                    <Button type="submit">Search</Button>
                    <Button
                      type="reset"
                      onClick={ResetData}
                      style={{ background: "#121212", marginLeft: "10px" }}
                    >
                      Reset
                    </Button>
                  </center>
                </Grid>
              </Grid>
            </form>
          </MuiPickersUtilsProvider>
        </div>
        {!_.isEmpty(searchList) ? (
          <Grid item md={12}>
            <AgentHotel searchList={searchList} />
          </Grid>
        ) : null} 
      <div style={{maxWidth:'50%'}}><img src={HOtel1} /> </div>
      <div className={classes.paper1}>
        <h2 style={twnButtonStyles.xlFonts}>Most Popular Hotels</h2>
        <ImageSlider />
      </div>

      <div className={classes.paper1}>
        <Grid container spacing={1}>
          <Hidden smDown>
            <Grid item md={3} lg={3}>
              <div className={classes.lastMinute}>
                <div style={{ marginTop: "40px" }}>
                  <h1
                    style={{
                      margin: "0px",
                      fontSize: "40px",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Last Minute
                  </h1>
                  <h1
                    style={{
                      margin: "0px",
                      fontSize: "40px",
                      textAlign: "center",
                    }}
                  >
                    Deals
                  </h1>
                  <div style={{ textAlign: "center", marginTop: "25px" }}>
                    <img src={Clock} alt="clock" style={{ width: "100px" }} />
                  </div>
                </div>
              </div>
            </Grid>
          </Hidden>
          <Box
            component={Grid}
            className={classes.gridItem}
            item
            xs={12}
            display={{ xs: "block", lg: "none" }}
          >
            <h2 style={{ textAlign: "center", margin: "3px" }}>
              Last Minute Deals
            </h2>
          </Box>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <ImageSliderLast />
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper2}>
        <h2 style={{ textAlign: "center", margin: "3px" }}>
          Deals of the Week
        </h2>
        <Grid container spacing={2}>
          {dealofweek.map((item) => (
            <Grid item md={4} xs={12}>
              <div className="card-itemweek">
                <Link to={`/hotelView/${item.propertyId}`}>
                  <div className="card-inner">
                    <div className="card-top">
                      <span>{item.topLeftLabel}</span>
                      <img
                        src={`${baseurl}getimage/${item.image}`}
                        alt="HotelImage"
                      />
                    </div>
                    <div className="card-bottom">
                      <div className="card-info">
                        <h4>{item.propertyName}</h4>
                        <p>{item.city}</p>
                        <div
                          style={{ width: "50%", display: "inline-block" }}
                        >
                          <button>Rs.{item.minmumprice} /Per Night</button>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "inline-block",
                            textAlign: "end",
                          }}
                        >
                          <button className="roombutton">Select Room</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.paper2}>
        <h2 style={{ textAlign: "center", margin: "3px" }}>
          Best Selling Destinations
        </h2>
        <Grid container spacing={2}>
          {bestSelling.map((item) => (
            <Grid item md={4} xs={6}>
              <p className={classes.toptext}>{item.city}</p>
              <img
                src={`${baseurl}getimage/${item.image}`}
                alt="HotelImage"
                className={classes.image}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
    </MuiPickersUtilsProvider >
  );
}
