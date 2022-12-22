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
import MultiLineSalesChart from './SalesChart';


// COUNT BOX FILTER STYLE 
const FilterStyle = { backgroundColor: '#fff', width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer", border: '1px solid #e1e1e1' }
const FilterSelectedStyle = { backgroundColor: "#f46d25", color: "#fff", width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer" }

// PIE CHART FILTER STYLE 
const LHBPFilterStyle = {backgroundColor:'#fff',border:'1px solid #F46D25',color:'#111',padding:'0.4em',borderTopLeftRadius:'4px',borderBottomLeftRadius:'4px',cursor:'pointer'}
const LHBPFilterSelectedStyle = {backgroundColor:'#F46D25',border:'1px solid #F46D25',color:'#fff',padding:'0.4em',borderTopLeftRadius:'4px',borderBottomLeftRadius:'4px',cursor:'pointer'}
const RHBPFilterSelectedStyle = {backgroundColor:'#F46D25',border:'1px solid #F46D25',color:'#fff',borderTopRightRadius:'4px',borderBottomRightRadius:'4px',padding:'0.4em',cursor:'pointer'}
const RHBPFilterStyle = {backgroundColor:'#fff',border:'1px solid #F46D25',color:'#111',borderTopRightRadius:'4px',borderBottomRightRadius:'4px',padding:'0.4em',cursor:'pointer'}


const cardStyle = {
  "labelStyle": { fontSize: '15px' },
  "valueStyle": { fontSize: '23px', fontWeight: 'bold' },
  "paperStyle": { backgroundColor: '#fff', padding: "1% 1.5%", width: '100%', border: '1px solid #e1e1e1' },
  "HotelSelectionStyle": { border: "none", outline: "none", scrollBehavior: "smooth", padding: "4px", borderRadius: "5px", margin: "0 25px 0 0" }
}

export default function AgentDashboardCopy() {
    // new 
    let hasDesignation = localStorage.getItem("designation");
    var username = localStorage.getItem("createdby");
    // new 
  const uniqueId = localStorage.getItem("unique_id");
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
  const [hoteBreakUpFilter,setHotelBreakUpFilter] = useState('month');
  const [hotelBreakUpData,setHotelBreakUpData] = useState([]);

  // AGENT REVENUE LINE CHART 
  const [salesRevenueFilter,setSalesRevenueFilter] = useState('month');
  const [salesRevenueData,setSalesRevenueData] = useState([]);

  
  // Api for CountBox starts
  const countBoxApiFun=()=>{
    Api.get(`agentdashboardcount/${uniqueId}/${countBoxFilter}/username`).then((res)=>{
      setCountBoxData(res.data);
    })
  }
  useEffect(()=>{countBoxApiFun();},[countBoxFilter]);
  // Api for CountBox ends
  
   // Api for PieChart starts
   const hotelBreakUpApiFun=()=>{
    Api.get(`dashboardhotelbreakup/${uniqueId}/${hoteBreakUpFilter}`).then((res)=>{
      setHotelBreakUpData(res.data);
    })
  }
  useEffect(()=>{hotelBreakUpApiFun();},[hoteBreakUpFilter]);
  // Api for PieChart ends

  // Functions for Hotel Revenue starts
  const DisplayNameGet = () => {
    Api.get("propertyName").then((res) => {
      let sorted = _.orderBy(res.data, ["displayName"], ["asec"]);
      setHotelName(sorted);
      setSelectHotel({
        label: sorted[0].displayName,
        value: sorted[0].propertyId,
      });
    });
  };

  useEffect(() => {
    DisplayNameGet();
  }, []);

  const HotelRevennueApiFun = ()=>{
  Api.get(`dashboardhotelrevenue/${uniqueId}/${selectHotel.value}/${hotelRevenueFilter}`).then((res)=>{
      setHotelRevenueData(res.data);
    })
  }
  useEffect(() => {
    HotelRevennueApiFun();
  }, [selectHotel, hotelRevenueFilter]);
  // Functions for Hotel  Revenue Ends

  // Api and Function for Agent Revenue starts
  const SalesRevenueApiFun = ()=>{
    // new 
    if(hasDesignation==="Account Manager"){
      Api.get(`salesdashboardAgentRevenue/{uniqueid}/${salesRevenueFilter}/{username}`).then((res)=>{
        console.log("AgentDashboardcopy|SalesRevenueApiFun|response",res);
        setSalesRevenueData(res.data);
      })
    }
    }
    // new 

  //   Api.get(`dashboardAgentRevenue/${uniqueId}/${agentRevenueFilter}`).then((res)=>{
  //     console.log("Dashboardcopy|AgentRevenueApiFun|response",res);
  //     setAgentRevenueData(res.data);
  //   })
  // }
  useEffect(() => {
    SalesRevenueApiFun();
  }, [salesRevenueFilter]);
  // Api and Function for Agent Revenue ends

  return (
    <div style={{ padding: '5.8% 1% 1% 1%', backgroundColor: "#f7f7f7" }}>

      {/* Count Box  */}
      <Grid container spacing={2}>
        <Grid item sm={11} md={11}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Paper style={{ ...cardStyle.paperStyle }}>
              <span style={cardStyle.labelStyle}>Total Revenue</span><br />
              <span style={cardStyle.valueStyle}>{countBoxData.totalRevenue}</span>
            </Paper>
            <Paper style={{ ...cardStyle.paperStyle }}>
              <span style={cardStyle.labelStyle}>Total Profit</span><br />
              <span style={cardStyle.valueStyle}>{countBoxData.totalProfit}</span>
            </Paper>
            <Paper style={{ ...cardStyle.paperStyle }}>
              <span style={cardStyle.labelStyle}>Total Profit After Tax</span><br />
              <span style={cardStyle.valueStyle}>{countBoxData.totalProfitAfterTax}</span>
            </Paper>
            <Paper style={{ ...cardStyle.paperStyle }}>
              <span style={cardStyle.labelStyle}>New Leads</span><br />
              <span style={cardStyle.valueStyle}>{countBoxData.newLeads}</span>
            </Paper>
            <Paper style={{ ...cardStyle.paperStyle }}>
              <span style={cardStyle.labelStyle}>Lost Leads</span><br />
              <span style={cardStyle.valueStyle}>{countBoxData.lostLeads}</span>
            </Paper>
            <Paper style={{ ...cardStyle.paperStyle }}>
              <span style={cardStyle.labelStyle}>Closed Leads</span><br />
              <span style={cardStyle.valueStyle}>{countBoxData.closedLeads}</span>
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
      </Grid><br />

      {/* Charts  */}

      <Grid container spacing={2}>
        <Grid item sm={9} xs={12} justifyContent="space-between" alignItems="center">
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
                  style={cardStyle.HotelSelectionStyle}
                />
              </div>
            </div>

            <Stack direction='row' justifyContent='right' alignContent='right' style={{backgroundColor:'#fff',padding:'1em 1em 0 0'}}>
              <button onClick={() => setHotelRevenueFilter("previousMonth")} style={hotelRevenueFilter === "previousMonth" ? LHBPFilterSelectedStyle : LHBPFilterStyle} >Previous Month</button>
              <button onClick={() => setHotelRevenueFilter("month")} style={hotelRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle} >Present Month</button>
            </Stack>

            <div className='accordion-content' style={{ height: '40vh', padding:'0.5em'}}>
              <MultiLineChart hotelRevenueData={hotelRevenueData} />
            </div>
          </div>
        </Grid>

        <Grid item sm={3} xs={12} justifyContent="space-between" alignItems="center">
          <div className="accordion">
            <div className="accordion-title">
              <div style={{ color: "#fff", fontWeight: "600", padding: '0.5em' }}>
                Hotel Booking Breakup
              </div>
            </div>
            <Stack direction='row' justifyContent='right' alignContent='right' style={{backgroundColor:'#fff',padding:'1em 1em 0 0'}}>
              <button onClick={() => setHotelBreakUpFilter("week")} style={hoteBreakUpFilter === "week" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Week</button>
              <button onClick={() => setHotelBreakUpFilter("month")} style={hoteBreakUpFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Month</button>
            </Stack>
            <div className='accordion-content' style={{ height: '40vh',padding:'0.5em' }}>
              <Pie hotelBreakUpData={hotelBreakUpData}/>
            </div>
          </div>
        </Grid>
      </Grid>


      {/* Agent Wise revenue chart  */}
      <div>
        <div className="accordion">
          <div className="accordion-title">
            <div style={{ color: "#fff", fontWeight: "600" }}>
              Agent Wise Revenue
            </div>
          </div>

          <Stack direction='row' justifyContent='right' alignContent='right' style={{backgroundColor:'#fff',padding:'1em 1em 0 0'}}>
              <button onClick={() => setSalesRevenueFilter("previousMonth")} style={salesRevenueFilter === "previousMonth" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Previous Month</button>
              <button onClick={() => setSalesRevenueFilter("month")} style={salesRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Present Month</button>
            </Stack>

          <div className='accordion-content' style={{ height: '40vh' ,padding:'0.5em' }}>
            <MultiLineSalesChart salesRevenueData={salesRevenueData} />
          </div>
        </div>
      </div><br />

      {/* UpcomingPayment  */}
      <div>
        <UpcomingPayment />
      </div>
      <br />

      {/* UpcomingCheckin  */}
      <div>
        <UpcomingCheckin />
      </div>
    </div>
  );
}