/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField, FormHelperText } from "@material-ui/core";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    // paddingTop: "80px",
    // margin: "0px 40px",
    padding:'4.6% 1% 1% 1%',
    "@media (max-width: 767px)": {
      margin: "0px 20px",
    },
  },
  paper: {
    // width: "100%",
    // padding: "20px",
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
      margin: "10px 0px 20px 0px",
      fontSize: "18px",
    },
  },
}));

export default function AddBooking() {
  const classes = useStyles();
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confrimpassword: "",
    },

    validationSchema: yup.object({
      oldpassword: yup
        .string()
        .strict()
        .trim()
        .required("old password Required"),
      newpassword: yup
        .string()
        .strict()
        .trim()
        .required("New password Required"),
      confrimpassword: yup
        .string()
        .strict()
        .trim()
        .oneOf([yup.ref("newpassword"), null], "Password Are not match")
        .required("Password Required"),
    }),

    onSubmit: (data) => {
      setLoading(true);
      const employee_id = localStorage.getItem("employee_id");
      const role = localStorage.getItem("role");
      var password = { password: data.newpassword };
      var urlget;
      if (role == "Super Admin") {
        urlget = "companyregisterationchangepassword/" + employee_id;
      } else {
        urlget = "staffpassword/" + employee_id;
      }
      Api.put(urlget, password).then((res) => {
        if (res.data === 1) {
          toast.success("Updated Successfully");
          setLoading(false);
        }
      });
    },
  });

  const validationpassword = (value) => {
    const employee_id = localStorage.getItem("employee_id");
    const auth = localStorage.getItem("auth");
    const role = localStorage.getItem("role");
    var url;
    if (role == "Super Admin") {
      url = "companyregisterationpassword";
    } else {
      url = "staffpassword";
    }
    Api.post(url, {
        id: employee_id,
        username: auth,
        password: value,
      })
      .then((res) => {
        if (res.data == "Valid") {
          setPasswordError(false);
        } else {
          setPasswordError(true);
        }
      });
  };

  return (
    <>
      <div className={classes.root}>
        <h4 className={classes.heading}>Change Password </h4>
        <div className={classes.paper}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  name="oldpassword"
                  label="Old Password"
                  type="text"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  size="small"
                  onChange={formik.handleChange}
                  value={formik.values.oldpassword}
                  error={
                    formik.touched.oldpassword &&
                    Boolean(formik.errors.oldpassword)
                  }
                  helperText={
                    formik.touched.oldpassword && formik.errors.oldpassword
                  }
                  onBlur={() => validationpassword(formik.values.oldpassword)}
                />
                {passwordError ? (
                  <FormHelperText style={{ color: "red" }} id="errormessage">
                    Invaild Password
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item md={8} />

              <Grid item md={4} xs={12}>
                <TextField
                  name="newpassword"
                  type="text"
                  label="New Password"
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  onChange={formik.handleChange}
                  value={formik.values.newpassword}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.newpassword &&
                    Boolean(formik.errors.newpassword)
                  }
                  helperText={
                    formik.touched.newpassword && formik.errors.newpassword
                  }
                />
              </Grid>
              <Grid item md={8} />
              <Grid item md={4} xs={12}>
                <TextField
                  name="confrimpassword"
                  className={classes.textField}
                  type="text"
                  size="small"
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.confrimpassword}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confrimpassword &&
                    Boolean(formik.errors.confrimpassword)
                  }
                  helperText={
                    formik.touched.confrimpassword &&
                    formik.errors.confrimpassword
                  }
                />
              </Grid>
              <Grid item md={8} />
              <Grid item md={12} xs={12}>
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
                  <Button
                    type="submit"
                    disabled={
                      !formik.isValid || passwordError || formik.onSubmit
                    }
                  >
                    Submit
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}
