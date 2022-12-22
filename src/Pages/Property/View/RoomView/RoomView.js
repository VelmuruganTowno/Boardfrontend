/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Grid, Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Api from "../../../../Service/Api";
import { useParams, useHistory } from "react-router-dom";
import RoomSlider from "./RoomSlider";
import EntertainmentView from "./EntertainmentView";
import BathroomView from "./BathroomView";
import KitchenView from "./KitchenView";
import PopularGuestView from "./PopularGuestView";
import RoomFeaturView from "./RoomFeaturView";
import "./room.css";
import _ from "lodash";
import { formatter } from "../../../../utils/formatNumber";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import parse from "html-react-parser";
import Dialog from "@mui/material/Dialog";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { Numbers } from "../Data";
import { Formik, Field, Form } from "formik";
import MaterialSelect from "../../../../components/Select/MaterialSelect";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "90px",
    paddingLeft: "20px",
    paddingRight: "20px",
    "@media(max-width:767px)": {
      paddingBottom: "90px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
  image: {
    background: "#fff",
    "@media(max-width:767px)": {
      background: "#fff",
    },
  },
  headings: {
    margin: "20px",
    color: "#f46d25",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  amen: {
    background: "#F4F4F4",
    "@media(max-width:767px)": {
      background: "#fff",
    },
  },
  title: {
    background: "#F4F4F4",
    display: "flex",
    alignItems: "center",
    padding: "0px 10px 0px 10px",
    "@media(max-width:767px)": {
      background: "#F46D25",
      padding: "10px",
      margin: "10px 0px",
    },
  },
  ratecard: {
    background: "#FFF",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    "@media(max-width:767px)": {
      height: "auto",
      padding: 0,
      margin: "7px",
      background: "#fff",
      borderRadius: "0px 0px 7px 7px",
      boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
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
  dialogPaper: {
    minHeight: "85vh",
    maxHeight: "100vh",
    minWidth: "70%",
    padding: "20px 40px",
    position: "absolute",
    backgroundColor: "#e3e3e3",
    margin: "0px",
    right: "0",
    zIndex: "1000",
  },
  mealCard: {
    background: "#F4F4F4",
    width: "100%",
    padding: "10px",
    margin: "10px",
  },
  h3: {
    color: "#f46d25",
    margin: "0px",
    display: "inline-block",
    width: "50%",
    textAlign: "end",
    "@media(max-width:767px)": {
      margin: "6px",
      fontSize: "16px",
      fontWeight: "800",
      textAlign: "center",
      display: "block",
      width: "100%",
    },
  },
  h4: {
    display: "inline-block",
    margin: "0px",
    width: "50%",

    "@media(max-width:767px)": {
      margin: "0px",
      background: "#343A40",
      borderRadius: "4.5px 4.5px 0px 0px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      display: "block",
      width: "100%",
    },
  },
  heading: {
    fontWeight: "550",
    fontSize: "14px",
  },
}));
const BoardBasic = [
  { value: "ep", label: "EP" },
  { value: "cp", label: "CP" },
  { value: "map", label: "MAP" },
  { value: "ap", label: "AP" },
];

export default function RoomView() {
  const classes = useStyles();
  const { id, roomid } = useParams();
  const history = useHistory();
  const data = { propertyId: id, displayName: roomid };
  const Role = localStorage.getItem("role");
  const AgentType = localStorage.getItem("agent");
  const [roomData, setRoomData] = useState({});
  const [bathroomData, setBathroomData] = useState({});
  const [entertainmentData, setEntertainmentData] = useState({});
  const [roomFeatureData, setRoomFeatureData] = useState({});
  const [kitchenData, setKitchenData] = useState({});
  const [popularData, setPopularData] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const [mealPlan, setMealPlan] = useState("");
  const [open, setOpen] = useState(false);
  const [adult, setAdult] = useState(0);
  const [childern, setChildern] = useState(0);
  const [noofRooms, setNoofRooms] = useState(0);
  const [meal, setMeal] = useState("");
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    getRoomData();
    getBathData();
    getEnterData();
    getFeaData();
    getKitData();
    getPopData();
    MealPlanGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MealPlanGet = () => {
    Api.post("mealplantermsandconditions", { propertyId: id }).then((res) => {
      setMealPlan(res.data.message);
    });
  };
  const getRoomData = () => {
    Api.post("propertyamenitiesroomvalue", data).then((res) => {
      setRoomData(res.data);
    });
  };

  const getPopData = () => {
    Api.post("RAmenitiesPopularWithGuestsvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setPopularData(res.data);
      }
    });
  };
  const getKitData = () => {
    Api.post("RAmenitiesKitchenFoodvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setKitchenData(res.data);
      }
    });
  };

  const getBathData = () => {
    Api.post("RAmenitiesBathroomvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setBathroomData(res.data);
      }
    });
  };
  const getEnterData = () => {
    Api.post("RAmenitiesEntertainmentvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setEntertainmentData(res.data);
      }
    });
  };
  const getFeaData = () => {
    Api.post("RAmenitiesFeaturesvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setRoomFeatureData(res.data);
      }
    });
  };

  const Agenttryingbooking = () => {
    const Data = {
      uniqueId: localStorage.getItem("unique_id"),
      propertyId: id,
      displayName: roomid,
      noofrooms:noofRooms,
      noofadults: adult,
      noofchild: childern,
      mealplan: meal,
      checkin: checkin !== null ? format(checkin, "yyyy-MM-dd") : "",
      checkout: checkout !== null ? format(checkout, "yyyy-MM-dd") : "",
      createdBy: localStorage.getItem("auth"),
    };
    Api.post("agenttryingbooking", Data).then((res) => {
      handleClose();
      toast.success("Enquiry Sent Successfully................. We will get back to you shortly.");
       });
  };
  const handleAdultChange = (selectedOption) => {
    setAdult(selectedOption.value);
  };
  const handleChildernChange = (selectedOption) => {
    setChildern(selectedOption.value);
  };
  const handlenoofRoomsChange = (selectedOption) => {
    setNoofRooms(selectedOption.value);
  };
  const handlemealChange = (selectedOption) => {
    setMeal(selectedOption.value);
  };
  const ListProperty = () => { 
    setOpen(true);
      };
  return (
    <div className={classes.root}>
      {width <= 768 ? (
        <>
          <Grid container spacing={2}>
            <Grid item lg={7} xs={12}>
              <Grid container className={classes.title}>
                <Grid item lg={8} xs={7}>
                  <h3
                    style={{ color: "#fff", margin: "0px", fontSize: "16px" }}
                  >
                    {roomData.displayName}
                  </h3>
                </Grid>
                <Grid item lg={4} xs={5} style={{ textAlign: "right" }}>
                  {Role == "Agent Admin" ? (
                    <Button
                      variant="contained"
                      className={classes.button}
                      size="small"
                    >
                      Book Now
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className={classes.button}
                      size="small"
                      onClick={() => history.push(`/newBooking`)}
                    >
                      Book Now
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item lg={5} xs={12} className={classes.image}>
                <RoomSlider />
              </Grid>
              <Grid container>
                <Grid xs={12}>
                  <Paper style={{ padding: "1px", margin: "5px" }}>
                    <ul>
                      <li>
                        Room Size : {roomData.roomArea}
                        {roomData.roomAreaType}
                      </li>
                      <li>Bed Type : {roomData.bedType}</li>
                      <li>Max Number Guest : {roomData.adultsMax}</li>
                      <li>
                        {roomData.adultsBase} Adults, {roomData.childMax} Child
                      </li>
                    </ul>
                  </Paper>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <div className={classes.ratecard}>
                      <h4 className={classes.h4}>CP</h4>
                      <h3 className={classes.h3}>
                        Rs.{" "}
                        {formatter.format(
                          +roomData.roomRent + +roomData.cprate
                        )}
                      </h3>
                      <p
                        style={{
                          textAlign: "center",
                          margin: "5px",
                          fontSize: "10px",
                        }}
                      >
                        Per Night
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.ratecard}>
                      <h4 className={classes.h4}>MAP</h4>
                      <h3 className={classes.h3}>
                        Rs.{" "}
                        {formatter.format(
                          +roomData.roomRent + +roomData.maprate
                        )}
                      </h3>
                      <p
                        style={{
                          textAlign: "center",
                          margin: "5px",
                          fontSize: "10px",
                        }}
                      >
                        Per Night
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.ratecard}>
                      <h4 className={classes.h4}>AP</h4>
                      <h3 className={classes.h3}>
                        Rs.{" "}
                        {formatter.format(
                          +roomData.roomRent + +roomData.aprate
                        )}
                      </h3>
                      <p
                        style={{
                          textAlign: "center",
                          margin: "5px",
                          fontSize: "10px",
                        }}
                      >
                        Per Night
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} className={classes.amen}>
              {_.isEmpty(mealPlan) ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ borderBottom: "1px solid #f46d25" }}
                  >
                    <Typography className={classes.heading}>
                      Meal Policy
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {_.isEmpty(mealPlan) ? null : parse(mealPlan)}
                  </AccordionDetails>
                </Accordion>
              )}
              {_.isEmpty(entertainmentData) ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ borderBottom: "1px solid #f46d25" }}
                  >
                    <Typography className={classes.heading}>
                      Entertainment
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EntertainmentView entertainmentData={entertainmentData} />
                  </AccordionDetails>
                </Accordion>
              )}
              {_.isEmpty(bathroomData) ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ borderBottom: "1px solid #f46d25" }}
                  >
                    <Typography className={classes.heading}>
                      Bathroom
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <BathroomView bathroomData={bathroomData} />
                  </AccordionDetails>
                </Accordion>
              )}
              {_.isEmpty(roomFeatureData) ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ borderBottom: "1px solid #f46d25" }}
                  >
                    <Typography className={classes.heading}>
                      Room Features
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RoomFeaturView roomFeatureData={roomFeatureData} />
                  </AccordionDetails>
                </Accordion>
              )}

              {_.isEmpty(kitchenData) ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ borderBottom: "1px solid #f46d25" }}
                  >
                    <Typography className={classes.heading}>
                      Kitchen & Food
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <KitchenView kitchenData={kitchenData} />
                  </AccordionDetails>
                </Accordion>
              )}
              {_.isEmpty(popularData) ? null : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ borderBottom: "1px solid #f46d25" }}
                  >
                    <Typography className={classes.heading}>
                      Popular Guests
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PopularGuestView popularData={popularData} />
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={5} xs={12} className={classes.image}>
            <RoomSlider />
          </Grid>
          <Grid item lg={7} xs={12}>
            <Grid container className={classes.title}>
              <Grid item lg={8} xs={7}>
                <h3>{roomData.displayName}</h3>
              </Grid>
              <Grid item lg={4} xs={5} style={{ textAlign: "right" }}>
                {Role == "Agent Admin" ? (
                  <Button
                    variant="contained"
                    className={classes.button}
                    size="small"
                    onClick={ListProperty}
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className={classes.button}
                    size="small"
                    onClick={() => history.push(`/newBooking`)}
                  >
                    Book Now
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={6} xs={12}>
                <ul>
                  <li>
                    Room Size : {roomData.roomArea}
                    {roomData.roomAreaType}
                  </li>
                  <li>Bed Type : {roomData.bedType}</li>
                </ul>
              </Grid>
              <Grid item lg={6} xs={12}>
                <ul>
                  <li>Max Number Guest : {roomData.adultsMax}</li>
                  <li>
                    {roomData.adultsBase} {""} Adults, {roomData.childMax} {""}{" "}
                    Child
                  </li>
                </ul>
              </Grid>
              <Grid container spacing={2}>
                <div className={classes.mealCard}>
                  <Grid item lg={12} xs={4}>
                    <div className={classes.ratecard}>
                      <h4 className={classes.h4}>CP AI</h4>
                      <h3 className={classes.h3}>
                        Rs.
                        {Role == "Agent Admin" ? (
                          <>
                            {AgentType == "gold" ? (
                              <>
                                {formatter.format(
                                  (roomData.roomRentGold / 100) *
                                    (roomData.roomRent + roomData.cprate) +
                                    (roomData.roomRent + roomData.cprate)
                                )}
                              </>
                            ) : AgentType == "silver" ? (
                              <>
                                {formatter.format(
                                  (roomData.roomRentSilver / 100) *
                                    (roomData.roomRent + roomData.cprate) +
                                    (roomData.roomRent + roomData.cprate)
                                )}
                              </>
                            ) : (
                              <>
                                {formatter.format(
                                  (roomData.roomRentBronze / 100) *
                                    (roomData.roomRent + roomData.cprate) +
                                    (roomData.roomRent + roomData.cprate)
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {" "}
                            {formatter.format(
                              roomData.roomRent + roomData.cprate
                            )}
                          </>
                        )}{" "}
                        <span style={{ color: "#000", fontSize: "12px" }}>
                          /Per Night
                        </span>
                      </h3>
                    </div>
                  </Grid>
                  <Grid item lg={12} xs={4}>
                    <div className={classes.ratecard}>
                      <h4 className={classes.h4}>MAP AI</h4>
                      <h3 className={classes.h3}>
                        Rs.
                        {Role == "Agent Admin" ? (
                          <>
                            {AgentType == "gold" ? (
                              <>
                                {formatter.format(
                                  (roomData.roomRentGold / 100) *
                                    (roomData.roomRent + roomData.maprate) +
                                    (roomData.roomRent + roomData.maprate)
                                )}
                              </>
                            ) : AgentType == "silver" ? (
                              <>
                                {formatter.format(
                                  (roomData.roomRentSilver / 100) *
                                    (roomData.roomRent + roomData.maprate) +
                                    (roomData.roomRent + roomData.maprate)
                                )}
                              </>
                            ) : (
                              <>
                                {formatter.format(
                                  (roomData.roomRentBronze / 100) *
                                    (roomData.roomRent + roomData.maprate) +
                                    (roomData.roomRent + roomData.maprate)
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {" "}
                            {formatter.format(
                              roomData.roomRent + roomData.maprate
                            )}
                          </>
                        )}{" "}
                        <span style={{ color: "#000", fontSize: "12px" }}>
                          /Per Night
                        </span>
                      </h3>
                    </div>
                  </Grid>
                  <Grid item lg={12} xs={4}>
                    <div className={classes.ratecard}>
                      <h4 className={classes.h4}>AP AI</h4>
                      <h3 className={classes.h3}>
                        Rs.
                        {Role == "Agent Admin" ? (
                          <>
                            {AgentType == "gold" ? (
                              <>
                                {formatter.format(
                                  (roomData.roomRentGold / 100) *
                                    (roomData.roomRent + roomData.aprate) +
                                    (roomData.roomRent + roomData.aprate)
                                )}
                              </>
                            ) : AgentType == "silver" ? (
                              <>
                                {formatter.format(
                                  (roomData.roomRentSilver / 100) *
                                    (roomData.roomRent + roomData.aprate) +
                                    (roomData.roomRent + roomData.aprate)
                                )}
                              </>
                            ) : (
                              <>
                                {formatter.format(
                                  (roomData.roomRentBronze / 100) *
                                    (roomData.roomRent + roomData.aprate) +
                                    (roomData.roomRent + roomData.aprate)
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {formatter.format(
                              roomData.roomRent + roomData.aprate
                            )}
                          </>
                        )}{" "}
                        <span style={{ color: "#000", fontSize: "12px" }}>
                          /Per Night
                        </span>
                      </h3>
                    </div>
                  </Grid>
                  <p style={{ margin: "0px" }}>* This Price is for 2 Adults</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} className={classes.amen}>
            {_.isEmpty(mealPlan) ? null : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ borderBottom: "1px solid #f46d25" }}
                >
                  <Typography className={classes.heading}>
                    Meal Policy
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {_.isEmpty(mealPlan) ? null : parse(mealPlan)}
                </AccordionDetails>
              </Accordion>
            )}
            {_.isEmpty(entertainmentData) ? null : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ borderBottom: "1px solid #f46d25" }}
                >
                  <Typography className={classes.heading}>
                    Entertainment
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <EntertainmentView entertainmentData={entertainmentData} />
                </AccordionDetails>
              </Accordion>
            )}
            {_.isEmpty(bathroomData) ? null : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ borderBottom: "1px solid #f46d25" }}
                >
                  <Typography className={classes.heading}>Bathroom</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BathroomView bathroomData={bathroomData} />
                </AccordionDetails>
              </Accordion>
            )}
            {_.isEmpty(roomFeatureData) ? null : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ borderBottom: "1px solid #f46d25" }}
                >
                  <Typography className={classes.heading}>
                    Room Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <RoomFeaturView roomFeatureData={roomFeatureData} />
                </AccordionDetails>
              </Accordion>
            )}

            {_.isEmpty(kitchenData) ? null : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ borderBottom: "1px solid #f46d25" }}
                >
                  <Typography className={classes.heading}>
                    Kitchen & Food
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <KitchenView kitchenData={kitchenData} />
                </AccordionDetails>
              </Accordion>
            )}
            {_.isEmpty(popularData) ? null : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ borderBottom: "1px solid #f46d25" }}
                >
                  <Typography className={classes.heading}>
                    Popular Guests
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PopularGuestView popularData={popularData} />
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
           <Formik enableReinitialize>
              {({ values, isValid }) => {
                return (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Form autoComplete="off">
                      <Grid container spacing={4}>
                      <Grid item lg={12} />
                  <Grid container spacing={4}>
                    <Grid
                      item
                      lg={12}
                      style={{
                        marginLeft: "15px",
                        marginRight: "15px",
                        textAlign:"center",
                        fontSize:"30px",
                        backgroundColor: "#f46d25",
                        borderRadius: "8px",
                        color:"#fff",
                      }}
                    >
                      <b>Create New Enquiry</b>
                    </Grid>
                        <Grid item lg={12}>
                          <div className={classes.paper}>
                            <Grid container spacing={2}>
                            <Grid item lg={12} />
                              <Grid item lg={6}>
                                <Field
                                  name="roomName"
                                  as={TextField}
                                  label="ROOM Name"
                                  value={roomData.displayName}
                                  autoFocus
                                  variant="outlined"
                                  required
                                  disabled
                                  fullWidth
                                  size="small"
                                />
                              </Grid>
                              <Grid item lg={6}>
                                <Field
                                  name="bedType"
                                  as={TextField}
                                  label="Bed Type"
                                  value={roomData.bedType}
                                  autoFocus
                                  variant="outlined"
                                  required
                                  disabled
                                  fullWidth
                                  size="small"
                                />
                              </Grid>
                              <Grid item sm={6}>
                                <MaterialSelect
                                  name="noofRooms"
                                  placeholder="No. of Rooms"
                                  value={noofRooms}
                                  onChange={handlenoofRoomsChange}
                                  options={Numbers}
                                />
                              </Grid>
                              <Grid item sm={6}>
                                <MaterialSelect
                                  name="mealPlan"
                                  placeholder="Meal plan"
                                  value={meal}
                                  onChange={handlemealChange}
                                  options={BoardBasic}
                                />{" "}
                              </Grid>{" "}
                              <Grid item lg={6}>
                                <DatePicker
                                  label="Check-In"
                                  inputVariant="outlined"
                                  fullWidth
                                  size="small"
                                  animateYearScrolling
                                  format="dd/MM/yyyy"
                                  variant="inline"
                                  autoOk="true"
                                  disablePast="true"
                                  value={checkin}
                                  onChange={(e) => setCheckin(e)}
                                />
                              </Grid>
                              <Grid item lg={6}>
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
                                  onChange={(e) => setCheckout(e)}
                                  minDate={new Date(checkin)}
                                  disablePast="true"
                                />
                              </Grid>
                              <Grid item sm={6}>
                                <MaterialSelect
                                  name="adult"
                                  placeholder="Adult"
                                  value={adult}
                                  onChange={handleAdultChange}
                                  options={Numbers}
                                />
                              </Grid>
                              <Grid item sm={6}>
                                <MaterialSelect
                                  name="childern"
                                  placeholder="Childern"
                                  value={childern}
                                  onChange={handleChildernChange}
                                  options={Numbers}
                                />
                              </Grid>
                              <Grid item sm={12}/>
                              <Grid item sm={5}/>
                              <Grid item sm={1}>
                                <Button
                                  onClick={Agenttryingbooking}
                                  style={{ marginLeft: "-15px" }}
                                >
                                  Submit
                                </Button>
                              </Grid>
                              <Grid item sm={2}>
                                <Button onClick={handleClose} style={{background: "#121212",
                      color: "#fff",}}>Close</Button>
                              </Grid>
                              <Grid item sm={4}/>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      </Grid>
                    </Form>
                  </MuiPickersUtilsProvider>
                );
              }}
            </Formik>
      </Dialog>
    </div>
  );
}
