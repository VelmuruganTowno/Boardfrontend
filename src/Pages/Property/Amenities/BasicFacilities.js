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
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";
import axios from "axios";
import {  useHistory } from "react-router-dom";
import SelectFields from "../../../components/Select/SelectFields";
import MultiSelect from "../../../components/Select/MultiSelect";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  ParkingInitial,
  laundryInitial,
  swimmingPoolInitial,
  smokeDetectorInitial,
  roomServiceInitial,
  kitchenInitial,
  interComInitial,
  airConditioningInitial,
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
  button: {
    margin: "20px 0px",
  },
  grid: {
    margin: "4px",
  },
  select: {
    width: "250px",
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
  airconditioning: false,
  airconditioningType: "",
  airconditioningStarred: false,
  bathroom: false,
  bathroomType: "",
  bathroomStarred: false,
  laundry: false,
  laundryType: "",
  laundryStarred: false,
  housekeeping: false,
  housekeepingStarred: false,
  intercom: false,
  intercomType: "",
  intercomStarred: false,
  kitchen: false,
  kitchenType: "",
  kitchenStarred: false,
  parking: false,
  parkingType: "",
  parkingType1: "",
  parkingStarred: false,
  powerbackup: false,
  powerbackupStarred: false,
  refrigeratorminibar: false,
  refrigeratorminibarType: "",
  refrigeratorminibarStarred: false,
  roomservice: false,
  roomserviceType: "",
  roomserviceStarred: false,
  smokedetector: false,
  smokedetectorType: "",
  smokedetectorStarred: false,
  swimmingPool: false,
  swimmingPoolType: "",
  swimmingPoolStarred: false,
  smokingrooms: false,
  smokingRoomsStarred: false,
  publicrestrooms: false,
  publicrestroomsStarred: false,
  laundromat: false,
  laundromatStarred: false,
};

