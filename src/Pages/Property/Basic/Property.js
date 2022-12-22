import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import MaterialSelect from "../../../components/Select/MaterialSelect";
import { Numbers } from "./Data";
import { Year } from "./Year";
import { Num } from "./Num";
import * as Yup from "yup";
import {
  propertyTypeList,
  timezoneList,
  propertyBasicData,
  propertyDetialUpdate,
  propertyDetialCreate,
} from "../../../redux/actions/propertyAction";
import { useSelector, useDispatch } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker } from "formik-material-ui-pickers";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px",
    marginTop: "20px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    background: "#F46D25",
    color: "#fff",
    "&:hover": {
      background: "#F46D25",
    },
  },
  title: {
    margin: "10px 0px",
  },
  error: {
    color: "red",
  },

  required: {
    "&::after": {
      content: '"*"',
      color: "red",
      position: "absolute",
      right: "0",
      top: "-20px",
      fontSize: "24px",
    },
  },
}));
const initialValues = {
  id: "",
  propertyName: "",
  displayName: "",
  description: "",
  propertyType: "",
  starRating: "",
  chainName: "",
  builtYear: "",
  noofRestaurant: "",
  noofRooms: "",
  noofFloors: "",
  checkinTime: null,
  checkoutTime: null,
  timezone: "Asia/Calcutta, GMT+05:30",
  propertyAddress: "",
  streetAddress: "",
  country: "",
  state: "",
  city: "",
  locality: "",
  zipcode: "",
  landmark: "",
  nearestrailway: "",
  nearestbusstop: "",
  nearestairport: "",
  accountManager: "",
  checkIn24: false,
  couplefriendly: false,
  petFriendly: false,
  beachnearby: false,
  swimingpool: false,
  conferencehall: false,
  kidsplayarea: false,
  designatorforwedding: false,
  isspa: false,
};

