/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { baseurl } from "../../../Service/httpCommon";
import Api from "../../../Service/Api";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import RoomAmenities from "./Amenities/RoomAmenities";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MaterialSelect from "../../../components/Select/MaterialSelect";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
    marginTop: "20px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    background: "#fff",
  },
  paper1: {
    display: "none",
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    color: "#fff",
  },
  error: {
    color: "red",
    cursor: "pointer",
  },
}));

const initialValues = {
  longDescription: "",
  roomType: "",
  displayName: "",
  roomArea: "",
  roomAreaType: "",
  totalRooms: "",
  roomView: "",
  bedType: "",
  extraBedType: "",
  balacony: "",
  bathTub: "",
  adultsBase: "",
  adultsMax: "",
  childBase: "",
  childMax: "",
  roomRent: "",
  guestRent: "",
  mealplan: "",
  cprate: "",
  maprate: "",
  aprate: "",
  chcprate: "",
  chmaprate: "",
  chaprate: "",
  guestChildRent: "",
  roomRentGold: "",
  roomRentSilver: "",
  roomRentBronze: "",
  guestRentGold: "",
  guestRentSilver: "",
  guestRentBronze: "",
  guestChildRentGold: "",
  guestChildRentSilver: "",
  guestChildRentBronze: "",
};

