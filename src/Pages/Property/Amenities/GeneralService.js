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
import MultiSelect from "../../../components/Select/MultiSelect";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  sightSeeingInitial,
  butlerInitial,
  speciallyInitial,
  childcareServiceInitial,
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
  luggageassistance: false,
  luggageassistanceType: "",
  luggageassistanceStarred: false,
  speciallyabledassistance: false,
  speciallyabledassistanceType: "",
  speciallyabledassistanceStarred: false,
  wakeupCallService: false,
  wakeupCallServiceStarred: false,
  electricalSockets: false,
  electricalSocketsStarred: false,
  electricalSocketsType: "",
  postalservices: false,
  postalservicesStarred: false,
  butlerServices: false,
  butlerServicesType: "",
  butlerServicesStarred: false,
  concierge: false,
  conciergeStarred: false,
  poolBeachtowels: false,
  poolBeachtowelsStarred: false,
  sightSeeing: false,
  sightSeeingType: "",
  sightSeeingStarred: false,
  childcareService: false,
  childcareServiceType: "",
  childcareServiceStarred: false,
};

export default function GeneralService() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [generalService, setGeneralService] = useState("");
  const [generalServiceStarred, setGeneralServiceStarred] = useState("");
  const dispatch = useDispatch();
  const childCareServiceLists = useSelector(
    (state) => state.childCareServiceList.childCareServiceLists
  );
  const sightSeeingLists = useSelector(
    (state) => state.sightSeeingList.sightSeeingLists
  );
  const butlerLists = useSelector((state) => state.butlerList.butlerLists);
  const speciallyAbledLists = useSelector(
    (state) => state.speciallyAbledList.speciallyAbledLists
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(sightSeeingInitial());
    dispatch(butlerInitial());
    dispatch(speciallyInitial());
    dispatch(childcareServiceInitial());
  }, [dispatch]);

  const starredGet = () => {
    Api.post("AmenitiesGeneralServiceStarredvalue", data)
      .then((res) => {
        setGeneralServiceStarred(res.data);
      });
  };

  const generalData = () => {
    Api.post("AmenitiesGeneralServicevalue", data).then((res) => {
      const sightres = res.data.sightSeeingType;
      const childres = res.data.childcareServiceType;
      const speciallyres = res.data.speciallyabledassistanceType;
      const butlerres = res.data.butlerServicesType;
      var i = 0;
      if (sightres != "" && sightres != null && sightres != undefined) {
        const sight1 = sightres.split(",");
        const sight2 = [];

        sight1.forEach((element) => {
          sight2[i++] = { label: element, value: element };
        });
        res.data.sightSeeingType = sight2;
      }
      if (childres != "" && childres != null && childres != undefined) {
        const child1 = childres.split(",");
        const child2 = [];

        child1.forEach((element) => {
          child2[i++] = { label: element, value: element };
        });
        res.data.childcareServiceType = child2;
      }
      if (
        speciallyres != "" &&
        speciallyres != null &&
        speciallyres != undefined
      ) {
        const specially1 = speciallyres.split(",");
        const specially2 = [];

        specially1.forEach((element) => {
          specially2[i++] = { label: element, value: element };
        });
        res.data.speciallyabledassistanceType = specially2;
      }
      if (butlerres != "" && butlerres != null && butlerres != undefined) {
        const butler1 = butlerres.split(",");
        const butler2 = [];

        butler1.forEach((element) => {
          butler2[i++] = { label: element, value: element };
        });
        res.data.butlerServicesType = butler2;
      }
      setGeneralService(res.data);
    });
  };

  var Data = { ...generalService, ...generalServiceStarred };

  useEffect(() => {
    generalData();
    starredGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = generalService.id;
    const specially = [];
    const butler = [];
    const care = [];
    const sight = [];
    if (
      fields.sightSeeingType != "" &&
      fields.sightSeeingType != null &&
      fields.sightSeeingType != undefined
    ) {
      fields.sightSeeingType.map((ele) => sight.push(ele.value));
      fields.sightSeeingType = sight.toString();
    } else {
      fields.sightSeeingType = "";
    }
    if (
      fields.childcareServiceType != "" &&
      fields.childcareServiceType != null &&
      fields.childcareServiceType != undefined
    ) {
      fields.childcareServiceType.map((ele) => care.push(ele.value));
      fields.childcareServiceType = care.toString();
    } else {
      fields.childcareServiceType = "";
    }
    if (
      fields.speciallyabledassistanceType != "" &&
      fields.speciallyabledassistanceType != null &&
      fields.speciallyabledassistanceType != undefined
    ) {
      fields.speciallyabledassistanceType.map((ele) =>
        specially.push(ele.value)
      );
      fields.speciallyabledassistanceType = specially.toString();
    } else {
      fields.speciallyabledassistanceType = "";
    }
    if (
      fields.butlerServicesType != "" &&
      fields.butlerServicesType != null &&
      fields.butlerServicesType != undefined
    ) {
      fields.butlerServicesType.map((ele) => butler.push(ele.value));
      fields.butlerServicesType = butler.toString();
    } else {
      fields.butlerServicesType = "";
    }
    setStatus();
    if (fields.luggageassistance == false) {
      fields.luggageassistanceType = "";
      fields.luggageassistanceStarred = false;
    }

    if (fields.speciallyabledassistance == false) {
      fields.speciallyabledassistanceType = "";
      fields.speciallyabledassistanceStarred = false;
    }
    if (fields.wakeupCallService == false) {
      fields.wakeupCallServiceStarred = false;
    }
    if (fields.electricalSockets == false) {
      fields.electricalSocketsStarred = false;
      fields.electricalSocketsType = "";
    }
    if (fields.postalservices == false) {
      fields.postalservicesStarred = false;
    }
    if (fields.butlerServices == false) {
      fields.butlerServicesType = "";
      fields.butlerServicesStarred = false;
    }
    if (fields.concierge == false) {
      fields.conciergeStarred = false;
    }
    if (fields.poolBeachtowels == false) {
      fields.poolBeachtowelsStarred = false;
    }
    if (fields.sightSeeing == false) {
      fields.sightSeeingType = "";
      fields.sightSeeingStarred = false;
    }
    if (fields.childcareService == false) {
      fields.childcareServiceType = "";
      fields.childcareServiceStarred = false;
    }

    if (id) {
      updateGeneralService(fields);
      updateStarred(fields);
    } else {
      createGeneralService(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesGeneralServiceStarred", newData);
  }
  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesGeneralServiceStarredupdate", fields);
  }

  function createGeneralService(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesGeneralService", newData).then((res) => {
      if (res) {
        toast.success("Successfully Created");
        history.push("/addproperty/amenities/commonArea");
        setLoading(false);
      }
    });
  }

  function updateGeneralService(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("AmenitiesGeneralServiceupdate", fields).then((res) => {
      if (res) {
        toast.success("Successfully UpDated");
        history.push("/addproperty/amenities/commonArea");
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
                    <p className={classes.title}>General Service</p>
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
                          name="speciallyabledassistance"
                          color="primary"
                        />
                      }
                      label={
                        values.speciallyabledassistance ? (
                          <span
                            className={classes.labelfilled}
                            style={{ fontSize: "13px" }}
                          >
                            Specially Abled Assistance
                          </span>
                        ) : (
                          <span
                            className={classes.labeloutlined}
                            style={{ fontSize: "13px" }}
                          >
                            Specially Abled Assistance
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.speciallyabledassistance ? (
                      <Field
                        name="speciallyabledassistanceType"
                        component={MultiSelect}
                        options={speciallyAbledLists.map((specially) => ({
                          label: specially,
                          value: specially,
                        }))}
                        placeholder="specially Abled Assistance"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.speciallyabledassistance ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="speciallyabledassistanceStarred"
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
                          name="butlerServices"
                          color="primary"
                        />
                      }
                      label={
                        values.butlerServices ? (
                          <span className={classes.labelfilled}>
                            Butler Services
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Butler Services
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.butlerServices ? (
                      <Field
                        name="butlerServicesType"
                        component={MultiSelect}
                        options={butlerLists.map((butler) => ({
                          label: butler,
                          value: butler,
                        }))}
                        placeholder="Butler Services"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.butlerServices ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="butlerServicesStarred"
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
                          name="sightSeeing"
                          color="primary"
                        />
                      }
                      label={
                        values.sightSeeing ? (
                          <span className={classes.labelfilled}>
                            Sight-Seeing
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Sight-Seeing
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.sightSeeing ? (
                      <Field
                        name="sightSeeingType"
                        component={MultiSelect}
                        options={sightSeeingLists.map((sight) => ({
                          label: sight,
                          value: sight,
                        }))}
                        placeholder="SightSeeing"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.sightSeeing ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="sightSeeingStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
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
                          name="childcareService"
                          color="primary"
                        />
                      }
                      label={
                        values.childcareService ? (
                          <span className={classes.labelfilled}>
                            Child Care Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Child Care Service
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.childcareService ? (
                      <Field
                        name="childcareServiceType"
                        component={MultiSelect}
                        options={childCareServiceLists.map((child) => ({
                          label: child,
                          value: child,
                        }))}
                        placeholder="Child Care Service"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.childcareService ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="childcareServiceStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
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
                          name="concierge"
                          color="primary"
                        />
                      }
                      label={
                        values.concierge ? (
                          <span className={classes.labelfilled}>Concierge</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Concierge
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.concierge ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="conciergeStarred"
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
                          name="luggageassistance"
                          color="primary"
                        />
                      }
                      label={
                        values.luggageassistance ? (
                          <span className={classes.labelfilled}>
                            Luggage Assistance
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Luggage Assistance
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.luggageassistance ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="luggageassistanceStarred"
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
                          name="wakeupCallService"
                          color="primary"
                        />
                      }
                      label={
                        values.wakeupCallService ? (
                          <span className={classes.labelfilled}>
                            Wakeup Call Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Wakeup Call Service
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.wakeupCallService ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="wakeupCallServiceStarred"
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
                          name="electricalSockets"
                          color="primary"
                        />
                      }
                      label={
                        values.electricalSockets ? (
                          <span className={classes.labelfilled}>
                            Electrical Sockets
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Electrical Sockets
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.electricalSockets ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="electricalSocketsStarred"
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
                          name="postalservices"
                          color="primary"
                        />
                      }
                      label={
                        values.postalservices ? (
                          <span className={classes.labelfilled}>
                            Postal Services
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Postal Services
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.postalservices ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="postalservicesStarred"
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
                          name="poolBeachtowels"
                          color="primary"
                        />
                      }
                      label={
                        values.poolBeachtowels ? (
                          <span className={classes.labelfilled}>
                            Pool-Beach Towels
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Pool-Beach Towels
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.poolBeachtowels ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="poolBeachtowelsStarred"
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
