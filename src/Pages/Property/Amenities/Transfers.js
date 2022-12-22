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
  airportTransfers: false,
  airportTransfersType: "",
  airportTransfersType1: "",
  airportTransfersStarred: false,
  railwayStationTransfers: false,
  railwayStationTransfersType: "",
  railwayStationTransfersType1: "",
  railwayStationTransfersStarred: false,
  busStationtransfers: false,
  busStationtransfersType: "",
  busStationtransfersType1: "",
  busStationtransfersStarred: false,
  shuttleService: false,
  shuttleServiceType: "",
  shuttleServiceStarred: false,
  privatetrasfer: false,
  privatetrasferType: "",
  privatetrasferStarred: false,
  vehicleRentals: false,
  vehicleRentalsType: "",
  vehicleRentalsType1: "",
  vehicleRentalsStarred: false,
};

export default function Transfers() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [BusStationTransfersType, setBusStationTransfersType] = useState([]);
  const [RailwayStationTransfersType, setRailwayStationTransfersType] =
    useState([]);
  const [AirportTransfersType, setAirportTransfersType] = useState([]);
  const [transfer, setTransfer] = useState("");
  const [transferStarred, setTransferStarred] = useState("");
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(false);

  const vehicles = async () => {
    const vehicleData = {
      type: "Vehicle Rentals",
    };
    await Api.post( "productdropdownonly", vehicleData)
      .then((response) => {
        setVehicle(response.data);
      });
  };

  const BusGet = async () => {
    const busData = {
      type: "Bus Station Transfers Type",
    };
    await Api.post( "productdropdownonly", busData)
      .then((response) => {
        setBusStationTransfersType(response.data);
      });
  };
  const RailGet = async () => {
    const railData = {
      type: "Railway Station Transfers Type",
    };
    await Api.post( "productdropdownonly", railData)
      .then((response) => {
        setRailwayStationTransfersType(response.data);
      });
  };
  const AirGet = async () => {
    const airData = {
      type: "Airport Transfers Type",
    };
    await Api.post( "productdropdownonly", airData)
      .then((response) => {
        setAirportTransfersType(response.data);
      });
  };
  useEffect(() => {
    AirGet();
    BusGet();
    RailGet();
    vehicles();
  }, []);

  const TransferGet = () => {
    Api.post( "AmenitiesTransfersvalue", data).then((res) => {
      const airres = res.data.airportTransfersType1;
      const railres = res.data.railwayStationTransfersType1;
      const busres = res.data.busStationtransfersType1;
      const vehicleres = res.data.vehicleRentalsType1;
      var i = 0;
      if (vehicleres != "" && vehicleres != null && vehicleres != undefined) {
        const vehicle1 = vehicleres.split(",");
        const vehicle2 = [];

        vehicle1.forEach((element) => {
          vehicle2[i++] = { label: element, value: element };
        });
        res.data.vehicleRentalsType1 = vehicle2;
      }
      if (airres != "" && airres != null && airres != undefined) {
        const air1 = airres.split(",");
        const air2 = [];

        air1.forEach((element) => {
          air2[i++] = { label: element, value: element };
        });
        res.data.airportTransfersType1 = air2;
      }
      if (railres != "" && railres != null && railres != undefined) {
        const rail1 = railres.split(",");
        const rail2 = [];

        rail1.forEach((element) => {
          rail2[i++] = { label: element, value: element };
        });
        res.data.railwayStationTransfersType1 = rail2;
      }
      if (busres != "" && busres != null && busres != undefined) {
        const bus1 = busres.split(",");
        const bus2 = [];

        bus1.forEach((element) => {
          bus2[i++] = { label: element, value: element };
        });
        res.data.busStationtransfersType1 = bus2;
      }
      setTransfer(res.data);
    });
  };
  const starredGet = () => {
    Api.post( "AmenitiesTransfersStarredvalue", data).then((res) => {
      setTransferStarred(res.data);
    });
  };

  useEffect(() => {
    TransferGet();
    starredGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var Data = { ...transfer, ...transferStarred };

  function onSubmit(fields, { setStatus }) {
    const id = transfer.id;
    const air = [];
    const rail = [];
    const bus = [];
    const vehicle = [];

    if (
      fields.vehicleRentalsType1 != "" &&
      fields.vehicleRentalsType1 != null &&
      fields.vehicleRentalsType1 != undefined
    ) {
      fields.vehicleRentalsType1.map((ele) => vehicle.push(ele.value));
      fields.vehicleRentalsType1 = vehicle.toString();
    } else {
      fields.vehicleRentalsType1 = "";
    }
    if (
      fields.airportTransfersType1 != "" &&
      fields.airportTransfersType1 != null &&
      fields.airportTransfersType1 != undefined
    ) {
      fields.airportTransfersType1.map((ele) => air.push(ele.value));
      fields.airportTransfersType1 = air.toString();
    } else {
      fields.airportTransfersType1 = "";
    }
    if (
      fields.railwayStationTransfersType1 != "" &&
      fields.railwayStationTransfersType1 != null &&
      fields.railwayStationTransfersType1 != undefined
    ) {
      fields.railwayStationTransfersType1.map((ele) => rail.push(ele.value));
      fields.railwayStationTransfersType1 = rail.toString();
    } else {
      fields.railwayStationTransfersType1 = "";
    }
    if (
      fields.busStationtransfersType1 != "" &&
      fields.busStationtransfersType1 != null &&
      fields.busStationtransfersType1 != undefined
    ) {
      fields.busStationtransfersType1.map((ele) => bus.push(ele.value));
      fields.busStationtransfersType1 = bus.toString();
    } else {
      fields.busStationtransfersType1 = "";
    }

    if (fields.airportTransfers == false) {
      fields.airportTransfersType = "";
      fields.airportTransfersType1 = "";
      fields.airportTransfersStarred = false;
    }

    if (fields.railwayStationTransfers == false) {
      fields.railwayStationTransfersType = "";
      fields.railwayStationTransfersType1 = "";
      fields.railwayStationTransfersStarred = false;
    }

    if (fields.busStationtransfers == false) {
      fields.busStationtransfersType = "";
      fields.busStationtransfersType1 = "";
      fields.busStationtransfersStarred = false;
    }
    if (fields.shuttleService == false) {
      fields.shuttleServiceType = "";
      fields.shuttleServiceStarred = false;
    }
    if (fields.privatetrasfer == false) {
      fields.privatetrasferType = "";
      fields.privatetrasferStarred = false;
    }

    if (fields.vehicleRentals == false) {
      fields.vehicleRentalsType = "";
      fields.vehicleRentalsType1 = "";
      fields.vehicleRentalsStarred = false;
    }
    setStatus();
    if (id) {
      updateTransfer(fields);
      updateStarred(fields);
    } else {
      createTransfer(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    const CreateData = {
      privatetrasferStarred: fields.privatetrasferStarred,
      airportTransfersStarred: fields.airportTransfersStarred,
      shuttleServiceStarred: fields.shuttleServiceStarred,
      busStationtransfersStarred: fields.busStationtransfersStarred,
      railwayStationTransfersStarred: fields.railwayStationTransfersStarred,
    };
    var newData = { ...data, ...CreateData, ...create };
    Api.post( "AmenitiesTransfersStarred", newData);
  }
  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put( "AmenitiesTransfersStarredupdate", fields);
  }

  function createTransfer(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post( "AmenitiesTransfers", newData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Created");
          history.push("/addproperty/amenities/paymentService");
          setLoading(false);
        }
      });
  }

  function updateTransfer(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put( "AmenitiesTransfersupdate", fields, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Updated");
          history.push("/addproperty/amenities/paymentService");
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
                    <p className={classes.title}>Transfer</p>
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
                          name="airportTransfers"
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.airportTransfers ? (
                          <span className={classes.labelfilled}>
                            Airport Transfer
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Airport Transfer
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.airportTransfers ? (
                      <Field
                        name="airportTransfersType"
                        value={values.airportTransfersType}
                        component={SelectFields}
                        className={classes.select}
                        onChange={(value) =>
                          setFieldValue("airportTransfersType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Airport Transfer"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.airportTransfers ? (
                      <>
                        {values.airportTransfersType === "paid" ? (
                          <Field
                            name="airportTransfersType1"
                            component={MultiSelect}
                            options={AirportTransfersType.map((air) => ({
                              label: air,
                              value: air,
                            }))}
                            placeholder="Airport Transfer"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.airportTransfers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="airportTransfersStarred"
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
                          name="railwayStationTransfers"
                          color="primary"
                        />
                      }
                      label={
                        values.railwayStationTransfers ? (
                          <span className={classes.labelfilled}>
                            Railway Station Transfer
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Railway Station Transfer
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.railwayStationTransfers ? (
                      <Field
                        name="railwayStationTransfersType"
                        value={values.railwayStationTransfersType}
                        className={classes.select}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue(
                            "railwayStationTransfersType",
                            value.value
                          )
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Railway Station Transfer"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.railwayStationTransfers ? (
                      <>
                        {values.railwayStationTransfersType === "paid" ? (
                          <Field
                            name="railwayStationTransfersType1"
                            component={MultiSelect}
                            options={RailwayStationTransfersType.map(
                              (rail) => ({
                                label: rail,
                                value: rail,
                              })
                            )}
                            placeholder="Railway Station Transfer"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.railwayStationTransfers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="railwayStationTransfersStarred"
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
                          name="busStationtransfers"
                          color="primary"
                        />
                      }
                      label={
                        values.busStationtransfers ? (
                          <span className={classes.labelfilled}>
                            Bus Stand Transfer
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bus Stand Transfer
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.busStationtransfers ? (
                      <Field
                        name="busStationtransfersType"
                        value={values.busStationtransfersType}
                        component={SelectFields}
                        className={classes.select}
                        onChange={(value) =>
                          setFieldValue("busStationtransfersType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Bus Stand Transfer"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.busStationtransfers ? (
                      <>
                        {values.busStationtransfersType === "paid" ? (
                          <Field
                            name="busStationtransfersType1"
                            component={MultiSelect}
                            options={BusStationTransfersType.map((bus) => ({
                              label: bus,
                              value: bus,
                            }))}
                            placeholder="Bus Stand Transfer"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.busStationtransfers ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="busStationtransfersStarred"
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
                          name="shuttleService"
                          color="primary"
                        />
                      }
                      label={
                        values.shuttleService ? (
                          <span className={classes.labelfilled}>
                            Shuttle Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Shuttle Service
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.shuttleService ? (
                      <Field
                        name="shuttleServiceType"
                        value={values.shuttleServiceType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("shuttleServiceType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Shuttle Service"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.shuttleService ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="shuttleServiceStarred"
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
                          name="privatetrasfer"
                          color="primary"
                        />
                      }
                      label={
                        values.privatetrasfer ? (
                          <span className={classes.labelfilled}>
                            Private Transfer
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Private Transfer
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.privatetrasfer ? (
                      <Field
                        name="privatetrasferType"
                        value={values.privatetrasferType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("privatetrasferType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Private Transfer"
                      />
                    ) : null}
                  </Grid>

                  <Grid item sm={1}>
                    {values.privatetrasfer ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="privatetrasferStarred"
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
                          name="vehicleRentals"
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.vehicleRentals ? (
                          <span className={classes.labelfilled}>
                            Vehicle Rentals
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Vehicle Rentals
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.vehicleRentals ? (
                      <Field
                        name="vehicleRentalsType"
                        value={values.vehicleRentalsType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("vehicleRentalsType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="vehicle Rentals"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.vehicleRentals ? (
                      <>
                        {values.vehicleRentalsType === "paid" ? (
                          <Field
                            name="vehicleRentalsType1"
                            component={MultiSelect}
                            options={vehicle.map((veh) => ({
                              label: veh,
                              value: veh,
                            }))}
                            placeholder="Vehicle"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.vehicleRentals ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="vehicleRentalsStarred"
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
