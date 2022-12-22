/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Dialog,
  Radio,
  Tooltip,
  Checkbox,
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as Yup from "yup";
import {
  clientdetailsInitial,
  clientUpdateInitial,
  clientCreateInitial,
  clientclearFormInitial,
} from "../../redux/actions/clientAction";
import DatePickers from "../../components/DatePicker/DatePickers";
import MaterialSelect from "../../components/Select/MaterialSelect";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../Service/Api";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Stack, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
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
  heading: {
    margin: "2px 0 8px 0",

    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  dialogPaper: {
    minHeight: "100%",
    minWidth: "85%",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
    padding: "15px",
    "@media (max-width: 767px)": {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100%",
      overflowY: "scroll",
      maxWidth: "100%",
      minHeight: "95%",
    },
  },
  error: {
    color: "red",
  },
}));

const initialValues = {
  title: "",
  genderType: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  mobile: "",
  phone: "",
  mail: "",
  status: "active",
  address: "",
  postalCode: "",
  city: "",
  nationality: "",
  state: "",
  clientType: "",
  vaccinationStatus: false,
  travelAgent: "",
  anniversaryDate: "",
  mealPreference: "",
  remarks: "",
  pet: false,
  petName: "",
  petBreed: "",
  mealPreferenceOther: "",
};

