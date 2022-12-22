import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, TextField, Button } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Bluk.css";
import axios from "axios";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import { format } from "date-fns";
import { useParams, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { toast } from "react-toastify";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: "100px",
    "& > *": {
      margin: "20px 20px 0px 20px",
      width: theme.spacing(16),
      height: "auto",
    },
  },
  button: {
    background: "#F46D25",
    "@media(max-width:767px)": {
      background: "#343A40",
    },
  },
  paper: {
    width: "100%",
  },

  heading: {
    borderBottom: "1px solid #ADD8E6",
    background: "#fff",
    marginTop: "15px",
    color: "#F46D25",
    paddingBottom: "20px",
    paddingLeft: "30px",
    fontSize: "28px",
    paddingRight: "30px",
  },
  layout: {
    margin: "40px 20px",
    display: "flex",
  },
  label: {
    lineHeight: "2",
    fontSize: "18px",
    fontWeight: "blod",
    color: "#0000009e",
  },
}));

const dayCheck = [
  { id: "sun", name: "S" },
  { id: "mon", name: "M" },
  { id: "tue", name: "T" },
  { id: "wed", name: "W" },
  { id: "thu", name: "T" },
  { id: "fri", name: "F" },
  { id: "sat", name: "S" },
];

export default function Bulkupdate() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
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
  const [Buttonfull, setButtonfull] = useState(false);
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
    setButtonfull(true);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const updateRent = (e) => {
    console.log(e);
    const StartDate = format(startDate, "yyyy-MM-dd");
    let EndDate;
    if (endDate != null && endDate !== "" && endDate !== undefined) {
      EndDate = format(endDate, "yyyy-MM-dd");
    }
    console.log(roomRent);
    const dataSubmit = {
      propertyId: propertyId,
      startDate: StartDate,
      endDate: EndDate,
      days: inputs,
      displayName: e.map((item) => item.displayName).toString(),
      roomRent: e.map((item) => item.roomRent).toString(),
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
        <Paper className={classes.paper} variant="outlined">
          <h4 className={classes.heading} >
            Bulk Update{" "}
            <ArrowBackIcon
              onClick={history.goBack}
              style={{ float: "right" }}
            />
          </h4>
          <div className={classes.layout}>
            <Grid container spacing={4}>
              <Grid item sm={4}>
                <p style={{ margin: "0px", marginBottom: "10px" }}>
                  Select Date to Update Inventory
                </p>
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  wrapperClassName="datePicker"
                  format="y-MM-dd"
                />
              </Grid>
              <Grid item sm={8}>
                <p style={{ margin: "0px", marginBottom: "10px" }}>
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
            {bulkList.map((roomData) => {
              return (
                <Grid container spacing={2}>
                  <Grid container key={roomData.id}>
                    <Accordion
                      style={{
                        borderRadius: "5px",
                        marginLeft: "15px",
                        marginRight: "10px",
                      }}
                    >
                      <AccordionSummary
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#cbc9c94d",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <h4
                          style={{
                            margin: "0px",
                            color: "#F46D25",
                          }}
                        >
                          {roomData.displayName}
                        </h4>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ padding: "0px", backgroundColor: "#efefef73" }}
                      >
                        {" "}
                        <Grid container spacing={2} style={{ padding: "0px" }}>
                          <Grid
                            item
                            sm={11}
                            style={{ padding: "5px", marginLeft: "15px" }}
                          >
                            <TextField
                              name="roomRent"
                              fullWidth
                              type="text"
                              autoComplete="off"
                              onChange={(e) => handleroom(e, roomData.id)}
                              size="small"
                              margin="dense"
                              marginLeft="25px"
                              variant="outlined"
                            />
                          </Grid>
                          <br />
                          <Grid item sm={11} style={{ textAlign: "center" }}>
                            {Buttonfull ? (
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => updateRent(roomRent)}
                              >
                                Submit
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                size="small"
                                disabled
                                color="primary"
                              >
                                Submit
                              </Button>
                            )}
                          </Grid>
                          <Grid container spacing={1} item sm={12}>
                            <p
                              style={{
                                color: "#e90a0ade",
                                marginTop: "-11px",
                                marginLeft: "15px",
                                fontSize: "12px",
                              }}
                            >
                              * Click <b>Submit</b> to update{" "}
                              {roomData.displayName}'s room rent
                            </p>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              );
            })}
          </div>
        </Paper>
      </div>
    </>
  );
}
