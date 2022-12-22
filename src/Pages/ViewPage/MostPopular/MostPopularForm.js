/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Grid, Button, TextField, Dialog } from "@material-ui/core";
import * as Yup from "yup";
import Api from "../../../Service/Api";
import Thumb from "../../Staff/Thumb";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { baseurl } from "../../../Service/httpCommon";
import Select, { components } from "react-select";
import { toast } from "react-toastify";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    padding: "10px 20px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
    marginTop: "10px",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  heading: {
    margin: "10px",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  dialogPaper: {
    minHeight: "100%",
    minWidth: "85%",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
    padding: "20px",
    "@media (max-width: 767px)": {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100%",
      overflowY: "scroll",
      maxWidth: "100%",
      minHeight: "95%",
    },
  },
  error: {
    color: "red",
  },
}));

export default function MostPopularForm(props) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [hotelList, setHotelList] = useState([]);
  const [most, setMost] = useState({
    propertyId: "",
    propertyName: "",
    starRate: "",
    city: "",
    minmumprice: "",
    orderNo: "",
    image: "",
    topLeftLabel: "",
  });
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const { onClose, selectedId, open } = props;

  useEffect(() => {
    AllHotel();
    if (selectedId) {
      Api.get(`agentpopular/${selectedId}`).then((res) => {
        res.data.propertyName = {
          label: res.data.propertyName,
          value: res.data.propertyId,
        };
        setMost(res.data);
      });
    }
  }, [selectedId]);

  // Hotel Name List get
  const AllHotel = async () => {
    await Api.get("propertyName").then((res) => {
      setHotelList(res.data);
    });
  };

  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateMost(fields);
    } else {
      createMost(fields);
    }
  }

  function createMost(fields) {
    if (fields.propertyName) {
      fields.propertyName = fields.propertyName.label;
    }
    const formData = new FormData();
    formData.append("id", 0);
    formData.append("uniqueId", uniqueid);
    formData.append("createdBy", createdBy);
    formData.append("image", fields.image);
    formData.append("propertyId", fields.propertyId);
    formData.append("propertyName", fields.propertyName);
    formData.append("starRate", fields.starRate);
    formData.append("city", fields.city);
    formData.append("minmumprice", fields.minmumprice);
    formData.append("orderNo", fields.orderNo);
    formData.append("topLeftLabel", fields.topLeftLabel);
    Api.post("agentpopular", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      }}).then((res) => {
      onClose(true);
      toast.success("Added Successfully");
      setMost({
        propertyId: "",
        propertyName: "",
        starRate: "",
        city: "",
        minmumprice: "",
        image: "",
      });
    });
  }

  function updateMost(fields) {
    if (fields.propertyName) {
      fields.propertyName = fields.propertyName.label;
    }

    const formData = new FormData();
    formData.append("id", most.id);
    formData.append("uniqueId", uniqueid);
    formData.append("createdBy", createdBy);
    formData.append("image", fields.image);
    formData.append("propertyId", fields.propertyId);
    formData.append("propertyName", fields.propertyName);
    formData.append("starRate", fields.starRate);
    formData.append("city", fields.city);
    formData.append("minmumprice", fields.minmumprice);
    formData.append("orderNo", fields.orderNo);
    formData.append("topLeftLabel", fields.topLeftLabel);
    Api.post("agentpopular", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      }}).then((res) => {
      onClose(true);
      toast.success("Updated Successfully");
      setMost({
        propertyId: "",
        propertyName: "",
        starRate: "",
        city: "",
        minmumprice: "",
        image: "",
      });
    });
  }

  const handleClose = () => {
    onClose(true);
    setMost({
      propertyId: "",
      propertyName: "",
      starRate: "",
      city: "",
      minmumprice: "",
      image: "",
    });
  };

  const Hoteloptions =
    hotelList &&
    hotelList.map((hotel) => {
      return { label: hotel.displayName, value: hotel.propertyId };
    });

  const validationSchema = Yup.object({
    image: Yup.string().required("Image is Required"),
    starRate: Yup.string().required("Star Rating is Required"),
    propertyName: Yup.object().required("Property Name is Required"),
    city: Yup.string().required("City is Required").max(25),
    minmumprice: Yup.string().required("Minmum Price is Required"),
    orderNo: Yup.number().required("OrderNo is Required"),
    topLeftLabel: Yup.string().max(25),
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <Formik
          initialValues={most}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {({ values, isValid, setFieldValue }) => {
            return (
              <Form autoComplete="off">
                <div className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <div className="avatarhotel">
                        {typeof values.image == "object" ? (
                          <Thumb file={values.image} />
                        ) : (
                          <>
                            {most.image !== null && most.image !== undefined ? (
                              <img
                                src={`${baseurl}getimage/${most.image}`}
                                alt=""
                              />
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                        <span>
                          <AddAPhotoIcon
                            style={{ color: "#F46D25" }}
                          ></AddAPhotoIcon>
                          <p>Change</p>

                          <input
                            type="file"
                            id="file_up"
                            name="image"
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                            accept="image/*"
                          />
                        </span>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        Minimum 400 kb Max 600kb file 300*300 width & Height
                      </div>
                      <ErrorMessage name="image">
                        {(error) => (
                          <div style={{ color: "red", textAlign: "center" }}>
                            {error}
                          </div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Select
                        name="propertyName"
                        className={classes.select}
                        value={values.propertyName}
                        onChange={(value) => {
                          setFieldValue("propertyName", value);
                          setFieldValue("propertyId", value.value);
                          Api.get(`propertydetails/${value.value}`).then(
                            (res) => {
                              setFieldValue("starRate", res.data.rating);
                              setFieldValue("city", res.data.city);
                            }
                          );
                        }}
                        placeholder="Select Property *"
                        options={Hoteloptions}
                        components={{
                          ValueContainer: CustomValueContainer,
                        }}
                        styles={{
                          container: (provided) => ({
                            ...provided,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                          }),
                          valueContainer: (provided) => ({
                            ...provided,
                            overflow: "visible",
                          }),
                          placeholder: (provided, state) => ({
                            ...provided,
                            position: "absolute",
                            top:
                              state.hasValue || state.selectProps.inputValue
                                ? -4
                                : "50%",
                            background: "#fff",
                            padding: "0px 5px",
                            transition: "top 0.1s, font-size 0.1s",
                            fontSize:
                              (state.hasValue ||
                                state.selectProps.inputValue) &&
                              13,
                          }),
                          control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            borderColor: "#f46d25",
                            boxShadow: "none",
                          }),
                        }}
                      />
                      <ErrorMessage name="propertyName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="starRate"
                        label="Star Rating *"
                        value={values.starRate}
                        type="text"
                        fullWidth
                        variant="outlined"
                        as={TextField}
                        size="small"
                      />
                      <ErrorMessage name="starRate">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>

                    <Grid item md={4} xs={6}>
                      <Field
                        name="city"
                        label="city * (25)"
                        value={values.city}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                      />
                      <ErrorMessage name="city">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="minmumprice"
                        label="Minimum Price *"
                        value={values.minmumprice}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                      />
                      <ErrorMessage name="minmumprice">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="orderNo"
                        label="Order No *"
                        value={values.orderNo}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                      />
                      <ErrorMessage name="orderNo">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Field
                        name="topLeftLabel"
                        label="Top Left Label (25)"
                        value={values.topLeftLabel}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        as={TextField}
                      />
                      <ErrorMessage name="topLeftLabel">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                </div>

                <Grid
                  item
                  sm={12}
                  style={{ textAlign: "center", marginBottom: "10px" }}
                  xs={12}
                >
                  <Button
                    type="submit"
                    className={classes.button}
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={handleClose}
                    style={{
                      background: "#121212",
                      color: "#fff",
                      margin: "10px",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}
