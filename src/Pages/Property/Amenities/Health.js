/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
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
import { useDispatch, useSelector } from "react-redux";
import {
  gymInitial,
  steamInitial,
  salonInitial,
  spaInitial,
} from "../../../redux/actions/amenitiesDropDownAction";
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
  yoga: false,
  yogaStarred: false,
  gym: false,
  gymType: "",
  gymStarred: false,
  firstaid: false,
  firstaidStarred: false,
  reflexology: false,
  reflexologyStarred: false,
  meditationRoom: false,
  meditationRoomStarred: false,
  bridalmakup: false,
  bridalmakupStarred: false,
  bridalgromming: false,
  bridalgrommingStarred: false,
  salon: false,
  salonType: "",
  salonStarred: false,
  spa: false,
  spaStarred: false,
  spaType: "",
  steamSauna: false,
  steamSaunaType: "",
  steamSaunaType1: "",
  steamSaunaStarred: false,
  medicalCenter: false,
  medicalCenterStarred: false,
  doctorOnCall: false,
  doctorOnCallStarred: false,
  medicalAssistance: false,
  medicalAssistanceStarred: false,
};

export default function Health() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [health, setHealth] = useState("");
  const [healthStarred, setHealthStarred] = useState("");
  const dispatch = useDispatch();
  const steamLists = useSelector((state) => state.steamList.steamLists);
  const salonLists = useSelector((state) => state.salonList.salonLists);
  const spaLists = useSelector((state) => state.spaList.spaLists);
  const gymLists = useSelector((state) => state.gymList.gymLists);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(gymInitial());
    dispatch(steamInitial());
    dispatch(salonInitial());
    dispatch(spaInitial());
  }, [dispatch]);

  const starredGet = () => {
    Api.post("AmenitiesHealthAndBeautyStarredvalue", data)
      .then((res) => {
        setHealthStarred(res.data);
      });
  };

  const healthGet = () => {
    Api.post("AmenitiesHealthAndBeautyvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const gymres = res.data.gymType;
        const salonres = res.data.salonType;
        const spares = res.data.spaType;
        var i = 0;
        if (spares != "" && spares != null && spares != undefined) {
          const spa1 = spares.split(",");
          const spa2 = [];
          spa1.forEach((element) => {
            spa2[i++] = { label: element, value: element };
          });
          res.data.spaType = spa2;
        }

        if (salonres != "" && salonres != null && salonres != undefined) {
          const salon1 = salonres.split(",");
          const salon2 = [];
          salon1.forEach((element) => {
            salon2[i++] = { label: element, value: element };
          });
          res.data.salonType = salon2;
        }
        if (gymres != "" && gymres != null && gymres != undefined) {
          const gym1 = gymres.split(",");
          const gym2 = [];
          gym1.forEach((element) => {
            gym2[i++] = { label: element, value: element };
          });
          res.data.gymType = gym2;
        }
        setHealth(res.data);
      });
  };
  useEffect(() => {
    healthGet();
    starredGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var Data = { ...health, ...healthStarred };

  function onSubmit(fields, { setStatus }) {
    const id = health.id;
    const gymFit = [];
    const sal = [];
    const Spa = [];

    if (
      fields.spaType != "" &&
      fields.spaType != null &&
      fields.spaType != undefined
    ) {
      fields.spaType.map((ele) => Spa.push(ele.value));
      fields.spaType = Spa.toString();
    } else {
      fields.spaType = "";
    }

    if (
      fields.salonType != "" &&
      fields.salonType != null &&
      fields.salonType != undefined
    ) {
      fields.salonType.map((ele) => sal.push(ele.value));
      fields.salonType = sal.toString();
    } else {
      fields.salonType = "";
    }

    if (
      fields.gymType != "" &&
      fields.gymType != null &&
      fields.gymType != undefined
    ) {
      fields.gymType.map((ele) => gymFit.push(ele.value));
      fields.gymType = gymFit.toString();
    } else {
      fields.gymType = "";
    }

    if (fields.yoga == false) {
      fields.yogaStarred = false;
    }
    if (fields.gym == false) {
      fields.gymType = "";
      fields.gymStarred = false;
    }
    if (fields.firstaid == false) {
      fields.firstaidStarred = false;
    }
    if (fields.reflexology == false) {
      fields.reflexologyStarred = false;
    }
    if (fields.meditationRoom == false) {
      fields.meditationRoomStarred = false;
    }

    if (fields.bridalmakup == false) {
      fields.bridalmakupStarred = false;
    }
    if (fields.bridalgromming == false) {
      fields.bridalgrommingStarred = false;
    }
    if (fields.salon == false) {
      fields.salonType = "";
      fields.salonStarred = false;
    }
    if (fields.spa == false) {
      fields.spaStarred = false;
      fields.spaType = "";
    }
    if (fields.steamSauna == false) {
      fields.steamSaunaType = "";
      fields.steamSaunaType1 = "";
      fields.steamSaunaStarred = false;
    }
    if (fields.medicalCenter == false) {
      fields.medicalCenterStarred = false;
    }
    if (fields.doctorOnCall == false) {
      fields.doctorOnCallStarred = false;
    }
    if (fields.medicalAssistance == false) {
      fields.medicalAssistanceStarred = false;
    }
    setStatus();
    if (id) {
      updateHealth(fields);
      updateStarred(fields);
    } else {
      createHealth(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesHealthAndBeautyStarred", newData);
  }
  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesHealthAndBeautyStarredupdate", fields);
  }

  function createHealth(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesHealthAndBeauty", newData).then((res) => {
      if (res) {
        toast.success("Successfully Created");
        history.push("/addproperty/amenities/transfers");
        setLoading(false);
      }
    });
  }

  function updateHealth(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("AmenitiesHealthAndBeautyupdate", fields)
      .then((res) => {
        if (res) {
          toast.success("Successfully Updated");
          history.push("/addproperty/amenities/transfers");
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
                    <p className={classes.title}>Health and Beauty</p>
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
                          name="gym"
                          color="primary"
                        />
                      }
                      label={
                        values.gym ? (
                          <span className={classes.labelfilled}>
                            Gym / Fitness Centre
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Gym / Fitness Centre
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.gym ? (
                      <Field
                        name="gymType"
                        component={MultiSelect}
                        options={gymLists.map((gym) => ({
                          label: gym,
                          value: gym,
                        }))}
                        placeholder="Gym"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.gym ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="gymStarred"
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
                          name="salon"
                          color="primary"
                        />
                      }
                      label={
                        values.salon ? (
                          <span className={classes.labelfilled}>Salon</span>
                        ) : (
                          <span className={classes.labeloutlined}>Salon</span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={8}>
                    {values.salon ? (
                      <Field
                        name="salonType"
                        component={MultiSelect}
                        options={salonLists.map((salon) => ({
                          label: salon,
                          value: salon,
                        }))}
                        placeholder="Salon"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.salon ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="salonStarred"
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
                          name="spa"
                          color="primary"
                        />
                      }
                      label={
                        values.spa ? (
                          <span className={classes.labelfilled}>Spa</span>
                        ) : (
                          <span className={classes.labeloutlined}>Spa</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.spa ? (
                      <Field
                        name="spaType"
                        value={values.spaType}
                        component={MultiSelect}
                        options={spaLists.map((spa) => ({
                          label: spa,
                          value: spa,
                        }))}
                        placeholder="Spa"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.spa ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="spaStarred"
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
                          name="steamSauna"
                          color="primary"
                        />
                      }
                      label={
                        values.steamSauna ? (
                          <span className={classes.labelfilled}>
                            Steam Sauna
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Steam Sauna
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.steamSauna ? (
                      <Field
                        name="steamSaunaType"
                        value={values.steamSaunaType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("steamSaunaType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Steam Sauna"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.steamSauna ? (
                      <>
                        {values.steamSaunaType === "paid" ? (
                          <Field
                            name="steamSaunaType1"
                            value={values.steamSaunaType1}
                            component={SelectFields}
                            onChange={(value) =>
                              setFieldValue("steamSaunaType1", value.value)
                            }
                            options={steamLists.map((steam) => ({
                              label: steam,
                              value: steam,
                            }))}
                            placeholder="Steam Sauna"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.steamSauna ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="steamSaunaStarred"
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
                          name="reflexology"
                          color="primary"
                        />
                      }
                      label={
                        values.reflexology ? (
                          <span className={classes.labelfilled}>
                            Reflexology
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Reflexology
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.reflexology ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="reflexologyStarred"
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
                          name="yoga"
                          color="primary"
                        />
                      }
                      label={
                        values.yoga ? (
                          <span className={classes.labelfilled}>Yoga</span>
                        ) : (
                          <span className={classes.labeloutlined}>Yoga</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.yoga ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="yogaStarred"
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
                          name="firstaid"
                          color="primary"
                        />
                      }
                      label={
                        values.firstaid ? (
                          <span className={classes.labelfilled}>
                            First-aid Services
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            First-aid Services
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.firstaid ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="firstaidStarred"
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
                          name="meditationRoom"
                          color="primary"
                        />
                      }
                      label={
                        values.meditationRoom ? (
                          <span className={classes.labelfilled}>
                            Meditation Room
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Meditation Room
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.meditationRoom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="meditationRoomStarred"
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
                          name="medicalCenter"
                          color="primary"
                        />
                      }
                      label={
                        values.medicalCenter ? (
                          <span className={classes.labelfilled}>
                            Medical Center
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Medical Center
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.medicalCenter ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="medicalCenterStarred"
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
                          name="doctorOnCall"
                          color="primary"
                        />
                      }
                      label={
                        values.doctorOnCall ? (
                          <span className={classes.labelfilled}>
                            Doctor On Call
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Doctor On Call
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.doctorOnCall ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="doctorOnCallStarred"
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
                          name="medicalAssistance"
                          color="primary"
                        />
                      }
                      label={
                        values.medicalAssistance ? (
                          <span className={classes.labelfilled}>
                            Medical Assistance
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Medical Assistance
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.medicalAssistance ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="medicalAssistanceStarred"
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
                          name="bridalmakup"
                          color="primary"
                        />
                      }
                      label={
                        values.bridalmakup ? (
                          <span className={classes.labelfilled}>
                            Bridal Makeup
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bridal Makeup
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bridalmakup ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bridalmakupStarred"
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
                          name="bridalgromming"
                          color="primary"
                        />
                      }
                      label={
                        values.bridalgromming ? (
                          <span className={classes.labelfilled}>
                            Bridal Grooming
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bridal Grooming
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bridalgromming ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bridalgrommingStarred"
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
