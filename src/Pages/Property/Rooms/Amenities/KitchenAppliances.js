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
  induction: false,
  inductionStarred: false,
  kitchenette: false,
  kitchenetteStarred: false,
  kitchenetteType: "",
  refrigerator: false,
  refrigeratorStarred: false,
  dishwashing: false,
  dishwashingType: "",
  dishwashingStarred: false,
  glasses: false,
  glassesStarred: false,
  glassesType: "",
  cookingBasics: false,
  cookingBasicsStarred: false,
  cookingBasicsType: "",
  assortedChocolates: false,
  assortedChocolatesType: "",
  assortedChocolatesStarred: false,
  cake: false,
  cakeStarred: false,
  cakeType: "",
  champagne: false,
  champagneType: "",
  champagneStarred: false,
  cookies: false,
  cookiesType: "",
  cookiesStarred: false,
  drinks: false,
  drinksType: "",
  drinksStarred: false,
  fruitBasket: false,
  fruitBasketStarred: false,
  fruitBasketType: "",
  fruitWine: false,
  fruitWineStarred: false,
  fruitWineType: "",
  snackBasket: false,
  snackBasketStarred: false,
  snackBasketType: "",
  sparklingWine: false,
  sparklingWineStarred: false,
  sparklingWineType: "",
  bBQGrill: false,
  bBQGrillType: "",
  bBQGrillStarred: false,
  cookButlerService: false,
  cookButlerServiceStarred: false,
  cookButlerServiceType: "",
  cookiePlatter: false,
  cookiePlatterStarred: false,
  cookiePlatterType: "",
  beer: false,
  beerType: "",
  beerStarred: false,
};
export default function KitchenAppliances(props) {
  const history = useHistory();
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  var propertyId = sessionStorage.getItem("propertyId");
  var displayName = sessionStorage.getItem("displayName");
  const data = { propertyId: propertyId, displayName: displayName };
  const [RoomKitchenKitchenette, setRoomKitchenKitchenette] = useState([]);
  const [RoomKitchenDishwashing, setRoomKitchenDishwashing] = useState([]);
  const [RoomKitchenGlasses, setRoomKitchenGlasses] = useState([]);
  const [RoomKitchenCookingBasics, setRoomKitchenCookingBasics] = useState([]);
  const [kitchen, setKitchen] = useState("");
  const [kitchenStarred, setKitchenStarred] = useState("");
  const Data = { ...kitchen, ...kitchenStarred };
  const [loading, setLoading] = useState(false);

  const RoomKitchenKitchenetteGet = async () => {
    const kitchenetteData = {
      type: "Room Kitchen Kitchenette",
    };
    await Api.post("productdropdownonly", kitchenetteData)
      .then((response) => {
        setRoomKitchenKitchenette(response.data);
      });
  };

  const RoomKitchenDishwashingGet = async () => {
    const dishData = {
      type: "Room Kitchen Dishwashing",
    };
    await Api.post("productdropdownonly", dishData)
      .then((response) => {
        setRoomKitchenDishwashing(response.data);
      });
  };

  const RoomKitchenGlassesGet = async () => {
    const glassData = {
      type: "Room Kitchen Glasses",
    };
    await Api.post("productdropdownonly", glassData)
      .then((response) => {
        setRoomKitchenGlasses(response.data);
      });
  };

  const RoomKitchenCookingBasicsGet = async () => {
    const cookbasicData = {
      type: "Room Kitchen Cooking Basics",
    };
    await Api.post("productdropdownonly", cookbasicData)
      .then((response) => {
        setRoomKitchenCookingBasics(response.data);
      });
  };

  useEffect(() => {
    RoomKitchenKitchenetteGet();
    RoomKitchenDishwashingGet();
    RoomKitchenGlassesGet();
    RoomKitchenCookingBasicsGet();
  }, []);

  const DataGet = () => {
    Api.post("RAmenitiesKitchenFoodvalue", data).then((res) => {
      const cookres = res.data.cookingBasicsType;
      const glassres = res.data.glassesType;
      var i = 0;
      if (glassres != "" && glassres != null && glassres != undefined) {
        const glass1 = glassres.split(",");
        const glass2 = [];

        glass1.forEach((element) => {
          glass2[i++] = { label: element, value: element };
        });
        res.data.glassesType = glass2;
      }
      if (cookres != "" && cookres != null && cookres != undefined) {
        const cook1 = cookres.split(",");
        const cook2 = [];
        cook1.forEach((element) => {
          cook2[i++] = { label: element, value: element };
        });
        res.data.cookingBasicsType = cook2;
      }
      setKitchen(res.data);
    });
  };

  const starredGet = () => {
    Api.post("RAmenitiesKitchenFoodStarredvalue", data)
      .then((res) => {
        setKitchenStarred(res.data);
      });
  };

  useEffect(() => {
    starredGet();
    DataGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(fields, { setStatus }) {
    const id = kitchen.id;
    const cook = [];
    const glass = [];
    if (
      fields.glassesType != "" &&
      fields.glassesType != null &&
      fields.glassesType != undefined
    ) {
      fields.glassesType.map((ele) => glass.push(ele.value));
      fields.glassesType = glass.toString();
    } else {
      fields.glassesType = "";
    }
    if (
      fields.cookingBasicsType != "" &&
      fields.cookingBasicsType != null &&
      fields.cookingBasicsType != undefined
    ) {
      fields.cookingBasicsType.map((ele) => cook.push(ele.value));
      fields.cookingBasicsType = cook.toString();
    } else {
      fields.cookingBasicsType = "";
    }

    if (fields.induction == false) {
      fields.inductionStarred = false;
    }

    if (fields.kitchenette == false) {
      fields.kitchenetteStarred = false;
      fields.kitchenetteType = "";
    }
    if (fields.refrigerator == false) {
      fields.refrigeratorStarred = false;
    }

    if (fields.dishwashing == false) {
      fields.dishwashingStarred = false;
      fields.dishwashingType = "";
    }
    if (fields.glasses == false) {
      fields.glassesStarred = false;
      fields.glassesType = "";
    }
    if (fields.cookingBasics == false) {
      fields.cookingBasicsStarred = false;
      fields.cookingBasicsType = "";
    }
    if (fields.assortedChocolates == false) {
      fields.assortedChocolatesType = "";
      fields.assortedChocolatesStarred = false;
    }
    if (fields.cake === false) {
      fields.cakeStarred = false;
      fields.cakeType = "";
    }

    if (fields.champagne == false) {
      fields.champagneType = "";
      fields.champagneStarred = false;
    }
    if (fields.cookies == false) {
      fields.cookiesType = "";
      fields.cookiesStarred = false;
    }

    if (fields.drinks == false) {
      fields.drinksType = "";
      fields.drinksStarred = false;
    }

    if (fields.fruitBasket == false) {
      fields.fruitBasketStarred = false;
      fields.fruitBasketType = "";
    }

    if (fields.fruitWine == false) {
      fields.fruitWineStarred = false;
      fields.fruitWineType = "";
    }

    if (fields.snackBasket == false) {
      fields.snackBasketStarred = false;
      fields.snackBasketType = "";
    }
    if (fields.sparklingWine == false) {
      fields.sparklingWineStarred = false;
      fields.sparklingWineType = "";
    }
    if (fields.bBQGrill == false) {
      fields.bBQGrillType = "";
      fields.bBQGrillStarred = false;
    }
    if (fields.cookButlerService == false) {
      fields.cookButlerServiceStarred = false;
      fields.cookButlerServiceType = "";
    }
    if (fields.cookiePlatter == false) {
      fields.cookiePlatterStarred = false;
      fields.cookiePlatterType = "";
    }
    if (fields.beer == false) {
      fields.beerType = "";
      fields.beerStarred = false;
    }
    setStatus();
    if (id) {
      updateKitchen(fields);
      updateStarred(fields);
    } else {
      createKitchen(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("RAmenitiesKitchenFoodStarred", newData);
  }

  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("RAmenitiesKitchenFoodStarredupdate", fields);
  }

  function createKitchen(fields) {
    var newData = { ...data, ...fields, ...create };
    setLoading(true);
    Api.post("RAmenitiesKitchenFood", newData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Created");
        history.push("/addproperty/room/photo");
        setLoading(false);
      });
  }
  function updateKitchen(fields) {
    fields.updateBy = createdBy;
    setLoading(true);
    Api.put("RAmenitiesKitchenFoodupdate", fields, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Updated");
        history.push("/addproperty/room/photo");
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
                    <p className={classes.title}>Kitchen & Food</p>
                  </Grid>
                  <Grid item sm={1}>
                    <p>STARRED</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      control={
                        <Field
                          name="kitchenette"
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
                        values.kitchenette ? (
                          <span className={classes.labelfilled}>
                            Kitchenette
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Kitchenette
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.kitchenette ? (
                      <Field
                        name="kitchenetteType"
                        value={values.kitchenetteType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("kitchenetteType", value.value)
                        }
                        options={RoomKitchenKitchenette.map(
                          (RoomKitchenKitchenette) => ({
                            label: RoomKitchenKitchenette,
                            value: RoomKitchenKitchenette,
                          })
                        )}
                        placeholder="kitchenette Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.kitchenette ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="kitchenetteStarred"
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
                          name="dishwashing"
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
                        values.dishwashing ? (
                          <span className={classes.labelfilled}>
                            Dish Washing
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Dish Washing
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.dishwashing ? (
                      <Field
                        name="dishwashingType"
                        value={values.dishwashingType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("dishwashingType", value.value)
                        }
                        options={RoomKitchenDishwashing.map(
                          (RoomKitchenDishwashing) => ({
                            label: RoomKitchenDishwashing,
                            value: RoomKitchenDishwashing,
                          })
                        )}
                        placeholder="Dish Washing Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.dishwashing ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="dishwashingStarred"
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
                          name="glasses"
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
                        values.glasses ? (
                          <span className={classes.labelfilled}>Glasses</span>
                        ) : (
                          <span className={classes.labeloutlined}>Glasses</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={8}>
                    {values.glasses ? (
                      <Field
                        name="glassesType"
                        component={MultiSelect}
                        options={RoomKitchenGlasses.map(
                          (RoomKitchenGlasses) => ({
                            label: RoomKitchenGlasses,
                            value: RoomKitchenGlasses,
                          })
                        )}
                        placeholder="Kitchen Glasses Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.glasses ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="glassesStarred"
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
                          name="cookingBasics"
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
                        values.cookingBasics ? (
                          <span className={classes.labelfilled}>
                            Cooking Basics
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Cooking Basics
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.cookingBasics ? (
                      <Field
                        name="cookingBasicsType"
                        component={MultiSelect}
                        options={RoomKitchenCookingBasics.map(
                          (RoomKitchenCookingBasics) => ({
                            label: RoomKitchenCookingBasics,
                            value: RoomKitchenCookingBasics,
                          })
                        )}
                        placeholder="Cooking Basics Type"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.cookingBasics ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cookingBasicsStarred"
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
                          name="assortedChocolates"
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
                        values.assortedChocolates ? (
                          <span className={classes.labelfilled}>
                            Assorted Chocolate
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Assorted Chocolate
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.assortedChocolates ? (
                      <Field
                        name="assortedChocolatesType"
                        value={values.assortedChocolatesType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("assortedChocolatesType", value.value)
                        }
                        placeholder="Assorted Chocolates Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.assortedChocolates ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="assortedChocolatesStarred"
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
                          as={Checkbox}
                          icon={<RadioButtonUncheckedIcon fontSize="small" />}
                          checkedIcon={
                            <RadioButtonCheckedIcon fontSize="small" />
                          }
                          type="checkbox"
                          name="cake"
                          color="primary"
                        />
                      }
                      label={
                        values.cake ? (
                          <span className={classes.labelfilled}>Cake</span>
                        ) : (
                          <span className={classes.labeloutlined}>Cake</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.cake ? (
                      <Field
                        name="cakeType"
                        value={values.cakeType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("cakeType", value.value)
                        }
                        placeholder="Cake Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.cake ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cakeStarred"
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
                          name="champagne"
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
                        values.champagne ? (
                          <span className={classes.labelfilled}>Champagne</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Champagne
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.champagne ? (
                      <Field
                        name="champagneType"
                        value={values.champagneType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("champagneType", value.value)
                        }
                        placeholder="Champagne Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.champagne ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="champagneStarred"
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
                          name="cookies"
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
                        values.cookies ? (
                          <span className={classes.labelfilled}>Cookies</span>
                        ) : (
                          <span className={classes.labeloutlined}>Cookies</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.cookies ? (
                      <Field
                        name="cookiesType"
                        value={values.cookiesType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("cookiesType", value.value)
                        }
                        placeholder="Cookies Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.cookies ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cookiesStarred"
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
                          name="drinks"
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
                        values.drinks ? (
                          <span className={classes.labelfilled}>Drinks</span>
                        ) : (
                          <span className={classes.labeloutlined}>Drinks</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.drinks ? (
                      <Field
                        name="drinksType"
                        value={values.drinksType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("drinksType", value.value)
                        }
                        placeholder="Drinks Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.drinks ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="drinksStarred"
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
                          name="fruitBasket"
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
                        values.fruitBasket ? (
                          <span className={classes.labelfilled}>
                            Fruit Basket
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Fruit Basket
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.fruitBasket ? (
                      <Field
                        name="fruitBasketType"
                        value={values.fruitBasketType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("fruitBasketType", value.value)
                        }
                        placeholder="Fruit Basket Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.fruitBasket ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="fruitBasketStarred"
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
                          name="fruitWine"
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
                        values.fruitWine ? (
                          <span className={classes.labelfilled}>
                            Fruit Wine
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Fruit Wine
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.fruitWine ? (
                      <Field
                        name="fruitWineType"
                        value={values.fruitWineType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("fruitWineType", value.value)
                        }
                        placeholder="Fruit Basket Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.fruitWine ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="fruitWineStarred"
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
                          name="snackBasket"
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
                        values.snackBasket ? (
                          <span className={classes.labelfilled}>
                            Snack Basket
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Snack Basket
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.snackBasket ? (
                      <Field
                        name="snackBasketType"
                        value={values.snackBasketType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("snackBasketType", value.value)
                        }
                        placeholder="Snack Basket Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.snackBasket ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="snackBasketStarred"
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
                          name="sparklingWine"
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
                        values.sparklingWine ? (
                          <span className={classes.labelfilled}>
                            Sparkling Wine
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Sparkling Wine
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.sparklingWine ? (
                      <Field
                        name="sparklingWineType"
                        value={values.sparklingWineType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("sparklingWineType", value.value)
                        }
                        placeholder="Sparkling Wine Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.sparklingWine ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="sparklingWineStarred"
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
                          name="bBQGrill"
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
                        values.bBQGrill ? (
                          <span className={classes.labelfilled}>BBQ Grill</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            BBQ Grill
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.bBQGrill ? (
                      <Field
                        name="bBQGrillType"
                        value={values.bBQGrillType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("bBQGrillType", value.value)
                        }
                        placeholder="BBQ Grill Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.bBQGrill ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="bBQGrillStarred"
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
                          name="cookButlerService"
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
                        values.cookButlerService ? (
                          <span className={classes.labelfilled}>
                            Cook Butler Service
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Cook Butler Service
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.cookButlerService ? (
                      <Field
                        name="cookButlerServiceType"
                        value={values.cookButlerServiceType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("cookButlerServiceType", value.value)
                        }
                        placeholder="Cook Butler Service Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.cookButlerService ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cookButlerServiceStarred"
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
                          name="cookiePlatter"
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
                        values.cookiePlatter ? (
                          <span className={classes.labelfilled}>
                            Cookie Platter
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Cookie Platter
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.cookiePlatter ? (
                      <Field
                        name="cookiePlatterType"
                        value={values.cookiePlatterType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("cookiePlatterType", value.value)
                        }
                        placeholder="Cookie Platter Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.cookiePlatter ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cookiePlatterStarred"
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
                          name="beer"
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
                        values.beer ? (
                          <span className={classes.labelfilled}>Beer</span>
                        ) : (
                          <span className={classes.labeloutlined}>Beer</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.beer ? (
                      <Field
                        name="beerType"
                        value={values.beerType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("beerType", value.value)
                        }
                        placeholder="Beer Type"
                        options={[
                          { value: "free", label: "Free" },
                          { value: "paid", label: "Paid" },
                        ]}
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.beer ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="beerStarred"
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
                          name="induction"
                          color="primary"
                        />
                      }
                      label={
                        values.induction ? (
                          <span className={classes.labelfilled}>Induction</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Induction
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.induction ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="inductionStarred"
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
                          name="refrigerator"
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
                        values.refrigerator ? (
                          <span className={classes.labelfilled}>
                            Refrigerator
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Refrigerator
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.refrigerator ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="refrigeratorStarred"
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
