/* eslint-disable eqeqeq */
import React, { Fragment, useEffect, useState } from "react";
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
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';

import Api from "../../Service/Api";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { format } from "date-fns";
import MaterialSelect from "../../components/Select/MaterialSelect";
import * as Yup from "yup";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { toast } from "react-toastify";
import { sortByItem } from "../../Service/CommonFunctionFile"
import { Typography } from "@mui/material";
import { twnButtonStyles } from "../../utils/townoStyle";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "100%",
    minWidth: "100%",
    position: "absolute",
    margin: "0px",
    right: "0px",
    left: '0px',
    zIndex: "1000",
    padding: "50px 15px",
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
  icon: {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "1.5rem",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    position: "absolute",
    right: "15px",
    top: "5px",
  },
  paper: {
    padding: "15px 23px",
    marginLeft: "3px",
    width: "95.79%",
    marginTop: "-1.6px",
    boxShadow: "0px 0px 2px 1px #343a40b8",
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    background: "#F4F4F4",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  heading: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#fff",
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
  clientName: "",
  clientMail: "",
  clientMobileNo: "",
  clientDepartcity: "",
  buget: "",
  checkin: "",
  notes: "",
  leadType: "",
  destination: "",
  displayName: "",
  noofpax: "",
  noofnights: "",
  budget: "",
  leadassignto: "",
  leadsource: "",
  leadscoring: "new",
  leadscoringvalue: "",
  reason: "",
};

