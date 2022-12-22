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
    padding: "10px 30px",
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

const initalValues = {
  airConditioning: false,
  airConditioningStarred: false,
  airConditioningType: "",
  interconnectedRoom: false,
  interconnectedRoomStarred: false,
  heater: false,
  heaterStarred: false,
  heaterType: "",
  heaterType1: "",
  housekeeping: false,
  housekeepingType: "",
  housekeepingStarred: false,
  inRoomdining: false,
  inRoomdiningStarred: false,
  inRoomdiningType: "",
  ironIroningBoard: false,
  ironIroningBoardStarred: false,
  laundryService: false,
  laundryServiceStarred: false,
  laundryServiceType: "",
  mineralWater: false,
  mineralWaterStarred: false,
  roomService: false,
  roomServiceStarred: false,
  roomServiceType: "",
  smokingRoom: false,
  smokingRoomStarred: false,
  electricKettle: false,
  electricKettleStarred: false,
  wifi: false,
  wifiStarred: false,
  wifiType: "",
  airPurifier: false,
  airPurifierStarred: false,
  sanitizers: false,
  sanitizersStarred: false,
  sanitizersType: "",
  balcony: false,
  balconyType: "",
  balconyStarred: false,
  jaccuzi: false,
  jaccuziStarred: false,
  privatePool: false,
  privatePoolStarred: false,
  terrace: false,
  terraceStarred: false,
};
export default function PopularGuests() {
  const classes = useStyles();
  const history = useHistory();
  var propertyId = sessionStorage.getItem("propertyId");
  var displayName = sessionStorage.getItem("displayName");
  const [RoomAirConditioning, setRoomAirConditioning] = useState([]);
  const [RoomHeater, setRoomHeater] = useState([]);
  const [RoomHouseKeeping, setRoomHouseKeeping] = useState([]);
  const [RoomInRoomDining, setRoomInRoomDining] = useState([]);
  const [RoomRoomService, setRoomRoomService] = useState([]);
  const [RoomSanitizers, setRoomSanitizers] = useState([]);
  const propertyData = { propertyId: propertyId, displayName: displayName };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [RoomBalcony, setRoomBalcony] = useState([]);
  const [popularGuest, setPopularGuest] = useState("");
  const [popularGuestStarred, setPopularGuestStarred] = useState("");
  const [loading, setLoading] = useState(false);

  var Data = { ...popularGuest, ...popularGuestStarred };

  const RoomSanitizersGet = async () => {
    const roomSanitizersData = {
      type: "Room Sanitizers",
    };

    await Api.post("productdropdownonly", roomSanitizersData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomSanitizers(response.data);
      });
  };

  const RoomRoomServiceGet = async () => {
    const roomServiceData = {
      type: "Room Room Service",
    };

    await Api.post("productdropdownonly", roomServiceData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomRoomService(response.data);
      });
  };

  const RoomInRoomDiningGet = async () => {
    const diningData = {
      type: "Room In Room Dining",
    };

    await Api.post("productdropdownonly", diningData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomInRoomDining(response.data);
      });
  };
  const RoomHouseKeepingGet = async () => {
    const houseData = {
      type: "Room HouseKeeping",
    };

    await Api.post("productdropdownonly", houseData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomHouseKeeping(response.data);
      });
  };
  const RoomHeaterGet = async () => {
    const heaterData = {
      type: "Room Heater",
    };

    await Api.post("productdropdownonly", heaterData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomHeater(response.data);
      });
  };

  const RoomAirConditioningGet = async () => {
    const airData = {
      type: "Room Air Conditioning",
    };

    await Api.post("productdropdownonly", airData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomAirConditioning(response.data);
      });
  };

  const RoomBalconyGet = async () => {
    const balconyData = {
      type: "Room Other Facilities Balcony",
    };
    await Api.post("productdropdownonly", balconyData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRoomBalcony(response.data);
      });
  };
  useEffect(() => {
    RoomAirConditioningGet();
    RoomAirConditioningGet();
    RoomBalconyGet();
    RoomHeaterGet();
    RoomHouseKeepingGet();
    RoomInRoomDiningGet();
    RoomRoomServiceGet();
    RoomSanitizersGet();
  }, []);

  const DataGet = () => {
    Api.post("RAmenitiesPopularWithGuestsvalue", propertyData)
      .then((res) => {
        const bathres = res.data.bathroomType;
        const sanres = res.data.sanitizersType;
        var i = 0;
        if (bathres != "" && bathres != null && bathres != undefined) {
          const bath1 = bathres.split(",");
          const bath2 = [];

          bath1.forEach((element) => {
            bath2[i++] = { label: element, value: element };
          });
          res.data.bathroomType = bath2;
        }

        if (sanres != "" && sanres != null && sanres != undefined) {
          const san1 = sanres.split(",");
          const san2 = [];

          san1.forEach((element) => {
            san2[i++] = { label: element, value: element };
          });
          res.data.sanitizersType = san2;
        }

        setPopularGuest(res.data);
      });
  };

  const starredGet = () => {
    Api.post("RAmenitiesPopularWithGuestsStarredvalue", propertyData)
      .then((res) => {
        setPopularGuestStarred(res.data);
      });
  };

  useEffect(() => {
    DataGet();
    starredGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = popularGuest.id;

    const bath = [];
    const san = [];
    if (
      fields.bathroomType != "" &&
      fields.bathroomType != null &&
      fields.bathroomType != undefined
    ) {
      fields.bathroomType.map((ele) => bath.push(ele.value));
      fields.bathroomType = bath.toString();
    } else {
      fields.bathroomType = "";
    }
    if (
      fields.sanitizersType != "" &&
      fields.sanitizersType != null &&
      fields.sanitizersType != undefined
    ) {
      fields.sanitizersType.map((ele) => san.push(ele.value));
      fields.sanitizersType = san.toString();
    } else {
      fields.sanitizersType = "";
    }

    if (fields.airConditioning == false) {
      fields.airConditioningStarred = false;
      fields.airConditioningType = "";
    }
    if (fields.interconnectedRoom == false) {
      fields.interconnectedRoomStarred = false;
    }

    if (fields.heater == false) {
      fields.heaterStarred = false;
      fields.heaterType = "";
      fields.heaterType1 = "";
    }
    if (fields.housekeeping == false) {
      fields.housekeepingType = "";
      fields.housekeepingStarred = false;
    }
    if (fields.inRoomdining == false) {
      fields.inRoomdiningStarred = false;
      fields.inRoomdiningType = "";
    }
    if (fields.ironIroningBoard == false) {
      fields.ironIroningBoardStarred = false;
    }
    if (fields.laundryService == false) {
      fields.laundryServiceStarred = false;
      fields.laundryServiceType = "";
    }

    if (fields.mineralWater == false) {
      fields.mineralWaterStarred = false;
    }
    if (fields.roomService == false) {
      fields.roomServiceStarred = false;
      fields.roomServiceType = "";
    }
    if (fields.smokingRoom == false) {
      fields.smokingRoomStarred = false;
    }
    if (fields.electricKettle == false) {
      fields.electricKettleStarred = false;
    }
    if (fields.wifi == false) {
      fields.wifiStarred = false;
      fields.wifiType = "";
    }
    if (fields.airPurifier == false) {
      fields.airPurifierStarred = false;
    }
    if (fields.sanitizers == false) {
      fields.sanitizersStarred = false;
      fields.sanitizersType = "";
    }
    if (fields.balcony == false) {
      fields.balconyType = "";
      fields.balconyStarred = false;
    }
    if (fields.jaccuzi == false) {
      fields.jaccuziStarred = false;
    }
    if (fields.privatePool == false) {
      fields.privatePoolStarred = false;
    }

    if (fields.terrace == false) {
      fields.terraceStarred = false;
    }
    setStatus();
    if (id) {
      updatePopularGuests(fields);
      updateStarred(fields);
    } else {
      createPopularGuests(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var createData = { ...propertyData, ...fields, ...create };
    Api.post("RAmenitiesPopularWithGuestsStarred", createData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("RAmenitiesPopularWithGuestsStarredupdate", fields);
  }

  function createPopularGuests(fields) {
    setLoading(true);
    var createData = { ...propertyData, ...fields, ...create };

    Api.post("RAmenitiesPopularWithGuests", createData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Created");
        history.push("/addproperty/room/bathroom");
        setLoading(false);
      });
  }
  function updatePopularGuests(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("RAmenitiesPopularWithGuestsupdate", fields, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Updated");
        history.push("/addproperty/room/bathroom");
        setLoading(false);
      });
  }

  return (
    <>
      <Paper variant="outlined" square className={classes.theme}>
        <Formik
          initialValues={Data || initalValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <p className={classes.title}>Popular with Guests</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="airConditioning"
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
                        values.airConditioning ? (
                          <span className={classes.labelfilled}>
                            Air Conditioning
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Air Conditioning
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.airConditioning ? (
                      <Field
                        name="airConditioningType"
                        value={values.airConditioningType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("airConditioningType", value.value)
                        }
                        options={RoomAirConditioning.map(
                          (RoomAirConditioning) => ({
                            label: RoomAirConditioning,
                            value: RoomAirConditioning,
                          })
                        )}
                        placeholder="Air Conditioning Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.airConditioning ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="airConditioningStarred"
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
                          name="heater"
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
                        values.heater ? (
                          <span className={classes.labelfilled}>
                            Room Heater
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Room Heater
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.heater ? (
                      <Field
                        name="heaterType"
                        value={values.heaterType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("heaterType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Room Heater Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.heater ? (
                      <>
                        {values.heaterType === "paid" ? (
                          <Field
                            name="heaterType1"
                            value={values.heaterType1}
                            component={SelectFields}
                            onChange={(value) =>
                              setFieldValue("heaterType1", value.value)
                            }
                            options={RoomHeater.map((RoomHeater) => ({
                              label: RoomHeater,
                              value: RoomHeater,
                            }))}
                            placeholder="Room Heater Type"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.heater ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="heaterStarred"
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
                          name="housekeeping"
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
                        values.housekeeping ? (
                          <span className={classes.labelfilled}>
                            Housekeeping
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Housekeeping
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.housekeeping ? (
                      <Field
                        name="housekeepingType"
                        value={values.housekeepingType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("housekeepingType", value.value)
                        }
                        options={RoomHouseKeeping.map((RoomHouseKeeping) => ({
                          label: RoomHouseKeeping,
                          value: RoomHouseKeeping,
                        }))}
                        placeholder="Room HouseKeeping Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.housekeeping ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="housekeepingStarred"
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
                          name="inRoomdining"
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
                        values.inRoomdining ? (
                          <span className={classes.labelfilled}>
                            In-Room Dining
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            In-Room Dining
                          </span>
                        )
                      }
                    />
                  </Grid>

                  <Grid item sm={8}>
                    {values.inRoomdining ? (
                      <Field
                        name="inRoomdiningType"
                        value={values.inRoomdiningType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("inRoomdiningType", value.value)
                        }
                        options={RoomInRoomDining.map((RoomInRoomDining) => ({
                          label: RoomInRoomDining,
                          value: RoomInRoomDining,
                        }))}
                        placeholder="In-Room Dining Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.inRoomdining ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="inRoomdiningStarred"
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
                          name="laundryService"
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
                        values.laundryService ? (
                          <span className={classes.labelfilled}>
                            Laundry Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Laundry Service
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.laundryService ? (
                      <Field
                        name="laundryServiceType"
                        value={values.laundryServiceType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("laundryServiceType", value.value)
                        }
                        placeholder="Laundry Service Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.laundryService ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="laundryServiceStarred"
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
                          name="roomService"
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
                        values.roomService ? (
                          <span className={classes.labelfilled}>
                            Room Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Room Service
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.roomService ? (
                      <Field
                        name="roomServiceType"
                        value={values.roomServiceType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("roomServiceType", value.value)
                        }
                        options={RoomRoomService.map((RoomRoomService) => ({
                          label: RoomRoomService,
                          value: RoomRoomService,
                        }))}
                        placeholder="Room Service Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.roomService ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="roomServiceStarred"
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
                          name="wifi"
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
                        values.wifi ? (
                          <span className={classes.labelfilled}>Wifi</span>
                        ) : (
                          <span className={classes.labeloutlined}>Wifi</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.wifi ? (
                      <Field
                        name="wifiType"
                        value={values.wifiType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("wifiType", value.value)
                        }
                        placeholder="WifiType"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.wifi ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="wifiStarred"
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
                          name="sanitizers"
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
                        component={MultiSelect}
                        options={RoomSanitizers.map((RoomSanitizers) => ({
                          label: RoomSanitizers,
                          value: RoomSanitizers,
                        }))}
                        placeholder="Sanitizers Type"
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
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="balcony"
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
                        values.balcony ? (
                          <span className={classes.labelfilled}>Balcony</span>
                        ) : (
                          <span className={classes.labeloutlined}>Balcony</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.balcony ? (
                      <Field
                        name="balconyType"
                        value={values.balconyType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("balconyType", value.value)
                        }
                        placeholder="Balcony Type"
                        options={RoomBalcony.map(
                          (RoomOtherFacilitiesBalcony) => ({
                            label: RoomOtherFacilitiesBalcony,
                            value: RoomOtherFacilitiesBalcony,
                          })
                        )}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.balcony ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="balconyStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="jacuzzi"
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
                        values.jacuzzi ? (
                          <span className={classes.labelfilled}>Jacuzzi</span>
                        ) : (
                          <span className={classes.labeloutlined}>Jacuzzi</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.jacuzzi ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="jacuzziStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="privatePool"
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
                        values.privatePool ? (
                          <span className={classes.labelfilled}>
                            Private Pool
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Private Pool
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.privatePool ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="privatePoolStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="terrace"
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
                        values.terrace ? (
                          <span className={classes.labelfilled}>Terrace</span>
                        ) : (
                          <span className={classes.labeloutlined}>Terrace</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.terrace ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="terraceStarred"
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
                          name="interconnectedRoom"
                          color="primary"
                        />
                      }
                      label={
                        values.interconnectedRoom ? (
                          <span className={classes.labelfilled}>
                            Interconnected Room
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Interconnected Room
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.interconnectedRoom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="interconnectedRoomStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="ironIroningBoard"
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
                        values.ironIroningBoard ? (
                          <span className={classes.labelfilled}>
                            Iron-Ironing Board
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Iron-Ironing Board
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.ironIroningBoard ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="ironIroningBoardStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="mineralWater"
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
                        values.mineralWater ? (
                          <span className={classes.labelfilled}>
                            Mineral Water
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Mineral Water
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.mineralWater ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="mineralWaterStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="smokingRoom"
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
                        values.smokingRoom ? (
                          <span className={classes.labelfilled}>
                            Smoking Room
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Smoking Room
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.smokingRoom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="smokingRoomStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="electricKettle"
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
                        values.electricKettle ? (
                          <span className={classes.labelfilled}>
                            Electric Kettle
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Electric Kettle
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.electricKettle ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="electricKettleStarred"
                            as={Switch}
                            type="checkbox"
                            color="primary"
                          />
                        }
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="airPurifier"
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
                        values.airPurifier ? (
                          <span className={classes.labelfilled}>
                            Air Purifier
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Air Purifier
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.airPurifier ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="airPurifierStarred"
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
