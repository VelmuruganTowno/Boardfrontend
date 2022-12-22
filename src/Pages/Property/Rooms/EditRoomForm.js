import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";
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
  Modal,
} from "@material-ui/core/";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MaterialSelect from "../../../components/Select/MaterialSelect";

const useStyles = makeStyles(() => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    maxWidth: "90%",
    margin: "0 auto",
    marginTop: "20px",
    marginBottom: "20px",
    overflowY: "scroll",
  },
  paper: {
    position: "absolute",
    top: "2%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    background: "#fff",

    padding: "10px 20px 10px 20px",
  },
  cross: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "unset",
    paddingTop: "10px",
  },
  submit: {
    color: "#fff",
  },
}));

export const Num = [
  { value: 0, label: 0 },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
];
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
  adultsBase: 0,
  adultsMax: 0,
  childBase: 0,
  childMax: 0,
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
  var propertyId = sessionStorage.getItem("propertyId");
  var displayName = sessionStorage.getItem("displayName");
  var updateBy = localStorage.getItem("auth");
  const data = { propertyId: propertyId, displayName: displayName };
  const { onClose, open } = props;
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomViews, setRoomViews] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);
  const [extraBedTypes, setExtraBedTypes] = useState([]);
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);

  const RoomTypes = async () => {
    const RoomTypesData = {
      type: "Room Type",
    };
    await Api
      .post("productdropdownonly", RoomTypesData)
      .then((res) => {
        setRoomTypes(res.data);
      });
  };
  const RoomViews = async () => {
    const RoomViewsData = {
      type: "Room View",
    };
    await Api
      .post("productdropdownonly", RoomViewsData)
      .then((response) => {
        setRoomViews(response.data);
      });
  };
  const BedTypes = async () => {
    const BedTypesData = {
      type: "Bed Type",
    };
    await Api
      .post("productdropdownonly", BedTypesData)
      .then((response) => {
        setBedTypes(response.data);
      });
  };
  const ExtraBedTypes = async () => {
    const ExtraBedTypesData = {
      type: "Extra Bed Type",
    };
    await Api
      .post("productdropdownonly", ExtraBedTypesData)
      .then((response) => {
        setExtraBedTypes(response.data);
      });
  };
  useEffect(() => {
    RoomTypes();
    RoomViews();
    BedTypes();
    ExtraBedTypes();
    if (displayName !== "") {
      getRoomData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayName]);

  const getRoomData = () => {
    Api.post("propertyamenitiesroomvalue", data).then((res) => {
      setRoom(res.data);
    });
  };

  const onSubmit = (fields) => {
    setLoading(true);
    fields.updateBy = updateBy;
    Api.put("propertyamenitiesroomupdate", fields).then((res) => {
      toast.success("Successfully Updated");
      onClose(true);
      setLoading(false);
    });
  };

  const validationSchema = Yup.object({
    roomType: Yup.string().required("RoomType Required"),
    roomArea: Yup.string().required("Required"),
    roomAreaType: Yup.string().required("Required"),
    totalRooms: Yup.string().required("TotalRooms Required"),
    roomView: Yup.string().required("RoomView Required"),
    bedType: Yup.string().required("BedType Required"),
    extraBedType: Yup.string().required("ExtraBedType Required"),
    adultsBase: Yup.string().required("AdultsBase Required"),
    adultsMax: Yup.string().required("AdultsMax Required"),
    childBase: Yup.string().required("ChildBase Required"),
    childMax: Yup.string().required("ChildMax Required"),
    roomRent: Yup.string().required("RoomRent Required"),
    guestRent: Yup.string().required("GuestRent Required"),
    mealplan: Yup.string().required("MealPlan Required"),
    cprate: Yup.string().required("Cprate Required"),
    maprate: Yup.string().required("Maprate Required"),
    aprate: Yup.string().required("Aprate Required"),
    guestChildRent: Yup.string().required("Child Rent Required"),
    chcprate: Yup.string().required("Child Cprate Required"),
    chmaprate: Yup.string().required("Child Maprate Required"),
    chaprate: Yup.string().required("Child Aprate Required"),
    roomRentGold: Yup.number()
      .required(" Required")
      .max(100, "Percentage cannot be more than 100"),
    roomRentSilver: Yup.number()
      .required(" Required")
      .max(100, "Percentage cannot be more than 100"),
    roomRentBronze: Yup.number()
      .required(" Required")
      .max(100, "Percentage cannot be more than 100"),
    guestRentGold: Yup.number().required(" Required"),
    guestRentSilver: Yup.number().required(" Required"),
    guestRentBronze: Yup.number().required(" Required"),
    guestChildRentGold: Yup.number().required(" Required"),
    guestChildRentSilver: Yup.number().required(" Required"),
    guestChildRentBronze: Yup.number().required(" Required"),
  });

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className={classes.paper}>
          <Formik
            initialValues={room || initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={validationSchema}
          >
            {({ setFieldValue, values, isValid }) => {
              return (
                <Form autoComplete="off">
                  <Grid container spacing={4}>
                    <Grid item sm={12}>
                      <h2>Room Info</h2>
                    </Grid>
                    <Grid item sm={6}>
                      <Field
                        name="longDescription"
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
                          disabled
                          label="Display Name"
                          variant="outlined"
                          size="small"
                        />
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        placeholder="Bed Type"
                      />

                      <ErrorMessage name="bedType">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        placeholder="Extra Bed Type"
                      />

                      <ErrorMessage name="extraBedType">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        placeholder="Room View"
                      />

                      <ErrorMessage name="roomView">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        onChange={(value) =>
                          setFieldValue("adultsBase", value.value)
                        }
                        options={Num}
                        placeholder="Adults Base"
                      />

                      <ErrorMessage name="adultsBase">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        options={Num}
                        placeholder="Adults Max"
                      />

                      <ErrorMessage name="adultsMax">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>

                    <Grid item sm={6}>
                      <Field
                        name="childBase"
                        value={values.childBase || ""}
                        component={MaterialSelect}
                        onChange={(value) =>
                          setFieldValue("childBase", value.value)
                        }
                        options={Num}
                        placeholder="Child Base"
                      />
                      <ErrorMessage name="childBase">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        options={Num}
                        placeholder="Child Max"
                      />

                      <ErrorMessage name="childMax">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item sm={6}>
                      <Field
                        name="maprate"
                        type="text"
                        as={TextField}
                        fullWidth
                        label="MAP Rate"
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
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
                          <Button type="submit" disabled={!isValid}>
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
      </Modal>
    </>
  );
}

export default RoomForm;
