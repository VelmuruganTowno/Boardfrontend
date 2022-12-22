import React, { useState, useEffect } from 'react';
import Api from "../../Service/Api";
import { Grid, Stack, Paper } from '@mui/material';
import UpcomingCheckin from "./UpcomingCheckin";
import UpcomingPayment from "./UpcomingPayment";
import Select from "react-select";
import "./dashboard.css";
import _ from "lodash";
import MultiLineChart from './Chart';
import MultiLineAgentChart from './AgentChart.jsx';
import Pie from './Pie';
import { formatter } from "../../utils/formatNumber";
import { format } from "date-fns";
import { startOfMonth, addDays, subDays, getDaysInMonth } from 'date-fns';
import { twnButtonStyles } from '../../utils/townoStyle';

// COUNT BOX FILTER STYLE 
const FilterStyle = { backgroundColor: '#fff', width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer", border: '1px solid #e1e1e1' }
const FilterSelectedStyle = { backgroundColor: "#f46d25", color: "#fff", fontWeight: 'bold', width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer" }

// PIE CHART FILTER STYLE 
const LHBPFilterStyle = { backgroundColor: '#fff', border: '1px solid #F46D25', color: '#111', padding: '0.4em', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', cursor: 'pointer' }
const LHBPFilterSelectedStyle = { backgroundColor: '#F46D25', fontWeight: 'bold', border: '1px solid #F46D25', color: '#fff', padding: '0.4em', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', cursor: 'pointer' }
const CHBPFilterStyle = { backgroundColor: '#fff', border: '1px solid #F46D25', color: '#111', padding: '0.4em', cursor: 'pointer' }
const CHBPFilterSelectedStyle = { backgroundColor: '#F46D25', fontWeight: 'bold', border: '1px solid #F46D25', color: '#fff', padding: '0.4em', cursor: 'pointer' }
const RHBPFilterSelectedStyle = { backgroundColor: '#F46D25', fontWeight: 'bold', border: '1px solid #F46D25', color: '#fff', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', padding: '0.4em', cursor: 'pointer' }
const RHBPFilterStyle = { backgroundColor: '#fff', border: '1px solid #F46D25', color: '#111', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', padding: '0.4em', cursor: 'pointer' }

export default function DashboardCopy() {
  const Auth = localStorage.getItem("auth");
  const hasAdmin = localStorage.getItem("role");
  const uniqueId = localStorage.getItem("unique_id");
  const notAdmin = _.indexOf(["Super Admin", "Admin", "Data Manger"], hasAdmin, 0) === -1

  // COUNT BOX VARIABLES 
  const [countBoxFilter, setCountBoxFilter] = useState("week");
  const [countBoxData, setCountBoxData] = useState({ totalRevenue: 445000, totalProfit: 71000, totalProfitAfterTax: 71000, newLeads: 12, lostLeads: 12, closedLeads: 12 })

  // HOTEL REVENUE LINE CHART VARIABLES
  const [hotelName, setHotelName] = useState([]);
  const Hoteloptions = hotelName && hotelName.map((hotel) => {
    return { label: hotel.displayName, value: hotel.propertyId };
  });
  const [selectHotel, setSelectHotel] = useState({});
  const [hotelRevenueFilter, setHotelRevenueFilter] = useState("month")
  const [hotelRevenueData, setHotelRevenueData] = useState([])

  // HOTEL BREAK UP PIE CHART VARIABLES
  const [hoteBreakUpFilter, setHotelBreakUpFilter] = useState('month');
  const [hotelBreakUpData, setHotelBreakUpData] = useState([]);

  // AGENT REVENUE LINE CHART 
  const [agentRevenueFilter, setAgentRevenueFilter] = useState('month');
  const [agentRevenueData, setAgentRevenueData] = useState([]);
  const [agentHotelChartVisible, setAgentHotelChartVisible] = useState(true);

  // Utility Function
  const expandData = (data, type) => {
    let sampleData = [];
    let HotelRes = [];
    let monthStart = startOfMonth(new Date());

    if (type === "hotel") {
      if (hotelRevenueFilter != "month") {
        monthStart = startOfMonth(subDays(startOfMonth(new Date()), 5));
      }
      const noOfDayInMonth = getDaysInMonth(monthStart);
      for (let i = 0; i < noOfDayInMonth; i++) {
        sampleData.push({
          date: format(addDays(monthStart, i), "yyyy-MM-dd"),
          netpayout: 0,
          roomNight: 0
        });
      }
      HotelRes = sampleData.map(
        (obj) => data.find((o) => o.date === obj.date) || obj
      );
    }

    else if (type === "agent") {
      if (agentRevenueFilter != "month") {
        monthStart = startOfMonth(subDays(startOfMonth(new Date()), 5));
      }
      const noOfDayInMonth = getDaysInMonth(monthStart);
      for (let i = 0; i < noOfDayInMonth; i++) {
        sampleData.push({
          name: format(addDays(monthStart, i), "yyyy-MM-dd"),
          totalrevenue: 0,
          profitaftertax: 0
        });
      }
      HotelRes = sampleData.map(
        (obj) => data.find((o) => o.name === obj.name) || obj
      );
    }

    return HotelRes;
  }
  // Utility Function Ends

  // Api for CountBox starts
  const countBoxApiFun = () => {
    var url = `dashboardcount/${uniqueId}/${countBoxFilter}`
    if (notAdmin) { url = `agentdashboardcount/${uniqueId}/${countBoxFilter}/${Auth}` }
    Api.get(url).then((res) => {
      setCountBoxData(res.data);
    })
  }
  useEffect(() => { countBoxApiFun(); }, [countBoxFilter]);
  // Api for CountBox ends

  // Api for PieChart starts
  const hotelBreakUpApiFun = () => {
    var url = `dashboardhotelbreakup/${uniqueId}/${hoteBreakUpFilter}`
    if (notAdmin) { url = `agentdashboardhotelbreakup/${uniqueId}/${hoteBreakUpFilter}/${Auth}` }

    Api.get(url).then((res) => {
      setHotelBreakUpData(res.data);
    })
  }
  useEffect(() => { hotelBreakUpApiFun(); }, [hoteBreakUpFilter]);
  // Api for PieChart ends

  // Functions for Hotel Revenue starts
  const DisplayNameGet = () => {
    var url = `propertyName`
    if (notAdmin) { url = `accountmanagerpropertylist/${uniqueId}/${Auth}` }
    Api.get(url).then((res) => {
      if (res.data.length === 0) {
        setAgentHotelChartVisible(false);
      } else {
        let sorted = _.orderBy(res.data, ["displayName"], ["asec"]);
        setHotelName(sorted);
        setSelectHotel({
          label: sorted[0].displayName,
          value: sorted[0].propertyId,
        });
        setAgentHotelChartVisible(true);
      }
    });
  };

  useEffect(() => {
    DisplayNameGet();
  }, []);

  const HotelRevennueApiFun = () => {
    Api.get(`dashboardhotelrevenue/${uniqueId}/${selectHotel.value}/${hotelRevenueFilter}`).then((res) => {
      setHotelRevenueData(expandData(res.data, "hotel"));
    })
  }
  useEffect(() => {
    HotelRevennueApiFun();
  }, [selectHotel, hotelRevenueFilter]);
  // Functions for Hotel  Revenue Ends

  // Api and Function for Agent Revenue starts
  const AgentRevenueApiFun = () => {
    var url = `dashboardAgentRevenue/${uniqueId}/${agentRevenueFilter}`
    if (notAdmin) { url = `agentdashboardAgentRevenue/${uniqueId}/${agentRevenueFilter}/${Auth}` }

    Api.get(url).then((res) => {
      if (notAdmin) { setAgentRevenueData(expandData(res.data, "agent")); }
      else { setAgentRevenueData(res.data); }
    })
  }
  useEffect(() => {
    AgentRevenueApiFun();
  }, [agentRevenueFilter]);
  // Api and Function for Agent Revenue ends

  return (
    // <div style={{ padding: '6.1% 1.2%', backgroundColor: "#f7f7f7" }}>
    <div style={{...twnButtonStyles.allPages,paddingTop:'5.7%'}}>
      {/* Count Box  */}
      <Grid container spacing={2} style={{maginBottom:'3px'}}>
        <Grid item sm={11} md={11}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Paper style={twnButtonStyles.paperStyle}>
              <span style={twnButtonStyles.labelStyle}>Total Revenue</span><br />
              <span style={twnButtonStyles.valueStyle}>{formatter.format(countBoxData.totalRevenue)}</span>
            </Paper>
            <Paper style={twnButtonStyles.paperStyle}>
              <span style={twnButtonStyles.labelStyle}>Total Profit</span><br />
              <span style={twnButtonStyles.valueStyle}>{formatter.format(countBoxData.totalProfit)}</span>
            </Paper>
            <Paper style={twnButtonStyles.paperStyle}>
              <span style={twnButtonStyles.labelStyle}>Total Profit After Tax</span><br />
              <span style={twnButtonStyles.valueStyle}>{formatter.format(countBoxData.totalProfitAfterTax)}</span>
            </Paper>
            <Paper style={twnButtonStyles.paperStyle}>
              <span style={twnButtonStyles.labelStyle}>New Leads</span><br />
              <span style={twnButtonStyles.valueStyle}>{formatter.format(countBoxData.newLeads)}</span>
            </Paper>
            <Paper style={twnButtonStyles.paperStyle}>
              <span style={twnButtonStyles.labelStyle}>Lost Leads</span><br />
              <span style={twnButtonStyles.valueStyle}>{formatter.format(countBoxData.lostLeads)}</span>
            </Paper>
            <Paper style={twnButtonStyles.paperStyle}>
              <span style={twnButtonStyles.labelStyle}>Closed Leads</span><br />
              <span style={twnButtonStyles.valueStyle}>{formatter.format(countBoxData.closedLeads)}</span>
            </Paper>
          </Stack>
        </Grid>
        <Grid item sm={1} md={1}>
          <Stack spacing={0.75} justifyContent='center' alignItems='center'>
            <Paper onClick={() => setCountBoxFilter("today")} style={countBoxFilter === "today" ? FilterSelectedStyle : FilterStyle}>Today</Paper>
            <Paper onClick={() => setCountBoxFilter("week")} style={countBoxFilter === "week" ? FilterSelectedStyle : FilterStyle}>Week</Paper>
            <Paper onClick={() => setCountBoxFilter("month")} style={countBoxFilter === "month" ? FilterSelectedStyle : FilterStyle}>Month</Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Charts  */}
      {hasAdmin === "Agent Admin" ?
        <Grid item sm={12} xs={12} justifyContent="space-between" alignItems="center" style={{marginBottom:'35px'}}>

          {/* Agent Wise revenue chart  */}
          <div>
            <div className="accordion">
              <div className="accordion-title">
                <div style={{ color: "#fff", fontWeight: "600" }}>
                  Agent Wise Revenue
                </div>
              </div>

              <Stack direction='row' justifyContent='right' alignContent='right' style={{ backgroundColor: '#fff', padding: '1em 1em 0 0' }}>
                {
                  notAdmin ?
                    <>
                      <button onClick={() => setAgentRevenueFilter("previousMonth")} style={agentRevenueFilter === "previousMonth" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Previous Month</button>
                      <button onClick={() => setAgentRevenueFilter("month")} style={agentRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Present Month</button>
                    </>
                    :
                    <>
                      <button onClick={() => setAgentRevenueFilter("today")} style={agentRevenueFilter === "today" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Today</button>
                      <button onClick={() => setAgentRevenueFilter("week")} style={agentRevenueFilter === "week" ? CHBPFilterSelectedStyle : CHBPFilterStyle}>Week</button>
                      <button onClick={() => setAgentRevenueFilter("month")} style={agentRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Month</button>
                    </>
                }

              </Stack>

              <div className='accordion-content' style={{ height: '40vh', padding: '0.5em' }}>
                <MultiLineAgentChart agentRevenueData={agentRevenueData} notAdmin={notAdmin} />
              </div>
            </div>
          </div>
        </Grid> :

        <Grid container spacing={2}>
          <Grid item sm={9} xs={12} justifyContent="space-between" alignItems="center">

            {/* Agent Wise revenue chart  */}
            <div>
              <div className="accordion">
                <div className="accordion-title">
                  <div style={{ color: "#fff", fontWeight: "600" }}>
                    Agent Wise Revenue
                  </div>
                </div>

                <Stack direction='row' justifyContent='right' alignContent='right' style={{ backgroundColor: '#fff', padding: '1em 1em 0 0' }}>
                  {
                    notAdmin ?
                      <>
                        <button onClick={() => setAgentRevenueFilter("previousMonth")} style={agentRevenueFilter === "previousMonth" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Previous Month</button>
                        <button onClick={() => setAgentRevenueFilter("month")} style={agentRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Present Month</button>
                      </>
                      :
                      <>
                        <button onClick={() => setAgentRevenueFilter("today")} style={agentRevenueFilter === "today" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Today</button>
                        <button onClick={() => setAgentRevenueFilter("week")} style={agentRevenueFilter === "week" ? CHBPFilterSelectedStyle : CHBPFilterStyle}>Week</button>
                        <button onClick={() => setAgentRevenueFilter("month")} style={agentRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Month</button>
                      </>
                  }

                </Stack>

                <div className='accordion-content' style={{ height: '40vh', padding: '0.5em' }}>
                  <MultiLineAgentChart agentRevenueData={agentRevenueData} notAdmin={notAdmin} />
                </div>
              </div>
            </div>
          </Grid>

          <Grid item sm={3} xs={12} justifyContent="space-between" alignItems="center">
            <div className="accordion">
              <div className="accordion-title">
                <div style={{ color: "#fff", fontWeight: "600" }}>
                  Hotel Booking Breakup
                </div>
              </div>
              <Stack direction='row' justifyContent='right' alignContent='right' style={{ backgroundColor: '#fff', padding: '1em 1em 0 0' }}>
                <button onClick={() => setHotelBreakUpFilter("week")} style={hoteBreakUpFilter === "week" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Week</button>
                <button onClick={() => setHotelBreakUpFilter("month")} style={hoteBreakUpFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Month</button>
              </Stack>
              <div className='accordion-content' style={{ height: '40vh', padding: '0.5em' }}>
                <Pie hotelBreakUpData={hotelBreakUpData} />
              </div>
            </div>
          </Grid>
        </Grid>
      }

      <div style={{ marginTop: '-1.3%' }}>
        {agentHotelChartVisible ? (
          <div className="accordion">
            <div className="accordion-title">
              <div style={{ color: "#fff", fontWeight: "600" }}>
                Hotel Wise Revenue
              </div>
              <div style={{ width: '25%' }}>
                <Select
                  placeholder="Select Hotel"
                  isSearchable
                  options={Hoteloptions}
                  onChange={(selectHotel) => {
                    setSelectHotel(selectHotel);
                  }}
                  defaultValue={selectHotel}
                  value={selectHotel}
                  style={twnButtonStyles.HotelSelectionStyle}
                />
              </div>
            </div>

            <Stack direction='row' justifyContent='right' alignContent='right' style={{ backgroundColor: '#fff', padding: '1em 1em 0 0' }}>
              <button onClick={() => setHotelRevenueFilter("previousMonth")} style={hotelRevenueFilter === "previousMonth" ? LHBPFilterSelectedStyle : LHBPFilterStyle} >Previous Month</button>
              <button onClick={() => setHotelRevenueFilter("month")} style={hotelRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle} >Present Month</button>
            </Stack>

            <div className='accordion-content' style={{ height: '40vh', padding: '0.5em' }}>
              <MultiLineChart hotelRevenueData={hotelRevenueData} />
            </div>
          </div>
        ) : null}
      </div>

      {/* UpcomingPayment  */}
      <div><UpcomingPayment /></div>

      {/* UpcomingCheckin  */}
      <div style={{ marginTop: '1.3%' }}><UpcomingCheckin /></div>
    </div>
  );
}