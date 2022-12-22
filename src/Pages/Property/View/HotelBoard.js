/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";
import Rating from "./../../OrderBooking/Rating";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { Numbers } from "./Data";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import MaterialSelect from "../../../components/Select/MaterialSelect";
import Api from "../../../Service/Api";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@material-ui/icons/Send';
import Stack from '@mui/material/Stack'
import {twnButtonStyles} from '../../../utils/townoStyle'

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
  },
  root: {
    background: "#F4F4F4",
    display: "flex",
    height: "auto",
    verticalAlign: "center",
    alignItems: "center",
    padding: "10px",
    marginTop: "10px",
    "@media(max-width:767px)": {
      background: "#F46D25",
      color: "#fff",
      borderRadius: "7px",
    },
  },
  headings: {
    margin: "20px",
    // background: "#F46D25",
    // color: "#fff",
    "@media (max-width: 767px)": {
      display: "none",
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
    marginLeft: "60px",
    right: "0",
    zIndex: "1000",
  },
  rightSide: {
    float: "right",
  },
  h3: {
    margin: "0px",
    "@media(max-width:767px)": {
      fontSize: "18px",
    },
  },
  button: {
    background: "#F46D25",
    "@media(max-width:767px)": {
      background: "#343A40",
    },
  },
}));

