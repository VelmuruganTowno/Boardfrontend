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
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  theme: {
    display: "table-cell",
    width: "80%",
    marginLeft: "10px",
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
  events: false,
  eventsStarred: false,
  eventsType: "",
  pub: false,
  pubStarred: false,
  photoSession: false,
  photoSessionStarred: false,
  nightClub: false,
  nightClubStarred: false,
  beachClub: false,
  beachClubStarred: false,
  galadinner: false,
  galadinnerStarred: false,
  casino: false,
  casinoStarred: false,
  casinoType: "",
  indoorgames: false,
  indoorgamesStarred: false,
  indoorgamesType: "",
  beach: false,
  beachType: "",
  beachStarred: false,
  activities: false,
  activitiesType: "",
  activitiesStarred: false,
  picnicArea: false,
  picnicAreaStarred: false,
  gameRoom: false,
  gameRoomStarred: false,
  tv: false,
  tvType: "",
  tvStarred: false,
};
export default function Entertainment() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  const [event, setEvent] = useState([]);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [casinos, setCasinos] = useState([]);
  const [indoorGames, setIndoorGames] = useState([]);
  const [entertainment, setEntertainment] = useState("");
  const [entertainmentStarred, setEntertainmentStarred] = useState("");
  const [beach, setBeach] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [activitieDrop, setActivitieDrop] = useState([]);

  var Data = { ...entertainment, ...entertainmentStarred };

  const Tvs = async () => {
    const tvsData = {
      type: "Tv",
    };
    await Api.post("productdropdownonly", tvsData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setTvs(response.data);
      });
  };

  const Events = async () => {
    const EventsData = {
      type: "Events",
    };
    await Api
      .post("productdropdownonly", EventsData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setEvent(response.data);
      });
  };
  const Casinos = async () => {
    const CasinosData = {
      type: "Casino",
    };
    await Api
      .post("productdropdownonly", CasinosData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setCasinos(response.data);
      });
  };
  const IndoorGames = async () => {
    const IndoorGamesData = {
      type: "Indoor games",
    };
    await Api
      .post("productdropdownonly", IndoorGamesData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setIndoorGames(res.data);
      });
  };
  const Beachs = async () => {
    const BeachData = {
      type: "Beach",
    };
    await Api
      .post("productdropdownonly", BeachData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setBeach(response.data);
      });
  };

  const Activities = async () => {
    const ActivitiesData = {
      type: "Activities",
    };
    await Api
      .post("productdropdownonly", ActivitiesData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setActivitieDrop(response.data);
      });
  };

  useEffect(() => {
    Events();
    IndoorGames();
    Casinos();
    Beachs();
    Tvs();
    entertainmentGet();
    starredGet();
    Activities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const starredGet = () => {
    Api.post("AmenitiesEntertainmentStarredvalue", data)
      .then((res) => {
        setEntertainmentStarred(res.data);
      });
  };

  const entertainmentGet = () => {
    Api.post("AmenitiesEntertainmentvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const eventres = res.data.eventsType;
        const casinores = res.data.casinoType;
        const indoorres = res.data.indoorgamesType;
        const beachres = res.data.beachType;
        const activitiesres = res.data.activitiesType;
        const tvres = res.data.tvType;

        var i = 0;

        if (tvres != "" && tvres != null && tvres != undefined) {
          const tv1 = tvres.split(",");
          const tv2 = [];

          tv1.forEach((element) => {
            tv2[i++] = { label: element, value: element };
          });
          res.data.tvType = tv2;
        }
        if (
          activitiesres != "" &&
          activitiesres != null &&
          activitiesres != undefined
        ) {
          const act1 = activitiesres.split(",");
          const act2 = [];

          act1.forEach((element) => {
            act2[i++] = { label: element, value: element };
          });
          res.data.activitiesType = act2;
        }

        if (beachres != "" && beachres != null && beachres != undefined) {
          const beach1 = beachres.split(",");
          const beach2 = [];

          beach1.forEach((element) => {
            beach2[i++] = { label: element, value: element };
          });
          res.data.beachType = beach2;
        }
        if (casinores != "" && casinores != null && casinores != undefined) {
          const casino1 = casinores.split(",");
          const casino2 = [];
          casino1.forEach((element) => {
            casino2[i++] = { label: element, value: element };
          });
          res.data.casinoType = casino2;
        }
        if (indoorres != "" && indoorres != null && indoorres != undefined) {
          const indoor1 = indoorres.split(",");
          const indoor2 = [];
          indoor1.forEach((element) => {
            indoor2[i++] = { label: element, value: element };
          });
          res.data.indoorgamesType = indoor2;
        }
        if (eventres != "" && eventres != null && eventres != undefined) {
          const event1 = eventres.split(",");
          const event2 = [];
          event1.forEach((element) => {
            event2[i++] = { label: element, value: element };
          });
          res.data.eventsType = event2;
        }
        setEntertainment(res.data);
      });
  };

  function onSubmit(fields, { setStatus }) {
    const id = entertainment.id;
    const ent = [];
    const cas = [];
    const indoor = [];
    const telv = [];
    const beachs = [];
    const acti = [];
    if (
      fields.activitiesType !== "" &&
      fields.activitiesType !== null &&
      fields.activitiesType !== undefined
    ) {
      fields.activitiesType.map((ele) => acti.push(ele.value));
      fields.activitiesType = acti.toString();
    } else {
      fields.activitiesType = "";
    }

    if (
      fields.beachType !== "" &&
      fields.beachType !== null &&
      fields.beachType !== undefined
    ) {
      fields.beachType.map((ele) => beachs.push(ele.value));
      fields.beachType = beachs.toString();
    } else {
      fields.beachType = "";
    }

    if (
      fields.tvType !== "" &&
      fields.tvType !== null &&
      fields.tvType !== undefined
    ) {
      fields.tvType.map((ele) => telv.push(ele.value));
      fields.tvType = telv.toString();
    } else {
      fields.tvType = "";
    }

    if (
      fields.eventsType !== "" &&
      fields.eventsType !== null &&
      fields.eventsType !== undefined
    ) {
      fields.eventsType.map((ele) => ent.push(ele.value));
      fields.eventsType = ent.toString();
    } else {
      fields.eventsType = "";
    }
    if (
      fields.casinoType !== "" &&
      fields.casinoType !== null &&
      fields.casinoType !== undefined
    ) {
      fields.casinoType.map((ele) => cas.push(ele.value));
      fields.casinoType = cas.toString();
    } else {
      fields.casinoType = "";
    }
    if (
      fields.indoorgamesType !== "" &&
      fields.indoorgamesType !== null &&
      fields.indoorgamesType !== undefined
    ) {
      fields.indoorgamesType.map((ele) => indoor.push(ele.value));
      fields.indoorgamesType = indoor.toString();
    } else {
      fields.indoorgamesType = "";
    }
    if (fields.events == false) {
      fields.eventsStarred = false;
      fields.eventsType = "";
    }
    if (fields.pub == false) {
      fields.pubStarred = false;
    }
    if (fields.photoSession == false) {
      fields.photoSessionStarred = false;
    }
    if (fields.nightClub == false) {
      fields.nightClubStarred = false;
    }
    if (fields.beachClub == false) {
      fields.beachClubStarred = false;
    }
    if (fields.galadinner == false) {
      fields.galadinnerStarred = false;
    }

    if (fields.casino == false) {
      fields.casinoStarred = false;
      fields.casinoType = "";
    }

    if (fields.indoorgames == false) {
      fields.indoorgamesStarred = false;
      fields.indoorgamesType = "";
    }

    if (fields.beach == false) {
      fields.beachType = "";
      fields.beachStarred = false;
    }
    if (fields.vehicleRentals == false) {
      fields.vehicleRentalsType = "";
      fields.vehicleRentalsType1 = "";
      fields.vehicleRentalsStarred = false;
    }
    if (fields.activities == false) {
      fields.activitiesType = "";
      fields.activitiesStarred = false;
    }

    if (fields.picnicArea == false) {
      fields.picnicAreaStarred = false;
    }
    if (fields.gameRoom == false) {
      fields.gameRoomStarred = false;
    }
    if (fields.tv == false) {
      fields.tvType = "";
      fields.tvStarred = false;
    }
    setStatus();
    if (id) {
      updateEntertainment(fields);
      updateStarred(fields);
    } else {
      createEntertainment(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesEntertainmentStarred", newData);
  }
  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesEntertainmentStarredupdate", fields);
  }

  function createEntertainment(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesEntertainment", newData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Created");
          history.push("/addproperty/amenities/safetyHygiene");
          setLoading(false);
        }
      });
  }

  function updateEntertainment(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("AmenitiesEntertainmentupdate", fields).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully Updated");
        history.push("/addproperty/amenities/safetyHygiene");
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
                    <p className={classes.title}>Entertainments</p>
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
                          name="events"
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.events ? (
                          <span className={classes.labelfilled}>Events</span>
                        ) : (
                          <span className={classes.labeloutlined}>Events</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.events ? (
                      <Field
                        name="eventsType"
                        component={MultiSelect}
                        options={event.map((event) => ({
                          label: event,
                          value: event,
                        }))}
                        placeholder="Events"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.events ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="eventsStarred"
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
                          name="casino"
                          color="primary"
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                        />
                      }
                      label={
                        values.casino ? (
                          <span className={classes.labelfilled}>Casino</span>
                        ) : (
                          <span className={classes.labeloutlined}>Casino</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.casino ? (
                      <Field
                        name="casinoType"
                        component={MultiSelect}
                        options={casinos.map((cas) => ({
                          label: cas,
                          value: cas,
                        }))}
                        placeholder="Casino"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.casino ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="casinoStarred"
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
                          name="indoorgames"
                          color="primary"
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                        />
                      }
                      label={
                        values.indoorgames ? (
                          <span className={classes.labelfilled}>
                            Indoor Games
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Indoor Games
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.indoorgames ? (
                      <Field
                        name="indoorgamesType"
                        component={MultiSelect}
                        options={indoorGames.map((indoorGames) => ({
                          label: indoorGames,
                          value: indoorGames,
                        }))}
                        placeholder="Indoor Games"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.indoorgames ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="indoorgamesStarred"
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
                          name="beach"
                          color="primary"
                        />
                      }
                      label={
                        values.beach ? (
                          <span className={classes.labelfilled}>Beach</span>
                        ) : (
                          <span className={classes.labeloutlined}>Beach</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.beach ? (
                      <Field
                        name="beachType"
                        component={MultiSelect}
                        options={beach.map((beach) => ({
                          label: beach,
                          value: beach,
                        }))}
                        placeholder="Beach"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.beach ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="beachStarred"
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
                          name="activities"
                          color="primary"
                        />
                      }
                      label={
                        values.activities ? (
                          <span className={classes.labelfilled}>
                            Activities
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Activities
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.activities ? (
                      <Field
                        name="activitiesType"
                        component={MultiSelect}
                        options={activitieDrop.map((act) => ({
                          label: act,
                          value: act,
                        }))}
                        placeholder="Activities"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.activities ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="activitiesStarred"
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
                          name="tv"
                          color="primary"
                        />
                      }
                      label={
                        values.tv ? (
                          <span className={classes.labelfilled}>TV</span>
                        ) : (
                          <span className={classes.labeloutlined}>TV</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.tv ? (
                      <Field
                        name="tvType"
                        component={MultiSelect}
                        options={tvs.map((tvs) => ({
                          label: tvs,
                          value: tvs,
                        }))}
                        placeholder="TV"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.tv ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="tvStarred"
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
                          name="pub"
                          color="primary"
                        />
                      }
                      label={
                        values.pub ? (
                          <span className={classes.labelfilled}>Pub</span>
                        ) : (
                          <span className={classes.labeloutlined}>Pub</span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.pub ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="pubStarred"
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
                          name="photoSession"
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          color="primary"
                        />
                      }
                      label={
                        values.photoSession ? (
                          <span className={classes.labelfilled}>
                            Selfie Point
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Selfie Point
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.photoSession ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="photoSessionStarred"
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
                          name="nightClub"
                          color="primary"
                        />
                      }
                      label={
                        values.nightClub ? (
                          <span className={classes.labelfilled}>
                            Night Club
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Night Club
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.nightClub ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="nightClubStarred"
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
                          name="beachClub"
                          color="primary"
                        />
                      }
                      label={
                        values.beachClub ? (
                          <span className={classes.labelfilled}>
                            Beach club
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Beach club
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.beachClub ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="beachClubStarred"
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
                          name="galadinner"
                          color="primary"
                        />
                      }
                      label={
                        values.galadinner ? (
                          <span className={classes.labelfilled}>
                            Gala Dinner
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Gala Dinner
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.galadinner ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="galadinnerStarred"
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
                          name="picnicArea"
                          color="primary"
                        />
                      }
                      label={
                        values.picnicArea ? (
                          <span className={classes.labelfilled}>
                            Picnic Area
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Picnic Area
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.picnicArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="picnicAreaStarred"
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
                          name="gameRoom"
                          color="primary"
                        />
                      }
                      label={
                        values.gameRoom ? (
                          <span className={classes.labelfilled}>Game Room</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Game Room
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.gameRoom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="gameRoomStarred"
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
                      <Button type="submit" disabled className={classes.button}>
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
