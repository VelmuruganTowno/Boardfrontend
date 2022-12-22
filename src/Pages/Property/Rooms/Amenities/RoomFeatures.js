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
import SelectFields from "../../../../components/Select/SelectFields";
import MultiSelect from "../../../../components/Select/MultiSelect";
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
    width: "250px",
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

const intialValues = {
  closet: false,
  closetStarred: false,
  clothesRack: false,
  clothesRackStarred: false,
  hangers: false,
  hangersStarred: false,
  blackoutCurtains: false,
  blackoutCurtainsStarred: false,
  centerTable: false,
  centerTableStarred: false,
  chargingPoints: false,
  chargingPointsType: "",
  chargingPointsStarred: false,
  couch: false,
  couchStarred: false,
  diningTable: false,
  diningTableStarred: false,
  fireplace: false,
  fireplaceStarred: false,
  miniBar: false,
  miniBarType: "",
  miniBarType1: "",
  miniBarStarred: false,
  miniFridge: false,
  miniFridgeStarred: false,
  mirror: false,
  mirrorStarred: false,
  sofa: false,
  sofaType: "",
  sofaStarred: false,
  telephone: false,
  telephoneType: "",
  telephoneStarred: false,
  woodenFloors: false,
  woodenFloorsStarred: false,
  workDesk: false,
  workDeskStarred: false,
  readinglamp: false,
  readinglampStarred: false,
  pillowmenu: false,
  pillowmenuStarred: false,
  livingArea: false,
  livingAreaStarred: false,
  diningArea: false,
  diningAreaStarred: false,
  seatingArea: false,
  seatingAreaStarred: false,
  intercom: false,
  intercomStarred: false,
  intercomType: "",
  chair: false,
  chairStarred: false,
  washingMachine: false,
  washingMachineStarred: false,
  blanket: false,
  blanketStarred: false,
  blanketType: false,
  cushions: false,
  cushionsStarred: false,
  pillows: false,
  pillowsTypes: "",
  pillowsStarred: false,
  alarmClock: false,
  alarmClockStarred: false,
  mosquitoNet: false,
  mosquitoNetStarred: false,
  safetySecurity: false,
  safetySecurityType: "",
  safetySecurityStarred: false,
  childCare: false,
  childCareType: "",
  childCareStarred: false,
};
export default function RoomFeatures(props) {
  const history = useHistory();
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  var displayName = sessionStorage.getItem("displayName");
  const data = { propertyId: propertyId, displayName: displayName };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [RoomFeaturesChargingPoints, setRoomFeaturesChargingPoints] = useState(
    []
  );
  const [RoomFeaturesMiniBar, setRoomFeaturesMiniBar] = useState([]);
  const [safety, setSafety] = useState([]);
  const [RoomFeaturesSofa, setRoomFeaturesSofa] = useState([]);
  const [RoomFeaturesTelephone, setRoomFeaturesTelephone] = useState([]);
  const [RoomFeaturesIntercom, setRoomFeaturesIntercom] = useState([]);
  const [RoomBedBlanketBlanket, setRoomBedBlanketBlanket] = useState([]);
  const [RoomBedBlanketPillows, setRoomBedBlanketPillows] = useState([]);
  const [roomChild, setRoomChild] = useState([]);
  const [roomFeature, setRoomFeature] = useState("");
  const [roomFeatureStarred, setRoomFeatureStarred] = useState("");
  const [loading, setLoading] = useState(false);
  const Data = { ...roomFeature, ...roomFeatureStarred };

  const childGet = async () => {
    const childData = {
      type: "Childcare service",
    };
    await Api.post( "productdropdownonly", childData).then((res) => {
      setRoomChild(res.data);
    });
  };

  const RoomSafetyGet = async () => {
    const safteyData = {
      type: "Room Safety and Security Security",
    };
    await Api.post("productdropdownonly", safteyData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setSafety(res.data);
      });
  };

  const RoomBedBlanketBlanketGet = async () => {
    const blanketData = {
      type: "Room Beds and Blanket Blanket",
    };
    await Api.post("productdropdownonly", blanketData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomBedBlanketBlanket(response.data);
      });
  };

  const RoomBedBlanketPillowsGet = async () => {
    const pillowsData = {
      type: "Room Beds and Blanket Pillows",
    };
    await Api.post("productdropdownonly", pillowsData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomBedBlanketPillows(response.data);
      });
  };

  const RoomFeaturesChargingPointsGet = async () => {
    const chargeData = {
      type: "Room Features Charging Points",
    };
    await Api.post("productdropdownonly", chargeData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomFeaturesChargingPoints(response.data);
      });
  };
  const RoomFeaturesMiniBarGet = async () => {
    const barData = {
      type: "Room Features Mini Bar",
    };
    await Api.post("productdropdownonly", barData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomFeaturesMiniBar(response.data);
      });
  };
  const RoomFeaturesSofaGet = async () => {
    const sofaData = {
      type: "Room Features Sofa",
    };
    await Api.post("productdropdownonly", sofaData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomFeaturesSofa(response.data);
      });
  };
  const RoomFeaturesTelephoneGet = async () => {
    const telephoneData = {
      type: "Room Features Telephone",
    };
    await Api.post("productdropdownonly", telephoneData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomFeaturesTelephone(response.data);
      });
  };
  const RoomFeaturesIntercomGet = async () => {
    const interData = {
      type: "Room Features Intercom",
    };
    await Api.post("productdropdownonly", interData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomFeaturesIntercom(response.data);
      });
  };

  useEffect(() => {
    RoomFeaturesChargingPointsGet();
    RoomFeaturesMiniBarGet();
    RoomFeaturesSofaGet();
    RoomFeaturesTelephoneGet();
    RoomFeaturesIntercomGet();
    RoomBedBlanketPillowsGet();
    RoomBedBlanketBlanketGet();
    RoomSafetyGet();
    childGet();
  }, []);

  const RoomFeaturedData = () => {
    Api.post("RAmenitiesFeaturesvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const chargeres = res.data.chargingPointsType;
        const sofres = res.data.sofaType;
        const blanketres = res.data.blanketType;
        const saferes = res.data.safetySecurityType;
        const childres = res.data.childCareType;
        var i = 0;

        if (childres != "" && childres != null && childres != undefined) {
          const child1 = childres.split(",");
          const child2 = [];
          child1.forEach((element) => {
            child2[i++] = { label: element, value: element };
          });
          res.data.childCareType = child2;
        }

        if (saferes != "" && saferes != null && saferes != undefined) {
          const safe1 = saferes.split(",");
          const safe2 = [];
          safe1.forEach((element) => {
            safe2[i++] = { label: element, value: element };
          });
          res.data.safetySecurityType = safe2;
        }
        if (blanketres != "" && blanketres != null && blanketres != undefined) {
          const blanket1 = blanketres.split(",");
          const blanket2 = [];
          blanket1.forEach((element) => {
            blanket2[i++] = { label: element, value: element };
          });
          res.data.blanketType = blanket2;
        }
        if (chargeres != "" && chargeres != null && chargeres != undefined) {
          const charge1 = chargeres.split(",");
          const charge2 = [];
          charge1.forEach((element) => {
            charge2[i++] = { label: element, value: element };
          });
          res.data.chargingPointsType = charge2;
        }
        if (sofres != "" && sofres != null && sofres != undefined) {
          const sof1 = sofres.split(",");
          const sof2 = [];
          sof1.forEach((element) => {
            sof2[i++] = { label: element, value: element };
          });
          res.data.sofaType = sof2;
        }

        setRoomFeature(res.data);
      });
  };
  const starredGet = () => {
    Api.post( "RAmenitiesFeaturesStarredvalue", data).then((res) => {
      setRoomFeatureStarred(res.data);
    });
  };

  useEffect(() => {
    starredGet();
    RoomFeaturedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = roomFeature.id;
    const charging = [];
    const sof = [];
    const blank = [];
    const safe = [];
    const child = [];

    if (
      fields.safetySecurityType != "" &&
      fields.safetySecurityType != null &&
      fields.safetySecurityType != undefined
    ) {
      fields.safetySecurityType.map((ele) => safe.push(ele.value));
      fields.safetySecurityType = safe.toString();
    } else {
      fields.safetySecurityType = "";
    }
    if (
      fields.childCareType != "" &&
      fields.childCareType != null &&
      fields.childCareType != undefined
    ) {
      fields.childCareType.map((ele) => child.push(ele.value));
      fields.childCareType = child.toString();
    } else {
      fields.childCareType = "";
    }
    if (
      fields.blanketType != "" &&
      fields.blanketType != null &&
      fields.blanketType != undefined
    ) {
      fields.blanketType.map((ele) => blank.push(ele.value));
      fields.blanketType = blank.toString();
    } else {
      fields.blanketType = "";
    }
    if (
      fields.chargingPointsType != "" &&
      fields.chargingPointsType != null &&
      fields.chargingPointsType != undefined
    ) {
      fields.chargingPointsType.map((ele) => charging.push(ele.value));
      fields.chargingPointsType = charging.toString();
    } else {
      fields.chargingPointsType = "";
    }
    if (
      fields.sofaType != "" &&
      fields.sofaType != null &&
      fields.sofaType != undefined
    ) {
      fields.sofaType.map((ele) => sof.push(ele.value));
      fields.sofaType = sof.toString();
    } else {
      fields.sofaType = "";
    }

    if (fields.closet == false) {
      fields.closetStarred = false;
    }
    if (fields.clothesRack == false) {
      fields.clothesRackStarred = false;
    }
    if (fields.hangers == false) {
      fields.hangersStarred = false;
    }
    if (fields.blackoutCurtains == false) {
      fields.blackoutCurtainsStarred = false;
    }

    if (fields.centerTable == false) {
      fields.centerTableStarred = false;
    }
    if (fields.chargingpoints == false) {
      fields.chargingPointsType = "";
      fields.chargingpointsStarred = false;
    }
    if (fields.couch == false) {
      fields.couchStarred = false;
    }
    if (fields.diningTable == false) {
      fields.diningTableStarred = false;
    }
    if (fields.fireplace == false) {
      fields.fireplaceStarred = false;
    }
    if (fields.miniBar == false) {
      fields.miniBarType = "";
      fields.miniBarType1 = "";
      fields.miniBarStarred = false;
    }
    if (fields.miniFridge == false) {
      fields.miniFridgeStarred = false;
    }
    if (fields.mirror == false) {
      fields.mirrorStarred = false;
    }
    if (fields.sofa == false) {
      fields.sofaType = "";
      fields.sofaStarred = false;
    }
    if (fields.telephone == false) {
      fields.telephoneType = "";
      fields.telephoneStarred = false;
    }
    if (fields.woodenFloors == false) {
      fields.woodenFloorsStarred = false;
    }
    if (fields.workDesk == false) {
      fields.workDeskStarred = false;
    }
    if (fields.readinglamp == false) {
      fields.readinglampStarred = false;
    }
    if (fields.pillowmenu == false) {
      fields.pillowmenuStarred = false;
    }
    if (fields.livingArea == false) {
      fields.livingAreaStarred = false;
    }
    if (fields.diningArea == false) {
      fields.diningAreaStarred = false;
    }
    if (fields.seatingArea == false) {
      fields.seatingAreaStarred = false;
    }

    if (fields.intercom == false) {
      fields.intercomStarred = false;
      fields.intercomType = "";
    }

    if (fields.chair == false) {
      fields.chairStarred = false;
    }

    if (fields.washingMachine == false) {
      fields.washingMachineStarred = false;
    }
    if (fields.blanket == false) {
      fields.blanketStarred = false;
      fields.blanketType = "";
    }
    if (fields.cushions == false) {
      fields.cushionsStarred = false;
    }
    if (fields.pillows == false) {
      fields.pillowsTypes = "";
      fields.pillowsStarred = false;
    }
    if (fields.alarmClock == false) {
      fields.alarmClockStarred = false;
    }
    if (fields.mosquitoNet == false) {
      fields.mosquitoNetStarred = false;
    }
    if (fields.safetySecurity == false) {
      fields.safetySecurityType = "";
      fields.safetySecurityStarred = false;
    }
    if (fields.childCare == false) {
      fields.childCareType = "";
      fields.childCareStarred = false;
    }
    setStatus();
    if (id) {
      updateRoomFeature(fields);
      updateStarred(fields);
    } else {
      createRoomFeature(fields);
      createStarred(fields);
    }
  }
  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post( "RAmenitiesFeaturesStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put( "RAmenitiesFeaturesStarredupdate", fields);
  }

  function createRoomFeature(fields) {
    setLoading(true);
    var createData = { ...data, ...fields, ...create };
    console.log(createData);
    Api.post( "RAmenitiesFeatures", createData).then((res) => {
      toast.success("Successfully Created");
      history.push("/addproperty/room/mediaEntertainment");
      setLoading(false);
    });
  }
  function updateRoomFeature(fields) {
    fields.updateBy = createdBy;
    setLoading(true);
    Api.put( "RAmenitiesFeaturesupdate", fields).then((res) => {
      toast.success("Successfully Updated");
      history.push("/addproperty/room/mediaEntertainment");
      setLoading(false);
    });
  }

  return (
    <>
      <Paper variant="outlined" square className={classes.theme}>
        <Formik
          initialValues={Data || intialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <p className={classes.title}>Room Features</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="safetySecurity"
                          color="primary"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          autoFocus
                        />
                      }
                      label={
                        values.safetySecurity ? (
                          <span className={classes.labelfilled}>Safety</span>
                        ) : (
                          <span className={classes.labeloutlined}>Safety</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.safetySecurity ? (
                      <Field
                        name="safetySecurityType"
                        component={MultiSelect}
                        options={safety.map((safe) => ({
                          label: safe,
                          value: safe,
                        }))}
                        placeholder="Safety Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.safetySecurity ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="safetySecurityStarred"
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
                          name="childCare"
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
                        values.childCare ? (
                          <span className={classes.labelfilled}>
                            Child Care
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Child Care
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.childCare ? (
                      <Field
                        name="childCareType"
                        component={MultiSelect}
                        options={roomChild.map((roomChild) => ({
                          label: roomChild,
                          value: roomChild,
                        }))}
                        placeholder="Child Care Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.childCare ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="childCareStarred"
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
                          name="chargingPoints"
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
                        values.chargingPoints ? (
                          <span className={classes.labelfilled}>
                            Charging Points
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Charging Points
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.chargingPoints ? (
                      <Field
                        name="chargingPointsType"
                        component={MultiSelect}
                        options={RoomFeaturesChargingPoints.map(
                          (RoomFeaturesChargingPoints) => ({
                            label: RoomFeaturesChargingPoints,
                            value: RoomFeaturesChargingPoints,
                          })
                        )}
                        placeholder=" Charging Points Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.chargingPoints ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="chargingPointsStarred"
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
                          name="miniBar"
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
                        values.miniBar ? (
                          <span className={classes.labelfilled}>Mini Bar</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Mini Bar
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.miniBar ? (
                      <Field
                        name="miniBarType"
                        value={values.miniBarType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("miniBarType", value.value)
                        }
                        className={classes.select}
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Mini Bar Type"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={4}>
                    {values.miniBar ? (
                      <>
                        {values.miniBarType === "paid" ? (
                          <Field
                            name="miniBarType1"
                            value={values.miniBarType1}
                            component={SelectFields}
                            onChange={(value) =>
                              setFieldValue("miniBarType1", value.value)
                            }
                            options={RoomFeaturesMiniBar.map((miniBarType) => ({
                              label: miniBarType,
                              value: miniBarType,
                            }))}
                            placeholder="MiniBar Type"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.miniBar ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="miniBarStarred"
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
                          name="sofa"
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
                        values.sofa ? (
                          <span className={classes.labelfilled}>Sofa</span>
                        ) : (
                          <span className={classes.labeloutlined}>Sofa</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.sofa ? (
                      <Field
                        name="sofaType"
                        component={MultiSelect}
                        options={RoomFeaturesSofa.map((RoomFeaturesSofa) => ({
                          label: RoomFeaturesSofa,
                          value: RoomFeaturesSofa,
                        }))}
                        placeholder="Sofa Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.sofa ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="sofaStarred"
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
                          name="telephone"
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
                        values.telephone ? (
                          <span className={classes.labelfilled}>Telephone</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Telephone
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.telephone ? (
                      <Field
                        name="telephoneType"
                        value={values.telephoneType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("telephoneType", value.value)
                        }
                        options={RoomFeaturesTelephone.map(
                          (RoomFeaturesTelephone) => ({
                            label: RoomFeaturesTelephone,
                            value: RoomFeaturesTelephone,
                          })
                        )}
                        placeholder="Telephone Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.telephone ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="telephoneStarred"
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
                          name="intercom"
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
                        values.intercom ? (
                          <span className={classes.labelfilled}>Intercom</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Intercom
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.intercom ? (
                      <Field
                        name="intercomType"
                        value={values.intercomType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("intercomType", value.value)
                        }
                        options={RoomFeaturesIntercom.map(
                          (roomfeaturesIntercom) => ({
                            label: roomfeaturesIntercom,
                            value: roomfeaturesIntercom,
                          })
                        )}
                        placeholder="Intercom Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.intercom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="intercomStarred"
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
                          name="blanket"
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
                        values.blanket ? (
                          <span className={classes.labelfilled}>Blanket</span>
                        ) : (
                          <span className={classes.labeloutlined}>Blanket</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.blanket ? (
                      <Field
                        name="blanketType"
                        component={MultiSelect}
                        options={RoomBedBlanketBlanket.map(
                          (RoomBedBlanketBlanket) => ({
                            label: RoomBedBlanketBlanket,
                            value: RoomBedBlanketBlanket,
                          })
                        )}
                        placeholder="Room Bed Blanket Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.blanket ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="blanketStarred"
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
                          name="pillows"
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
                        values.pillows ? (
                          <span className={classes.labelfilled}>Pillows</span>
                        ) : (
                          <span className={classes.labeloutlined}>Pillows</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.pillows ? (
                      <Field
                        name="pillowsType"
                        value={values.pillowsType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("pillowsType", value.value)
                        }
                        options={RoomBedBlanketPillows.map(
                          (RoomBedBlanketPillows) => ({
                            label: RoomBedBlanketPillows,
                            value: RoomBedBlanketPillows,
                          })
                        )}
                        placeholder="Room Bed Blanket Pillows Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.pillows ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="pillowsStarred"
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
                          name="couch"
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
                        values.couch ? (
                          <span className={classes.labelfilled}>Couch</span>
                        ) : (
                          <span className={classes.labeloutlined}>Couch</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.couch ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="couchStarred"
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
                          name="diningTable"
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
                        values.diningTable ? (
                          <span className={classes.labelfilled}>
                            Dining Table
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Dining Table
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.diningTable ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="diningTableStarred"
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
                          name="fireplace"
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
                        values.fireplace ? (
                          <span className={classes.labelfilled}>Fireplace</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Fireplace
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={1}>
                    {values.fireplace ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="fireplaceStarred"
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
                          name="miniFridge"
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
                        values.miniFridge ? (
                          <span className={classes.labelfilled}>
                            Mini Fridge
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Mini Fridge
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.miniFridge ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="miniFridgeStarred"
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
                          name="mirror"
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
                        values.mirror ? (
                          <span className={classes.labelfilled}>Mirror</span>
                        ) : (
                          <span className={classes.labeloutlined}>Mirror</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.mirror ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="mirrorStarred"
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
                          name="woodenFloors"
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
                        values.woodenFloors ? (
                          <span className={classes.labelfilled}>
                            Wooden Floor
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Wooden Floor
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.woodenFloors ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="woodenFloorsStarred"
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
                          name="workDesk"
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
                        values.workDesk ? (
                          <span className={classes.labelfilled}>Work Desk</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Work Desk
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.workDesk ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="workDeskStarred"
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
                          name="readinglamp"
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
                        values.readinglamp ? (
                          <span className={classes.labelfilled}>
                            Reading Lamp
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Reading Lamp
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.readinglamp ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="readinglampStarred"
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
                          name="pillowmenu"
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
                        values.pillowmenu ? (
                          <span className={classes.labelfilled}>
                            Pillow Menu
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Pillow Menu
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.pillowmenu ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="pillowmenuStarred"
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
                          name="livingArea"
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
                        values.livingArea ? (
                          <span className={classes.labelfilled}>
                            Living Area
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Living Area
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.livingArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="livingAreaStarred"
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
                          name="diningArea"
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
                        values.diningArea ? (
                          <span className={classes.labelfilled}>
                            Dining Area
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Dining Area
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.diningArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="diningAreaStarred"
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
                          name="seatingArea"
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
                        values.seatingArea ? (
                          <span className={classes.labelfilled}>
                            Seating Area
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Seating Area
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.seatingArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="seatingAreaStarred"
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
                          name="chair"
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
                        values.chair ? (
                          <span className={classes.labelfilled}>Chair</span>
                        ) : (
                          <span className={classes.labeloutlined}>Chair</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.chair ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="chairStarred"
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
                          name="washingMachine"
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
                        values.washingMachine ? (
                          <span className={classes.labelfilled}>
                            Washing Machine
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Washing Machine
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.washingMachine ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="washingMachineStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="cushions"
                          color="primary"
                        />
                      }
                      label={
                        values.cushions ? (
                          <span className={classes.labelfilled}>Cushions</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Cushions
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.cushions ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cushionsStarred"
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
                          name="alarmClock"
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
                        values.alarmClock ? (
                          <span className={classes.labelfilled}>
                            Alarm Clock
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Alarm Clock
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.alarmClock ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="alarmClockStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="mosquitoNet"
                          color="primary"
                        />
                      }
                      label={
                        values.mosquitoNet ? (
                          <span className={classes.labelfilled}>
                            Mosquito Net
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Mosquito Net
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.mosquitoNet ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="mosquitoNetStarred"
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
                          name="closet"
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
                        values.closet ? (
                          <span className={classes.labelfilled}>Closet</span>
                        ) : (
                          <span className={classes.labeloutlined}>Closet</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.closet ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="closetStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="clothesRack"
                          color="primary"
                        />
                      }
                      label={
                        values.clothesRack ? (
                          <span className={classes.labelfilled}>
                            Clothes Rack
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Clothes Rack
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.clothesRack ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="clothesRackStarred"
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
                          name="hangers"
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
                        values.hangers ? (
                          <span className={classes.labelfilled}>Hangers</span>
                        ) : (
                          <span className={classes.labeloutlined}>Hangers</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.hangers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="hangersStarred"
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
                          name="blackoutCurtains"
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
                        values.blackoutCurtains ? (
                          <span className={classes.labelfilled}>
                            Blackout Curtains
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Blackout Curtains
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.blackoutCurtains ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="blackoutCurtainsStarred"
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
                          name="centerTable"
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
                        values.centerTable ? (
                          <span className={classes.labelfilled}>
                            Center Table
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Center Table
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.centerTable ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="centerTableStarred"
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
