/* eslint-disable default-case */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import HotelChart from "./HotelChart";
import AgentChart from "./AgentChart";
import UpcomingCheckin from "./UpcomingCheckin";
import UpcomingPayment from "./UpcomingPayment";
import Api from "../../Service/Api";
import "./dashboard.css";
import { formatter } from "../../utils/formatNumber";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    margin: "0px 30px",
    "@media (max-width: 767px)": {
      paddingBottom: "100px",
      margin: "0px 10px",
    },
  },
  paper: {
    padding: "10px",
    textAlign: "center",
    
  },
  paper1: {
    padding: "10px",
    textAlign: "center",
    margin:"10px"
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const uniqueId = localStorage.getItem("unique_id");
  const Auth = localStorage.getItem("auth");
  const Role = localStorage.getItem("role");

  const [daysChange, setDaysChange] = useState("week");
  const [hotel, setHotel] = useState({});
  const [client, setClient] = useState({});
  const [revenue, setRevenue] = useState({});
  const [profit, setProfit] = useState({});
  const [profitTax, setProfitTax] = useState({});
  useEffect(() => {
    HotelCount();
    ClientCount();
    RevenueCount();
    ProfitCount();
    ProfitCountTax();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysChange]);

  const HotelCount = () => {
    Api.get(`TotalPropertyAdded/${uniqueId}`).then((res) => {
      setHotel(res.data);
    });
  };
  const ClientCount = () => {
    let url;
    switch (true) {
      case daysChange == "today" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `TodayClientAdded/${uniqueId}`;
        break;
      case daysChange == "week" && (Role == "Admin" || Role == "Super Admin" ||Role == "Data Manger"):
        url = `WeekClientAdded/${uniqueId}`;
        break;
      case daysChange == "month" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `MonthClientAdded/${uniqueId}`;
        break;
      case daysChange == "today":
        url = `TodayAgentClientAdded/${uniqueId}/${Auth}`;
        break;
      case daysChange == "week":
        url = `WeekAgentClientAdded/${uniqueId}/${Auth}`;
        break;
      case daysChange == "month":
        url = `MonthAgentClientAdded/${uniqueId}/${Auth}`;
        break;
    }
    Api.get(url).then((res) => {
      setClient(res.data);
    });
  };
  const RevenueCount = () => {
    let url;
    switch (true) {
      case daysChange == "today" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `TodayRevenue/${uniqueId}`;
        break;
      case daysChange == "week" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `WeekRevenue/${uniqueId}`;
        break;
      case daysChange == "month" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `MonthRevenue/${uniqueId}`;
        break;
      case daysChange == "today":
        url = `TodayAgentRevenue/${uniqueId}/${Auth}`;
        break;
      case daysChange == "week":
        url = `WeekAgentRevenue/${uniqueId}/${Auth}`;
        break;
      case daysChange == "month":
        url = `MonthAgentRevenue/${uniqueId}/${Auth}`;
        break;
    }
    Api.get(url).then((res) => {
      setRevenue(res.data);
    });
  };
  const ProfitCount = () => {
    let url;
    switch (true) {
      case daysChange == "today" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `TodayProfit/${uniqueId}`;
        console.log(url);
        break;
      case daysChange == "week" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `WeekProfit/${uniqueId}`;
        break;
      case daysChange == "month" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `MonthProfit/${uniqueId}`;
        break;
      case daysChange == "today":
        url = `TodayAgentProfit/${uniqueId}/${Auth}`;
        break;
      case daysChange == "week":
        url = `WeekAgentProfit/${uniqueId}/${Auth}`;
        break;
      case daysChange == "month":
        url = `MonthAgentProfit/${uniqueId}/${Auth}`;
        break;
    }
    Api.get(url).then((res) => {
      console.log("Dashboard|ProfitCount|res.data: ",res.data)
      setProfit(res.data);

    });
  };
  const ProfitCountTax = () => {
    let url;
    switch (true) {
      case daysChange == "today" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `TodayWithOutTaxProfit/${uniqueId}`;
        break;
      case daysChange == "week" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `WeekWithOutTaxProfit/${uniqueId}`;
        break;
      case daysChange == "month" && (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `MonthWithOutTaxProfit/${uniqueId}`;
        break;
      case daysChange == "today":
        url = `TodayAgentWithOutTaxProfit/${uniqueId}/${Auth}`;
        break;
      case daysChange == "week":
        url = `WeekAgentWithOutTaxProfit/${uniqueId}/${Auth}`;
        break;
      case daysChange == "month":
        url = `MonthAgentWithOutTaxProfit/${uniqueId}/${Auth}`;
        break;
    }
    Api.get(url).then((res) => {
      setProfitTax(res.data);
    });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Box style={{ textAlign: "end" }}>
                  <div className="radio-group">
                    <input
                      className="customRadio"
                      type="radio"
                      id="today"
                      name="daysChange"
                      value="today"
                      onClick={() => setDaysChange("today")}
                    />
                    <label htmlFor="today">Today</label>
                    <input
                      className="customRadio"
                      type="radio"
                      id="week"
                      name="daysChange"
                      value="week"
                      onClick={() => setDaysChange("week")}
                      defaultChecked={true}
                    />
                    <label htmlFor="week">Week</label>
                    <input
                      className="customRadio"
                      type="radio"
                      id="month"
                      name="daysChange"
                      value="month"
                      onClick={() => setDaysChange("month")}
                    />
                    <label htmlFor="month">Month</label>
                  </div>
                </Box>
              </Grid>
              <Grid item md={12} xs={12}>
                <div className="gridSplit">
                  <Paper elevation={3} className={classes.paper1}>
                    <Typography>
                      <b>New Hotel Added</b>
                    </Typography>
                    <span style={{ color: "#F46D25", fontSize: "26px" }}>
                      <b>{hotel.count}</b>
                    </span>
                  </Paper>
                </div>
                <div className="gridSplit">
                  <Paper elevation={3} className={classes.paper1}>
                    <Typography>
                      <b>New Client Added</b>
                    </Typography>
                    <span style={{ color: "#F46D25", fontSize: "26px" }}>
                      <b>{client.count}</b>
                    </span>
                  </Paper>
                </div>
                <div className="gridSplit">
                  <Paper elevation={3} className={classes.paper1}>
                    <Typography>
                      <b>Total Revenue</b>
                    </Typography>
                    <span style={{ color: "#F46D25", fontSize: "26px" }}>
                      <b>{formatter.format(revenue.count)}</b>
                    </span>
                  </Paper>
                </div>
                <div className="gridSplit">
                  <Paper elevation={3} className={classes.paper1}>
                    <Typography>
                      <b>Total Profit</b>
                    </Typography>
                    <span style={{ color: "#F46D25", fontSize: "26px" }}>
                      <b> {formatter.format(profit.count)} </b>
                    </span>
                  </Paper>
                </div>
                <div className="gridSplit">
                  <Paper elevation={3} className={classes.paper1}>
                    <Typography>
                      <b>Profit After Tax</b>
                    </Typography>
                    <span style={{ color: "#F46D25", fontSize: "26px" }}>
                      <b> {formatter.format(profitTax.count)} </b>
                    </span>
                  </Paper>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <HotelChart />
        </Grid>
        <Grid item md={6} xs={12}>
          <AgentChart />
        </Grid>
        <Grid item md={12} xs={12}>
          <UpcomingPayment />
        </Grid>
        <Grid item md={12} xs={12}>
          <UpcomingCheckin />
        </Grid>
      </Grid>
    </div>
  );
}