export default function Property(props) {
  const classes = useStyles();
  const { onTab } = props;
  var propertyId = sessionStorage.getItem("propertyId");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [loading, setLoading] = useState(false);

  const create = {
    uniqueId: uniqueid,
    createdBy: createdBy,
    propertyId: propertyId,
  };
  var [propertyNameError, setPropertyNameError] = useState(false);
  const [propertyNameValid, setPropertyNameValid] = useState(false);
  const dispatch = useDispatch();
  const propertyTypeLists = useSelector(
    (state) => state.propertyTypeList.propertyTypeLists
  );
  const timeZoneLists = useSelector(
    (state) => state.timeZoneList.timeZoneLists
  );
  const propertyBasicDatas = useSelector(
    (state) => state.propertyBasicData.propertyBasicDatas
  );

  useEffect(() => {
    dispatch(propertyTypeList());
    dispatch(timezoneList());
    if (propertyId !== "") {
      dispatch(propertyBasicData(propertyId));
    }
  }, [dispatch, propertyId]);

  function onSubmit(fields, { setStatus }) {
    const id = propertyBasicDatas.id;
    setStatus();
    if (id) {
      updateProperty(fields);
    } else {
      createProperty(fields);
    }
  }

  // Account Manager variables starts
  const [accountManagerList,setAccountManagerList] = useState([]);
  const AccountManagerApiFun = (event) => {
    Api.get(`leadassignfor/${uniqueid}`).then((res) => {
      console.log("Property|AccountManagerApiFun|response: ",res);
      setAccountManagerList(res.data);
    });
  }
  useEffect(()=>{
    AccountManagerApiFun();
  },[])
  const accountmanageroptions =
  accountManagerList &&
  accountManagerList.map((lead) => {
      return { label: lead.name, value: lead.username };
    });
  // Account Manager variables ends

  function createProperty(fields) {
    setLoading(true);
    fields.checkinTime = moment(fields.checkinTime).format(
      "YYYY-MM-DD hh:mm A"
    );
    fields.checkoutTime = moment(fields.checkoutTime).format(
      "YYYY-MM-DD hh:mm A"
    );
    var createData = { ...fields, ...create };
    dispatch(propertyDetialCreate(createData, onTab));
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }

  function updateProperty(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    fields.checkinTime = moment(fields.checkinTime).format(
      "YYYY-MM-DD hh:mm A"
    );
    fields.checkoutTime = moment(fields.checkoutTime).format(
      "YYYY-MM-DD hh:mm A"
    );
    dispatch(propertyDetialUpdate(fields, onTab));
    setTimeout(() => setLoading(false), 3000);
  }

  const validationEmail = Yup.object({
    propertyName: Yup.string().required("PropertyName Required"),
  });

  const validCheck = async (values) => {
    if (values !== "" && values !== undefined && values !== null) {
      const valid = { propertyName: values, id: propertyBasicDatas.id };
      Api.post(
          "propertybasicpropertydetailsallcheck/" + uniqueid,
          valid
        )
        .then((res) => {
          // eslint-disable-next-line eqeqeq
          if (res.data == "Invalid") {
            setPropertyNameError(true);
          } else {
            setPropertyNameError(false);
          }
        });
    }
    const nameField = { propertyName: values };
    const isValid = await validationEmail.isValid(nameField);
    setPropertyNameValid(!isValid);
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().required("DisplayName Required").nullable(),
    propertyType: Yup.string().required("PropertyType Required").nullable(),
    starRating: Yup.string().required("StarRating Required").nullable(),
    noofRestaurant: Yup.string()
      .required("No of Restaurant Required")
      .nullable(),
    noofRooms: Yup.string().required("No of Rooms Required").nullable(),
    noofFloors: Yup.string().required("No of Floors Required").nullable(),
    propertyAddress: Yup.string()
      .required("PropertyAddress Required")
      .nullable(),
    streetAddress: Yup.string().required("StreetAddress Required").nullable(),
    country: Yup.string().required("Country Required").nullable(),
    state: Yup.string().required("State Required").nullable(),
    city: Yup.string().required("City Required").nullable(),
    locality: Yup.string().required("Locality Required").nullable(),
    zipcode: Yup.string().required("Pincode Required").nullable(),
  });

  return (
    <div className={classes.paper}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={propertyBasicDatas || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validateOnMount
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, isValid }) => {
            return (
              <Form autoComplete="off">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="propertyName"
                      type="text"
                      as={TextField}
                      onBlur={() => validCheck(values.propertyName)}
                      value={values.propertyName}
                      fullWidth
                      label="Property Name"
                      autoFocus
                      variant="outlined"
                      size="small"
                      required
                    />
                    {propertyNameValid ? (
                      <span className={classes.error}>
                        PropertyName Required
                      </span>
                    ) : null}
                    {propertyNameError ? (
                      <span className={classes.error} id="errormessage">
                        Property Name Already There!
                      </span>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="displayName"
                      type="text"
                      fullWidth
                      label="Display Name"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      value={values.displayName}
                      required
                    />
                    <ErrorMessage name="displayName">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="description"
                      value={values.description || ""}
                      type="text"
                      fullWidth
                      label="Description"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      multiline
                      minRows={2}
                      maxRows={6}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="propertyType"
                      value={values.propertyType || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("propertyType", value.value)
                      }
                      options={propertyTypeLists.map((PropertyType) => ({
                        label: PropertyType,
                        value: PropertyType,
                      }))}
                      placeholder="Property Type *"
                    />
                    <ErrorMessage name="propertyType">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="starRating"
                      className={classes.select}
                      value={values.starRating || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("starRating", value.value)
                      }
                      placeholder="Star Rating *"
                      options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                      ]}
                    />
                    <ErrorMessage name="starRating">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="chainName"
                      value={values.chainName || ""}
                      type="text"
                      fullWidth
                      label="Chain Name"
                      variant="outlined"
                      size="small"
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="builtYear"
                      value={values.builtYear || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("builtYear", value.value)
                      }
                      options={Year}
                      placeholder="Build Year"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="noofRestaurant"
                      value={values.noofRestaurant || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("noofRestaurant", value.value)
                      }
                      options={Num}
                      placeholder="No of Restaurant *"
                    />
                    <ErrorMessage name="noofRestaurant">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="noofRooms"
                      value={values.noofRooms || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("noofRooms", value.value)
                      }
                      options={Numbers}
                      placeholder="No of Rooms *"
                    />
                    <ErrorMessage name="noofRooms">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="noofFloors"
                      value={values.noofFloors || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("noofFloors", value.value)
                      }
                      options={Num}
                      placeholder="No of Floors *"
                    />
                    <ErrorMessage name="noofFloors">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TimePicker}
                      label="Check-in Time"
                      name="checkinTime"
                      value={values.checkinTime || null}
                      inputVariant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TimePicker}
                      label="Check-out Time"
                      name="checkoutTime"
                      value={values.checkoutTime || null}
                      inputVariant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="timezone"
                      value={values.timezone || ""}
                      component={MaterialSelect}
                      onChange={(value) =>
                        setFieldValue("timezone", value.value)
                      }
                      options={timeZoneLists.map((Timezone) => ({
                        label: Timezone,
                        value: Timezone,
                      }))}
                      placeholder="Time Zone"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="propertyAddress"
                      value={values.propertyAddress || ""}
                      type="text"
                      fullWidth
                      label="Property Address"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="propertyAddress">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="streetAddress"
                      value={values.streetAddress || ""}
                      type="text"
                      fullWidth
                      label="Street Address"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="streetAddress">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="country"
                      value={values.country || ""}
                      type="text"
                      fullWidth
                      label="Country"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="country">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="state"
                      value={values.state || ""}
                      type="text"
                      fullWidth
                      label="State"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="state">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="city"
                      value={values.city || ""}
                      type="text"
                      fullWidth
                      label="City"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="city">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="locality"
                      value={values.locality || ""}
                      type="text"
                      fullWidth
                      label="Locality"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="locality">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="zipcode"
                      value={values.zipcode || ""}
                      type="text"
                      fullWidth
                      label="Pin Code"
                      variant="outlined"
                      size="small"
                      as={TextField}
                      required
                    />
                    <ErrorMessage name="zipcode">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="landmark"
                      value={values.landmark || ""}
                      type="text"
                      fullWidth
                      label="Landmark"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="nearestrailway"
                      value={values.nearestrailway || ""}
                      type="text"
                      fullWidth
                      label="Nearest Railway"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name="nearestbusstop"
                      value={values.nearestbusstop || ""}
                      type="text"
                      fullWidth
                      label="Nearest Bus Stop"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="nearestairport"
                      value={values.nearestairport || ""}
                      type="text"
                      fullWidth
                      label="Nearest Airport"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="accountManager"
                      value={values.accountManagerList || ""}
                      component={MaterialSelect}
                      onChange={(Value) => {
                        let lead = Value.value;
                        setFieldValue("accountManager", lead);
                      }}
                      options={accountmanageroptions}
                      placeholder="Account Manager"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Field
                          name="checkIn24"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.checkIn24}
                        />
                      }
                      label="24 Hour Check-in"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          name="couplefriendly"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.couplefriendly}
                        />
                      }
                      label="Couple Friendly"
                    />

                    <FormControlLabel
                      control={
                        <Field
                          name="petFriendly"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.petFriendly}
                        />
                      }
                      label="Pet Friendly"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          name="beachnearby"
                          color="primary"
                          as={Checkbox}
                          type="checkbox"
                          checked={values.beachnearby}
                        />
                      }
                      label="Beach Nearby"
                    />

                    <FormControlLabel
                      control={
                        <Field
                          name="swimingpool"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.swimingpool}
                        />
                      }
                      label="Swimming Pool"
                    />

                    <FormControlLabel
                      control={
                        <Field
                          name="conferencehall"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.conferencehall}
                        />
                      }
                      label="Banquet Hall"
                    />

                    <FormControlLabel
                      control={
                        <Field
                          name="kidsplayarea"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.kidsplayarea}
                        />
                      }
                      label="Kids Play Area"
                    />

                    <FormControlLabel
                      control={
                        <Field
                          name="designatorforwedding"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.designatorforwedding}
                        />
                      }
                      label="Wedding Destination"
                    />

                    <FormControlLabel
                      control={
                        <Field
                          name="isspa"
                          as={Checkbox}
                          color="primary"
                          type="checkbox"
                          checked={values.isspa}
                        />
                      }
                      label="Spa"
                    />
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
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={
                          !isValid || propertyNameError || propertyNameValid
                        }
                      >
                        Save and Continue
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </MuiPickersUtilsProvider>
    </div>
  );
}