export default function BasicFacilities() {
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);
  var propertyId = sessionStorage.getItem("propertyId");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const history = useHistory();
  const data = { propertyId: propertyId };
  const [basicFacilite, setBasicFacilite] = useState("");
  const [basicFaciliteStarred, setBasicFaciliteStarred] = useState("");
  const dispatch = useDispatch();
  const kitchenLists = useSelector((state) => state.kitchenList.kitchenLists);
  const airConditionLists = useSelector(
    (state) => state.airConditionList.airConditionLists
  );
  const roomServiceLists = useSelector(
    (state) => state.roomServiceList.roomServiceLists
  );
  const smokeDetectorLists = useSelector(
    (state) => state.smokeDetectorList.smokeDetectorLists
  );
  const swimmingpoolLists = useSelector(
    (state) => state.swimmingpoolList.swimmingpoolLists
  );
  const interComLists = useSelector(
    (state) => state.interComList.interComLists
  );
  const laundryLists = useSelector((state) => state.laundryList.laundryLists);
  const parkingLists = useSelector((state) => state.parkingList.parkingLists);

  useEffect(() => {
    dispatch(ParkingInitial());
    dispatch(laundryInitial());
    dispatch(swimmingPoolInitial());
    dispatch(smokeDetectorInitial());
    dispatch(roomServiceInitial());
    dispatch(kitchenInitial());
    dispatch(airConditioningInitial());
    dispatch(interComInitial());
  }, [dispatch]);

  const BasicGet = () => {
    Api.post("amenitiesbasicfacilitiesvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const kitchenres = res.data.kitchenType;
        const smokeres = res.data.smokedetectorType;
        const swimmingres = res.data.swimmingPoolType;
        const interres = res.data.intercomType;
        const lanres = res.data.laundryType;
        var i = 0;

        if (kitchenres != "" && kitchenres != null && kitchenres != undefined) {
          const typekitchen1 = kitchenres.split(",");
          const typekitchen2 = [];

          typekitchen1.forEach((element) => {
            typekitchen2[i++] = { label: element, value: element };
          });
          res.data.kitchenType = typekitchen2;
        }

        if (smokeres != "" && smokeres != null && smokeres != undefined) {
          const smoke1 = smokeres.split(",");
          const smoke2 = [];

          smoke1.forEach((element) => {
            smoke2[i++] = { label: element, value: element };
          });
          res.data.smokedetectorType = smoke2;
        }
        if (
          swimmingres != "" &&
          swimmingres != null &&
          swimmingres != undefined
        ) {
          const swimming1 = swimmingres.split(",");
          const swimming2 = [];

          swimming1.forEach((element) => {
            swimming2[i++] = { label: element, value: element };
          });
          res.data.swimmingPoolType = swimming2;
        }

        if (interres != "" && interres != null && interres != undefined) {
          const typeInter1 = interres.split(",");
          const typeInter2 = [];

          typeInter1.forEach((element) => {
            typeInter2[i++] = { label: element, value: element };
          });
          res.data.intercomType = typeInter2;
        }
        if (lanres != "" && lanres != null && lanres != undefined) {
          const typeLan1 = lanres.split(",");
          const typeLan2 = [];

          typeLan1.forEach((element) => {
            typeLan2[i++] = { label: element, value: element };
          });
          res.data.laundryType = typeLan2;
        }
        setBasicFacilite(res.data);
      });
  };

  const starredGet = () => {
    Api.post("amenitiesbasicfacilitiesstarredvalue", data)
      .then((res) => {
        setBasicFaciliteStarred(res.data);
      });
  };

  var Data = { ...basicFacilite, ...basicFaciliteStarred };

  useEffect(() => {
    BasicGet();
    starredGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = basicFacilite.id;
    setStatus();
    if (fields.airconditioning == false) {
      fields.airconditioningType = "";
      fields.airconditioningStarred = false;
    }
    if (fields.bathroom == false) {
      fields.bathroomType = "";
      fields.bathroomStarred = false;
    }
    if (fields.laundry == false) {
      fields.laundryType = "";
      fields.laundryStarred = false;
    }

    if (fields.laundry == false) {
      fields.laundryType = "";
      fields.laundryStarred = false;
    }

    if (fields.housekeeping == false) {
      fields.housekeepingStarred = false;
    }

    if (fields.intercom == false) {
      fields.intercomType = "";
      fields.intercomStarred = false;
    }

    if (fields.kitchen == false) {
      fields.kitchenType = "";
      fields.kitchenStarred = false;
    }

    if (fields.parking == false) {
      fields.parkingType = "";
      fields.parkingType1 = "";
      fields.parkingStarred = false;
    }

    if (fields.powerbackup == false) {
      fields.powerbackupStarred = false;
    }
    if (fields.refrigeratorminibar == false) {
      fields.refrigeratorminibar = "";
      fields.refrigeratorminibarType = "";
      fields.refrigeratorminibarStarred = false;
    }

    if (fields.roomservice == false) {
      fields.roomserviceType = "";
      fields.roomserviceStarred = false;
    }
    if (fields.smokedetector == false) {
      fields.smokedetectorType = "";
      fields.smokedetectorStarred = false;
    }
    if (fields.swimmingPool == false) {
      fields.swimmingPoolType = "";
      fields.swimmingPoolStarred = false;
    }
    if (fields.smokingrooms == false) {
      fields.smokingRoomsStarred = false;
    }
    if (fields.publicrestrooms == false) {
      fields.publicrestroomsStarred = false;
    }
    if (fields.laundromat == false) {
      fields.laundromatStarred = false;
    }
    const kit = [];
    const smoke = [];
    const swimming = [];
    const inter = [];
    const lan = [];
    if (
      fields.kitchenType != "" &&
      fields.kitchenType != null &&
      fields.kitchenType != undefined
    ) {
      fields.kitchenType.map((ele) => kit.push(ele.value));
      fields.kitchenType = kit.toString();
    } else {
      fields.kitchenType = "";
    }
    if (
      fields.smokedetectorType != "" &&
      fields.smokedetectorType != null &&
      fields.smokedetectorType != undefined
    ) {
      fields.smokedetectorType.map((ele) => smoke.push(ele.value));
      fields.smokedetectorType = smoke.toString();
    } else {
      fields.smokedetectorType = "";
    }
    if (
      fields.swimmingPoolType != "" &&
      fields.swimmingPoolType != null &&
      fields.swimmingPoolType != undefined
    ) {
      fields.swimmingPoolType.map((ele) => swimming.push(ele.value));
      fields.swimmingPoolType = swimming.toString();
    } else {
      fields.swimmingPoolType = "";
    }
    if (
      fields.intercomType != "" &&
      fields.intercomType != null &&
      fields.intercomType != undefined
    ) {
      fields.intercomType.map((ele) => inter.push(ele.value));
      fields.intercomType = inter.toString();
    } else {
      fields.intercomType = "";
    }
    if (
      fields.laundryType != "" &&
      fields.laundryType != null &&
      fields.laundryType != undefined
    ) {
      fields.laundryType.map((ele) => lan.push(ele.value));
      fields.laundryType = lan.toString();
    } else {
      fields.laundryType = "";
    }

    if (id) {
      updateBasicFacilite(fields);
    } else {
      createBasicFacilite(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("amenitiesbasicfacilitiesstarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("amenitiesbasicfacilitiesstarredupdate", fields);
  }

  function createBasicFacilite(fields) {
    setLoading(true);
    var newData = { ...fields, ...data, ...create };
    Api.post("amenitiesbasicfacilities", newData).then((res) => {
      if (res) {
        createStarred(fields);
        toast.success("Successfully Created");
        history.push(`/addproperty/amenities/generalService`);
        setLoading(false);
      }
    });
  }

  function updateBasicFacilite(fields) {
    fields.updateBy = createdBy;
    setLoading(true);
    Api
      .put("amenitiesbasicfacilitiesupdate", fields)
      .then((res) => {
        if (res) {
          updateStarred(fields);
          toast.success("Successfully Updated");
          history.push(`/addproperty/amenities/generalService`);
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
                    <p className={classes.title}>Basic Facilities</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="airconditioning"
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
                        values.airconditioning ? (
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
                    {values.airconditioning ? (
                      <Field
                        name="airconditioningType"
                        value={values.airconditioningType || ""}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("airconditioningType", value.value)
                        }
                        options={airConditionLists.map((air) => ({
                          label: air,
                          value: air,
                        }))}
                        placeholder="Airconditioning"
                      />
                      
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.airconditioning ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="airconditioningStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="bathroom"
                          color="primary"
                        />
                      }
                      label={
                        values.bathroom ? (
                          <span className={classes.labelfilled}>Bathroom</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Bathroom
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.bathroom ? (
                      <Field
                        component={SelectFields}
                        name="bathroomType"
                        placeholder="Bathroom"
                        onChange={(value) =>
                          setFieldValue("bathroomType", value.value)
                        }
                        value={values.bathroomType || ""}
                        options={[
                          { value: "attached", label: "Attached" },
                          { value: "common", label: "Common" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.bathroom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bathroomStarred"
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
                          name="laundry"
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
                        values.laundry ? (
                          <span className={classes.labelfilled}>Laundry</span>
                        ) : (
                          <span className={classes.labeloutlined}>Laundry</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.laundry ? (
                      <Field
                        name="laundryType"
                        value={values.laundryType || ""}
                        component={MultiSelect}
                        options={laundryLists.map((laundry) => ({
                          label: laundry,
                          value: laundry,
                        }))}
                        placeholder="Laundry"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.laundry ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="laundryStarred"
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
                          name="intercom"
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
                        component={MultiSelect}
                        name="intercomType"
                        options={interComLists.map((kitchen) => ({
                          label: kitchen,
                          value: kitchen,
                        }))}
                        value={values.intercom || ""}
                        placeholder="Intercom"
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
                          name="kitchen"
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
                        values.kitchen ? (
                          <span className={classes.labelfilled}>
                            Kitchen/Kitchenette
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Kitchen/Kitchenette
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.kitchen ? (
                      <Field
                        component={MultiSelect}
                        name="kitchenType"
                        options={kitchenLists.map((kitchen) => ({
                          label: kitchen,
                          value: kitchen,
                        }))}
                        placeholder="Kitchen/Kitchenette"
                        value={values.kitchenType || ""}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.kitchen ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="kitchenStarred"
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
                          name="parking"
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
                        values.parking ? (
                          <span className={classes.labelfilled}>Parking</span>
                        ) : (
                          <span className={classes.labeloutlined}>Parking</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={4}>
                    {values.parking ? (
                      <Field
                        name="parkingType"
                        value={values.parkingType || ""}
                        component={SelectFields}
                        className={classes.select}
                        onChange={(value) =>
                          setFieldValue("parkingType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Parking"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={4}>
                    {values.parking ? (
                      <>
                        {values.parkingType === "paid" ? (
                          <Field
                            name="parkingType1"
                            value={values.parkingType1 || ""}
                            component={SelectFields}
                            onChange={(value) =>
                              setFieldValue("parkingType1", value.value)
                            }
                            options={parkingLists.map((parking) => ({
                              label: parking,
                              value: parking,
                            }))}
                            placeholder="Parking"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.parking ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="parkingStarred"
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
                          name="refrigeratorminibar"
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
                        values.refrigeratorminibar ? (
                          <span className={classes.labelfilled}>
                            Refrigerator/Minibar
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Refrigerator/Minibar
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.refrigeratorminibar ? (
                      <Field
                        name="refrigeratorminibarType"
                        value={values.refrigeratorminibarType || ""}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("refrigeratorminibarType", value.value)
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                        placeholder="Refrigerator/Minibar"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.refrigeratorminibar ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="refrigeratorminibarStarred"
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
                          name="roomservice"
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
                        values.roomservice ? (
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
                    {values.roomservice ? (
                      <Field
                        name="roomserviceType"
                        value={values.roomserviceType || ""}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("roomserviceType", value.value)
                        }
                        options={roomServiceLists.map((roomService) => ({
                          label: roomService,
                          value: roomService,
                        }))}
                        placeholder="Room Service"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.roomservice ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="roomserviceStarred"
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
                          name="smokedetector"
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
                        values.smokedetector ? (
                          <span className={classes.labelfilled}>
                            Smoke Detector
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Smoke Detector
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.smokedetector ? (
                      <Field
                        name="smokedetectorType"
                        component={MultiSelect}
                        options={smokeDetectorLists.map((smokeDetector) => ({
                          label: smokeDetector,
                          value: smokeDetector,
                        }))}
                        placeholder="Smoke Detector"
                        value={values.smokeDetector || ""}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.smokedetector ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="smokedetectorStarred"
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
                          name="swimmingPool"
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
                        values.swimmingPool ? (
                          <span className={classes.labelfilled}>
                            Swimming Pool
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Swimming Pool
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.swimmingPool ? (
                      <Field
                        name="swimmingPoolType"
                        component={MultiSelect}
                        options={swimmingpoolLists.map((swimmingPool) => ({
                          label: swimmingPool,
                          value: swimmingPool,
                        }))}
                        placeholder="Swimming Pool"
                        value={values.swimmingPoolType || ""}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.swimmingPool ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="swimmingPoolStarred"
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
                          name="publicrestrooms"
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
                        values.publicrestrooms ? (
                          <span className={classes.labelfilled}>
                            Public Restrooms
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Public Restrooms
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.publicrestrooms ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="publicrestroomsStarred"
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
                          name="laundromat"
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
                        values.laundromat ? (
                          <span className={classes.labelfilled}>
                            Laundromat
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Laundromat
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.laundromat ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="laundromatStarred"
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
                          name="housekeeping"
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
                  <Grid item sm={5}>
                    <FormControlLabel
                      control={
                        <Field
                          name="powerbackup"
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
                        values.powerbackup ? (
                          <span className={classes.labelfilled}>
                            Power Backup
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Power Backup
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.powerbackup ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="powerbackupStarred"
                            type="checkbox"
                            as={Switch}
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
                          name="smokingrooms"
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
                        values.smokingrooms ? (
                          <span className={classes.labelfilled}>
                            Smoking Rooms
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Smoking Rooms
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.smokingrooms ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="smokingRoomsStarred"
                            type="checkbox"
                            as={Switch}
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
