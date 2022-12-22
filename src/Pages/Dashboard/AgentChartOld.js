/* eslint-disable default-case */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatter } from "../../utils/formatNumber";
import Api from "../../Service/Api";
import _ from "lodash";
import { format } from "date-fns";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles({
  card: {
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  cardHeader: {
    background: "#F46D25",
    height: "38px",
    padding: "10px 30px",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 767px)": {
      padding: "10px 10px",
    },
  },
});

function AgentChart() {
  const classes = useStyles();
  const [agent, setAgent] = useState([]);
  const uniqueId = localStorage.getItem("unique_id");
  const [agentdaysChange, setAgentDaysChange] = useState("week");
  const Auth = localStorage.getItem("auth");
  const Role = localStorage.getItem("role");

  useEffect(() => {
    AgentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentdaysChange]);

  const AgentData = () => {
    let url;
    switch (true) {
      case agentdaysChange == "today" &&
        (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `TodayAllAgentRevenue/${uniqueId}`;
        break;
      case agentdaysChange == "week" &&
        (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `WeekAllAgentRevenue/${uniqueId}`;
        break;
      case agentdaysChange == "month" &&
        (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `MonthAllAgentRevenue/${uniqueId}`;
        break;
      case agentdaysChange == "week":
        url = `WeekAgentTotalRevenue/${uniqueId}/${Auth}`;
        break;
      case agentdaysChange == "month":
        url = `MonthAgentTotalRevenue/${uniqueId}/${Auth}`;
        break;
    }

    Api.get(url).then((res) => {
      if (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger") {
        let sorted = _.orderBy(res.data, ["count"], ["desc"]);
        const val = sorted.slice(0, 5);
        setAgent(val);
      } else {
        let currentDate = moment();
        if (agentdaysChange == "week") {
          let weekStart = currentDate.clone().startOf("week");
          let days = [];
          let daysRequired = 7;
          for (let i = 0; i < daysRequired; i++) {
            days.push({
              date: moment(weekStart).add(i, "days").format("YYYY-MM-DD"),
              count: 0,
            });
          }
          const HotelRes = days.map(
            (obj) => res.data.find((o) => o.date === obj.date) || obj
          );
          setAgent(HotelRes);
        } else {
          let MonthEnd = currentDate.clone().endOf("month");
          let MonthStart = currentDate.clone().startOf("month");
          let formattedMonthEnd = MonthEnd.format("D");
          let days = [];
          let daysRequired = formattedMonthEnd;

          for (let i = 0; i < daysRequired; i++) {
            days.push({
              date: moment(MonthStart).add(i, "days").format("YYYY-MM-DD"),
              count: 0,
            });
          }
          const HotelRes = days.map(
            (obj) => res.data.find((o) => o.date === obj.date) || obj
          );
          setAgent(HotelRes);
        }
      }
    });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <p style={{ margin: "0px", color: "#fff" }}>Agent Wise Revenue</p>
      </div>
      <Box style={{ textAlign: "end",padding:"10px" }}>
        <div className="radio-group">
          {Role == "Admin" || Role == "Super Admin"||Role == "Data Manger" ? (
            <>
              <input
                className="customRadio"
                type="radio"
                id="AgentToday"
                name="agentdaysChange"
                value="today"
                onClick={() => setAgentDaysChange("today")}
              />
              <label htmlFor="AgentToday">Today</label>
            </>
          ) : null}
          <input
            className="customRadio"
            type="radio"
            id="Agentweek"
            name="agentdaysChange"
            value="week"
            onClick={() => setAgentDaysChange("week")}
            defaultChecked={true}
          />
          <label htmlFor="Agentweek">Week</label>
          <input
            className="customRadio"
            type="radio"
            id="Agentmonth"
            name="agentdaysChange"
            value="month"
            onClick={() => setAgentDaysChange("month")}
          />
          <label htmlFor="Agentmonth">Month</label>
        </div>
      </Box>
      {Role == "Admin" || Role == "Super Admin"||Role == "Data Manger" ? (
        <Box style={{padding:"10px"}}>
          <Bar
            data={{
              labels: agent.map((item) => item.name),
              datasets: [
                {
                  label: "Revenue",
                  data: agent.map((item) => item.count),
                  backgroundColor: "#F46D25",
                  barThickness: 12,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    callback: (label, index, labels) => {
                      return formatter.format(label);
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          ></Bar>
        </Box>
      ) : (
        <Box sx={{ p: 2, pb: 1 }} dir="ltr">
          <Bar
            data={{
              labels: agent.map((item) => format(new Date(item.date), "d")),
              datasets: [
                {
                  label: "Revenue",
                  data: agent.map((item) => item.count),
                  backgroundColor: "#F46D25",
                  barThickness: 12,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    callback: (label, index, labels) => {
                      return formatter.format(label);
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          ></Bar>
        </Box>
      )}
    </Card>
  );
}

export default AgentChart;
