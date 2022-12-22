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
import { format } from "date-fns";
import _ from "lodash";
import Select from "react-select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Hidden, Box, Stack, Dialog, Slide } from "@mui/material";
import { Link } from "react-router-dom";
import "./Agent.css";
// import HOtel1 from '../../assets/pictures/HOtel1.jpg';
import LaVainnci from '../../assets/pictures/LaVainnci.png';
import Aururm from '../../assets/pictures/Aururm.png';
import laCabana from '../../assets/pictures/laCabana.png';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import { twnButtonStyles } from "../../utils/townoStyle";
import AgentHotelCopy from './AgentHotelCopy'
import CloseIcon from '@material-ui/icons/Close';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// import { twnButtonStyles } from "../../utils/townoStyle";



const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    paddingBottom: "40px",
    margin: "0px 40px",
    background: '#fff',
    "@media (max-width: 767px)": {
      margin: "0px",
      paddingBottom: "100px",
    },
  },
  paper: {
    padding: "10px 20px",
    boxShadow: "none",
    borderRadius: "5px",
    backgroundColor: "#F7F7F7",
    margin: '0px 20%',
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  paper1: {
    padding: "5px 30px",
    // boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "5px",
    background: "#F7F7F7",
    margin: "5px 30px",
    display: "block",
    border: '1px solid #f3f3f3',
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "0px",
      background: "none",
    },
  },
  lastDealPaper: {
    padding: "10px 30px",
    // boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#fff",
    margin: "20px 30px",
    display: "block",
    height: '20%',
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "0px",
      background: "none",
    },
  },
  paper2: {
    padding: "2px 30px",
    // boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "5px",
    background: "#F7F7F7",
    margin: '10px 30px',
    // display: "block",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      // padding: "10px",
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
    padding: "0 15px",
    borderRadius: "5px",
    height: "93%",
    marginTop: "10px",
  },
  toptext: {
    position: "relative",
    top: "35px",
    background: "#000",
    color: "#fff",
    margin: "0px",
    width: "100px",
    fontSize: '14px',
    fontWeight: "500",
    paddingLeft: "3px",
    borderRadius: '0 5px 5px 0',
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
  buttonStyle: {
    position: 'absolute',
    top: '70%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f46d25',
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function AgentHome() {
  
  const uniqueId = localStorage.getItem("unique_id");
  const AgentType = localStorage.getItem("agent");
  const [bestSelling, setbestSelling] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
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

  const fetchPropertySearchResult = () => {
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
      // console.log("AgentHome|fetchPropertySearchResult|res.data: ",res.data)
      setSearchList(res.data);
    });

  }

  const Submit = (e) => {
    e.preventDefault();
    fetchPropertySearchResult();
  };

  // useEffect(()=>{
  //   fetchPropertySearchResult();
  // },[])

  //carousel starts
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  //carousel ends
  return (
    <>
      <div>
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          {/* Foreground Div  */}

          <div style={{ position: "relative", zIndex: 1, paddingTop: "75vh" }}>
            <AgentHomeSearchBar />
          </div>
          {/* Background Div  */}
          <div style={{ position: "absolute", top: "0", left: "0", zIndex: "-1" }}>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              <Box>
                <Stack>
                  <img src={LaVainnci} style={{ width: '100%', height: 'auto' }} />
                  <div><button className={classes.buttonStyle}>Book Now</button></div>
                </Stack>
              </Box>
              <Box>
                <Stack>
                  <img src={Aururm} style={{ width: '100%', height: 'auto' }} />
                  <div><button className={classes.buttonStyle}>Book Then</button></div>
                </Stack>
              </Box>
              <Box>
                <Stack>
                  <img src={laCabana} style={{ width: '100%', height: 'auto' }} />
                  <button className={classes.buttonStyle}>Book Now</button>
                </Stack>
              </Box>
            </AutoPlaySwipeableViews>
            <div style={{ height: "20vh" }}></div>
          </div>
        </div>

        <div className={classes.paper1}>
          <h2 style={{ ...twnButtonStyles.xlFonts, textAlign: "center", marginTop: '3px' }}>Most Popular Hotels</h2>
          <ImageSlider />
        </div>
        <div className={classes.lastDealPaper}>
          <Grid container spacing={1}>
            <Hidden smDown>
              <Grid item md={3} lg={3}>
                <div className={classes.lastMinute}>
                  <div>
                    <h1
                      style={{
                        marginTop: "-10px",
                        marginBottom: '-10px',
                        fontSize: "40px",
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      Last Minute
                    </h1>
                    <h1
                      style={{
                        marginTop: "0px",
                        fontSize: "40px",
                        textAlign: "center",
                      }}
                    >
                      Deals
                    </h1>
                    <div style={{ textAlign: "center", marginTop: "15px", paddingBottom: '8%' }}>
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
        <div className={classes.paper1}>
          <h2 style={{ ...twnButtonStyles.xlFonts, textAlign: "center", marginTop: '3px' }}>
            Deals of the Week
          </h2>
          <Grid container spacing={2}>
            {dealofweek.map((item) => (
              <Grid item md={4} xs={12} style={{ marginBottom: '2%' }}>
                {/* <div className="card-itemweek"> */}
                <div className="card-item">
                  <Link to={`/hotelView/${item.propertyId}`}>
                    <div className="card-inner" >
                      <div className="card-top">
                        <span>{item.topLeftLabel}</span>
                        <img
                          src={`${baseurl}getimage/${item.image}`}
                          alt="HotelImage"
                        />
                      </div>
                      <div className="card-bottom" style={{ borderRadius: '0 0 5px 5px', marginTop: '-5px', paddigBottom: '5%', marginBottom: '-14px' }}>
                        <div className="card-info">
                          <h5>{item.propertyName}</h5>
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
          <h2 style={{ ...twnButtonStyles.xlFonts, textAlign: "center", marginTop: '3px' }}>
            Best Selling Destinations
          </h2>
          <Grid container>
            {bestSelling.map((item) => (
              <Grid item md={4} xs={6} style={{ padding: '0 10px' }}>
                <p className={classes.toptext}>{item.city}</p>
                <img
                  src={`${baseurl}getimage/${item.image}`}
                  alt="HotelImage"
                  className={classes.image} style={{ height: '200px', borderRadius: '5px', boxShadow: '1px 1px 7px rgb(1 1 1 /0.3)' }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

function AgentHomeSearchBar() {
  const classes = useStyles();

  // Api.get(
  //   `/AgentSearchcitypropertyidnamelist/${uniqueId}/${value.value}`
  // ).then((res) => {
  //   setHotelList(res.data);
  // });
  return (
    <div className={classes.paper1} style={{ width: "50%", marginLeft: "25%", padding: "1.5%", boxShadow: "0 0 25px 4px rgb(0 0 0 / 20%)" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Stack spacing={1}>
            <Stack direction='row' spacing={2}>
              <div style={{ position: "relative" }}>
                <span className={classes.topBorder}>City</span>
                <Select
                  name="city"
                  className={classes.select}
                  value={city}
                  onChange={(value) => {}}
                  placeholder=""
                  options={cityList.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                    control: (base, state) => ({
                      ...base,
                      "&:hover": { borderColor: "#f46d25" },
                      borderColor: "#f46d25",
                      boxShadow: "none",
                      width: '300px',
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      position: "absolute",
                      top:
                        state.hasValue ||
                          state.selectProps.inputValue
                          ? -15
                          : "50%",
                      background: "#fff",
                      padding: "0px 5px",
                      transition: "top 0.1s, font-size 0.1s",
                      fontSize: "17px",
                    }),
                  }}
                />
              </div>
              <div >
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
                  style={{ borderRadius: '5px' }}
                />
              </div>
              <div >
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
                  style={{ borderRadius: '5px' }}
                />
              </div>
            </Stack>

            <Stack direction='row' spacing={2}>
              <div style={{ position: "relative" }}>
                <span className={classes.topBorder}>Hotel Name</span>
                <Select
                  name="propertyId"
                  className={classes.select}
                  value={propertyId}
                  onChange={(value) => {
                    setFormData({ ...FormData, propertyId: value });
                  }}
                  placeholder=""
                  options={hotelList.map((item) => ({
                    label: item.displayName,
                    value: item.propertyId,
                  }))}
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                    control: (base, state) => ({
                      ...base,
                      "&:hover": { borderColor: "#f46d25" },
                      borderColor: "#f46d25",
                      boxShadow: "none",
                      width: '300px',
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      position: "absolute",
                      top:
                        state.hasValue ||
                          state.selectProps.inputValue
                          ? -15
                          : "50%",
                      background: "#fff",
                      padding: "0px 5px",
                      transition: "top 0.1s, font-size 0.1s",
                      fontSize: "17px",
                    }),
                  }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <Stack direction='row' spacing={2}>
                  <TextField
                    name="adult"
                    value={adult}
                    variant="outlined"
                    size="small"
                    label="Adults"
                    onChange={(e) =>
                      setFormData({ ...FormData, adult: e.target.value })
                    }
                  />
                  <TextField
                    name="children"
                    value={children}
                    variant="outlined"
                    size="small"
                    label="Children"
                    onChange={(e) =>
                      setFormData({ ...FormData, children: e.target.value })
                    }
                  />
                </Stack>
              </div>
              <div style={{ width: '100%' }}>
                {/* // onClick={()=>{setOpenDialog(true)}}  */}
                <Link to={{ pathname: '/agentHotelCopy', state: { searchList } }}><Button type="submit" style={{ width: '100%', fontWeight: '600' }}>Search</Button></Link>
              </div>
            </Stack>
          </Stack>
      </MuiPickersUtilsProvider>
    </div>
  );
}