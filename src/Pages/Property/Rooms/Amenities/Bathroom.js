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
import MultiSelect from "../../../../components/Select/MultiSelect.js";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
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
  bathtub: false,
  bathtubStarred: false,
  bubbleBath: false,
  bubbleBathStarred: false,
  dentalKit: false,
  dentalKitStarred: false,
  geyserWaterheater: false,
  geyserWaterheaterStarred: false,
  hairdryer: false,
  hairdryerStarred: false,
  hotColdWater: false,
  hotColdWaterStarred: false,
  slippers: false,
  slippersStarred: false,
  shower: false,
  showerStarred: false,
  showerType: "",
  toiletPapers: false,
  toiletPapersStarred: false,
  toiletries: false,
  toiletriesType: "",
  toiletriesStarred: false,
  sanitaryBin: false,
  sanitaryBinStarred: false,
  showerCap: false,
  showerCapStarred: false,
  towels: false,
  towelsType: "",
  towelsStarred: false,
  bodyScrub: false,
  bodyScrubStarred: false,
  bodyWrap: false,
  bodyWrapStarred: false,
  hammam: false,
  hammamStarred: false,
  bathrobes: false,
  bathrobesStarred: false,
  dustbins: false,
  dustbinsStarred: false,
  westernToiletSeat: false,
  westernToiletSeatStarred: false,
  showercubicle: false,
  showercubicleStarred: false,
  shavingMirror: false,
  shavingMirrorStarred: false,
  adaptedbath: false,
  adaptedbathStarred: false,
  bidet: false,
  bidetStarred: false,
  toiletwithgrabrails: false,
  toiletwithgrabrailsStarred: false,
};

