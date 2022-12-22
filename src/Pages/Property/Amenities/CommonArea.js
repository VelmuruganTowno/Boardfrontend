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
import { useDispatch, useSelector } from "react-redux";
import {
  fireplaceInitial,
  loungesInitial,
  jacuzziInitial,
  shoppingInitial,
  childrensplayareaInitial,
  conferenceareaInitial,
  templeInitial,
  outdoorFurnitureInitial,
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
  caretaker: false,
  caretakerStarred: false,
  lawn: false,
  lawnStarred: false,
  fireplace: false,
  fireplaceType: "",
  fireplaceStarred: false,
  lounge: false,
  loungeType: "",
  loungeStarred: false,
  jacuzzi: false,
  jacuzziType: "",
  jacuzziStarred: false,
  seatingArea: false,
  seatingAreaStarred: false,
  templeChapelPrayerRoom: false,
  templeChapelPrayerRoomType: "",
  templeChapelPrayerRoomStarred: false,
  verandah: false,
  verandahStarred: false,
  livingRoom: false,
  livingRoomStarred: false,
  outdoorFurniture: false,
  outdoorFurnitureType: "",
  outdoorFurnitureStarred: false,
  conferenceArea: false,
  conferenceAreaType: "",
  conferenceAreaStarred: false,
  petPlayArea: false,
  petPlayAreaStarred: false,
  atm: false,
  atmStarred: false,
  shopping: false,
  shoppingType: "",
  shoppingStarred: false,
  childrenPlayArea: false,
  childrenPlayAreaType: "",
  childrenPlayAreaStarred: false,
};

