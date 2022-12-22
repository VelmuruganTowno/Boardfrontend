/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Form, Field, Formik } from "formik";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  makeStyles,
  Paper,
  Switch,
} from "@material-ui/core";
import Api from "../../../../Service/Api";
import { baseurl } from "../../../../Service/httpCommon";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectFields from "../../../../components/Select/SelectFields";
import MultiSelect from "../../../../components/Select/MultiSelect";
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
  dvdPlayer: false,
  dvdPlayerType: "",
  dvdPlayerStarred: false,
  inhousemovies: false,
  inhousemoviesStarred: false,
  kindle: false,
  kindleStarred: false,
  tv: false,
  tvType: "",
  tvStarred: false,
  iPodDockingStation: false,
  iPodDockingStationStarred: false,
  homeTheatre: false,
  homeTheatreStarred: false,
  smartControls: false,
  smartControlsStarred: false,
  soundSpeakers: false,
  soundSpeakersStarred: false,
  gameConsole: false,
  gameConsoleType: "",
  gameConsoleStarred: false,
};
export default function MediaEntertainment(props) {
  const history = useHistory();
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  var propertyId = sessionStorage.getItem("propertyId");
  var displayName = sessionStorage.getItem("displayName");
  const data = { propertyId: propertyId, displayName: displayName };
  const [RoomMediaDVDPlayer, setRoomMediaDVDPlayer] = useState([]);
  const [RoomMediaTV, setRoomMediaTV] = useState([]);
  const [RoomMediaGameConsole, setRoomMediaGameConsole] = useState([]);
  const [media, setMedia] = useState("");
  const [mediaStarred, setMediaStarred] = useState("");
  var Data = { ...media, ...mediaStarred };
  const [loading, setLoading] = useState(false);

  const RoomMediaDVDPlayerGet = async () => {
    const dvdData = {
      type: "Room Media DVD Player",
    };
    await Api.post("productdropdownonly", dvdData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomMediaDVDPlayer(response.data);
      });
  };

  const RoomMediaTVGet = async () => {
    const tvData = {
      type: "Room Media TV",
    };
    await Api.post("productdropdownonly", tvData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomMediaTV(response.data);
      });
  };
  const RoomMediaGameConsoleGet = async () => {
    const gameData = {
      type: "Room Media Game Console",
    };
    await Api.post("productdropdownonly", gameData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomMediaGameConsole(response.data);
      });
  };

  useEffect(() => {
    RoomMediaDVDPlayerGet();
    RoomMediaTVGet();
    RoomMediaGameConsoleGet();
  }, []);

  const DataGet = () => {
    Api.post("RAmenitiesEntertainmentvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const gameres = res.data.gameConsoleType;
        const televres = res.data.tvType;
        var i = 0;
        if (gameres != "" && gameres != null && gameres != undefined) {
          const game1 = gameres.split(",");
          const game2 = [];

          game1.forEach((element) => {
            game2[i++] = { label: element, value: element };
          });
          res.data.gameConsoleType = game2;
        }
        if (televres != "" && televres != null && televres != undefined) {
          const telev1 = televres.split(",");
          const telev2 = [];

          telev1.forEach((element) => {
            telev2[i++] = { label: element, value: element };
          });
          res.data.tvType = telev2;
        }

        setMedia(res.data);
      });
  };

  const starredGet = () => {
    Api.post("RAmenitiesEntertainmentStarredvalue", data)
      .then((res) => {
        setMediaStarred(res.data);
      });
  };

  useEffect(() => {
    starredGet();
    DataGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = media.id;
    const telev = [];
    const game = [];
    if (
      fields.gameConsoleType != "" &&
      fields.gameConsoleType != null &&
      fields.gameConsoleType != undefined
    ) {
      fields.gameConsoleType.map((ele) => game.push(ele.value));
      fields.gameConsoleType = game.toString();
    } else {
      fields.gameConsoleType = "";
    }
    if (
      fields.tvType != "" &&
      fields.tvType != null &&
      fields.tvType != undefined
    ) {
      fields.tvType.map((ele) => telev.push(ele.value));
      fields.tvType = telev.toString();
    } else {
      fields.tvType = "";
    }

    if (fields.dvdPlayer == false) {
      fields.dvdPlayerType = "";
      fields.dvdPlayerStarred = false;
    }
    if (fields.inhousemovies == false) {
      fields.inhousemoviesStarred = false;
    }
    if (fields.kindle == false) {
      fields.kindleStarred = false;
    }
    if (fields.tv == false) {
      fields.tvType = "";
      fields.tvStarred = false;
    }
    if (fields.iPodDockingStation == false) {
      fields.iPodDockingStationStarred = false;
    }
    if (fields.homeTheatre == false) {
      fields.homeTheatreStarred = false;
    }
    if (fields.smartControls == false) {
      fields.smartControlsStarred = false;
    }
    if (fields.soundSpeakers == false) {
      fields.soundSpeakersStarred = false;
    }
    if (fields.gameConsole == false) {
      fields.gameConsoleType = "";
      fields.gameConsoleStarred = false;
    }

    setStatus();
    if (id) {
      updateMedia(fields);
      updateStarred(fields);
    } else {
      createMedia(fields);
      createStarred(fields);
    }
  }
  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("RAmenitiesEntertainmentStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("RAmenitiesEntertainmentStarredupdate", fields);
  }

  function createMedia(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("RAmenitiesEntertainment", newData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Created");
        history.push("/addproperty/room/kitchenAppliances");
        setLoading(false);
      });
  }
  function updateMedia(fields) {
    fields.updateBy = createdBy;
    setLoading(true);
    Api.put("RAmenitiesEntertainmentupdate", fields, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Updated");
        history.push("/addproperty/room/kitchenAppliances");
        setLoading(false);
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
                    <p className={classes.title}>Media and Entertainment</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>

                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="dvdPlayer"
                          type="checkbox"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.dvdPlayer ? (
                          <span className={classes.labelfilled}>
                            DVD Player
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            DVD Player
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.dvdPlayer ? (
                      <Field
                        name="dvdPlayerType"
                        value={values.dvdPlayerType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("dvdPlayerType", value.value)
                        }
                        options={RoomMediaDVDPlayer.map(
                          (RoomMediaDVDPlayer) => ({
                            label: RoomMediaDVDPlayer,
                            value: RoomMediaDVDPlayer,
                          })
                        )}
                        placeholder="DVD PlayerType"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.dvdPlayer ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="dvdPlayerStarred"
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
                          name="gameConsole"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                        />
                      }
                      label={
                        values.gameConsole ? (
                          <span className={classes.labelfilled}>
                            Game Console
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Game Console
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.gameConsole ? (
                      <Field
                        name="gameConsoleType"
                        component={MultiSelect}
                        options={RoomMediaGameConsole.map(
                          (RoomMediaGameConsole) => ({
                            label: RoomMediaGameConsole,
                            value: RoomMediaGameConsole,
                          })
                        )}
                        placeholder="Game Console Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.gameConsole ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="gameConsoleStarred"
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
                          name="tv"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
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
                        options={RoomMediaTV.map((RoomMediaTV) => ({
                          label: RoomMediaTV,
                          value: RoomMediaTV,
                        }))}
                        placeholder="TV Type"
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
                  <Grid item  sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="inhousemovies"
                          color="primary"
                        />
                      }
                      label={
                        values.inhousemovies ? (
                          <span className={classes.labelfilled}>
                            In-House Movies
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            In-House Movies
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.inhousemovies ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="inhousemoviesStarred"
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
                          name="kindle"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                        />
                      }
                      label={
                        values.kindle ? (
                          <span className={classes.labelfilled}>Kindle</span>
                        ) : (
                          <span className={classes.labeloutlined}>Kindle</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.kindle ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="kindleStarred"
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
                          name="iPodDockingStation"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                        />
                      }
                      label={
                        values.iPodDockingStation ? (
                          <span className={classes.labelfilled}>
                            IPod Docking Station
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            IPod Docking Station
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.iPodDockingStation ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="iPodDockingStationStarred"
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
                          name="homeTheatre"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                        />
                      }
                      label={
                        values.homeTheatre ? (
                          <span className={classes.labelfilled}>
                            Home Theatre
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Home Theatre
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.homeTheatre ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="homeTheatreStarred"
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
                          name="smartControls"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                        />
                      }
                      label={
                        values.smartControls ? (
                          <span className={classes.labelfilled}>
                            Smart Controls
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Smart Controls
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.smartControls ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="smartControlsStarred"
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
                          name="soundSpeakers"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                        />
                      }
                      label={
                        values.soundSpeakers ? (
                          <span className={classes.labelfilled}>
                            Sound Speakers
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Sound Speakers
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.soundSpeakers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="soundSpeakersStarred"
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
