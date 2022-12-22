/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, TextField, Grid, makeStyles } from "@material-ui/core/";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  propertyContactData,
  propertyContactCreate,
  propertyContactUpdate,
} from "../../../redux/actions/propertyAction";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
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
  error: {
    color: "red",
  },
}));

function Contact(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  var propertyId = sessionStorage.getItem("propertyId");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = {
    uniqueId: uniqueid,
    createdBy: createdBy,
    propertyId: propertyId,
  };

  const initialValues = {
    hotelPhone: "",
    hotelMobile: "",
    hotelEmail: "",
    phoneList: "",
    emailList: "",
    websiteList: "",
    ccEmailList: "-",
    fromEmail: "-",
  };

  const dispatch = useDispatch();
  const propertyContactDatas = useSelector(
    (state) => state.propertyContactData.propertyContactDatas
  );
  useEffect(() => {
    dispatch(propertyContactData(propertyId));
  }, [propertyId]);

  const validationSchema = Yup.object({
    hotelPhone: Yup.number("Invalid Phone Number")
      .required("Phone Number is Required")
      .nullable(),
    hotelMobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid Mobile")
      .required("Mobile Number is required")
      .min(10, "Enter correct Number")
      .max(10, "Enter correct Number")
      .nullable(),
    hotelEmail: Yup.string()
      .email("Enter correct Format")
      .strict()
      .trim()
      .required("Email is Required")
      .nullable(),
  });

  function onSubmit(fields, { setStatus }) {
    const id = propertyContactDatas.id;
    setStatus();
    if (id) {
      updateContact(fields);
    } else {
      createContact(fields);
    }
  }

  function createContact(fields) {
    var createData = { ...fields, ...create };
    dispatch(propertyContactCreate(createData, props.history));
    setLoading(true);
  }

  function updateContact(fields) {
    fields.updateBy = createdBy;
    dispatch(propertyContactUpdate(fields, props.history));
    setLoading(true);
  }

  return (
    <>
      <div className={classes.paper}>
        <Formik
          initialValues={propertyContactDatas || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="hotelPhone"
                  type="text"
                  fullWidth
                  label="Hotel Phone"
                  autoFocus
                  variant="outlined"
                  size="small"
                  as={TextField}
                  required
                />
                <ErrorMessage name="hotelPhone">
                  {(error) => <div className={classes.error}>{error}</div>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="hotelMobile"
                  type="text"
                  fullWidth
                  label="Hotel Mobile"
                  as={TextField}
                  variant="outlined"
                  size="small"
                  required
                />
                <ErrorMessage name="hotelMobile">
                  {(error) => <div className={classes.error}>{error}</div>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="hotelEmail"
                  type="text"
                  fullWidth
                  label="Hotel Email"
                  as={TextField}
                  variant="outlined"
                  size="small"
                  required
                />
                <ErrorMessage name="hotelEmail">
                  {(error) => <div className={classes.error}>{error}</div>}
                </ErrorMessage>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="emailList"
                  type="text"
                  fullWidth
                  label="Email List"
                  as={TextField}
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={6}
                  helperText="Multiple values to be separated by comma"
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <Field
                  name="phoneList"
                  type="text"
                  fullWidth
                  label="Phone List"
                  as={TextField}
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={6}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="websiteList"
                  type="text"
                  fullWidth
                  label="Website List"
                  as={TextField}
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={6}
                  helperText="Multiple values to be separated by comma"
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
                  >
                    Save and Continue
                  </Button>
                )}
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default withRouter(Contact);
