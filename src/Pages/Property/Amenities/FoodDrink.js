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
import { useSelector, useDispatch } from "react-redux";
import { restaurantInitial } from "../../../redux/actions/amenitiesDropDownAction";
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
  bar: false,
  barStarred: false,
  barbeque: false,
  barbequeStarred: false,
  cafe: false,
  cafeType: "",
  cafeStarred: false,
  diningArea: false,
  diningAreaType: "",
  diningAreaStarred: false,
  kidsmeals: false,
  kidsmealStarred: false,
  restaurant: false,
  restaurantType: "",
  restaurantStarred: false,
  petFoods: false,
  petFoodStarred: false,
};

export default function FoodDrink() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const history = useHistory();
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [food, setFood] = useState("");
  const [foodStarred, setFoodStarred] = useState("");
  const dispatch = useDispatch();
  const restaurantLists = useSelector(
    (state) => state.restaurantList.restaurantLists
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(restaurantInitial());
  }, [dispatch]);

  const starredGet = () => {
    Api.post("AmenitiesFoodAndDrinksStarredvalue", data)
      .then((res) => {
        setFoodStarred(res.data);
      });
  };

  const foodGet = () => {
    Api.post("AmenitiesFoodAndDrinksvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const restaurantres = res.data.restaurantType;
        if (
          restaurantres != "" &&
          restaurantres != null &&
          restaurantres != undefined
        ) {
          const restaurant1 = restaurantres.split(",");
          const restaurant2 = [];
          var i = 0;
          restaurant1.forEach((element) => {
            restaurant2[i++] = { label: element, value: element };
          });
          res.data.restaurantType = restaurant2;
        }
        setFood(res.data);
      });
  };
  useEffect(() => {
    starredGet();
    foodGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var Data = { ...food, ...foodStarred };

  function onSubmit(fields, { setStatus }) {
    const id = food.id;
    setStatus();
    const rest = [];
    if (
      fields.restaurantType != "" &&
      fields.restaurantType != null &&
      fields.restaurantType != undefined
    ) {
      fields.restaurantType.map((ele) => rest.push(ele.value));
      fields.restaurantType = rest.toString();
    } else {
      fields.restaurantType = "";
    }

    if (fields.bar == false) {
      fields.barStarred = false;
    }
    if (fields.barbeque == false) {
      fields.barbequeStarred = false;
    }
    if (fields.cafe == false) {
      fields.cafeType = "";
      fields.cafeStarred = false;
    }
    if (fields.diningArea == false) {
      fields.diningAreaType = "";
      fields.diningAreaStarred = false;
    }
    if (fields.kidsmeals == false) {
      fields.kidsmealStarred = false;
    }
    if (fields.restaurant == false) {
      fields.restaurantType = "";
      fields.restaurantStarred = false;
    }
    if (fields.petFoods == false) {
      fields.petFoodStarred = false;
    }

    if (id) {
      updateFood(fields);
      updateStarred(fields);
    } else {
      createFood(fields);
      createStarred(fields);
    }
  }

  function createStarred(fields) {
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesFoodAndDrinksStarred", newData);
  }
  function updateStarred(fields) {
    fields.updateBy = createdBy;
    Api.put("AmenitiesFoodAndDrinksStarredupdate", fields);
  }

  function createFood(fields) {
    setLoading(true);
    var newData = { ...data, ...fields, ...create };
    Api.post("AmenitiesFoodAndDrinks", newData).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        toast.success("Successfully Created");
        history.push("/addproperty/amenities/health");
      }
    });
  }

  function updateFood(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    Api.put("AmenitiesFoodAndDrinksupdate", fields).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully Updated");
        history.push("/addproperty/amenities/health");
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
                    <p className={classes.title}>Food and Drinks</p>
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
                          name="cafe"
                          color="primary"
                        />
                      }
                      label={
                        values.cafe ? (
                          <span className={classes.labelfilled}>Cafe</span>
                        ) : (
                          <span className={classes.labeloutlined}>Cafe</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.cafe ? (
                      <Field
                        name="cafeType"
                        value={values.cafeType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("cafeType", value.value)
                        }
                        options={[
                          { value: "24hrs", label: "24*7" },
                          { value: "limited", label: "Limited" },
                        ]}
                        placeholder="Cafe"
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.cafe ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="cafeStarred"
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
                          name="diningArea"
                          color="primary"
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
                  <Grid item sm={8}>
                    {values.diningArea ? (
                      <Field
                        name="diningAreaType"
                        value={values.diningAreaType}
                        component={SelectFields}
                        onChange={(value) =>
                          setFieldValue("diningAreaType", value.value)
                        }
                        options={[
                          { value: "24hrs", label: "24*7" },
                          { value: "limited", label: "Limited" },
                        ]}
                        placeholder="Dining Area "
                      />
                    ) : null}
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
                          name="restaurant"
                          color="primary"
                        />
                      }
                      label={
                        values.restaurant ? (
                          <span className={classes.labelfilled}>
                            Restaurant
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Restaurant
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={8}>
                    {values.restaurant ? (
                      <Field
                        name="restaurantType"
                        component={MultiSelect}
                        options={restaurantLists.map((restaurant) => ({
                          label: restaurant,
                          value: restaurant,
                        }))}
                        placeholder="Restaurant "
                      />
                    ) : null}
                  </Grid>
                  <Grid item sm={1}>
                    {values.restaurant ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="restaurantStarred"
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
                          name="bar"
                          color="primary"
                          autoFocus
                        />
                      }
                      label={
                        values.bar ? (
                          <span className={classes.labelfilled}>Bar</span>
                        ) : (
                          <span className={classes.labeloutlined}>Bar</span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.bar ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="barStarred"
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
                          name="barbeque"
                          color="primary"
                        />
                      }
                      label={
                        values.barbeque ? (
                          <span className={classes.labelfilled}>Barbeque</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Barbeque
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.barbeque ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="barbequeStarred"
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
                          name="kidsmeals"
                          color="primary"
                        />
                      }
                      label={
                        values.kidsmeals ? (
                          <span className={classes.labelfilled}>
                            Kids Meals
                          </span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Kids Meals
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.kidsmeals ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="kidsmealStarred"
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
                          name="petFoods"
                          color="primary"
                        />
                      }
                      label={
                        values.petFoods ? (
                          <span className={classes.labelfilled}>Pet Food</span>
                        ) : (
                          <span className={classes.labeloutlined}>
                            Pet Food
                          </span>
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={1}>
                    {values.petFoods ? (
                      <FormControlLabel
                        control={
                          <Field
                            name="petFoodStarred"
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
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
}