export default function BoardLeadForm(props) {
  const { onClose, open, selectedId } = props;
  const classes = useStyles();
  let hasAdmin = localStorage.getItem("role");
  let checkAgent = localStorage.getItem("agent");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [mailError, setMailError] = useState(false);
  const [mailValid, setMailValid] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedDestCity, setSelectedDestCity] = useState({ value: null, label: null });
  const [selectedHotel, setSelectedHotel] = useState({ label: 'Any Hotel', value: 'anyHotel' });
  const [hotelList, setHotelList] = useState([]);
  const [leadassignto, setLeadassignto] = useState([]);
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [startDate, setStartDate] = useState(null);
  const [boardLead, setBoardLead] = useState("");
  const [leadscoring, setLeadscoring] = useState(false);
  const [leadscorings, setLeadscorings] = useState(false);
  const [leadType, setLeadType] = useState([]);
  const [leadSource, setLeadSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [reason, setReason] = useState(null);

  useEffect(() => {
    CityList();
    // setSelectedHotel();
    Leadassignto();
    LeadType();
    LeadSource();
    if (selectedId) {
      BoardLeadSingleData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);
  const onChangestart = (date) => {
    let Date = format(date, "yyyy-MM-dd");
    setStartDate(Date);
  };
  const BoardLeadSingleData = async () => {
    Api.get(`boardlead/${uniqueid}/${selectedId}`).then((res) => {
      setBoardLead(res.data);
      let hotelUrl = '/propertyName';
      if (res.data.destination != null && res.data.destination != "") {
        hotelUrl = `/propertycitynameidlist/` + res.data.destination;
      }
      Api.get(hotelUrl).then((res1) => {
        setHotelList([{ displayName: 'Any Hotel', propertyId: 'anyHotel' }, ...res1.data]);
        if (res.data.propertyId != "" && res.data.propertyId != null && res.data.propertyId != 'anyHotel') {
          setSelectedHotel({ label: res.data.displayName, value: res.data.propertyId });
        } else {
          setSelectedHotel({ label: 'Any Hotel', value: 'anyHotel' });
        }
      });

      if (res.data.leadscoring === "followup") {
        setLeadscorings(true);
      }
      if (res.data.leadscoring === "lost") {
        setLeadscoring(true);
        setLeadscorings(false);
      }
      if (res.data.checkin != null && res.data.checkin != "" && res.data.checkin.trim() != "") {
        setStartDate(res.data.checkin);
      }
    });
  };
  const CityList = (event) => {
    Api.get(`commonfeatureonly/${uniqueid}/City`).then((res) => {
      setCityList(res.data);
    });
  };

  useEffect(() => {
    let hotelUrl = `/propertyName`;
    if (selectedDestCity.value != null && selectedDestCity != null && selectedDestCity != "") {
      hotelUrl = `/propertycitynameidlist/` + selectedDestCity;
    }
    Api.get(hotelUrl).then((res) => {
      setHotelList([{ displayName: 'Any Hotel', propertyId: 'anyHotel' }, ...res.data]);
      setSelectedHotel({ label: 'Any Hotel', value: 'anyHotel' });
    });
  }, [selectedDestCity])

  const Leadassignto = (event) => {
    Api.get(`leadassignfor/${uniqueid}`).then((res) => {
      res.data.sort(sortByItem("username"));
      setLeadassignto(res.data);
    });
  };

  const LeadType = (event) => {
    Api.get(`commonfeatureonly/${uniqueid}/leadType`).then((res) => {
      setLeadType(res.data);
    });
  };
  const LeadSource = (event) => {
    Api.get(`commonfeatureonly/${uniqueid}/leadSource`).then((res) => {
      setLeadSource(res.data);
    });
  };
  function onSubmit(fields, { setStatus }) {
    setLoading(true);
    const id = selectedId;
    setStatus();
    if (id) {
      updateBoardLead(fields);
    } else {
      createBoardLead(fields);
    }
  }

  function createBoardLead(fields) {
    const newdata = { ...fields, ...create };
    if (startDate !== null) {
      newdata.checkin = startDate;
    } else {
      newdata.checkin = "";
    }
    Api.post("boardlead", newdata).then((res) => {
      onClose(true);
      toast.success("Lead Created Successfully");
      setIsActive(false);
      setLoading(false);
      setLeadscorings(false);
      setStartDate(null);

    });
  }
  function updateBoardLead(fields) {
    const newdata = { ...fields, ...create };
    newdata.checkin = startDate;
    Api.put(`boardleadupdate/${selectedId}`, newdata).then((res) => {
      onClose(true);
      toast.success("Lead Updated Successfully");
      setIsActive(false);
      setLoading(false);
      setLeadscorings(false);
      setStartDate(null);
      setBoardLead("");
    });
  }

  const validationSchema = Yup.object({
    clientMail: Yup.string().required("Email is Required").nullable(),
    leadscoring: Yup.string().required("LeadScore is Required"),
    leadsource: Yup.string().required("Source is Required"),
    leadType: Yup.string().required("Lead Assigned To is Required"),
    leadassignto: Yup.string().required("Lead Assigned To is Required"),
    destination: Yup.string().required("Destination is Required"),
    clientMobileNo: Yup.string()
      .min(10, "Invalid Mobile Number")
      .max(10, "Invalid Mobile Number")
      .required("Mobile No required"),
  });
  const validationEmail = Yup.object({
    clientMail: Yup.string()
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
    const nameField = { clientMail: data };
    const isValid = await validationEmail.isValid(nameField);
    setMailValid(!isValid);
  };

  const handleClose = () => {
    onClose(true);
    setBoardLead(initialValues);
    setStartDate(null);
    setIsActive(false);
    setLoading(false);
    setLeadscorings(false);
    setLeadscoring(false);
    setReason(null);
  };
  const Cityoption =
    cityList &&
    cityList.map((city) => {
      return { label: city, value: city };
    });

  const Hoteloption =
    hotelList &&
    hotelList.map((each) => {
      return { value: each.propertyId, label: each.displayName };
    });


  const leadassigntooptions =
    leadassignto &&
    leadassignto.map((lead) => {
      return { label: lead.name, value: lead.username };
    });

  const LeadTypeoptions =
    leadType &&
    leadType.map((lead) => {
      return { label: lead, value: lead };
    });

  const LeadSourceoptions =
    leadSource &&
    leadSource.map((lead) => {
      return { label: lead, value: lead };
    });

  return (
    <div >
      {" "}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={handleClose}
          fullWidth={true}
        >
          <Typography style={{ ...twnButtonStyles.xlFonts, marginTop: '20px' }}>
            {boardLead.id ? "Update Board Lead" : "Add New Lead"}
          </Typography>
          <Formik
            initialValues={boardLead || initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {({ values, isValid, setFieldValue }) => {
              console.log("boardform|onsubmit|isValid:", isValid);
              return (
                <Form autoComplete="off">
                  <Grid
                    container
                    spacing={2}
                    item
                    lg={12}
                    style={{
                      backgroundColor: "black",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      boxShadow: "0px 1px 3px 1px #343a40b8",
                      marginLeft: "2px",
                      marginTop: "10px",
                      marginBottom: "2px",
                    }}
                  >
                    <h4 className={classes.heading}>Basic Details</h4>
                  </Grid>
                  <div className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item md={6} sm={12} xs={12}>
                        <Field
                          as={TextField}
                          name="clientName"
                          fullWidth
                          label="Client Name "
                          autoFocus
                          variant="outlined"
                          size="small"
                        />
                        <ErrorMessage name="clientName">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <Field
                          as={TextField}
                          name="clientMobileNo"
                          type="text"
                          fullWidth
                          label="Client Mobile *"
                          variant="outlined"
                          size="small"
                        />
                        <ErrorMessage name="clientMobileNo">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <Field
                          as={TextField}
                          name="clientDepartcity"
                          type="text"
                          fullWidth
                          label="Departure City"
                          variant="outlined"
                          size="small"
                        />
                        <ErrorMessage name="clientDepartcity">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <Field
                          as={TextField}
                          name="clientMail"
                          fullWidth
                          label="Client Mail *"
                          variant="outlined"
                          size="small"
                          onBlur={() => validCheck(values.clientMail)}
                        />
                        <ErrorMessage name="clientMail">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                        {mailValid ? (
                          <span className={classes.error}>
                            Enter Vaild Email
                          </span>
                        ) : null}
                        {mailError ? (
                          <span style={{ color: "red" }} id="errormessage">
                            Mail Already There!
                          </span>
                        ) : null}
                      </Grid>
                    </Grid>
                  </div>
                  <Grid
                    container
                    spacing={2}
                    item
                    lg={12}
                    style={{
                      backgroundColor: "black",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      boxShadow: "0px 1px 3px 1px #343a40b8",
                      marginLeft: "2px",
                      marginTop: "10px",
                      marginBottom: "2px",
                    }}
                  >
                    <h4 className={classes.heading}>Travel Details</h4>
                  </Grid>
                  <div className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item md={6} sm={12} xs={12}>
                        <MaterialSelect
                          name="leadType"
                          placeholder="Lead Type *"
                          options={LeadTypeoptions}
                          value={values.leadType || ""}
                          onChange={(Value) => {
                            let lead = Value.value;
                            setFieldValue("leadType", lead);
                          }}
                        />
                        <ErrorMessage name="leadType">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <div style={{ position: "relative" }}>
                          <DatePicker
                            label="Tentative Date of Check in"
                            inputVariant="outlined"
                            fullWidth
                            size="small"
                            name="checkin"
                            value={startDate}
                            onChange={onChangestart}
                            animateYearScrolling
                            format="dd/MM/yyyy"
                            variant="inline"
                            disablePast="true"
                            autoOk="true"
                          />
                          <DateRangeIcon className={classes.icon} />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <MaterialSelect
                          name="destination"
                          placeholder="Destination City *"
                          options={Cityoption}
                          value={values.destination || ""}
                          onChange={(Value) => {
                            let city = Value.value;
                            setFieldValue("destination", city);
                            setIsActive(true);
                            setSelectedDestCity(city);
                          }}
                        />
                        <ErrorMessage name="destination">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      {hasAdmin === "Agent Admin" || checkAgent === "Agent" ?
                        <Grid item md={6} sm={4} xs={4}>
                          <Field
                            as={TextField}
                            name="displayName"
                            fullWidth
                            label="Hotel/Package Name"
                            type="text"
                            variant="outlined"
                            size="small"
                          />
                        </Grid> :
                        <Grid item md={6} sm={12} xs={12}>
                          <MaterialSelect
                            name="displayName"
                            placeholder="Select Hotel *"
                            options={Hoteloption}
                            value={values.propertyId || "anyHotel"}
                            onChange={(Value) => {
                              let hotel = Value.value;
                              setFieldValue("hotel", hotel);
                              setIsActive(true);
                              setFieldValue("displayName", Value.label);
                              setFieldValue("propertyId", Value.value);
                            }}
                          />
                          <ErrorMessage name="displayName">
                            {(error) => (
                              <div className={classes.error}>{error}</div>
                            )}
                          </ErrorMessage>
                        </Grid>
                      }
                      <Grid item md={4} sm={4} xs={4}>
                        <Field
                          as={TextField}
                          name="noofpax"
                          fullWidth
                          label="No of Pax"
                          type="number"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item md={4} sm={6} xs={6}>
                        <Field
                          as={TextField}
                          name="noofnights"
                          fullWidth
                          label="No of Night"
                          type="number"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>{" "}
                      <Grid item md={4} sm={4} xs={4}>
                        <Field
                          as={TextField}
                          name="budget"
                          fullWidth
                          label="Budget"
                          type="number"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <Field
                          as={TextField}
                          name="notes"
                          fullWidth
                          label="Remark"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </div>{" "}
                  <Grid
                    container
                    spacing={2}
                    item
                    lg={12}
                    style={{
                      backgroundColor: "black",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      boxShadow: "0px 1px 3px 1px #343a40b8",
                      marginLeft: "2px",
                      marginTop: "10px",
                      marginBottom: "2px",
                    }}
                  >
                    <h4 className={classes.heading}>Lead Status</h4>
                  </Grid>
                  <div className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item md={6} sm={12} xs={12}>
                        <Field
                          as={MaterialSelect}
                          name="leadassignto"
                          placeholder="Lead Assigned To *"
                          options={leadassigntooptions}
                          value={values.leadassignto || ""}
                          onChange={(Value) => {
                            let lead = Value.value;
                            setFieldValue("leadassignto", lead);
                          }}
                        />
                        <ErrorMessage name="leadassignto">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <MaterialSelect
                          name="leadsource"
                          placeholder="Lead Source *"
                          options={LeadSourceoptions}
                          value={values.leadsource || ""}
                          onChange={(Value) => {
                            let lead = Value.value;
                            setFieldValue("leadsource", lead);
                          }}
                        />
                        <ErrorMessage name="leadsource">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={12}
                        xs={12}
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginTop: "5px",
                          color: "#f46d25",
                          textAlign: "right",
                        }}
                      >
                        Lead Scoring * :
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={12}
                        xs={12}
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ marginLeft: "20px" }}>
                          <FormControlLabel
                            control={
                              <Field
                                as={Radio}
                                type="radio"
                                name="leadscoring"
                                color="primary"
                                onClick={() =>
                                  setLeadscorings(false) ||
                                  setLeadscoring(false)
                                }
                                value="new"
                                style={{ fontSize: "12px", color: "#f46d25" }}
                              />
                            }
                            label={
                              <span style={{ fontSize: "15px" }}>New</span>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={12}
                        xs={12}
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ marginLeft: "20px" }}>
                          <FormControlLabel
                            control={
                              <Field
                                as={Radio}
                                type="radio"
                                name="leadscoring"
                                color="primary"
                                value="followup"
                                onClick={() =>
                                  setLeadscorings(true) || setLeadscoring(false)
                                }
                                style={{ fontSize: "12px", color: "#f46d25" }}
                              />
                            }
                            label={
                              <span style={{ fontSize: "15px" }}>
                                Follow up
                              </span>
                            }
                          />
                        </div>
                      </Grid>{" "}
                      <Grid
                        item
                        md={2}
                        sm={12}
                        xs={12}
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ marginLeft: "20px" }}>
                          <FormControlLabel
                            control={
                              <Field
                                as={Radio}
                                type="radio"
                                name="leadscoring"
                                color="primary"
                                onClick={() =>
                                  setLeadscorings(false) ||
                                  setLeadscoring(false)
                                }
                                value="closed"
                                style={{ fontSize: "12px", color: "#f46d25" }}
                              />
                            }
                            label={
                              <span style={{ fontSize: "15px" }}>Closed</span>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={12}
                        xs={12}
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ marginLeft: "20px" }}>
                          <FormControlLabel
                            control={
                              <Field
                                as={Radio}
                                type="radio"
                                name="leadscoring"
                                onClick={() =>
                                  setLeadscorings(false) || setLeadscoring(true)
                                }
                                color="primary"
                                value="lost"
                                style={{ fontSize: "12px", color: "#f46d25" }}
                              />
                            }
                            label={
                              <span style={{ fontSize: "15px" }}>Lost</span>
                            }
                          />
                        </div>
                      </Grid>
                      {leadscorings == true ? (
                        <>
                          <Grid
                            item
                            md={4}
                            sm={12}
                            xs={12}
                            style={{ textAlign: "center" }}
                          />
                          <Grid
                            item
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ textAlign: "center" }}
                          >
                            <div style={{ marginLeft: "20px" }}>
                              <FormControlLabel
                                control={
                                  <Field
                                    as={Radio}
                                    type="radio"
                                    name="leadscoringvalue"
                                    color="primary"
                                    value="followuphot"
                                    style={{
                                      fontSize: "12px",
                                      color: "#f46d25",
                                    }}
                                    checkedIcon={<CheckBoxIcon />}
                                    icon={<CheckBoxOutlineBlankIcon />}
                                  />
                                }
                                label={
                                  <span style={{ fontSize: "15px" }}>   <Grid continer spacing={2}>
                                    <Grid item lg={7}>
                                      <p
                                        style={{
                                          color: "#e93646",
                                          fontWeight: "bold",
                                          marginTop: "15px",
                                          marginLeft: "1px",
                                          marginBottom: "-8px",
                                          fontSize: "16px",
                                        }}
                                      >
                                        Hot
                                      </p>
                                    </Grid>
                                    <Grid item lg={4}>
                                      <WhatshotTwoToneIcon style={{ marginTop: "-60px", marginLeft: "55px", marginBottom: "6px", color: 'DF2038' }} />
                                    </Grid>
                                  </Grid></span>
                                }
                              />
                            </div>
                          </Grid>{" "}
                          <Grid
                            item
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ textAlign: "center" }}
                          >
                            <div style={{ marginLeft: "20px" }}>
                              <FormControlLabel
                                control={
                                  <Field
                                    as={Radio}
                                    type="radio"
                                    name="leadscoringvalue"
                                    color="primary"
                                    value="followupcold"
                                    style={{
                                      fontSize: "12px",
                                      color: "#f46d25",
                                    }}
                                    checkedIcon={<CheckBoxIcon />}
                                    icon={<CheckBoxOutlineBlankIcon />}
                                  />
                                }
                                label={
                                  <span style={{ fontSize: "15px" }}><Grid continer spacing={2}>
                                    <Grid item lg={7}>
                                      <h5
                                        style={{
                                          color: "#1f59a6",
                                          fontWeight: "bold",
                                          marginTop: "15px",
                                          marginLeft: "1px",
                                          marginBottom: "-8px",
                                          fontSize: "16px",
                                        }}
                                      >
                                        Cold
                                      </h5>
                                    </Grid>
                                    <Grid item lg={4}>
                                      <AcUnitIcon style={{ marginTop: "-60px", marginLeft: "55px", marginBottom: "6px", color: '2356A5' }} />
                                    </Grid>
                                  </Grid></span>
                                }
                              />
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ textAlign: "center" }}
                          >
                            <div style={{ marginLeft: "20px" }}>
                              <FormControlLabel
                                control={
                                  <Field
                                    as={Radio}
                                    type="radio"
                                    name="leadscoringvalue"
                                    color="primary"
                                    value="followupwarm"
                                    style={{
                                      fontSize: "12px",
                                      color: "#f46d25",
                                    }}
                                    checkedIcon={<CheckBoxIcon />}
                                    icon={<CheckBoxOutlineBlankIcon />}
                                  />
                                }
                                label={
                                  <span style={{ fontSize: "15px" }}><Grid continer spacing={2}>
                                    <Grid item lg={7}>
                                      <p
                                        style={{
                                          color: "#e48435",
                                          fontWeight: "bold",
                                          marginTop: "15px",
                                          marginLeft: "1px",
                                          marginBottom: "-8px",
                                          fontSize: "16px",
                                        }}
                                      >
                                        Warm
                                      </p>
                                    </Grid>
                                    <Grid item lg={4}>
                                      <BrightnessHighIcon style={{ marginTop: "-60px", marginLeft: "55px", marginBottom: "6px", color: 'EA8A23' }} />
                                    </Grid>
                                  </Grid></span>
                                }
                              />
                            </div>
                          </Grid>
                        </>
                      ) : null}
                      {leadscoring == true ? (
                        <>
                          {" "}
                          <Grid item md={12} sm={12} xs={12}>
                            <Field
                              as={TextField}
                              name="reason"
                              type="text"
                              placeholder='reason'
                              fullWidth
                              label="Reason *"
                              variant="outlined"
                              size="small"
                            />
                            <ErrorMessage name="reason">
                              {(error) => (
                                <div className={classes.error}>{error}</div>
                              )}
                            </ErrorMessage>
                          </Grid>
                        </>
                      ) : null}
                    </Grid>
                  </div>
                  <Grid item md={12} sm={12} xs={12}
                    style={{ textAlign: "center" }}>
                    {loading ?
                      <Button disabled style={{ paddingRight: '16px' }}
                      >
                        <i
                          className="fa fa-refresh fa-spin"
                          style={{
                            marginLeft: "-12px",
                            marginRight: "8px",
                          }}
                        ></i>
                        Submit
                      </Button> :
                      <Button type="submit">
                        Submit
                      </Button>
                    }
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
      </MuiPickersUtilsProvider>
    </div>
  );
}