const BoardBasic = [
  { value: "ep", label: "EP" },
  { value: "cp", label: "CP" },
  { value: "map", label: "MAP" },
  { value: "ap", label: "AP" },
];
export default function HotelBoard() {
  const classes = useStyles();
  const hotelDetails = useSelector((state) => state.hotelDetail.hotelDetails);
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  const [adult, setAdult] = useState(0);
  const [childern, setChildern] = useState(0);
  const [noofRooms, setNoofRooms] = useState(0);
  const [meal, setMeal] = useState("");
  const [room, setRoom] = useState("");
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const Role = localStorage.getItem("role");
  let checkAgent = localStorage.getItem("agent");
  let hasAdmin = localStorage.getItem("role");
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
  console.log(hotelDetails.displayName);
  console.log(room);
  const Agenttryingbooking = () => {
    const Data = {
      uniqueId: localStorage.getItem("unique_id"),
      propertyId: id,
      propertyName: hotelDetails.displayName,
      displayName: room,
      noofrooms: noofRooms,
      noofadults: adult,
      noofchild: childern,
      mealplan: meal,
      checkin: checkin !== null ? format(checkin, "yyyy-MM-dd") : "",
      checkout: checkout !== null ? format(checkout, "yyyy-MM-dd") : "",
      createdBy: localStorage.getItem("auth"),
    };
    Api.post("agenttryingbooking", Data).then((res) => {
      handleClose();
      toast.success(
        "Enquiry Sent Successfully................. We will get back to you shortly.."
      );
    });
  };
  const handleAdultChange = (selectedOption) => {
    setAdult(selectedOption.value);
  };
  const handleChildernChange = (selectedOption) => {
    setChildern(selectedOption.value);
  };
  const handlenoofRoomsChange = (selectedOption) => {
    console.log(selectedOption);
    setNoofRooms(selectedOption.value);
  };
  const handlemealChange = (selectedOption) => {
    setMeal(selectedOption.value);
  };
  const handleroomChange = (selectedOption) => {
    setRoom(selectedOption.label);
  };
  const data = { propertyId: id };
  const [propertyList, setPropertyList] = useState([]);
  const ListProperty = () => {
    Api.post("propertyamenitiesroomallvalue", data).then((res) => {
      setOpen(true);
      setPropertyList(res.data);
    });
  };
  const Hoteloptions =
    propertyList &&
    propertyList.map((hotel) => {
      return { label: hotel.displayName, value: hotel.propertyId };
    });
  const validationSchema = Yup.object({
    room: Yup.number().required("Name is Required").nullable(),
    city: Yup.string().required("City is Required"),
    onboardedBy: Yup.string()
      .min(3, "Too Short!")
      .required("Onboarded By is Required"),
    address: Yup.string().required("Address is Required"),
    mobile: Yup.string()
      .min(10, "Invalid Mobile Number")
      .max(10, "Invalid Mobile Number")
      .required("Mobile No required"),
  });
  return (
    <div className={classes.root}>
      {width <= 768 ? (
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <h3 className={classes.h3}>{hotelDetails.propertyName}</h3>
          </Grid>
          <Grid item xs={4}>
            <Rating rating={hotelDetails.starRating} />
          </Grid>
          <Grid item xs={6}>
            <p style={{ margin: "0px" }}>
              {hotelDetails.city},{hotelDetails.state}
            </p>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.rightSide}>
              {hasAdmin === "Agent Admin" || checkAgent === "Agent" ? (
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
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={8}>
            <h3 className={classes.h3}>
              {hotelDetails.propertyName}&nbsp; &nbsp;
              <Rating rating={hotelDetails.starRating} />
            </h3>
            <p style={{ margin: "0px" }}>
              {hotelDetails.city},{hotelDetails.state}
            </p>
          </Grid>
          <Grid item lg={4}>
            <div className={classes.rightSide}>
              {hasAdmin === "Agent Admin" || checkAgent === "Agent" ? (
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
            </div>
          </Grid>
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <Formik enableReinitialize validationSchema={validationSchema}>
          {({ values, isValid }) => {
            return (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form autoComplete="off">
                  <Grid item lg={12} />
                  <Grid container spacing={4}>
                    <Grid
                      item
                      lg={12}
                      style={{
                        marginLeft: "15px",
                        marginRight: "15px",
                        marginTop: "10px",
                        textAlign: "center",
                        fontSize: "30px",
                        backgroundColor: "#f46d25",
                        borderRadius: "8px",
                        color: "#fff",
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
                              name="propertyName"
                              as={TextField}
                              label="property Name"
                              value={hotelDetails.propertyName}
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
                              name="propertyCity"
                              as={TextField}
                              label="City"
                              value={hotelDetails.city}
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
                              name="starRating"
                              as={TextField}
                              label="Star Rating"
                              variant="outlined"
                              fullWidth
                              disabled
                              size="small"
                              value={hotelDetails.starRating}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="room"
                              placeholder="Select Room"
                              value={room}
                              onChange={handleroomChange}
                              options={Hoteloptions}
                            /> <ErrorMessage name="room">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
                          </Grid>
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
                              required
                            />
                            <ErrorMessage name="checkin">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
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
                              required
                            />
                            <ErrorMessage name="checkout">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="noofRooms"
                              placeholder="No. of Rooms"
                              value={noofRooms}
                              onChange={handlenoofRoomsChange}
                              options={Numbers}
                            />
                            <ErrorMessage name="noofrooms">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
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
                              options={[{ value: '0', label: '0' }, ...Numbers]}
                            />
                            <ErrorMessage name="children">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="mealPlan"
                              placeholder="Meal plan"
                              value={meal}
                              onChange={handlemealChange}
                              options={BoardBasic}
                            />
                            <ErrorMessage name="mealPlan">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
                          </Grid>

                          <Stack direction='row' spacing={1} justifyContent="center" alignItems="center" style={{ width: '100%', margin: '10px' }}>
                            {checkin !== null && checkout !== null ?
                              <Stack>
                                <LoadingButton
                                  loading={loading}
                                  onClick={() => {
                                    setLoading(true)
                                    Agenttryingbooking()
                                  }}
                                  style={twnButtonStyles.orangeBtn}
                                  loadingPosition="start"
                                  startIcon={<SendIcon style={{ fontSize: 'medium', marginLeft: '3px' }} />}
                                  variant="outlined"
                                >
                                  Submit
                                </LoadingButton>
                              </Stack> :
                              <Button style={twnButtonStyles.disabledBtn}>Submit</Button>
                            }
                            <Stack item sm={2}>
                              <Button
                                onClick={handleClose}
                                style={twnButtonStyles.blackBtn}
                              >
                                Close
                              </Button>
                            </Stack>
                          </Stack>
                        </Grid>
                      </div>
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