export default function Bathroom() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  var propertyId = sessionStorage.getItem("propertyId");
  var displayName = sessionStorage.getItem("displayName");
  const data = { propertyId: propertyId, displayName: displayName };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [RoomBathroomShower, setRoomBathroomShower] = useState([]);
  const [RoomBathroomToiletries, setRoomBathroomToiletries] = useState([]);
  const [RoomBathroomTowels, setRoomBathroomTowels] = useState([]);
  const [bathroom, setBathroom] = useState("");
  const [bathroomStarred, setBathroomStarred] = useState("");
  var Data = { ...bathroom, ...bathroomStarred };

  const RoomBathroomShowerGet = async () => {
    const bathroomData = {
      type: "Room Bathroom Shower",
    };
    await Api.post("productdropdownonly", bathroomData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomBathroomShower(response.data);
      });
  };

  const RoomBathroomToiletriesGet = async () => {
    const bathroomData = {
      type: "Room Bathroom Toiletries",
    };
    await Api.post("productdropdownonly", bathroomData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomBathroomToiletries(response.data);
      });
  };

  const RoomBathroomTowelsGet = async () => {
    const towelsData = {
      type: "Room Bathroom Towels",
    };
    await Api.post("productdropdownonly", towelsData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomBathroomTowels(response.data);
      });
  };
  useEffect(() => {
    RoomBathroomShowerGet();
    RoomBathroomToiletriesGet();
    RoomBathroomTowelsGet();
  }, []);

  const DataGet = () => {
    Api.post("RAmenitiesBathroomvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const showerres = res.data.showerType;
        const toilres = res.data.toiletriesType;
        const towelsres = res.data.towelsType;
        var i = 0;
        if (towelsres != "" && towelsres != null && towelsres != undefined) {
          const towels1 = towelsres.split(",");
          const towels2 = [];
          towels1.forEach((element) => {
            towels2[i++] = { label: element, value: element };
          });
          res.data.towelsType = towels2;
        }

        if (toilres != "" && toilres != null && toilres != undefined) {
          const toil1 = toilres.split(",");
          const toil2 = [];

          toil1.forEach((element) => {
            toil2[i++] = { label: element, value: element };
          });
          res.data.toiletriesType = toil2;
        }
        if (showerres != "" && showerres != null && showerres != undefined) {
          const shower1 = showerres.split(",");
          const shower2 = [];

          shower1.forEach((element) => {
            shower2[i++] = { label: element, value: element };
          });
          res.data.showerType = shower2;
        }
        setBathroom(res.data);
      });
  };

  const starredGet = () => {
    Api.post("RAmenitiesBathroomStarredvalue", data).then((res) => {
      setBathroomStarred(res.data);
    });
  };
  useEffect(() => {
    starredGet();
    DataGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = bathroom.id;
    const show = [];
    const toilet = [];
    const tow = [];
    if (
      fields.showerType != "" &&
      fields.showerType != null &&
      fields.showerType != undefined
    ) {
      fields.showerType.map((ele) => show.push(ele.value));
      fields.showerType = show.toString();
    } else {
      fields.showerType = "";
    }
    if (
      fields.toiletriesType != "" &&
      fields.toiletriesType != null &&
      fields.toiletriesType != undefined
    ) {
      fields.toiletriesType.map((ele) => toilet.push(ele.value));
      fields.toiletriesType = toilet.toString();
    } else {
      fields.toiletriesType = "";
    }
    if (
      fields.towelsType != "" &&
      fields.towelsType != null &&
      fields.towelsType != undefined
    ) {
      fields.towelsType.map((ele) => tow.push(ele.value));
      fields.towelsType = tow.toString();
    } else {
      fields.towelsType = "";
    }
    setStatus();

    if (fields.bathtub == false) {
      fields.bathtubStarred = false;
    }
    if (fields.bubbleBath == false) {
      fields.bubbleBathStarred = false;
    }
    if (fields.dentalKit == false) {
      fields.dentalKitStarred = false;
    }
    if (fields.geyserWaterheater == false) {
      fields.geyserWaterheaterStarred = false;
    }
    if (fields.hairdryer == false) {
      fields.hairdryerStarred = false;
    }
    if (fields.hotColdWater == false) {
      fields.hotColdWaterStarred = false;
    }
    if (fields.slippers == false) {
      fields.slippersStarred = false;
    }

    if (fields.shower == false) {
      fields.showerStarred = false;
      fields.showerType = "";
    }
    if (fields.toiletPapers == false) {
      fields.toiletPapersStarred = false;
    }
    if (fields.toiletries == false) {
      fields.toiletriesType = "";
      fields.toiletriesStarred = false;
    }
    if (fields.sanitaryBin == false) {
      fields.sanitaryBinStarred = false;
    }
    if (fields.showerCap == false) {
      fields.showerCapStarred = false;
    }
    if (fields.towels == false) {
      fields.towelsType = "";
      fields.towelsStarred = false;
    }
    if (fields.bodyScrub == false) {
      fields.bodyScrubStarred = false;
    }
    if (fields.bodyWrap == false) {
      fields.bodyWrapStarred = false;
    }
    if (fields.hammam == false) {
      fields.hammamStarred = false;
    }
    if (fields.bathrobes == false) {
      fields.bathrobesStarred = false;
    }
    if (fields.dustbins == false) {
      fields.dustbinsStarred = false;
    }
    if (fields.westernToiletSeat == false) {
      fields.westernToiletSeatStarred = false;
    }
    if (fields.showercubicle == false) {
      fields.showercubicleStarred = false;
    }
    if (fields.shavingMirror == false) {
      fields.shavingMirrorStarred = false;
    }
    if (fields.adaptedbath == false) {
      fields.adaptedbathStarred = false;
    }
    if (fields.bidet == false) {
      fields.bidetStarred = false;
    }
    if (fields.toiletwithgrabrails == false) {
      fields.toiletwithgrabrailsStarred = false;
    }
    if (id) {
      updateBathroom(fields);
      updateStarred(fields);
    } else {
      createBathroom(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("RAmenitiesBathroomStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("RAmenitiesBathroomStarredupdate", fields);
  }

  function createBathroom(fields) {
    setLoading(true);
    var createData = { ...data, ...fields, ...create };
    Api.post("RAmenitiesBathroom", createData).then((res) => {
      toast.success("Successfully Created");
      history.push("/addproperty/room/roomFeatures");
      setLoading(false);
    });
  }

  function updateBathroom(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("RAmenitiesBathroomupdate", fields).then((res) => {
      toast.success("Successfully Updated");
      history.push("/addproperty/room/roomFeatures");
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
          {({ values }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <p className={classes.title}>Bathroom</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="shower"
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
                        values.shower ? (
                          <span className={classes.labelfilled}>Shower</span>
                        ) : (
                          <span className={classes.labeloutlined}>Shower</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.shower ? (
                      <Field
                        name="showerType"
                        component={MultiSelect}
                        options={RoomBathroomShower.map((shower) => ({
                          label: shower,
                          value: shower,
                        }))}
                        placeholder="Shower Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.shower ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="showerStarred"
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
                          name="toiletries"
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
                        values.toiletries ? (
                          <span className={classes.labelfilled}>
                            Toiletries
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Toiletries
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.toiletries ? (
                      <Field
                        name="toiletriesType"
                        component={MultiSelect}
                        options={RoomBathroomToiletries.map(
                          (RoomBathroomToiletries) => ({
                            label: RoomBathroomToiletries,
                            value: RoomBathroomToiletries,
                          })
                        )}
                        placeholder="Toiletries Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.toiletries ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="toiletriesStarred"
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
                          name="towels"
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
                        values.towels ? (
                          <span className={classes.labelfilled}>Towels</span>
                        ) : (
                          <span className={classes.labeloutlined}>Towels</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.towels ? (
                      <Field
                        name="towelsType"
                        component={MultiSelect}
                        options={RoomBathroomTowels.map(
                          (RoomBathroomTowels) => ({
                            label: RoomBathroomTowels,
                            value: RoomBathroomTowels,
                          })
                        )}
                        placeholder="Room Bathroom Towels Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.towels ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="towelsStarred"
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
                          name="bathtub"
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
                        values.bathtub ? (
                          <span className={classes.labelfilled}>Bath Tub</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bath Tub
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bathtub ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bathtubStarred"
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
                          name="bubbleBath"
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
                        values.bubbleBath ? (
                          <span className={classes.labelfilled}>
                            Bubble Bath
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bubble Bath
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bubbleBath ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bubbleBathStarred"
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
                          name="dentalKit"
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
                        values.dentalKit ? (
                          <span className={classes.labelfilled}>
                            Dental Kit
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Dental Kit
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.dentalKit ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="dentalKitStarred"
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
                          name="geyserWaterheater"
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
                        values.geyserWaterheater ? (
                          <span className={classes.labelfilled}>
                            Geyser/Water Heater
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Geyser/Water Heater
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.geyserWaterheater ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="geyserWaterheaterStarred"
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
                          name="hairdryer"
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
                        values.hairdryer ? (
                          <span className={classes.labelfilled}>
                            Hair Dryer
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Hair Dryer
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.hairdryer ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="hairdryerStarred"
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
                          name="hotColdWater"
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
                        values.hotColdWater ? (
                          <span className={classes.labelfilled}>
                            Hot/Cold Water
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Hot/Cold Water
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.hotColdWater ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="hotColdWaterStarred"
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
                          name="slippers"
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
                        values.slippers ? (
                          <span className={classes.labelfilled}>Slippers</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Slippers
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.slippers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="slippersStarred"
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
                          name="toiletPapers"
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
                        values.toiletPapers ? (
                          <span className={classes.labelfilled}>
                            Toilet Papers
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Toilet Papers
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.toiletPapers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="toiletPapersStarred"
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
                          name="sanitaryBin"
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
                        values.sanitaryBin ? (
                          <span className={classes.labelfilled}>
                            Sanitary Bin
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Sanitary Bin
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.sanitaryBin ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="sanitaryBinStarred"
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
                          name="showerCap"
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
                        values.showerCap ? (
                          <span className={classes.labelfilled}>
                            Shower Cap
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Shower Cap
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.showerCap ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="showerCapStarred"
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
                          name="bodyScrub"
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
                        values.bodyScrub ? (
                          <span className={classes.labelfilled}>
                            Body Scrub
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Body Scrub
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bodyScrub ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bodyScrubStarred"
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
                          name="bodyWrap"
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
                        values.bodyWrap ? (
                          <span className={classes.labelfilled}>Body Wrap</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Body Wrap
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bodyWrap ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bodyWrapStarred"
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
                          name="bathrobes"
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
                        values.bathrobes ? (
                          <span className={classes.labelfilled}>Bathrobes</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bathrobes
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bathrobes ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bathrobesStarred"
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
                          name="dustbins"
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
                        values.dustbins ? (
                          <span className={classes.labelfilled}>Dustbins</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Dustbins
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.dustbins ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="dustbinsStarred"
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
                          name="westernToiletSeat"
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
                        values.westernToiletSeat ? (
                          <span className={classes.labelfilled}>
                            Western Toilet Seat
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Western Toilet Seat
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.westernToiletSeat ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="westernToiletSeatStarred"
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
                          name="showercubicle"
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
                        values.showercubicle ? (
                          <span className={classes.labelfilled}>
                            Shower Cubicle
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Shower Cubicle
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.showercubicle ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="showercubicleStarred"
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
                          name="shavingMirror"
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
                        values.shavingMirror ? (
                          <span className={classes.labelfilled}>
                            Shaving Mirror
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Shaving Mirror
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.shavingMirror ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="shavingMirrorStarred"
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
                          name="adaptedbath"
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
                        values.adaptedbath ? (
                          <span className={classes.labelfilled}>
                            Attached Bath
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Attached Bath
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.adaptedbath ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="adaptedbathStarred"
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
                          name="bidet"
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
                        values.bidet ? (
                          <span className={classes.labelfilled}>Bidet</span>
                        ) : (
                          <span className={classes.labeloutlined}>Bidet</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bidet ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bidetStarred"
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
                          name="toiletwithgrabrails"
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
                        values.toiletwithgrabrails ? (
                          <span className={classes.labelfilled}>
                            Toilet with Grabrails
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Toilet with Grabrails
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.toiletwithgrabrails ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="toiletwithgrabrailsStarred"
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
