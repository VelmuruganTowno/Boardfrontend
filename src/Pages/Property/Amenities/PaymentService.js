/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, Field, Formik } from "formik";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Paper,
  makeStyles,
  Switch,
} from "@material-ui/core";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  theme: {
    display: "table-cell",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 40px 0px 50px",
  },

  select: {
    height: "1.1876em",
    width: "100%",
    padding: "18.5px 0px",
    margin: "7px 0px",
  },
  button: {
    margin: "20px 0px",
  },
  title: {
    fontSize: "24px",
    fontWeight: 500,
  },

  labeloutlined: {
    border: "1px solid #F46D25",
    borderRadius: "10px",
    padding: "6px",
    fontSize: "14px",
    minHeight: "29px",
    display: "flex",
    alignItems: "center",
  },
  labelfilled: {
    border: "1px solid #F46D25",
    borderRadius: "10px",
    padding: "6px",
    background: "#F46D25",
    color: "#fff",
    fontSize: "14px",
    minHeight: "29px",
    alignItems: "center",
    display: "flex",
  },
}));

const initialValues = {
  forex: false,
  forexStarred: false,
  cash: false,
  cashStarred: false,
  upi: false,
  upiStarred: false,
  pos: false,
  posStarred: false,
};

export default function PaymentService() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [payment, setPayment] = useState("");
  const [paymentStarred, setPaymentStarred] = useState("");
  const [loading, setLoading] = useState(false);

  const paymentGet = () => {
    Api.post("AmenitiesPaymentServicevalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPayment(res.data);
      });
  };

  const starredGet = () => {
    Api.post("AmenitiesPaymentServiceStarredvalue", data)
      .then((res) => {
        setPaymentStarred(res.data);
      });
  };

  useEffect(() => {
    paymentGet();
    starredGet();
  }, []);

  var Data = { ...payment, ...paymentStarred };

  function onSubmit(fields, { setStatus }) {
    const id = payment.id;

    if (fields.forex == false) {
      fields.forexStarred = false;
    }
    if (fields.cash == false) {
      fields.cashStarred = false;
    }
    if (fields.upi == false) {
      fields.upiStarred = false;
    }
    if (fields.pos == false) {
      fields.posStarred = false;
    }
    setStatus();
    if (id) {
      updatePayment(fields);
      updateStarred(fields);
    } else {
      createPayment(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesPaymentServiceStarred", newData);
  }
  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesPaymentServiceStarredupdate", fields);
  }

  function createPayment(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesPaymentService", newData).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully Created");
        history.push("/addproperty/amenities/entertainments");
        setLoading(false);
      }
    });
  }

  function updatePayment(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("AmenitiesPaymentServiceupdate", fields).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully Updated");
        history.push("/addproperty/amenities/entertainments");
        setLoading(false);
      }
    });
  }

  return (
    <>
      <Paper variant="outlined" square className={classes.theme}>
        <Formik
          initialValues={Data || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <p className={classes.title}>Payment Service</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="forex"
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.forex ? (
                          <span className={classes.labelfilled}>
                            Foreign Exchange
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Foreign Exchange
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.forex ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="forexStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="cash"
                          color="primary"
                        />
                      }
                      label={
                        values.cash ? (
                          <span className={classes.labelfilled}>Cash</span>
                        ) : (
                          <span className={classes.labeloutlined}>Cash</span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.cash ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cashStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="pos"
                          color="primary"
                        />
                      }
                      label={
                        values.pos ? (
                          <span className={classes.labelfilled}>POS</span>
                        ) : (
                          <span className={classes.labeloutlined}>POS</span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.pos ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="posStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="upi"
                          color="primary"
                        />
                      }
                      label={
                        values.upi ? (
                          <span className={classes.labelfilled}>UPI</span>
                        ) : (
                          <span className={classes.labeloutlined}>UPI</span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.upi ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="upiStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                </Grid>
                <Grid item sm={12}>
                  {loading ? (
                    <Button type="submit" className={classes.button} disabled>
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{
                          marginRight: "8px",
                        }}
                      ></i>
                      Save and Continue
                    </Button>
                  ) : (
                    <Button type="submit" className={classes.button}>
                      Save and Continue
                    </Button>
                  )}
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
}
