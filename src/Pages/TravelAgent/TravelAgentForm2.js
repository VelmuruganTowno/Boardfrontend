/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Grid,
  TextField,
  Dialog,
  Button,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Api from "../../Service/Api";
import Select from "react-select";
import * as Yup from "yup";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { toast } from "react-toastify";
import Thumb from "./TravelAgentThumb";
import Profile from "../../assets/pictures/profile.jpg";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { baseurl } from "../../Service/httpCommon";

const useStyles = makeStyles((theme) => ({
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
  paper: {
    padding: "10px 20px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
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
  root: {
    display: "-webkit-box",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    minHeight: "30px",
  },
  chip: {
    margin: theme.spacing(0.5),
    color: "#fff",
  },
}));

const initialValues = {
  name: "",
  website: "",
  mail: "",
  mobile: "",
  altmobile: "",
  panCard: "",
  city: "",
  gstNo: "",
  onboardedBy: "",
  companyName: "",
  companyCode: "",
  nationality: "",
  address: "",
  remark: "",
  hideCity: "",
  hideHotel: "",
  travelAgentCategory: "bronze",
  logoPath: "",
};
export default function TravelAgentForm(props) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [mailError, setMailError] = useState(false);
  const [mailValid, setMailValid] = useState(false);
  const [propertyList, setPropertyList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const { onClose, open, selectedId } = props;
  const [travelAgent, setTravelAgent] = useState("");

  useEffect(() => {
    HotelList();
    CityList();
    if (selectedId) {
      TravelAgentSingleData();
    }
  }, [selectedId]);

  const TravelAgentSingleData = async () => {
    const response = await Api.get("propertynameidlist");
    Api.get(`companyregisteration/${selectedId}`).then((res) => {
      Api.get(`/propertycitynameidlist/${res.data.hideCity}`).then((res) => {
        setPropertyList(res.data);
      });

      const HideCity = res.data.hideCity;
      var i = 0;
      if (HideCity != "" && HideCity != null && HideCity != undefined) {
        const typeCity1 = HideCity.split(",");
        const typeCity2 = [];
        typeCity1.forEach((element) => {
          typeCity2[i++] = { label: element, value: element };
        });
        res.data.hideCity = typeCity2;
      }
      const HideHotel = res.data.hideHotel;
      if (HideHotel != "" && HideHotel != null && HideHotel != undefined) {
        const typeHotel1 = HideHotel.split(",");

        res.data.hideHotel = response.data
          .filter((item) => typeHotel1.includes(item.propertyId))
          .map((item) => {
            return { label: item.displayName, value: item.propertyId };
          });
      }
      setTravelAgent(res.data);
    });
  };
  const HotelList = () => {
    Api.get("propertynameidlist").then((res) => {
      setPropertyList(res.data);
    });
  };

  const CityList = (event) => {
    Api.get("propertycitylist").then((res) => {
      setCityList(res.data);
    });
  };
  function onSubmit(fields, { setStatus }) {
    const Citys = [];
    if (
      fields.hideCity != "" &&
      fields.hideCity != null &&
      fields.hideCity != undefined
    ) {
      fields.hideCity.map((ele) => Citys.push(ele.value));
      fields.hideCity = Citys.toString();
    } else {
      fields.hideCity = "";
    }

    const Hotels = [];
    if (
      fields.hideHotel != "" &&
      fields.hideHotel != null &&
      fields.hideHotel != undefined
    ) {
      fields.hideHotel.map((ele) => Hotels.push(ele.value));
      fields.hideHotel = Hotels.toString();
    } else {
      fields.hideHotel = "";
    }
    const id = selectedId;
    setStatus();
    createTravelAgent(fields);
  }

  function createTravelAgent(fields) {
    const formData = new FormData();
    if (selectedId) {
      formData.append("id", selectedId);
    }
    else { formData.append("id", 0); }
    formData.append("name", fields.name);
    formData.append("website", fields.website);
    formData.append("mail", fields.mail);
    formData.append("mobile", fields.mobile);
    formData.append("altmobile", fields.altmobile);
    formData.append("panCard", fields.panCard);
    formData.append("city", fields.city);
    formData.append("gstNo", fields.gstNo);
    formData.append("onboardedBy", fields.onboardedBy);
    formData.append("companyName", fields.companyName);
    formData.append("companyCode", fields.companyCode);
    formData.append("nationality", fields.nationality);
    formData.append("address", fields.address);
    formData.append("remark", fields.remark);
    formData.append("hideCity", fields.hideCity);
    formData.append("hideHotel", fields.hideHotel);
    formData.append("travelAgentCategory", fields.travelAgentCategory);
    formData.append("createdBy", createdBy);
    formData.append("image", fields.logoPath);
    console.log("formData: ",formData)
    Api.post("/companyregisteration", formData).then((res) => {
      onClose(true);
      toast.success("Agent Created Successfully");
    });
  }
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    city: Yup.string().required("City is Required"),
    companyName: Yup.string().required("Company Name is Required"),
    onboardedBy: Yup.string()
      .min(3, "Too Short!")
      .required("Onboarded By is Required"),
    companyCode: Yup.string()
      .min(3, "Too Short!")
      .required("Company Code is Required"),
    address: Yup.string().required("Address is Required"),
    mobile: Yup.string()
      .min(10, "Invalid Mobile Number")
      .max(10, "Invalid Mobile Number")
      .required("Mobile No required"),
  });

  const validationEmail = Yup.object({
    mail: Yup.string()
      .email("Enter correct Format")
      .strict()
      .trim()
      .required("Enter the Correct Email"),
  });

  const validCheck = async (data) => {
    if (data !== "" && data !== undefined && data !== null) {
      var mailData = { mail: data };
      Api.post("/companymailcheck", mailData).then((res) => {
        if (res.data == "Invalid") {
          setMailError(true);
        } else {
          setMailError(false);
        }
      });
    }
    const nameField = { mail: data };
    const isValid = await validationEmail.isValid(nameField);
    setMailValid(!isValid);
  };

  const handleClose = () => {
    onClose(true);
    setTravelAgent(initialValues);
  };

  const Hoteloptions =
    propertyList &&
    propertyList.map((hotel) => {
      return { label: hotel.displayName, value: hotel.propertyId };
    });
  const Cityoptions =
    cityList &&
    cityList.map((city) => {
      return { label: city, value: city };
    });
  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <h2 style={{ color: "#F46D25", margin: "0px" }}>
          {travelAgent.id ? "Update Travel Agent" : "Add New Agent"}
        </h2>
        <Formik
          initialValues={travelAgent || initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ values, isValid, setFieldValue }) => {
            return (
              <Form autoComplete="off">
                <h4 className={classes.heading}>Basic Information</h4>
                <div className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <div className="avatar">
                            {values.logoPath !== "" && values.logoPath !== null &&
                              values.logoPath !== undefined ? 
                              values.logoPath.includes("AgentCompanyLogo")?
                              <img src={`${baseurl}getimage/${values.logoPath}`}/>
                              :<Thumb file={values.logoPath} />
                            : <img src={Profile} alt="" />}
                          
                        <span>
                          <AddAPhotoIcon style={{ color: "#F46D25" }}></AddAPhotoIcon>
                          <p>Change</p>

                          <input
                            type="file"
                            id="file_up"
                            name="logoPath"
                            onChange={(event) => {
                              setFieldValue(
                                "logoPath",
                                event.currentTarget.files[0]
                              );
                            }}
                            accept="image/*"
                          />
                        </span>
                      </div>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="name"
                        fullWidth
                        label="Agent Name *"
                        autoFocus
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="name">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="website"
                        fullWidth
                        label="Website"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="mail"
                        fullWidth
                        label="Mail *"
                        variant="outlined"
                        size="small"
                        onBlur={() => validCheck(values.mail)}
                      />
                      {mailValid ? (
                        <span className={classes.error}>Enter Vaild Email</span>
                      ) : null}
                      {mailError ? (
                        <span style={{ color: "red" }} id="errormessage">
                          Mail Already There!
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="mobile"
                        type="text"
                        fullWidth
                        label="Mobile *"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="mobile">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="altmobile"
                        type="text"
                        fullWidth
                        label="Alt Mobile"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="city"
                        type="text"
                        fullWidth
                        label="City *"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="city">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="panCard"
                        type="text"
                        fullWidth
                        label="PAN Card"
                        variant="outlined"
                        size="small"
                        inputProps={{
                          style: { textTransform: "uppercase" },
                        }}
                      />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="gstNo"
                        type="text"
                        fullWidth
                        label="GST No"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="onboardedBy"
                        type="text"
                        fullWidth
                        label="Onboarded By *"
                        variant="outlined"
                        size="small"
                      />
                      <ErrorMessage name="onboardedBy">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    {/* usename password nationality starts */}
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="companyName"
                        type="text"
                        fullWidth
                        label="Company Name *"
                        variant="outlined"
                        size="small"
                        maxRows={3}
                        minRows={2}
                      />
                      <ErrorMessage name="companyName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="companyCode"
                        type="text"
                        fullWidth
                        label="Company Code *"
                        variant="outlined"
                        size="small"
                        maxRows={3}
                        minRows={2}
                      />
                      <ErrorMessage name="companyCode">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="nationality"
                        type="text"
                        fullWidth
                        label="Nationality *"
                        variant="outlined"
                        size="small"
                        maxRows={3}
                        minRows={2}
                      />
                      <ErrorMessage name="nationality">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    {/* usename password nationality ends */}
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="address"
                        type="text"
                        fullWidth
                        label="Address *"
                        variant="outlined"
                        size="small"
                        multiline
                        maxRows={3}
                        minRows={2}
                      />
                      <ErrorMessage name="address">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Field
                        as={TextField}
                        name="remark"
                        type="text"
                        fullWidth
                        label="Remark"
                        variant="outlined"
                        size="small"
                        multiline
                        maxRows={3}
                        minRows={2}
                      />
                    </Grid>
                  </Grid>
                </div>
                <h4 className={classes.heading}>Hide Control</h4>
                <div className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                      <Select
                        name="hideCity"
                        className={classes.select}
                        value={values.hideCity || ""}
                        isMulti
                        onChange={(value) => {
                          setFieldValue("hideCity", value);
                          let city = [];
                          value.map((ele) => city.push(ele.value));
                          city = city.toString();
                          Api.get(`/propertycitynameidlist/${city}`).then(
                            (res) => {
                              setPropertyList(res.data);
                            }
                          );
                        }}
                        placeholder="By City"
                        options={Cityoptions}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            boxShadow: "none",
                            borderColor: "#f46d25",
                          }),
                          multiValue: (styles, { data }) => {
                            return {
                              ...styles,
                              backgroundColor: "#F46D25",
                              color: "#fff",
                              borderRadius: "5px",
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: "#fff",
                          }),
                          indicatorsContainer: (styles, { data }) => ({
                            ...styles,
                            color: "#f46d25",
                          }),
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Select
                        name="hideHotel"
                        className={classes.select}
                        isMulti
                        value={values.hideHotel || ""}
                        onChange={(value) => {
                          setFieldValue("hideHotel", value);
                        }}
                        placeholder="By Property"
                        options={Hoteloptions}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            boxShadow: "none",
                            borderColor: "#f46d25",
                          }),
                          multiValue: (styles, { data }) => {
                            return {
                              ...styles,
                              backgroundColor: "#F46D25",
                              color: "#fff",
                              borderRadius: "5px",
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: "#fff",
                          }),
                          indicatorsContainer: (styles, { data }) => ({
                            ...styles,
                            color: "#f46d25",
                          }),
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <h4 className={classes.heading}>Travel Agent Categoy</h4>
                <div className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={6}>
                      <div style={{ marginLeft: "20px" }}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Radio}
                              type="radio"
                              name="travelAgentCategory"
                              color="primary"
                              value="gold"
                              style={{ fontSize: "12px" }}
                              checkedIcon={<CheckBoxIcon />}
                              icon={<CheckBoxOutlineBlankIcon />}
                            />
                          }
                          label={<span style={{ fontSize: "12px" }}>Gold</span>}
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Radio}
                              type="radio"
                              name="travelAgentCategory"
                              color="primary"
                              value="silver"
                              style={{ fontSize: "12px" }}
                              checkedIcon={<CheckBoxIcon />}
                              icon={<CheckBoxOutlineBlankIcon />}
                            />
                          }
                          label={
                            <span style={{ fontSize: "12px" }}>Silver</span>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Radio}
                              type="radio"
                              name="travelAgentCategory"
                              color="primary"
                              value="bronze"
                              checked={values.travelAgentCategory?values.travelAgentCategory=='bronze':true}
                              style={{ fontSize: "12px" }}
                              checkedIcon={<CheckBoxIcon />}
                              icon={<CheckBoxOutlineBlankIcon />}
                            />
                          }
                          label={
                            <span style={{ fontSize: "12px" }}>Bronze</span>
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ textAlign: "center" }}
                >
                  <Button type="submit" disabled={!isValid} color="primary">
                    Register
                  </Button>
                  <Button
                    color="secondary"
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
