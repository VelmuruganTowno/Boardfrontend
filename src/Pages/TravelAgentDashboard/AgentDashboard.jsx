import React, { useState, useEffect } from 'react';
import { Grid, Paper, Stack } from '@mui/material';
import { twnButtonStyles } from '../../utils/townoStyle';
import { formatter } from "../../utils/formatNumber";
import _ from "lodash";
import Api from "../../Service/Api";
import { startOfMonth, addDays, subDays, getDaysInMonth } from 'date-fns';
import { format } from "date-fns";
import MultiLineAgentChart from './AgentWiseChart';
import './agentDashboard.css';
import UpcomingAgentCheckin from "./UpcomingAgentCheckin";
import UpcomingAgentPayment from "./UpcomingAgentPayment";

// COUNT BOX FILTER STYLE 
const FilterStyle = { backgroundColor: '#fff', width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer", border: '1px solid #e1e1e1' }
const FilterSelectedStyle = { backgroundColor: "#f46d25", color: "#fff", fontWeight: 'bold', width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer" }

// CHART FILTER STYLE 
const LHBPFilterStyle = { backgroundColor: '#fff', border: '1px solid #F46D25', color: '#111', padding: '0.4em', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', cursor: 'pointer' }
const LHBPFilterSelectedStyle = { backgroundColor: '#F46D25', fontWeight: 'bold', border: '1px solid #F46D25', color: '#fff', padding: '0.4em', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', cursor: 'pointer' }
const RHBPFilterSelectedStyle = { backgroundColor: '#F46D25', fontWeight: 'bold', border: '1px solid #F46D25', color: '#fff', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', padding: '0.4em', cursor: 'pointer' }
const RHBPFilterStyle = { backgroundColor: '#fff', border: '1px solid #F46D25', color: '#111', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', padding: '0.4em', cursor: 'pointer' }

export default function AgentDashboard() {
    const Auth = localStorage.getItem("auth");
    const hasAdmin = localStorage.getItem("role");
    const uniqueId = localStorage.getItem("unique_id");
    const notAdmin = _.indexOf(["Agent Admin"], hasAdmin, 0) === -1

    // Utility Function
    const expandData = (data, type) => {
        let sampleData = [];
        let HotelRes = [];
        let monthStart = startOfMonth(new Date());

        if (type === "agent") {
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

    // COUNT BOX VARIABLES 
    const [countBoxFilter, setCountBoxFilter] = useState("week");
    const [countBoxData, setCountBoxData] = useState({ totalRevenue: '', totalProfit: '', newLeads: '', lostLeads: '', closedLeads: '' })
    // Api for CountBox starts
    const countBoxApiFun = () => {
        var url = `TravelAgentDashboardCount/${uniqueId}/${countBoxFilter}`
        if (notAdmin) { url = `TravelAgentStaffDashboardCountNew/${uniqueId}/${countBoxFilter}/${Auth}` }
        Api.get(url).then((res) => {
            setCountBoxData(res.data);
        })
    }
    useEffect(() => { countBoxApiFun(); }, [countBoxFilter]);
    // Api for CountBox ends

    // AGENT REVENUE LINE CHART 
    const [agentRevenueFilter, setAgentRevenueFilter] = useState('month');
    const [agentRevenueData, setAgentRevenueData] = useState([]);
    const [agentHotelChartVisible, setAgentHotelChartVisible] = useState(true);
    // Api and Function for Agent Revenue starts
    const AgentRevenueApiFun = () => {
        var url = `TravelAgentDashboardBookingRevenue/${uniqueId}/${agentRevenueFilter}`
        if (notAdmin) { url = `TravelAgentStaffDashboardBookingRevenue/${uniqueId}/${agentRevenueFilter}/${Auth}` }

        Api.get(url).then((res) => {
            console.log("response",res,url)
            if (notAdmin) { setAgentRevenueData(res.data); }
            else { setAgentRevenueData(res.data); }
        })
    }
    useEffect(() => {
        AgentRevenueApiFun();
    }, [agentRevenueFilter]);
    // Api and Function for Agent Revenue ends

    return (
        <div style={{ ...twnButtonStyles.allPages, paddingTop: '5.7%' }}>

            {/* Count Box  */}
            <Grid container spacing={2} style={{ maginBottom: '3px' }}>
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

            {/* Agent Chart  */}
            <Grid item sm={12} xs={12} justifyContent="space-between" alignItems="center">
                <div>
                    <div className="accordion">
                        <div className="accordion-title">
                            <div style={{ color: "#fff", backgroundColor: '#f46d25', fontWeight: "600" }}>
                                Agent Wise Revenue
                            </div>
                        </div>

                        <Stack direction='row' justifyContent='right' alignContent='right' style={{ backgroundColor: '#fff', padding: '1em 1em 0 0' }}>
                            {/* {
                                notAdmin ?
                                    <> */}
                            <button onClick={() => setAgentRevenueFilter("previousMonth")} style={agentRevenueFilter === "previousMonth" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Previous Month</button>
                            <button onClick={() => setAgentRevenueFilter("month")} style={agentRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Present Month</button>
                            {/* </>
                                    :
                                    <>
                                        <button onClick={() => setAgentRevenueFilter("today")} style={agentRevenueFilter === "today" ? LHBPFilterSelectedStyle : LHBPFilterStyle}>Today</button>
                                        <button onClick={() => setAgentRevenueFilter("week")} style={agentRevenueFilter === "week" ? CHBPFilterSelectedStyle : CHBPFilterStyle}>Week</button>
                                        <button onClick={() => setAgentRevenueFilter("month")} style={agentRevenueFilter === "month" ? RHBPFilterSelectedStyle : RHBPFilterStyle}>Month</button>
                                    </>
                            } */}

                        </Stack>

                        <div className='accordion-content' style={{ height: '40vh', padding: '0.5em' }}>
                            <MultiLineAgentChart agentRevenueData={agentRevenueData} notAdmin={notAdmin} />
                        </div>
                    </div>
                </div>
            </Grid>

            {/* UpcomingAgentPayment  */}
            <div><UpcomingAgentPayment /></div>

            {/* UpcomingAgentCheckin  */}
            <div style={{ marginTop: '1.3%',paddingBottom:'3%' }}><UpcomingAgentCheckin /></div>
        </div>
    );
}
