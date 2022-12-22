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
import { toast } from "react-toastify";

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

export default function BestSellingForm(props) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");

  const [BestSelling, setBestSelling] = useState({
    city: "",
    image: "",

    orderNo: "",
  });
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const { onClose, selectedId, open } = props;

  useEffect(() => {
    if (selectedId) {
      Api.get(`agentbestsellingdestinations/${selectedId}`).then((res) => {
        setBestSelling(res.data);
      });
    }
  }, [selectedId]);

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
    formData.append("city", fields.city);
    formData.append("orderNo", fields.orderNo);
    Api.post("agentbestsellingdestinations", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      }}).then((res) => {
      onClose(true);
      toast.success("Updated Successfully");
      setBestSelling({
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
    formData.append("id", BestSelling.id);
    formData.append("uniqueId", uniqueid);
    formData.append("createdBy", createdBy);
    formData.append("image", fields.image);
    formData.append("city", fields.city);
    formData.append("orderNo", fields.orderNo);
    Api.post("agentbestsellingdestinations", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      }}).then((res) => {
      onClose(true);
      toast.success("Updated Successfully");
      setBestSelling({
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
    setBestSelling({
      propertyId: "",
      propertyName: "",
      starRate: "",
      city: "",
      minmumprice: "",
      image: "",
    });
  };

  const validationSchema = Yup.object({
    image: Yup.string().required("Image is Required"),
    city: Yup.string().required("City is Required").max(25),
    orderNo: Yup.number().required("OrderNo is Required"),
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <Formik
          initialValues={BestSelling}
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
                            {BestSelling.image !== null &&
                            BestSelling.image !== undefined ? (
                              <img
                                src={`${baseurl}getimage/${BestSelling.image}`}
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
