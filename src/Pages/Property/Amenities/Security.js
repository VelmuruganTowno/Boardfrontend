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
import SelectFields from "../../../components/Select/SelectFields";
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
  safe: false,
  safeType: "",
  safeStarred: false,
  security: false,
  securityStarred: false,
  securityType: "",
  cctv: false,
  cctvStarred: false,
  fireExtinguishers: false,
  fireExtinguishersStarred: false,
  smokeAlarms: false,
  smokeAlarmsStarred: false,
  fireAlarms: false,
  fireAlarmsStarred: false,
};

export default function Security() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  const [security, setSecurity] = useState("");
  const [securityStarred, setSecurityStarred] = useState("");
  const [safes, setSafes] = useState([]);
  const [securitys, setSecuritys] = useState([]);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [loading, setLoading] = useState(false);

  const Safe = async () => {
    const SafeData = {
      type: "Safe",
    };
    await Api.post( "productdropdownonly", SafeData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setSafes(response.data);
      });
  };
  const Security = async () => {
    const SecurityData = {
      type: "Security",
    };
    await Api.post( "productdropdownonly", SecurityData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setSecuritys(response.data);
      });
  };

  useEffect(() => {
    Safe();
    Security();
  }, []);

  const GetData = () => {
    Api.post( "AmenitiesSecurityvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSecurity(res.data);
      });
  };

  const starredGet = () => {
    Api.post( "AmenitiesSecurityStarredvalue", data).then((res) => {
      setSecurityStarred(res.data);
    });
  };

  useEffect(() => {
    GetData();
    starredGet();
  }, []);

  var Data = { ...security, ...securityStarred };

  function onSubmit(fields, { setStatus }) {
    const id = security.id;

    if (fields.safe == false) {
      fields.safeType = "";
      fields.safeStarred = false;
    }
    if (fields.securityStarred == false) {
      fields.security = false;
      fields.securityType = "";
    }
    if (fields.cctv == false) {
      fields.cctvStarred = false;
    }
    if (fields.fireExtinguishers == false) {
      fields.fireExtinguishersStarred = false;
    }
    if (fields.smokeAlarms == false) {
      fields.smokeAlarmsStarred = false;
    }
    if (fields.fireAlarms == false) {
      fields.fireAlarmsStarred = false;
    }
    setStatus();
    if (id) {
      updateSecurity(fields);
      updateStarred(fields);
    } else {
      createSecurity(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post( "AmenitiesSecurityStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put( "AmenitiesSecurityStarredupdate", fields);
  }

  function createSecurity(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post( "AmenitiesSecurity", newData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Created");
          history.push("/addproperty/bank");
          setLoading(false);
        }
      });
  }

  function updateSecurity(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put( "AmenitiesSecurityupdate", fields, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Updated");
          history.push("/addproperty/bank");
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
                    <p className={classes.title}>Security</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="safe"
                          color="primary"
                        />
                      }
                      label={
                        values.safe ? (
                          <span className={classes.labelfilled}>
                            Safe
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Safe
                          </span>
                        )
                      }
                      
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.safe ? (
                      <Field
                        name="safeType"
                        value={values.safeType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("safeType", value.value || "")
                        }
                        options={safes.map((safes) => ({
                          label: safes,
                          value: safes,
                        }))}
                        placeholder="Safe"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.safe ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="safeStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="security"
                          color="primary"
                        />
                      }
                      
                      label={
                        values.security ? (
                          <span className={classes.labelfilled}>
                       Security
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Security
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.security ? (
                      <Field
                        name="securityType"
                        value={values.securityType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("securityType", value.value)
                        }
                        options={securitys.map((securitys) => ({
                          label: securitys,
                          value: securitys,
                        }))}
                        placeholder="Securities"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.security ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="securityStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item  sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="cctv"
                          color="primary"
                        />
                      }
                      label={
                        values.cctv ? (
                          <span className={classes.labelfilled}>
                       CCTV
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            CCTV
                          </span>
                        )
                      }
                      
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.cctv ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cctvStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item  sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="fireExtinguishers"
                          color="primary"
                        />
                      }
                      
                      label={
                        values.fireExtinguishers ? (
                          <span className={classes.labelfilled}>
                       Fire Extinguisher
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Fire Extinguisher
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.fireExtinguishers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="fireExtinguishersStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item  sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="smokeAlarms"
                          color="primary"
                        />
                      }
                      label={
                        values.smokeAlarms ? (
                          <span className={classes.labelfilled}>
                       Smoke Alarms
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Smoke Alarms
                          </span>
                        )
                      }
                      
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.smokeAlarms ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="smokeAlarmsStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item  sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="fireAlarms"
                          color="primary"
                        />
                      }
                      label={
                        values.fireAlarms ? (
                          <span className={classes.labelfilled}>
                       Fire Alarms
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                      Fire Alarms
                          </span>
                        )
                      }
                      
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.fireAlarms ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="fireAlarmsStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
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