export default function ClientForm(props) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy, status: "active" };
  const { onClose, selectedId, open, BookingLocal } = props;
  const dispatch = useDispatch();
  const clientDetails = useSelector(
    (state) => state.clientDetails.clientDetail
  );
  const [formErrorMail, setFormErrorMail] = useState({});
  const [formErrorMobile, setFormErrorMobile] = useState({});
  const [clientMailValid, setClientMailValid] = useState(false);
  const [clientMobileValid, setClientMobileValid] = useState(false);

  useEffect(() => {
    if (selectedId) {
      dispatch(clientdetailsInitial(selectedId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("FirstName Required").nullable(),
    lastName: Yup.string().required("LastName Required").nullable(),
  });

  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateClient(fields);
    } else {
      createClient(fields);
    }
  }
  function createClient(fields) {
    // validCheckMobile(fields.mobile);
    // validCheck(fields.mail);
    const createData = { ...create, ...fields };
    console.log("createData",createData);
    dispatch(clientCreateInitial(createData, uniqueid));
    // eslint-disable-next-line eqeqeq
    if (BookingLocal == "yes") {
      sessionStorage.setItem("mobile", fields.mobile);
    }
    onClose(true);
  }
  function updateClient(fields) {
    // validCheckMobile(fields.mobile);
    // validCheck(fields.mail);
    console.log("updateClient|fields",fields)
    const auth = localStorage.getItem("auth");
    fields.updatedBy = auth;
    dispatch(clientUpdateInitial(fields, uniqueid));
    onClose(true);
  }

  const handleClose = () => {
    onClose(true);
    dispatch(clientclearFormInitial());
  };
  const validCheck = async (values) => {
    setClientMailValid(true);
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values) {
      errors.mail = "Email is Required";
    } else if (!regex.test(values)) {
      errors.mail = "Invalid Email format!";
    } else if (values !== "" && values !== undefined && values !== null) {
      const valid = { mail: values, id: clientDetails.id };
      Api.post("clientcheckmail/" + uniqueid, valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          errors.mail = "Email Already Exist";
        } else {
          errors.mobile = "";
          setClientMailValid(false);
        }
      });
    }
    setFormErrorMail(errors);
  };

  const validCheckMobile = async (values) => {
    setClientMobileValid(true);
    const errors = {};
    if (!values) {
      errors.mobile = "Mobile No is Required";
    } else if (values !== "" && values !== undefined && values !== null) {
      const valid = { mail: values, id: clientDetails.id };
      Api.post("clientcheck/" + uniqueid, valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          errors.mobile = "Mobile No Already Exists";
        } else {
          errors.mobile = "";
          setClientMobileValid(false);
        }
      });
    }
    setFormErrorMobile(errors);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <Typography style={{ ...twnButtonStyles.xlFonts, paddingTop: "20px" }}>Add Client</Typography>
        <Formik
          initialValues={clientDetails || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {({ values, isValid, setFieldValue }) => {
            return (
              <Form autoComplete="off">
                <h4 className={classes.heading}>Basic Information</h4>
                <div className={classes.paper} >
                  <Grid container spacing={2} >
                    <Grid item md={1} xs={6}>
                      <Field
                        name="title"
                        className={classes.select}
                        value={values.title || ""}
                        component={MaterialSelect}
                        onChange={(value) =>
                          setFieldValue("title", value.value)
                        }
                        placeholder="Title"
                        options={[
                          { value: "mr", label: "Mr" },
                          { value: "mrs", label: "Mrs" },
                          { value: "ms", label: "Ms" },
                          { value: "dr", label: "Dr" },
                          { value: "-", label: "-" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Field
                        name="firstName"
                        type="text"
                        value={values.firstName || ""}
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                        required
                      />
                      <ErrorMessage name="firstName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="middleName"
                        label="Middle Name"
                        value={values.middleName || ""}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="lastName"
                        label="Last Name"
                        required
                        value={values.lastName || ""}
                        type="text"
                        fullWidth
                        variant="outlined"
                        as={TextField}
                        size="small"
                      />
                      <ErrorMessage name="lastName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="genderType"
                        className={classes.select}
                        value={values.genderType || ""}
                        component={MaterialSelect}
                        onChange={(value) =>
                          setFieldValue("genderType", value.value)
                        }
                        placeholder="Gender"
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="dob"
                        label="D.O.B"
                        value={values.dob || null}
                        component={DatePickers}
                        format="dd/MM/yyyy"
                        variant="inline"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="mail"
                        label="Email"
                        fullWidth
                        value={values.mail || ""}
                        variant="outlined"
                        size="small"
                        as={TextField}
                        onBlur={() => validCheck(values.mail)}
                        required
                      />
                      <span className={classes.error}>
                        {formErrorMail.mail}
                      </span>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="mobile"
                        label="Mobile"
                        value={values.mobile || ""}
                        fullWidth
                        required
                        variant="outlined"
                        size="small"
                        as={MuiPhoneNumber}
                        defaultCountry={"in"}
                        onChange={(value) => setFieldValue("mobile", value)}
                        onBlur={() => validCheckMobile(values.mobile)}
                      />
                      <span className={classes.error}>
                        {formErrorMobile.mobile}
                      </span>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="phone"
                        label="Phone No"
                        value={values.phone || ""}
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="anniversaryDate"
                        label="Anniversary date "
                        value={values.anniversaryDate || null}
                        component={DatePickers}
                        format="dd/MM/yyyy"
                        variant="inline"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </div>
                <h4 className={classes.heading}>Address Information</h4>
                <div className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="address"
                        label="Address"
                        value={values.address || ""}
                        variant="outlined"
                        size="small"
                        multiline
                        maxRows={3}
                        minRows={4}
                        fullWidth
                        as={TextField}
                      />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <Field
                        label="City"
                        value={values.city || ""}
                        name="city"
                        as={TextField}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <Field
                        name="state"
                        label="State"
                        value={values.state || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>

                    <Grid item sm={3} xs={6}>
                      <Field
                        name="nationality"
                        label="Nationality"
                        value={values.nationality || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <Field
                        label="Pin Code"
                        name="postalCode"
                        value={values.postalCode || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </div>
                <h4 className={classes.heading}>
                  Additional Client Information
                </h4>
                <div className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid container item md={12} spacing={2}>
                      <Grid item md={4} xs={12}>
                        <Field
                          name="clientType"
                          className={classes.select}
                          value={values.clientType || ""}
                          component={MaterialSelect}
                          onChange={(value) =>
                            setFieldValue("clientType", value.value)
                          }
                          placeholder="Client Type"
                          options={[
                            { value: "B2C", label: "B2C" },
                            { value: "B2B", label: "B2B" },
                          ]}
                        />
                      </Grid>
                      <Grid item md={4} xs={6}>
                        <Field
                          name="mealPreference"
                          className={classes.select}
                          value={values.mealPreference || ""}
                          component={MaterialSelect}
                          onChange={(value) =>
                            setFieldValue("mealPreference", value.value)
                          }
                          placeholder="Meal preference"
                          options={[
                            { value: "veg", label: "Veg" },
                            { value: "non-veg", label: "Non-veg" },
                            { value: "others", label: "Others" },
                          ]}
                        />
                      </Grid>
                      {values.mealPreference == "others" ? (
                        <Grid item md={4}>
                          <Field
                            label="Meal preference"
                            value={values.mealPreferenceOther || ""}
                            name="mealPreferenceOther"
                            as={TextField}
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Grid>
                      ) : null}
                      <Grid item md={2} xs={6}>
                        <FormControlLabel
                          control={
                            <Field
                              name="vaccinationStatus"
                              as={Checkbox}
                              color="primary"
                              type="checkbox"
                            />
                          }
                          label="Vaccinated"
                        />
                      </Grid>
                      <Grid item md={2} xs={6}>
                        <FormControlLabel
                          control={
                            <Field
                              name="travelAgent"
                              as={Checkbox}
                              color="primary"
                              type="checkbox"
                            />
                          }
                          label="Travel agent"
                        />
                      </Grid>
                      <Grid item md={2}>
                        <FormControlLabel
                          control={
                            <Field
                              name="pet"
                              as={Checkbox}
                              color="primary"
                              type="checkbox"
                            />
                          }
                          label="Pet"
                        />
                      </Grid>
                      {values.pet ? (
                        <Grid item md={3}>
                          <Field
                            label="Pet Name"
                            value={values.petName || ""}
                            name="petName"
                            as={TextField}
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Grid>
                      ) : null}
                      {values.pet ? (
                        <Grid item md={3}>
                          <Field
                            label="Pet Breed"
                            value={values.petBreed || ""}
                            name="petBreed"
                            as={TextField}
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="remarks"
                        label="Remarks"
                        value={values.remarks || ""}
                        variant="outlined"
                        size="small"
                        multiline
                        maxRows={3}
                        minRows={2}
                        fullWidth
                        as={TextField}
                      />
                    </Grid>
                  </Grid>
                </div>

                <Grid item md={12} xs={6}>
                  <div style={{ marginLeft: "20px" }}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="status"
                          color="primary"
                          value="active"
                          checked={values.status ? values.status == 'active' : true}
                          style={{ fontSize: "12px" }}
                          checkedIcon={<CheckBoxIcon />}
                          icon={<CheckBoxOutlineBlankIcon />}
                        />
                      }
                      label={<span style={{ fontSize: "12px" }}>Active</span>}
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="status"
                          color="primary"
                          value="inactive"
                          style={{ fontSize: "12px" }}
                          checkedIcon={<CheckBoxIcon />}
                          icon={<CheckBoxOutlineBlankIcon />}
                        />
                      }
                      label={
                        <span style={{ fontSize: "12px" }}>In-Active</span>
                      }
                    />
                  </div>
                </Grid>
                <Stack direction='row' spacing={2} justifyContent='center' alignItems='center' style={{ marginBottom: "15px" }}>
                  {/* {isValid || clientMobileValid || clientMailValid ? */}
                    <Button
                      type="submit"
                      className={classes.button}
                      disabled={!isValid || clientMobileValid || clientMailValid}
                      // style={{boxShadow:'none'}}
                      style={twnButtonStyles.orangeBtn}
                    >
                      Submit
                    </Button>
                    {/* :
                    <Button
                      style={twnButtonStyles.disabledBtn}
                    >
                      Submit
                    </Button>
                  } */}
                  <Button
                    onClick={handleClose}
                    style={twnButtonStyles.blackBtn}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}
