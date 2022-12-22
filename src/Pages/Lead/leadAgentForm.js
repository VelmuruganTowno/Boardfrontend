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
import { Numbers } from "./Data";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import MaterialSelect from "../../components/Select/MaterialSelect";
import * as Yup from "yup";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "100%",
    minWidth: "75%",
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
    color: "#f46d25",
  },
  paper: {
    padding: "15px 20px",
    marginLeft: "3px",
    width: "95.79%",
    marginTop: "-1.6px",
    boxShadow: "0px 1px 3px 1px #343a40b8",
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
	propertyId:"",
	propertyName:"",
	displayName:"",
	noofrooms:"",
	noofadults:"",
	noofchild:"",
	checkin:null,
	checkout:null,
	mealplan:"",
	bookingStatus:"",
	assignTo:"",
};
const BoardBasic = [
  { value: "ep", label: "EP" },
  { value: "cp", label: "CP" },
  { value: "map", label: "MAP" },
  { value: "ap", label: "AP" },
];
export default function LeadAgentForm(props) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [assignTo, setLeadassignTo] = useState([]);
  //const hotelDetails = useSelector((state) => state.hotelDetail.hotelDetails);
  const [adult, setAdult] = useState(0);
  const [propertyList, setPropertyList] = useState([]);
  const [childern, setChildern] = useState(0);
  const [noofRooms, setNoofRooms] = useState(0);
  const [meal, setMeal] = useState("");
  const [room, setRoom] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const { onClose, open, selectedId } = props;
  const [agentLead, setAgentLead] = useState("");
  const [leadscorings, setLeadscoring] = useState(false);
  const [leadscoring, setLeadscorings] = useState(false);
  const [leadSource, setLeadSource] = useState([]);
  useEffect(() => {
    LeadassignTo();
    LeadSource();
    if (selectedId) {
      agentLeadSingleData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);
  const agentLeadSingleData = async () => {
    Api.get(`agenttryingbooking/${selectedId}`).then((res) => {
      setAgentLead(res.data);
      setAdult(res.data.noofadults);
      setChildern(res.data.noofchild);
      setNoofRooms(res.data.noofrooms);
      setRoom(res.data.displayName);
      setMeal(res.data.mealplan);
      setCheckin(res.data.checkin);
      setCheckout(res.data.checkout);
      setPropertyId(res.data.propertyId);
 Api.get(`getdisplayname/${res.data.propertyId}`).then((res) => {
        setPropertyList(res.data);
      });
    });
  };
  const LeadassignTo = (event) => {
    Api.get(`leadassignfor/${uniqueid}`).then((res) => {
      setLeadassignTo(res.data);
    });
  };
  const Hoteloptions =
  propertyList &&
  propertyList.map((hotel) => {
    return { label: hotel.displayName, value: hotel.displayName };
  });
  const handleAdultChange = (selectedOption) => {
    setAdult(selectedOption.value);
  };
  const handleChildernChange = (selectedOption) => {
    setChildern(selectedOption.value);
  };
  const handlenoofRoomsChange = (selectedOption) => {
    setNoofRooms(selectedOption.value);
  };
  const handlemealChange = (selectedOption) => {
    setMeal(selectedOption.value);
  };
  const handleroomChange = (selectedOption) => {
    setRoom(selectedOption.label);};
  const LeadSource = (event) => {
    Api.get(`commonfeatureonly/${uniqueid}/leadSource`).then((res) => {
      setLeadSource(res.data);
    });
  };
  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateagentLead(fields);
    } else {
      createagentLead(fields);
    }
  }

  function createagentLead(fields) {
    const newdata = { ...fields, ...create };
    Api.post("agenttryingbooking", newdata).then((res) => {
      onClose(true);
      toast.success("Lead Created Successfull");
    });
  }
  function updateagentLead(fields) {
    const newdata = { ...fields, ...create };
    newdata.propertyId=propertyId;
    newdata.displayName=room;
    newdata.noofrooms=noofRooms;
    newdata.noofadults=adult;
    newdata.noofchild=childern;
    newdata.checkin=checkin;
    newdata.checkout=checkout;
    newdata.mealplan=meal;
    console.log(newdata);
    const newsdata = { ...fields, ...create };
    console.log(newsdata);
    Api.put(`agenttryingbooking/${selectedId}`, newdata).then((res) => {
      onClose(true);
      toast.success("Lead Updated Successfull");
    });
    
  }

  const validationSchema = Yup.object({
    leadsource: Yup.string().required("Source is Required"),
    assignTo: Yup.string().required("Lead Assigned To is Required"),
  });
  const handleClose = () => {
    onClose(true);
    setAgentLead(initialValues);
  };
  const leadassignTooptions =
    assignTo &&
    assignTo.map((lead) => {
      return { label: lead.name, value: lead.username };
    });
  const LeadSourceoptions =
    leadSource &&
    leadSource.map((lead) => {
      return { label: lead, value: lead };
    });
  return (
    <>
      {" "}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={handleClose}
          fullWidth
        >
          <h2 style={{ color: "#F46D25", margin: "0px" }}>
            {agentLead.id ? "Update Agent Lead" : "Add New Lead"}
          </h2>
          <Formik
            initialValues={agentLead || initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ values, isValid, setFieldValue }) => {
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
                    <h4 className={classes.heading}>Travel Details</h4>
                  </Grid>
                  <div className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item lg={6}>
                            <Field
                              name="propertyName"
                              as={TextField}
                              label="property Name"
                              value={values.propertyName}
                              autoFocus
                              variant="outlined"
                              required
                              disabled
                              fullWidth
                              size="small"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="room"
                              placeholder="Select Room"
                              value={room||""}
                              onChange={handleroomChange}
                              options={Hoteloptions}
                            /> <ErrorMessage name="room">
                            {(error) => (
                              <div className={classes.error}>{error}</div>
                            )}
                          </ErrorMessage>
                          </Grid>
                          <Grid item lg={6}>
                            <DatePicker
                              label="Check-In"
                              inputVariant="outlined"
                              fullWidth
                              size="small"
                              animateYearScrolling
                              format="dd/MM/yyyy"
                              variant="inline"
                              autoOk="true"
                              value={checkin}
                              onChange={(e) => setCheckin(e)}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <DatePicker
                              label="Check-Out"
                              inputVariant="outlined"
                              size="small"
                              fullWidth
                              format="dd/MM/yyyy"
                              animateYearScrolling
                              variant="inline"
                              autoOk="true"
                              value={checkout}
                              onChange={(e) => setCheckout(e)}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="noofRooms"
                              placeholder="No. of Rooms"
                              value={noofRooms}
                              onChange={handlenoofRoomsChange}
                              options={Numbers}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="adult"
                              placeholder="Adult"
                              value={adult}
                              onChange={handleAdultChange}
                              options={Numbers}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="childern"
                              placeholder="Childern"
                              value={childern}
                              onChange={handleChildernChange}
                              options={Numbers}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <MaterialSelect
                              name="mealPlan"
                              placeholder="Meal plan"
                              value={meal}
                              onChange={handlemealChange}
                              options={BoardBasic}
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
                          name="assignTo"
                          placeholder="Lead Assigned To *"
                          options={leadassignTooptions}
                          value={values.assignTo || ""}
                          onChange={(Value) => {
                            let lead = Value.value;
                            setFieldValue("assignTo", lead);
                           }}
                        />
                        <ErrorMessage name="assignTo">
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
                                  setLeadscoring(false) ||
                                  setLeadscorings(false)
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
                                  setLeadscoring(true) || setLeadscorings(false)
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
                                  setLeadscoring(false) ||
                                  setLeadscorings(false)
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
                                  setLeadscoring(false) || setLeadscorings(true)
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
                                  <AcUnitIcon style={{ marginTop: "-60px", marginLeft: "55px", marginBottom: "6px", color:'2356A5' }} />
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
                                        <BrightnessHighIcon style={{ marginTop: "-60px", marginBottom: "6px", color: "EA8A23" }} />
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
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "center" }}
                  >
                    <Button type="submit" disabled={!isValid} color="primary">
                      Submit
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
      </MuiPickersUtilsProvider>
    </>
  );
}