const MealPlan = [
  { value: "eprate", label: "EP Rate" },
  { value: "cprate", label: "CP Rate" },
  { value: "maprate", label: "MAP Rate" },
  { value: "aprate", label: "AP Rate" },
];
function RoomForm(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  var propertyId = sessionStorage.getItem("propertyId");
  var displayNameGet = sessionStorage.getItem("displayName");
  const data = { propertyId: propertyId };
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomViews, setRoomViews] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);
  const [extraBedTypes, setExtraBedTypes] = useState([]);
  const [newPage, setNewPage] = useState(false);
  var [displayNameError, setDisplayNameError] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [displayNameValid, setDisplayNameValid] = useState(false);
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [adultlimit, setAdultLimit] = useState(0);
  const [childlimit, setChildLimit] = useState(0);
  const { ListProperty } = props;

  var adultBaseOpition = [];
  for (var i = 0; i < 10; i++) {
    adultBaseOpition.push({ value: i, label: i });
  }
  var adultMaxOpition = [];
  for (var s = adultlimit; s < 10; s++) {
    adultMaxOpition.push({ value: s, label: s });
  }

  var childBaseOpition = [];
  for (var cb = 0; cb < 10; cb++) {
    childBaseOpition.push({ value: cb, label: cb });
  }
  var childMaxOpition = [];
  for (var cm = childlimit; cm < 10; cm++) {
    childMaxOpition.push({ value: cm, label: cm });
  }

  const RoomTypes = async () => {
    const RoomTypesData = {
      type: "Room Type",
    };
    await Api.post("productdropdownonly", RoomTypesData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setRoomTypes(res.data);
      });
  };
  const RoomViews = async () => {
    const RoomViewsData = {
      type: "Room View",
    };
    await Api.post("productdropdownonly", RoomViewsData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomViews(response.data);
      });
  };
  const BedTypes = async () => {
    const BedTypesData = {
      type: "Bed Type",
    };
    await Api.post("productdropdownonly", BedTypesData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setBedTypes(response.data);
      });
  };
  const ExtraBedTypes = async () => {
    const ExtraBedTypesData = {
      type: "Extra Bed Type",
    };
    await Api.post("productdropdownonly", ExtraBedTypesData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setExtraBedTypes(response.data);
      });
  };
  useEffect(() => {
    RoomTypes();
    RoomViews();
    BedTypes();
    ExtraBedTypes();
    if (_.isEmpty(displayNameGet)) {
      setNewPage(false);
    }
  }, [displayNameGet]);

  const validationSchema = Yup.object({
    roomType: Yup.string().required("RoomType Required"),
    roomArea: Yup.number().required("Required"),
    roomAreaType: Yup.string().required("Required"),
    totalRooms: Yup.number().required("TotalRooms Required"),
    roomView: Yup.string().required("RoomView Required"),
    bedType: Yup.string().required("BedType Required"),
    extraBedType: Yup.string().required("ExtraBedType Required"),
    adultsBase: Yup.number().required("AdultsBase Required"),
    adultsMax: Yup.number().required("AdultsMax Required"),
    childBase: Yup.number().required("ChildBase Required"),
    childMax: Yup.number().required("ChildMax Required"),
    roomRent: Yup.number().required("RoomRent Required"),
    guestRent: Yup.number().required("GuestRent Required"),
    mealplan: Yup.string().required("Mealplan Required"),
    cprate: Yup.number().required("Cprate Required"),
    maprate: Yup.number().required("Maprate Required"),
    aprate: Yup.number().required("Aprate Required"),
    guestChildRent: Yup.number().required("Child Rent Required"),
    chcprate: Yup.number().required("Child Cprate Required"),
    chmaprate: Yup.number().required("Child Maprate Required"),
    chaprate: Yup.number().required("Child Aprate Required"),
    roomRentGold: Yup.number().required(" Required").max(100,"Percentage cannot be more than 100"),
    roomRentSilver: Yup.number().required(" Required").max(100,"Percentage cannot be more than 100"),
    roomRentBronze: Yup.number().required(" Required").max(100,"Percentage cannot be more than 100"),
    guestRentGold: Yup.number().required(" Required"),
    guestRentSilver: Yup.number().required(" Required"),
    guestRentBronze: Yup.number().required(" Required"),
    guestChildRentGold: Yup.number().required(" Required"),
    guestChildRentSilver: Yup.number().required(" Required"),
    guestChildRentBronze: Yup.number().required(" Required"),
  });

  const onSubmit = (fields) => {
    setLoading(true);
    var createRoomData = { ...data, ...fields, ...create };
    Api.post("propertyamenitiesroom", createRoomData)
      .then((res) => {
        var displayName = res.data.displayName.replace(/['"']+/g, "");
        sessionStorage.setItem("displayName", displayName);
        toast.success("Successfully Created");
        if (res.data.displayName) {
          setNewPage(true);
          setLoading(false);
          ListProperty();
        }
      });
  };
  const validationEmail = Yup.object({
    displayName: Yup.string().required("PropertyName Required"),
  });

  const validCheck = async (values) => {
    if (values !== "" && values !== undefined && values !== null) {
      const valid = { displayName: values };
      Api.post("roomdisplaynamecheck", valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          setDisplayNameError(true);
        } else {
          setDisplayNameError(false);
        }
      });
    }
    const nameField = { displayName: values };
    const isValid = await validationEmail.isValid(nameField);
    setDisplayNameValid(!isValid);
  };

  return (
    <>
      <div className={newPage ? classes.paper1 : classes.paper}>
        <Formik
          initialValues={initialValues || ""}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values, isValid }) => {
            return (
              <Form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <h2>Add New Room </h2>
                  </Grid>

                  <Grid item sm={6}>
                    <Field
                      name="longDescription"
                      value={values.longDescription}
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Long Description"
                      autoFocus
                      variant="outlined"
                      size="small"
                      multiline
                      minRows={6}
                      maxRows={6}
                    />
                  </Grid>
                  <Grid item container sm={6}>
                    <Grid item sm={12}>
                      <Field
                        name="roomType"
                        value={values.roomType || ""}
                        component={MaterialSelect}
                        onChange={(value) =>
                          setFieldValue("roomType", value.value)
                        }
                        options={roomTypes.map((roomTypes) => ({
                          label: roomTypes,
                          value: roomTypes,
                        }))}
                        placeholder="Room Type *"
                      />

                      <ErrorMessage name="roomType">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item sm={12}>
                      <Field
                        name="displayName"
                        type="text"
                        as={TextField}
                        required
                        fullWidth
                        label="Display Name"
                        variant="outlined"
                        size="small"
                        onBlur={() => validCheck(values.displayName)}
                      />
                      {displayNameValid ? (
                        <span className={classes.error}>
                          DisplayName Required
                        </span>
                      ) : null}
                      {displayNameError ? (
                        <span style={{ color: "red" }}>
                          Display Name Already There!
                        </span>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Grid item container sm={6}>
                    <Grid item sm={6}>
                      <Field
                        name="roomArea"
                        type="text"
                        required
                        as={TextField}
                        label="Room Area"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="roomArea">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        required
                      >
                        <InputLabel>Area</InputLabel>
                        <Field name="roomAreaType" label="Area" as={Select}>
                          <MenuItem value="sqft">Sq.ft</MenuItem>
                          <MenuItem value="sqmtr">Sq.mtr</MenuItem>
                        </Field>
                      </FormControl>
                      <ErrorMessage name="roomAreaType">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="totalRooms"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Total Rooms"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="totalRooms">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="bedType"
                      value={values.bedType || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("bedType", value.value)
                      }
                      options={bedTypes.map((bedTypes) => ({
                        label: bedTypes,
                        value: bedTypes,
                      }))}
                      placeholder="Bed Type *"
                    />

                    <ErrorMessage name="bedType">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="extraBedType"
                      value={values.extraBedType || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("extraBedType", value.value)
                      }
                      options={extraBedTypes.map((extraBedTypes) => ({
                        label: extraBedTypes,
                        value: extraBedTypes,
                      }))}
                      placeholder="Extra Bed Type *"
                    />

                    <ErrorMessage name="extraBedType">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="roomView"
                      value={values.roomView || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("roomView", value.value)
                      }
                      options={roomViews.map((roomViews) => ({
                        label: roomViews,
                        value: roomViews,
                      }))}
                      placeholder="Room View *"
                    />
                    <ErrorMessage name="roomView">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="balacony"
                          type="checkbox"
                          as={Checkbox}
                          color="primary"
                        />
                      }
                      label="Balcony"
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="bathTub"
                          type="checkbox"
                          as={Checkbox}
                          color="primary"
                        />
                      }
                      label="Bath Tub"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item sm={12}>
                    <h2>Room Occupancy</h2>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="adultsBase"
                      value={values.adultsBase || ""}
                      component={MaterialSelect}
                      onChange={(value) => {
                        setFieldValue("adultsBase", value.value);
                        setAdultLimit(value.value);
                      }}
                      options={adultBaseOpition}
                      placeholder="Adults Base *"
                    />

                    <ErrorMessage name="adultsBase">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="adultsMax"
                      value={values.adultsMax || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("adultsMax", value.value)
                      }
                      options={adultMaxOpition}
                      placeholder="Adults Max *"
                    />

                    <ErrorMessage name="adultsMax">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="childBase"
                      value={values.childBase || ""}
                      component={MaterialSelect}
                      onChange={(value) => {
                        setFieldValue("childBase", value.value);
                        setChildLimit(value.value);
                      }}
                      options={childBaseOpition}
                      placeholder="Child Base *"
                    />
                    <ErrorMessage name="childBase">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="childMax"
                      value={values.childMax || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("childMax", value.value)
                      }
                      options={childMaxOpition}
                      placeholder="Child Max *"
                    />
                    <ErrorMessage name="childMax">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item sm={12}>
                    <h2>Room Rent</h2>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="roomRent"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Room Rent"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="roomRent">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="roomRentGold"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Room Rent Gold Percentage"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="roomRentGold">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="roomRentSilver"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Room Rent Silver Percentage"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="roomRentSilver">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="roomRentBronze"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Room Rent Bronze Percentage"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="roomRentBronze">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestRent"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Guest Rent"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestRent">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestRentGold"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Guest Rent Gold"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestRentGold">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestRentSilver"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Guest Rent Silver"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestRentSilver">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestRentBronze"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Guest Rent Bronze"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestRentBronze">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestChildRent"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Child Rent"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestChildRent">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestChildRentGold"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Child Rent Gold"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestChildRentGold">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestChildRentSilver"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Child Rent Silver"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestChildRentSilver">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="guestChildRentBronze"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Extra Child Rent Bronze"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="guestChildRentBronze">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="mealplan"
                      value={values.mealplan || ""}
                      component={MaterialSelect}
                      onChange={(value) => {
                        setFieldValue("mealplan", value.value);
                      }}
                      options={MealPlan}
                      placeholder="Meal Plan *"
                    />

                    <ErrorMessage name="mealplan">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="cprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="CP Supplement Rate Per"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="cprate">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="cprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label=" CP Rate"
                      variant="outlined"
                      size="small"
                      required
                      value={+values.cprate + +values.roomRent}
                      disabled
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="maprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="MAP Supplement Rate Per"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="maprate">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="maprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="MAP Rate "
                      variant="outlined"
                      size="small"
                      required
                      value={+values.maprate + +values.roomRent}
                      disabled
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="aprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="AP Supplement Rate Per"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="aprate">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="aprate"
                      type="text"
                      as={TextField}
                      value={+values.aprate + +values.roomRent}
                      fullWidth
                      label="AP Rate"
                      variant="outlined"
                      size="small"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="chcprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="CP Child Supplement Rate Per"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="chcprate">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="chmaprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="MAP Child Supplement Rate Per"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="chmaprate">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={6}>
                    <Field
                      name="chaprate"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="AP Child Supplement Rate Per"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="chaprate">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>

                  <Grid item sm={12}>
                    {loading ? (
                      <Button type="submit" disabled>
                        <i
                          className="fa fa-refresh fa-spin"
                          style={{
                            marginRight: "8px",
                          }}
                        ></i>
                        Save and Continue
                      </Button>
                    ) : (
                      <center>
                        <Button
                          type="submit"
                          disabled={!isValid || displayNameValid}
                        >
                          Save and Continue
                        </Button>
                      </center>
                    )}
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
      {newPage ? <RoomAmenities /> : null}
    </>
  );
}

export default RoomForm;
