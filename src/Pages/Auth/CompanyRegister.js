/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, TextField, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Api from "../../Service/Api";
import { toast } from "react-toastify";
import login from "../../assets/pictures/login.png";
import "./auth.scss";
import towno from "../../assets/logo/towno_logo.png";
import Board from "../../assets/logo/Board-logo-Black.png";


const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 2, 2),
    background: "#F46D25",
    color: "#fff",
    "&:hover": {
      background: "#F46D25",
    },
  },
  error: {
    color: "#FF0000",
  },
}));

const initialValues = {
  name: "",
  website: "",
  mail: "",
  phone: "",
  mobile: "",
  panCard: "",
  
};

const CompanyRegister = (props) => {
  const classes = useStyles();
  const [mailError, setMailError] = useState(false);
  const [mailValid, setMailValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("unique_id") && localStorage.getItem("auth")) {
      history.push("/dashboard");
    }
  }, [history]);

  const validationSchema = yup.object({
    name: yup.string().strict().trim().required("Enter the Company Name"),
    website: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url"
      )
      .strict()
      .trim()
      .required("Enter the Website"),
    phone: yup.number("Invalid Phone Number"),
    mobile: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Invalid Mobile")
      .required("Mobile Number is required")
      .min(10, "Enter correct Mobile Number")
      .max(10, "Enter correct Mobile Number"),
    panCard: yup.string().strict().trim().required("Enter the Pan Card Number"),
  });

  const validationEmail = yup.object({
    mail: yup
      .string()
      .email("Enter correct Format")
      .strict()
      .trim()
      .required("Enter the Correct Email"),
  });

  const validCheck = async (data) => {
    if (data !== "" && data !== undefined && data !== null) {
      var mailData = { mail: data };
      Api.post("/companymailcheck", mailData).then((res) => {
        if (res.data == "Invalid") {
          setMailError(true);
        } else {
          setMailError(false);
        }
      });
    }
    const nameField = { mail: data };
    const isValid = await validationEmail.isValid(nameField);
    setMailValid(!isValid);
  };

  const onSubmit = (data) => {
    setLoading(true);
    Api.post("companyregisteration", data)
      .then((res) => {
        if (res.data.id) {
          setLoading(false);
          history.push("/login");
        }
      })
      .catch((err) => {
        toast.error("Please Register after some Time");
      });
  };

  return (
    <>
      <div className="container">
        <div className="contentRegister">
          <h1>
            Sign Up To <img src={Board} alt="logo" />
          </h1>
          <p>Enter your details below</p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, isValid }) => {
              return (
                <Form autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="name"
                        fullWidth
                        label="Company Name *"
                        autoFocus
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="name">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="website"
                        fullWidth
                        label="Website *"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="website">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="mail"
                        fullWidth
                        label="Mail *"
                        variant="outlined"
                        size="small"
                        onBlur={() => validCheck(values.mail)}
                      />
                      {mailValid ? (
                        <span className={classes.error}>Enter Vaild Email</span>
                      ) : null}
                      {mailError ? (
                        <span style={{ color: "red" }} id="errormessage">
                          Mail Already There!
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="mobile"
                        type="text"
                        fullWidth
                        label="Mobile *"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="mobile">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="phone"
                        type="text"
                        fullWidth
                        label="Phone *"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="phone">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="panCard"
                        type="text"
                        fullWidth
                        label="PAN Card *"
                        variant="outlined"
                        size="small"
                        inputProps={{
                          style: { textTransform: "uppercase" },
                        }}
                      />
                      <ErrorMessage name="panCard">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      {loading ? (
                        <Button type="submit" fullWidth disabled>
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{
                              marginLeft: "-12px",
                              marginRight: "8px",
                            }}
                          ></i>
                          Register
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          fullWidth
                          disabled={!isValid || mailError || mailValid}
                        >
                          Register
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ textAlign: "center" }}
                    >
                      <span>
                        Already have an account ? <Link to="/login">Login</Link>
                      </span>
                    </Grid>
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ textAlign: "center" }}
                    >
                      <div className="powered">
                        <h3>
                          Powered By{" "}
                          <img src={towno} alt="logo" className="towno" />
                        </h3>
                      </div>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="sideimage">
          <img src={login} alt="login" />
        </div>
      </div>
    </>
  );
};

export default CompanyRegister;
