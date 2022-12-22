import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";
import { Paper, Button } from "@material-ui/core";
import Select from "react-select";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Api from "../../Service/Api";
import { format, addDays } from "date-fns";
import moment from "moment";
import _ from "lodash";

import AgentWiseSalesReport from "./AgentWiseSalesReport";
import TotalClients from "./TotalClients";
import TotalHotels from "./TotalHotels";
import FinanceReport from "./FinanceReport";
import LeadReport from './LeadReport';

import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
  root: {
    // paddingTop: "100px",
    // margin: "0px 10px",
    padding:'5.9% 1% 1% 1%',
  },
  paper: {
    padding: "20px",
    background: "#F4F4F4",
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
  topBorder: {
    position: "absolute",
    top: "-9px",
    zIndex: "10",
    left: "12px",
    color: "#fff",
    background: "#F46D25",
    borderRadius: "4px",
    padding: "1px 4px",
    fontSize: "12px",
  },
}));

const filterOptions = [
  { label: 'All', value: '', icon: " " },
  { label: 'New', value: 'new', icon: <FiberNewIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
  { label: 'Followup', value: 'followup', icon: <EventNoteIcon style={{ marginLeft: "10px", color: '#0000a5', fontSize: '26px' }} /> },
  { label: 'Lost', value: 'lost', icon: <ThumbDownIcon style={{ marginLeft: "10px", color: '#abaaaa', fontSize: '26px' }} /> },
  { label: 'Closed', value: 'closed', icon: <ThumbUpIcon style={{ marginLeft: "10px", color: '#1eaf1e', fontSize: '26px' }} /> },
  { label: 'Warm', value: 'followupwarm', icon: <BrightnessHighIcon style={{ marginLeft: "10px", color: '#febc12', fontSize: '26px' }} /> },
  { label: 'Hot', value: 'followuphot', icon: <WhatshotTwoToneIcon style={{ marginLeft: "10px", color: '#e71e24', fontSize: '26px' }} /> },
  { label: 'Cold', value: 'followupcold', icon: <AcUnitIcon style={{ marginLeft: "10px", color: '#8aceee', fontSize: '26px' }} /> },

]

export default function Report() {
  const classes = useStyles();
  const uniqueid = localStorage.getItem("unique_id");
  const [reportType, setReportType] = useState({
    value: "financeReport",
    label: "Finance Report",
  });
  const [hotelList, setHotelList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [errorFrom, setError] = useState({});
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [bookingDateFrom, setBookingDateFrom] = useState(null);
  const [bookingDateTo, setBookingDateTo] = useState(null);
  const [hotelName, setHotelName] = useState({
    value: "all",
    label: "All",
  });
  const [agent, setAgent] = useState({
    value: "all",
    label: "All",
  });
  const [reportData, setReportData] = useState([]);
  const [leadscoringFilter, setLeadscoringFilter] = useState({
    value: "",
    label: "All",
  });
  

  const RestData = () => {
    setReportData([]);
    setAgent({
      value: "all",
      label: "All",
    });
    setHotelName({
      value: "all",
      label: "All",
    });
    setLeadscoringFilter({
      value: "",
      label: "All",
    });
    setBookingDateFrom(null);
    setBookingDateTo(null);
    setCheckout(null);
    setCheckin(null);
    setError({});
    setReportType({
      value: "financeReport",
      label: "Finance Report",
    });
  };
  useEffect(() => {
    if (reportType.value === "totalHotels") {
      HotelReport();
    }
    hotelFetch();
    AgentFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType]);

  const hotelFetch = () => {
    Api.get("propertybasicpropertydetailsall").then((res) => {
      const Merged = [
        ...res.data,
        ...[
          {
            displayName: "All",
            propertyId: "all",
          },
        ],
      ];
      let sorted = _.orderBy(Merged, ["displayName"], ["asec"]);
      setHotelList(sorted);
    });
  };
  const AgentFetch = () => {
    Api.get(`AgentList/${uniqueid}`).then((res) => {
      let sorted = _.orderBy(res.data, [], ["asec"]);
      let mapped_data = sorted.map((agent) => ({
        label: agent,
        value: agent,
      }))
      let Merged = [ ...[{label: "All",value: "all"}],...mapped_data];
      setAgentList(Merged);
    });
  };

  const FinanceReportData = (Data) => {
    Api.post("FinanceReport", Data).then((res) => {
      setReportData(res.data);
    });
  };

  const AgentReport = (Data) => {
    Api.post("AgentWiseSalesReport", Data).then((res) => {
      setReportData(res.data);
    });
  };
  const HotelReport = () => {
    Api.get("HotelReport").then((res) => {
      setReportData(res.data);
    });
  };
  const ClientReport = (Data) => {
    Api.post("ClientReport", Data).then((res) => {
      setReportData(res.data);
    });
  };
  const LeadReports = (Data) => {
    Api.post(`reportboardlead/${uniqueid}`, Data).then((res) => {
      console.log("Reports|LeadReports|",res.data);
      setReportData(res.data);
    });
  };

  const checkDateErrors = (e, triggerDate) => {
    const errors = {};
    if  (triggerDate==="bookingDateFrom"){
      if(_.isDate(bookingDateTo)){
        const MyNext = addDays(e, 90);
        if (moment(MyNext).isSameOrAfter(bookingDateTo) == false) {
          errors.bookingDateFrom =
          reportType.value === "leadReport"?"Select 90 days Only Before the Date of CreatedDateTo":"Select 90 days Only Before the Date of BookingDateTo";
        }
        if (moment(e).isBefore(bookingDateTo) == false) {
          errors.bookingDateFrom = reportType.value === "leadReport"?"Select Less than Created Date To":"Select Less than Booking Date To";
        }
      }
    }
    else if (triggerDate==="bookingDateTo"){
      if(_.isDate(bookingDateFrom)){
        const MyNext = addDays(bookingDateFrom, 90);
        if (moment(MyNext).isSameOrAfter(e) == false) {
          errors.bookingDateTo =
          reportType.value === "leadReport"?"Select 90 days Only From the Date of CreatedDateFrom":"Select 90 days Only From the Date of BookingDateFrom";
        }
        if (moment(bookingDateFrom).isBefore(e) == false) {
          errors.bookingDateTo = reportType.value === "leadReport"?"Select Greater than Created Date From":"Select Greater than Booking Date From";
        }
      }
    }

    setError(errors);

  }

  const Submit = (e) => {
    e.preventDefault();
    const errors = {};

    if (bookingDateFrom !== null) {
      if (bookingDateTo == null) {
        errors.bookingDateTo = reportType.value === "leadReport"?"CreatedDateTo Required":"BookingDateTo Required";
      }
    }
    if (bookingDateTo !== null) {
      if (bookingDateFrom == null) {
        errors.bookingDateFrom = reportType.value === "leadReport"?"CreatedDateFrom Required":"BookingDateFrom Required";
      }
    }
    if (!checkout && !checkin) {
      if (!bookingDateFrom && !bookingDateTo) {
        errors.bookingDateTo = reportType.value === "leadReport"?"CreatedDateTo Required":"BookingDateTo Required";
        errors.bookingDateFrom = reportType.value === "leadReport"?"CreatedDateFrom Required":"BookingDateFrom Required";
      }
    }

    if (_.isDate(checkin) && _.isDate(checkout)) {
      const MyNext = addDays(checkin, 90);
      if (moment(MyNext).isSameOrAfter(checkout) == false) {
        errors.checkoutValid = "Select 90 days Only From the Date of Checkin";
      }
    }
    if (_.isDate(bookingDateFrom) && _.isDate(bookingDateTo)) {
      const MyNext = addDays(bookingDateFrom, 90);
      if (moment(MyNext).isSameOrAfter(bookingDateTo) == false) {
        errors.bookingDateTo =
        reportType.value === "leadReport"?"Select 90 days Only From the Date of CreatedDateFrom":"Select 90 days Only From the Date of BookingDateFrom";
      }
    }
    if (_.isDate(bookingDateFrom)) {
      if (bookingDateTo == null) {
        errors.bookingDateTo = reportType.value === "leadReport"?"CreatedDateTo Required":"BookingDateTo Required";
      }
    }
    if (_.isDate(bookingDateTo)) {
      if (bookingDateFrom == null) {
        errors.bookingDateFrom = reportType.value === "leadReport"?"CreatedDateFrom Required":"BookingDateFrom Required";
      }
    }

    if (_.isDate(checkin) && _.isDate(checkout)) {
      if (moment(checkin).isBefore(checkout) == false) {
        errors.checkoutValid = "Select Greater than Checkin";
      }
    }

    if (_.isDate(bookingDateFrom) && _.isDate(bookingDateTo)) {
      if (moment(bookingDateFrom).isBefore(bookingDateTo) == false) {
        errors.bookingDateTo = reportType.value === "leadReport"?"Select Greater than Created Date From":"Select Greater than Booking Date From";
      }
    }

    setError(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        checkin: checkin !== null ? format(checkin, "yyyy-MM-dd") : "",
        checkout: checkout !== null ? format(checkout, "yyyy-MM-dd") : "",
        from: bookingDateFrom !== null ? format(bookingDateFrom, "yyyy-MM-dd") : "",
        to: bookingDateTo !== null ? format(bookingDateTo, "yyyy-MM-dd") : "",
        hotel: hotelName.value !== "all" ? hotelName.value : "",
        agent: agent.value !== "all" ? agent.value : "",
        leadscoring: leadscoringFilter.value,
        uniqueid: uniqueid,
        
      };
      if (reportType.value === "financeReport") {
        FinanceReportData(data);
      }
      if (reportType.value === "leadReport") {
        LeadReports(data);
      }
      if (reportType.value === "agentWiseSalesReport") {
        AgentReport(data);
      }
      if (reportType.value === "totalClient") {
        ClientReport(data);
      }
    }
  };

  const Re = (reportType) => {
    setReportType(reportType);
    setReportData([]);
    setAgent({
      value: "all",
      label: "All",
    });
    setHotelName({
      value: "all",
      label: "All",
    });
    setLeadscoringFilter({
      value: "",
      label: "All",
    });
    setBookingDateFrom(null);
    setBookingDateTo(null);
    setCheckout(null);
    setCheckin(null);
    setError({});
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Paper elevation={3} className={classes.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={2}>

              {/* Reports Type Select Box  */}
                <Grid item lg={3}>
                  <div style={{ position: "relative" }}>
                    <span className={classes.topBorder}>Reports Type</span>

                    <Select
                      options={[
                        { value: "financeReport", label: "Finance Report" },
                        {
                          value: "agentWiseSalesReport",
                          label: "Agent Wise Sales Report",
                        },
                        { value: "totalHotels", label: "Total Hotels" },
                        { value: "totalClient", label: "Total Client" },
                        { value: "refundReport", label: "Refund Report" },
                        { value: "leadReport", label: "Lead Report" },
                      ]}
                      placeholder=""
                      value={reportType}
                      onChange={Re}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9,
                        }),
                        control: (base, state) => ({
                          ...base,
                          "&:hover": { borderColor: "#f46d25" },
                          borderColor: "#f46d25",
                          boxShadow: "none",
                        }),
                      }}
                    />
                  </div>
                </Grid>

                {/* Agent Select Box  */}
                {reportType.value === "financeReport" ||
                  reportType.value === "agentWiseSalesReport" ||
                  reportType.value === "leadReport" ? (
                  <Grid item lg={3}>
                    <div style={{ position: "relative" }}>
                      <span className={classes.topBorder}>Agent</span>
                      <Select
                        options={agentList}
                        placeholder=""
                        value={agent}
                        onChange={(agent) => {
                          setAgent(agent);
                        }}
                        styles={{
                          container: (provided) => ({
                            ...provided,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9,
                          }),
                          control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            borderColor: "#f46d25",
                            boxShadow: "none",
                          }),
                        }}
                      />
                    </div>
                  </Grid>
                ) : null}

                {/* Hotels Select Box   */}
                {reportType.value === "financeReport" ||
                  reportType.value === "agentWiseSalesReport" ||
                  reportType.value === "leadReport" ? (
                  <Grid item md={3}>
                    <div style={{ position: "relative" }}>
                      <span className={classes.topBorder}>Hotels</span>
                      <Select
                        placeholder=""
                        options={hotelList.map((hotel) => ({
                          label: hotel.displayName,
                          value: hotel.propertyId,
                        }))}
                        value={hotelName}
                        onChange={(hotelName) => setHotelName(hotelName)}
                        styles={{
                          container: (provided) => ({
                            ...provided,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9,
                          }),
                          control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            borderColor: "#f46d25",
                            boxShadow: "none",
                          }),
                        }}
                      />
                    </div>
                  </Grid>
                ) : null}

                {/* Lead Scoring Filter By Select Box*/}
                {reportType.value === "leadReport" ? (
                  <Grid item md={3}>
                    <div style={{ position: "relative" }}>
                      <span className={classes.topBorder}>Filter By</span>
                      <Select
                        placeholder=""
                        options={filterOptions.map((each) => ({
                          label: each.label,
                          value: each.value,
                          icon: each.icon,
                        }))}
                        value={leadscoringFilter}
                        onChange={(leadscoringFilter) => setLeadscoringFilter(leadscoringFilter)}
                        styles={{
                          container: (provided) => ({
                            ...provided,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9,
                          }),
                          control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            borderColor: "#f46d25",
                            boxShadow: "none",
                          }),
                        }}
                      />
                    </div>
                  </Grid>
                ) : null}
                
                {/* Check In Select Box  */}
                {reportType.value === "financeReport" ||
                  reportType.value === "agentWiseSalesReport" ? (
                  <Grid item md={3}>
                    <div style={{ position: "relative" }}>
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
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#fff",
                            background: "#F46D25",
                            borderRadius: "4px",
                            padding: "2px 4px",
                          },
                        }}
                      />
                      <CalendarTodayIcon className={classes.icon} />
                    </div>
                  </Grid>
                ) : null}

                {/* Check Out Select Box  */}
                {reportType.value === "financeReport" ||
                  reportType.value === "agentWiseSalesReport" ? (
                  <Grid item md={3}>
                    <div style={{ position: "relative" }}>
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
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#fff",
                            background: "#F46D25",
                            borderRadius: "4px",
                            padding: "2px 4px",
                          },
                        }}
                      />
                      <CalendarTodayIcon className={classes.icon} />
                    </div>
                    <span style={{ color: "red" }}>
                      {errorFrom.checkoutValid}
                    </span>
                  </Grid>
                ) : null}

                {/* Date From Select Box  */}
                {reportType.value === "financeReport" ||
                  reportType.value === "agentWiseSalesReport" ||
                  reportType.value === "totalClient" ||
                  reportType.value === "leadReport" ? (
                  <Grid item md={3}>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        label= {reportType.value === "leadReport"?"Created Date From":"Booking Date From"}
                        inputVariant="outlined"
                        fullWidth
                        size="small"
                        animateYearScrolling
                        format="dd/MM/yyyy"
                        variant="inline"
                        autoOk="true"
                        value={bookingDateFrom}
                        onChange={(e) => {setBookingDateFrom(e);checkDateErrors(e,"bookingDateFrom");}}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#fff",
                            background: "#F46D25",
                            borderRadius: "4px",
                            padding: "2px 4px",
                          },
                        }}
                      />
                      <CalendarTodayIcon className={classes.icon} />
                    </div>
                    <span style={{ color: "red" }}>
                      {errorFrom.bookingDateFrom}
                    </span>
                  </Grid>
                ) : null}

                {/* Date To Select Box  */}
                {reportType.value === "financeReport" ||
                  reportType.value === "agentWiseSalesReport" ||
                  reportType.value === "totalClient" ||
                  reportType.value === "leadReport" ? (
                  <Grid item md={3}>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        label= {reportType.value === "leadReport"? "Created Date To":"Booking Date To"}
                        inputVariant="outlined"
                        size="small"
                        fullWidth
                        format="dd/MM/yyyy"
                        animateYearScrolling
                        variant="inline"
                        autoOk="true"
                        value={bookingDateTo}
                        onChange={(e) => {setBookingDateTo(e);checkDateErrors(e,"bookingDateTo");}}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#fff",
                            background: "#F46D25",
                            borderRadius: "4px",
                            padding: "2px 4px",
                          },
                        }}
                      />
                      <CalendarTodayIcon className={classes.icon} />
                    </div>
                    <span style={{ color: "red" }}>
                      {errorFrom.bookingDateTo}
                    </span>
                  </Grid>
                ) : null}

                {/* Submit and Reset Buttons  */}
                {reportType.value === "totalHotels" ? null : (
                  <Grid item lg={12} style={{ textAlign: "center" }}>
                    <Button onClick={Submit} color="primary">Submit</Button>
                    <Button onClick={RestData} color="secondary" style={{ marginLeft: "10px" }}>
                      Reset
                    </Button>
                  </Grid>
                )}

              </Grid>
            </MuiPickersUtilsProvider>
          </Paper>
        </Grid>
        <Grid item lg={12}>
          {reportType.value === "financeReport" ? (
            <FinanceReport reportData={reportData} />
          ) : null}
          {reportType.value === "agentWiseSalesReport" ? (
            <AgentWiseSalesReport reportData={reportData} />
          ) : null}
          {reportType.value === "totalHotels" ? (
            <TotalHotels reportData={reportData} />
          ) : null}
          {reportType.value === "totalClient" ? (
            <TotalClients reportData={reportData} />
          ) : null}
          {reportType.value === "leadReport" ? (
            <LeadReport reportData={reportData} />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}