export default function CommonArea() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [common, setCommon] = useState("");
  const [commonStarred, setCommonStarred] = useState("");
  const dispatch = useDispatch();
  const firePlaceLists = useSelector(
    (state) => state.firePlaceList.firePlaceLists
  );
  const loungesLists = useSelector((state) => state.loungesList.loungesLists);
  const jacuzziLists = useSelector((state) => state.jacuzziList.jacuzziLists);
  const conferenceareaLists = useSelector(
    (state) => state.conferenceareaList.conferenceareaLists
  );
  const shoppingLists = useSelector(
    (state) => state.shoppingList.shoppingLists
  );
  const childrenplayareaLists = useSelector(
    (state) => state.childrenplayareaList.childrenplayareaLists
  );
  const templeLists = useSelector((state) => state.templeList.templeLists);
  const outdoorFurnitureLists = useSelector(
    (state) => state.outdoorFurnitureList.outdoorFurnitureLists
  );

  useEffect(() => {
    dispatch(fireplaceInitial());
    dispatch(loungesInitial());
    dispatch(jacuzziInitial());
    dispatch(shoppingInitial());
    dispatch(childrensplayareaInitial());
    dispatch(conferenceareaInitial());
    dispatch(templeInitial());
    dispatch(outdoorFurnitureInitial());
  }, [dispatch]);

  const starredGet = () => {
    Api.post("AmenitiesCommonAreaStarredvalue", data)
      .then((res) => {
        setCommonStarred(res.data);
      });
  };
  const commonGet = () => {
    Api.post("amenitiescommonareavalue", data).then((res) => {
      const loungeres = res.data.loungeType;
      const playres = res.data.childrenPlayAreaType;
      const shop = res.data.shoppingType;
      const out = res.data.outdoorFurnitureType;
      const temple = res.data.templeChapelPrayerRoomType;
      const confer = res.data.conferenceAreaType;
      var i = 0;

      if (confer != "" && confer != null && confer != undefined) {
        const confer1 = confer.split(",");
        const confer2 = [];

        confer1.forEach((element) => {
          confer2[i++] = { label: element, value: element };
        });
        res.data.conferenceAreaType = confer2;
      }
      if (temple != "" && temple != null && temple != undefined) {
        const temple1 = temple.split(",");
        const temple2 = [];

        temple1.forEach((element) => {
          temple2[i++] = { label: element, value: element };
        });
        res.data.templeChapelPrayerRoomType = temple2;
      }

      if (out != "" && out != null && out != undefined) {
        const out1 = out.split(",");
        const out2 = [];

        out1.forEach((element) => {
          out2[i++] = { label: element, value: element };
        });
        res.data.outdoorFurnitureType = out2;
      }

      if (shop != "" && shop != null && shop != undefined) {
        const shop1 = shop.split(",");
        const shop2 = [];

        shop1.forEach((element) => {
          shop2[i++] = { label: element, value: element };
        });
        res.data.shoppingType = shop2;
      }

      if (loungeres != "" && loungeres != null && loungeres != undefined) {
        const lounge1 = loungeres.split(",");
        const lounge2 = [];

        lounge1.forEach((element) => {
          lounge2[i++] = { label: element, value: element };
        });
        res.data.loungeType = lounge2;
      }
      if (playres != "" && playres != null && playres != undefined) {
        const play1 = playres.split(",");
        const play2 = [];

        play1.forEach((element) => {
          play2[i++] = { label: element, value: element };
        });
        res.data.childrenPlayAreaType = play2;
      }

      setCommon(res.data);
    });
  };
  useEffect(() => {
    commonGet();
    starredGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var Data = { ...common, ...commonStarred };

  function onSubmit(fields, { setStatus }) {
    const id = common.id;
    setStatus();
    const loung = [];
    const play = [];
    const Shop = [];
    const Conference = [];
    const Temple = [];
    const Outdoor = [];

    if (
      fields.fireplaceType == "" ||
      fields.fireplaceType == null ||
      fields.fireplaceType == undefined
    ) {
      fields.fireplaceType = "";
    }

    if (
      fields.conferenceAreaType != "" &&
      fields.conferenceAreaType != null &&
      fields.conferenceAreaType != undefined
    ) {
      fields.conferenceAreaType.map((ele) => Conference.push(ele.value));
      fields.conferenceAreaType = Conference.toString();
    } else {
      fields.conferenceAreaType = "";
    }

    if (
      fields.templeChapelPrayerRoomType != "" &&
      fields.templeChapelPrayerRoomType != null &&
      fields.templeChapelPrayerRoomType != undefined
    ) {
      fields.templeChapelPrayerRoomType.map((ele) => Temple.push(ele.value));
      fields.templeChapelPrayerRoomType = Temple.toString();
    } else {
      fields.templeChapelPrayerRoomType = "";
    }

    if (
      fields.outdoorFurnitureType != "" &&
      fields.outdoorFurnitureType != null &&
      fields.outdoorFurnitureType != undefined
    ) {
      fields.outdoorFurnitureType.map((ele) => Outdoor.push(ele.value));
      fields.outdoorFurnitureType = Outdoor.toString();
    } else {
      fields.outdoorFurnitureType = "";
    }

    if (
      fields.shoppingType != "" &&
      fields.shoppingType != null &&
      fields.shoppingType != undefined
    ) {
      fields.shoppingType.map((ele) => Shop.push(ele.value));
      fields.shoppingType = Shop.toString();
    } else {
      fields.shoppingType = "";
    }

    if (
      fields.loungeType != "" &&
      fields.loungeType != null &&
      fields.loungeType != undefined
    ) {
      fields.loungeType.map((ele) => loung.push(ele.value));
      fields.loungeType = loung.toString();
    } else {
      fields.loungeType = "";
    }
    if (
      fields.childrenPlayAreaType != "" &&
      fields.childrenPlayAreaType != null &&
      fields.childrenPlayAreaType != undefined
    ) {
      fields.childrenPlayAreaType.map((ele) => play.push(ele.value));
      fields.childrenPlayAreaType = play.toString();
    } else {
      fields.childrenPlayAreaType = "";
    }

    if (fields.caretaker == false) {
      fields.caretakerStarred = false;
    }
    if (fields.lawn == false) {
      fields.lawnStarred = false;
    }

    if (fields.fireplace == false) {
      fields.fireplaceType = "";
      fields.fireplaceStarred = false;
    }

    if (fields.lounge == false) {
      fields.loungeType = "";
      fields.loungeStarred = false;
    }

    if (fields.jacuzzi == false) {
      fields.jacuzziType = "";
      fields.jacuzziStarred = false;
    }

    if (fields.seatingArea == false) {
      fields.seatingAreaStarred = false;
    }

    if (fields.templeChapelPrayerRoom == false) {
      fields.templeChapelPrayerRoomType = "";
      fields.templeChapelPrayerRoomStarred = false;
    }

    if (fields.verandah == false) {
      fields.verandahStarred = false;
    }
    if (fields.livingRoom == false) {
      fields.livingRoomStarred = false;
    }

    if (fields.outdoorFurniture == false) {
      fields.outdoorFurnitureType = "";
      fields.outdoorFurnitureStarred = false;
    }
    if (fields.conferenceArea == false) {
      fields.conferenceAreaType = "";
      fields.conferenceAreaStarred = false;
    }

    if (fields.petPlayArea == false) {
      fields.petPlayAreaStarred = "";
    }

    if (fields.atm == false) {
      fields.atmStarred = false;
    }

    if (fields.shopping == false) {
      fields.shoppingType = "";
      fields.shoppingStarred = false;
    }
    if (fields.childrenPlayArea == false) {
      fields.childrenPlayAreaType = "";
      fields.childrenPlayAreaStarred = false;
    }

    if (id) {
      updateCommon(fields);
      updateStarred(fields);
    } else {
      createCommon(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesCommonAreaStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesCommonAreaStarredupdate", fields);
  }

  function createCommon(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("amenitiescommonarea", newData).then((res) => {
      if (res) {
        toast.success("Successfully Created");
        history.push("/addproperty/amenities/foodDrink");
        setLoading(false);
      }
    });
  }

  function updateCommon(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("amenitiescommonareaupdate", fields).then((res) => {
      if (res) {
        toast.success("Successfully Updated");
        history.push("/addproperty/amenities/foodDrink");
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
                    <p className={classes.title}>Common Area</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
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
                          name="fireplace"
                          color="primary"
                        />
                      }
                      label={
                        values.fireplace ? (
                          <span className={classes.labelfilled}>
                            Fire Place
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Fire Place
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.fireplace ? (
                      <Field
                        name="fireplaceType"
                        value={values.fireplaceType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("fireplaceType", value.value)
                        }
                        options={firePlaceLists.map((fireplace) => ({
                          label: fireplace,
                          value: fireplace,
                        }))}
                        placeholder="Fire Place"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.fireplace ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="fireplaceStarred"
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
                          name="lounge"
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
                        values.lounge ? (
                          <span className={classes.labelfilled}>Lounge</span>
                        ) : (
                          <span className={classes.labeloutlined}>Lounge</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.lounge ? (
                      <Field
                        name="loungeType"
                        component={MultiSelect}
                        options={loungesLists.map((lounge) => ({
                          label: lounge,
                          value: lounge,
                        }))}
                        placeholder="Lounge"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.lounge ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="loungeStarred"
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
                          name="jacuzzi"
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          color="primary"
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
                  <Grid item sm={8}>
                    {values.jacuzzi ? (
                      <Field
                        name="jacuzziType"
                        value={values.jacuzziType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("jacuzziType", value.value)
                        }
                        options={jacuzziLists.map((jacuzzi) => ({
                          label: jacuzzi,
                          value: jacuzzi,
                        }))}
                        placeholder="Jacuzzi"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.jacuzzi ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="jacuzziStarred"
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
                          name="templeChapelPrayerRoom"
                          color="primary"
                        />
                      }
                      label={
                        values.templeChapelPrayerRoom ? (
                          <span className={classes.labelfilled}>
                            Prayer Room
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Prayer Room
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.templeChapelPrayerRoom ? (
                      <Field
                        name="templeChapelPrayerRoomType"
                        component={MultiSelect}
                        options={templeLists.map((lounge) => ({
                          label: lounge,
                          value: lounge,
                        }))}
                        label="PrayerRoom"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.templeChapelPrayerRoom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="templeChapelPrayerRoomStarred"
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
                          name="outdoorFurniture"
                          color="primary"
                        />
                      }
                      label={
                        values.outdoorFurniture ? (
                          <span className={classes.labelfilled}>
                            Outdoor Furniture
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Outdoor Furniture
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.outdoorFurniture ? (
                      <Field
                        name="outdoorFurnitureType"
                        component={MultiSelect}
                        options={outdoorFurnitureLists.map((lounge) => ({
                          label: lounge,
                          value: lounge,
                        }))}
                        label="OutdoorFurniture"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.outdoorFurniture ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="outdoorFurnitureStarred"
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
                          name="conferenceArea"
                          color="primary"
                        />
                      }
                      label={
                        values.conferenceArea ? (
                          <span className={classes.labelfilled}>
                            Banquet Hall
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Banquet Hall
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.conferenceArea ? (
                      <Field
                        name="conferenceAreaType"
                        component={MultiSelect}
                        options={conferenceareaLists.map((lounge) => ({
                          label: lounge,
                          value: lounge,
                        }))}
                        label="Banquet Hall"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.conferenceArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="conferenceAreaStarred"
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
                          name="shopping"
                          color="primary"
                        />
                      }
                      label={
                        values.shopping ? (
                          <span className={classes.labelfilled}>Shopping</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Shopping
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.shopping ? (
                      <Field
                        name="shoppingType"
                        component={MultiSelect}
                        options={shoppingLists.map((lounge) => ({
                          label: lounge,
                          value: lounge,
                        }))}
                        label="Shopping"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.shopping ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="shoppingStarred"
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
                          name="childrenPlayArea"
                          color="primary"
                        />
                      }
                      label={
                        values.childrenPlayArea ? (
                          <span className={classes.labelfilled}>
                            Children Play-Area
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Children Play-Area
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.childrenPlayArea ? (
                      <Field
                        name="childrenPlayAreaType"
                        component={MultiSelect}
                        options={childrenplayareaLists.map((lounge) => ({
                          label: lounge,
                          value: lounge,
                        }))}
                        label="Children Play-Area"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.childrenPlayArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="childrenPlayAreaStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="caretaker"
                          color="primary"
                        />
                      }
                      label={
                        values.caretaker ? (
                          <span className={classes.labelfilled}>Caretaker</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Caretaker
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.caretaker ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="caretakerStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="lawn"
                          color="primary"
                        />
                      }
                      label={
                        values.lawn ? (
                          <span className={classes.labelfilled}>Lawn</span>
                        ) : (
                          <span className={classes.labeloutlined}>Lawn</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.lawn ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="lawnStarred"
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
                          name="seatingArea"
                          color="primary"
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
                          name="verandah"
                          color="primary"
                        />
                      }
                      label={
                        values.verandah ? (
                          <span className={classes.labelfilled}>Verandah</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Verandah
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.verandah ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="verandahStarred"
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
                          name="livingRoom"
                          color="primary"
                        />
                      }
                      label={
                        values.livingRoom ? (
                          <span className={classes.labelfilled}>
                            Living Room
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Living Room
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.livingRoom ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="livingRoomStarred"
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
                          name="petPlayArea"
                          color="primary"
                        />
                      }
                      label={
                        values.petPlayArea ? (
                          <span className={classes.labelfilled}>
                            Pet Play-Area
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Pet Play-Area
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.petPlayArea ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="petPlayAreaStarred"
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
                          name="atm"
                          color="primary"
                        />
                      }
                      label={
                        values.atm ? (
                          <span className={classes.labelfilled}>ATM</span>
                        ) : (
                          <span className={classes.labeloutlined}>ATM</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.atm ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="atmStarred"
                            as={Switch}
                            color="primary"
                            type="checkbox"
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
