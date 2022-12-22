/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Api from "../../Service/Api";
import Select from "react-select";
import { Card, Box } from "@material-ui/core";
import { formatter } from "../../utils/formatNumber";
import "./dashboard.css";
import moment from "moment";
import { format } from "date-fns";
import _ from "lodash";

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
    padding: "10px 30px",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 767px)": {
      padding: "10px 10px",
    },
  },
});

function HotelChart() {
  const classes = useStyles();
  const [hotelName, setHotelName] = useState([]);
  const [hoteldaysChange, setHotelDaysChange] = useState("week");
  const Auth = localStorage.getItem("auth");
  const Role = localStorage.getItem("role");
  const uniqueId = localStorage.getItem("unique_id");
  const [hotelData, setHotelData] = useState([]);
  const [selectHotel, setSelectHotel] = useState({});

  useEffect(() => {
    DisplayNameGet();
  }, []);

  useEffect(() => {
    if (selectHotel !== null && hoteldaysChange !== null) {
      AgentData();
    }
  }, [selectHotel, hoteldaysChange]);

  const AgentData = () => {
    let url;
    switch (true) {
      case hoteldaysChange == "week" &&
        (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `WeekAllHotelRevenue/${uniqueId}/${selectHotel.value}`;
        break;
      case hoteldaysChange == "month" &&
        (Role == "Admin" || Role == "Super Admin"||Role == "Data Manger"):
        url = `MonthAllHotelRevenue/${uniqueId}/${selectHotel.value}`;
        break;
      case hoteldaysChange == "week":
        url = `WeekAgentHotelRevenue/${uniqueId}/${selectHotel.value}/${Auth}`;
        break;
      case hoteldaysChange == "month":
        url = `MonthAgentHotelRevenue/${uniqueId}/${selectHotel.value}/${Auth}`;
        break;
    }
    console.log("HotelChart|AgentData|url: ",url);
    Api.get(url).then((res) => {
      let currentDate = moment();
      if (hoteldaysChange == "week") {
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
        setHotelData(HotelRes);
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
        setHotelData(HotelRes);
        console.log("HotelRes",HotelRes);
      }
    });
  };

  const DisplayNameGet = () => {
    Api.get("propertyName").then((res) => {
      console.log("DisplayNameGet:",res);
      let sorted = _.orderBy(res.data, ["displayName"], ["asec"]);
      setHotelName(sorted);
      setSelectHotel({
        label: sorted[0].displayName,
        value: sorted[0].propertyId,
      });
    });
  };

  const Hoteloptions =
    hotelName &&
    hotelName.map((hotel) => {
      return { label: hotel.displayName, value: hotel.propertyId };
    });

  return (
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <div style={{ width: "50%", display: "inline-block" }}>
          <p style={{ margin: "0px", color: "#fff" }}>Hotel Wise Revenue</p>
        </div>
        <div style={{ width: "50%", display: "inline-block" }}>
          <Select
            placeholder="Select Hotel"
            isSearchable
            options={Hoteloptions}
            onChange={(selectHotel) => {
              setSelectHotel(selectHotel);
            }}
            defaultValue={selectHotel}
            value={selectHotel}
          />
        </div>
      </div>
      <Box  style={{ textAlign: "end",padding:"10px" }}>
        <div className="radio-group">
          <input
            className="customRadio"
            type="radio"
            id="hotelweek"
            name="hoteldaysChange"
            value="week"
            onClick={() => setHotelDaysChange("week")}
            defaultChecked={true}
          />
          <label htmlFor="hotelweek">Week</label>
          <input
            className="customRadio"
            type="radio"
            id="hotelmonth"
            name="hoteldaysChange"
            value="month"
            onClick={() => setHotelDaysChange("month")}
          />
          <label htmlFor="hotelmonth">Month</label>
        </div>
      </Box>

      <Box style={{padding:"10px"}}>
        <Bar
          data={{
            labels: hotelData.map((item) => format(new Date(item.date), "d")),
            datasets: [
              {
                label: "Revenue",
                data: hotelData.map((item) => item.count),
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
    </Card>
  );
}

export default HotelChart;
