import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, TextField, Button } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateRangeIcon from "@material-ui/icons/DateRange";
import "./Bluk.css";
import axios from "axios";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import { format } from "date-fns";
import { useParams, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingTop: "100px",
    "& > *": {
      margin: "20px 20px 0px 20px",
      width: theme.spacing(16),
      height: "auto",
    },
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
  button: {
    background: "#F46D25",
    marginBottom: "-15px",
    "@media(max-width:767px)": {
      background: "#343A40",
    },
  },
  paper: {
    width: "100%",
  },
  headingr: {
    background: "#fff",
    marginTop: "15px",
    color: "#000",
    paddingLeft: "20px",
    paddingBottom: "20px",
    fontSize: "28px",
    paddingRight: "30px",
  },
  headingd: {
    background: "#fff",
    marginTop: "15px",
    fontWeight: "bold",
    color: "#000",
    paddingBottom: "2px",
    fontSize: "20px",
    paddingRight: "30px",
  },
  heading: {
    borderBottom: "1px solid #ADD8E6",
    background: "#fff",
    marginTop: "15px",
    color: "#F46D25",
    paddingBottom: "5px",
    paddingLeft: "30px",
    fontSize: "32px",
    paddingRight: "30px",
  },
  layout: {
    margin: "40px 20px",
    display: "flex",
    paddingLeft: "80px",
    paddingRight: "30px",
  },
  label: {
    lineHeight: "2",
    fontSize: "18px",
    fontWeight: "blod",
    color: "#0000009e",
  },
}));

const dayCheck = [
  { id: "sun", name: "Sunday" },
  { id: "mon", name: "Monday" },
  { id: "tue", name: "Tuesday" },
  { id: "wed", name: "Wednesday" },
  { id: "thu", name: "Thursday" },
  { id: "fri", name: "Friday" },
  { id: "sat", name: "Saturday" },
];

export default function Bulkupdate() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { propertyId } = useParams();
  const [bulkList, setBulkList] = useState([]);
  let history = useHistory();
  const [inputs, setInputs] = useState([
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ]);
  const [roomRent, setRoomRent] = useState([]);
  const handleroom = (e, id) => {
    var result = [...bulkList];
    const result1 = result.map((x) => {
      if (x.id === id) x.roomRent = e.target.value;
      return x;
    });
    var found = result1.filter(function (item) {
      return item.id === id;
    });
    setRoomRent(found);
  };

  const onChangestart = (date) => {
    setStartDate(date);
  };
  const onChangeend = (date) => {
    setEndDate(date);
  };
  const updateRent = () => {
    const StartDate = format(startDate, "yyyy-MM-dd");
    let EndDate;
    if (endDate != null && endDate !== "" && endDate !== undefined) {
      EndDate = format(endDate, "yyyy-MM-dd");
    }
    const dataSubmit = {
      propertyId: propertyId,
      startDate: StartDate,
      endDate: EndDate,
      days: inputs,
      displayName: roomRent.map((item) => item.displayName).toString(),
      roomRent: roomRent.map((item) => item.roomRent).toString(),
    };
    Api.post("blukupdate", dataSubmit);
    toast.success("Updated Successfully");
  };
  useEffect(() => {
    BlukViewGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const BlukViewGet = async () => {
    await Api.get("bulkupdateview/" + propertyId).then((res) => {
      setBulkList(res.data);
    });
  };
  return (
    <>
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Paper className={classes.paper} variant="outlined">
            <h4 className={classes.heading}>
              Bulk Update{" "}
              <ArrowBackIcon
                onClick={history.goBack}
                style={{ float: "right" }}
              />
            </h4>
            <div className={classes.layout}>
              <Grid container spacing={4}>
                <Grid item sm={4}>
                  <p
                    style={{ margin: "0px", marginBottom: "10px" }}
                    className={classes.headingd}
                  >
                    Select Date to Update Rate
                  </p>
                  <Grid item sm={12}>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        required
                        label="Start Date"
                        inputVariant="outlined"
                        fullWidth
                        size="small"
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
                </Grid>
                <Grid item sm={4}>
                  <div style={{ position: "relative", marginTop: "39px" }}>
                    <DatePicker
                      required
                      label="End Date"
                      inputVariant="outlined"
                      fullWidth
                      size="small"
                      value={endDate}
                      onChange={onChangeend}
                      animateYearScrolling
                      format="dd/MM/yyyy"
                      variant="inline"
                      disablePast="true"
                      autoOk="true"
                    />
                    <DateRangeIcon className={classes.icon} />
                  </div>
                </Grid>
                <Grid item sm={12}>
                  <p
                    style={{ margin: "0px", marginBottom: "10px" }}
                    className={classes.headingd}
                  >
                    Select Days
                  </p>
                  <div className="weeks">
                    {dayCheck.map((day) => (
                      <div className="round" key={day.id}>
                        <input
                          type="checkbox"
                          value={day.id}
                          defaultChecked={inputs.includes(day.id)}
                          onClick={() => {
                            const index = inputs.findIndex(
                              (item) => item === day.id
                            );
                            if (~index) {
                              setInputs([
                                ...inputs.slice(0, index),
                                ...inputs.slice(index + 1),
                              ]);
                            } else {
                              setInputs([...inputs, day.id]);
                            }
                          }}
                        />
                        <label>{day.name}</label>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.layout}>
              <Grid container spacing={4}>
                <h4 className={classes.headingr}>Room Rates</h4>
                <Grid container spacing={4} style={{ marginTop: "-55px", paddingLeft: "20px", }}>
                  <Grid item sm={8}>
                    {bulkList.map((roomData) => {
                      return (
                        <div key={roomData.id}>
                          <Grid container spacing={4}>
                            <Grid item sm={6}>
                              <TextField
                                style={{ float: "right" }}
                                name="roomRent"
                                label={roomData.displayName}
                                fullWidth
                                type="text"
                                value={roomData.roomRent || ""}
                                autoComplete="off"
                                onChange={(e) => handleroom(e, roomData.id)}
                                size="small"
                                margin="dense"
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item sm={2}>
                              <Button
                                style={{ marginTop: "7px", float: "right" }}
                                onClick={updateRent}
                              >
                                UPDATE
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      );
                    })}
                    <br />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </MuiPickersUtilsProvider>
      </div>
    </>
  );
}
