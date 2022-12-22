/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import axios from "axios";
import { toast } from "react-toastify";
import MaterialSelect from "../../components/Select/MaterialSelect";
import DatePickers from "../../components/DatePicker/DatePickers";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    // paddingTop: "100px",
    // margin: "0px 40px",
    padding:'4.5% 1% 1% 1%',
    "& > *": {
      height: "auto",
    },
    "@media (max-width: 767px)": {
      margin: "0px 20px",
    },
  },
  paper: {
    width: "100%",
    // padding: "10px",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "0px",
    },
  },

  heading: {
    color: "#f46d25",
    fontSize: "24px",
    margin: "10px 0px 25px 0px",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  error: {
    color: "red",
  },
}));

const initialValues = {
  id: "",
  firstName: "",
  lastName: "",
  nationality: "",
  dob: new Date(),
  address: "",
  city: "",
  genderType: "",
  mobile: "",
  mail: "",
};
export default function Profile() {
  const classes = useStyles();
  const [profileDetails, setProfileDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = () => {
    const employee_id = localStorage.getItem("employee_id");
    const role = localStorage.getItem("role");
    var urlget;
    if (role == "Super Admin") {
      urlget = "companyregisteration/" + employee_id;
    } else if (role == "Agent Admin") {
      urlget = "companyregisteration/" + employee_id;
    } else {
      urlget = "staff-details/" + employee_id;
    }
    Api.get(urlget).then((res) => {
      setProfileDetails(res.data);
    });
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name Required").nullable(),
    lastName: Yup.string().required("Last Name Required").nullable(),
    nationality: Yup.string().required("Nationality Required").nullable(),
    address: Yup.string().required("Address Required").nullable(),
    city: Yup.string().required("city Required").nullable(),
    mobile: Yup.string()
      .required("Mobile Required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "to short")
      .max(10, "to long")
      .nullable(),
    mail: Yup.string()
      .email("Enter correct format")
      .required("Mail Required")
      .nullable(),
  });

  const onSubmit = async (field) => {
    setLoading(true);
    const employee_id = localStorage.getItem("employee_id");
    const role = localStorage.getItem("role");
    const auth = localStorage.getItem("auth");
    field.updateBy = auth;
    var urlget;
    if (role == "Super Admin") {
      urlget = "companyregisterationprofile/" + employee_id;
    } else {
      urlget = "staff-details/" + employee_id;
    }
    await Api.put(urlget, field).then((res) => {
      if (res) {
        toast.success("Updated Successfully");
        setLoading(false);
      }
    });
  };
  return (
    <>
      <div className={classes.root}>
        <h4 className={classes.heading}>Profile Details </h4>
        <div className={classes.paper}>
          <Formik
            initialValues={profileDetails || initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ values, setFieldValue, isValid }) => {
              return (
                <Form autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                      <Field
                        name="firstName"
                        as={TextField}
                        value={values.firstName || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="First Name"
                      />
                      <ErrorMessage name="firstName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>

                    <Grid item md={6} xs={6}>
                      <Field
                        name="lastName"
                        label="Last Name"
                        value={values.lastName || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                      <ErrorMessage name="lastName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Field
                        name="nationality"
                        value={values.nationality || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        label="Nationality"
                        fullWidth
                      />
                      <ErrorMessage name="nationality">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Field
                        name="city"
                        value={values.city || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        label="City"
                        fullWidth
                      />
                      <ErrorMessage name="city">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Field name="dob" component={DatePickers} label="D.O.B" />
                    </Grid>
                    <Grid item md={6} xs={6}>
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
                    <Grid item md={6} xs={6}>
                      <Field
                        name="mobile"
                        value={values.mobile || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        label="Mobile"
                        fullWidth
                      />
                      <ErrorMessage name="mobile">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Field
                        name="mail"
                        value={values.mail || ""}
                        as={TextField}
                        variant="outlined"
                        size="small"
                        label="Email"
                        fullWidth
                        disabled
                      />
                      <ErrorMessage name="mail">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Field
                        name="address"
                        value={values.address || ""}
                        variant="outlined"
                        size="small"
                        as={TextField}
                        label="Address"
                        multiline
                        minRows={2}
                        maxRows={4}
                        fullWidth
                      />
                      <ErrorMessage name="address">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                      {loading ? (
                        <Button type="submit" disabled>
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{
                              marginLeft: "0px",
                              marginRight: "8px",
                            }}
                          ></i>
                          Submit
                        </Button>
                      ) : (
                        <Button type="submit" disabled={!isValid}>
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
