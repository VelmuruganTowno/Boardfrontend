/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
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
import MultiSelect from "../../../components/Select/MultiSelect";
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
    width: "250px",
  },
  button: {
    margin: "20px 0px",
  },
  label: {
    textTransform: "uppercase",
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
  disinfection: false,
  disinfectionStarred: false,
  disinfectionType: "",
  ppekit: false,
  ppekitStarred: false,
  contactlessroomservice: false,
  contactlessroomserviceStarred: false,
  thermalscreening: false,
  thermalscreeningStarred: false,
  sanitizersinstalled: false,
  sanitizersinstalledStarred: false,
  contactlesscheckin: false,
  contactlesscheckinStarred: false,
  disinfectantwipes: false,
  disinfectantwipesStarred: false,
  disinfectantwipesType: "",
  sanitizers: false,
  sanitizersStarred: false,
  sanitizersType: "",
};

export default function SafetyHygiene() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  const [disinfection, setDisinfection] = useState([]);
  const [safe, setSafe] = useState("");
  const [safeStarred, setSafeStarred] = useState("");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [loading, setLoading] = useState(false);

  const Disinfection = async () => {
    const DisinfectionData = {
      type: "Disinfection",
    };
    await Api.post("productdropdownonly", DisinfectionData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setDisinfection(response.data);
      });
  };

  useEffect(() => {
    Disinfection();
  }, []);

  const getData = () => {
    Api.post("AmenitiesSafetyAndHygienevalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const disinres = res.data.disinfectionType;
        var i = 0;
        if (disinres != "" && disinres != null && disinres != undefined) {
          const disin1 = disinres.split(",");
          const disin2 = [];

          disin1.forEach((element) => {
            disin2[i++] = { label: element, value: element };
          });
          res.data.disinfectionType = disin2;
        }
        setSafe(res.data);
      });
  };

  const starredGet = () => {
    Api.post("AmenitiesSafetyAndHygieneStarredvalue", data)
      .then((res) => {
        setSafeStarred(res.data);
      });
  };

  var Data = { ...safe, ...safeStarred };

  useEffect(() => {
    getData();
    starredGet();
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = safe.id;

    const disin = [];
    if (
      fields.disinfectionType != "" &&
      fields.disinfectionType != null &&
      fields.disinfectionType != undefined
    ) {
      fields.disinfectionType.map((ele) => disin.push(ele.value));
      fields.disinfectionType = disin.toString();
    } else {
      fields.disinfectionType = "";
    }

    if (fields.disinfection == false) {
      fields.disinfectionStarred = false;
      fields.disinfectionType = "";
    }
    if (fields.ppekit == false) {
      fields.ppekit = false;
      fields.ppekitStarred = false;
    }
    if (fields.contactlessroomservice == false) {
      fields.contactlessroomserviceStarred = false;
    }
    if (fields.thermalscreening == false) {
      fields.thermalscreeningStarred = false;
    }
    if (fields.sanitizersinstalled == false) {
      fields.sanitizersinstalledStarred = false;
    }
    if (fields.contactlesscheckin == false) {
      fields.contactlesscheckinStarred = false;
    }
    if (fields.disinfectantwipes == false) {
      fields.disinfectantwipesStarred = false;
      fields.disinfectantwipesType = "";
      fields.disinfectantwipesType1 = "";
    }
    if (fields.sanitizers == false) {
      fields.sanitizersStarred = false;
      fields.sanitizersType = "";
      fields.sanitizersType1 = "";
    }
    setStatus();
    if (id) {
      updateSafe(fields);
      updateStarred(fields);
    } else {
      createSafe(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesSafetyAndHygieneStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesSafetyAndHygieneStarredupdate", fields);
  }

  function createSafe(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesSafetyAndHygiene", newData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Created");
          history.push("/addproperty/amenities/security");
          setLoading(false);
        }
      });
  }

  function updateSafe(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("AmenitiesSafetyAndHygieneupdate", fields, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res) {
          toast.success("Successfully Updated");
          history.push("/addproperty/amenities/security");
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
                    <p className={classes.title}>Safety and Hygiene</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="disinfection"
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.disinfection ? (
                          <span className={classes.labelfilled}>
                            Disinfection
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Disinfection
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.disinfection ? (
                      <Field
                        name="disinfectionType"
                        component={MultiSelect}
                        options={disinfection.map((disinfection) => ({
                          label: disinfection,
                          value: disinfection,
                        }))}
                        placeholder="Disinfection"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.disinfection ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="disinfectionStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="disinfectantwipes"
                          color="primary"
                        />
                      }
                      label={
                        values.disinfectantwipes ? (
                          <span className={classes.labelfilled}>
                            Disinfectant Wipes
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Disinfectant Wipes
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.disinfectantwipes ? (
                      <Field
                        name="disinfectantwipesType"
                        value={values.disinfectantwipesType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("disinfectantwipesType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Disinfectant Wipes"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.disinfectantwipes ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="disinfectantwipesStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="sanitizers"
                          color="primary"
                        />
                      }
                      label={
                        values.sanitizers ? (
                          <span className={classes.labelfilled}>
                            Sanitizers
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Sanitizers
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.sanitizers ? (
                      <Field
                        name="sanitizersType"
                        value={values.sanitizersType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("sanitizersType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Sanitizer"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.sanitizers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="sanitizersStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="ppekit"
                          color="primary"
                        />
                      }
                      label={
                        values.ppekit ? (
                          <span className={classes.labelfilled}>PPE</span>
                        ) : (
                          <span className={classes.labeloutlined}>PPE</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.ppekit ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="ppekitStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="contactlessroomservice"
                          color="primary"
                        />
                      }
                      label={
                        values.contactlessroomservice ? (
                          <span className={classes.labelfilled}>
                            Contactless Room Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Contactless Room Service
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.contactlessroomservice ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="contactlessroomserviceStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="thermalscreening"
                          color="primary"
                        />
                      }
                      label={
                        values.thermalscreening ? (
                          <span className={classes.labelfilled}>
                            Thermal Screening
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Thermal Screening
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.thermalscreening ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="thermalscreeningStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="sanitizersinstalled"
                          color="primary"
                        />
                      }
                      label={
                        values.sanitizersinstalled ? (
                          <span className={classes.labelfilled}>
                            Sanitizers Installed
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Sanitizers Installed
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.sanitizersinstalled ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="sanitizersinstalledStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          name="contactlesscheckin"
                          color="primary"
                        />
                      }
                      label={
                        values.contactlesscheckin ? (
                          <span className={classes.labelfilled}>
                            Contactless Check-in
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Contactless Check-in
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.contactlesscheckin ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="contactlesscheckinStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
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
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
}
