import React, { useState,useEffect } from "react";
import Api from "../../Service/Api";
import { Grid, Stack, Paper } from '@mui/material';

const FilterStyle = { backgroundColor: '#eee', width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer" }
const FilterSelectedStyle = { backgroundColor: "#f46d25", color: "#fff", width: '100%', textAlign: 'center', fontSize: '1em', cursor: "pointer" }

const cardStyle = {
    "labelStyle": { fontSize: '15px' },
    "valueStyle": { fontSize: '23px', fontWeight: 'bold' },
    "paperStyle": { backgroundColor: '#eee', padding: "1% 1.5%", width: '100%' }
}

export default function LeadCount() {
    const [filter, setFilter] = useState("week");
    const [filtersValue, setFiltersValue] = useState({
        "totalCount": 0,
        "totalLostCount": 0,
        "totalNewCount": 0,
        "totalHotCount": 0,
        "totalColdCount": 0,
        "totalWarmCount": 0,
        "totalClosedCount": 0
    })

    let hasAdmin = localStorage.getItem("role");
    let hasDesignation = localStorage.getItem("designation");
    var uniqueid = localStorage.getItem("unique_id");
    var username = localStorage.getItem("auth");
    const leadCountApiFun = (filterName) => {
        let url = `/boardleadcountindividual/${uniqueid}/` + filterName+"/"+username;
        if (hasAdmin === "Admin" ||
            hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" || hasDesignation === "Lead Manager") {
            url = `/boardleadcount/${uniqueid}/` + filterName;
        }
        
        Api.get(url).then((res) => {
            setFiltersValue(res.data);
        });
    }

    useEffect(() => {
        leadCountApiFun(filter);
    }, [])

    const selectFilterCallApi = (filterName)=>{
        setFilter(filterName);
        leadCountApiFun(filterName);
    }

    return (
        <div style={{padding: '2% 0 1.5% 0' }}>
            <Grid container spacing={2}>
                <Grid item sm={11} md={11}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                        <Paper style={{ ...{ borderLeft: '8px solid #f46d25' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>Total Leads</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalCount}</span>
                        </Paper>
                        <Paper style={{ ...{ borderLeft: '8px solid #f46d25' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>New Leads</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalNewCount}</span>
                        </Paper>
                        <Paper style={{ ...{ borderLeft: '8px solid #e71e24' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>Hot Leads</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalHotCount}</span>
                        </Paper>
                        <Paper style={{ ...{ borderLeft: '8px solid #febc12' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>Warm Leads</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalWarmCount}</span>
                        </Paper>
                        <Paper style={{ ...{ borderLeft: '8px solid #8aceee' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>Cold Leads</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalColdCount}</span>
                        </Paper>
                        <Paper style={{ ...{ borderLeft: '8px solid #1eaf1e' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>Leads Closed</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalClosedCount}</span>
                        </Paper>
                        <Paper style={{ ...{ borderLeft: '8px solid #abaaaa' }, ...cardStyle.paperStyle }}>
                            <span style={cardStyle.labelStyle}>Leads Lost</span><br />
                            <span style={cardStyle.valueStyle}>{filtersValue.totalLostCount}</span>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item sm={1} md={1}>
                    <Stack spacing={0.75} justifyContent='center' alignItems='center'>
                        <Paper onClick={()=>selectFilterCallApi("today")} style={filter === "today" ? FilterSelectedStyle : FilterStyle}>Today</Paper>
                        <Paper onClick={()=>selectFilterCallApi("week")} style={filter === "week" ? FilterSelectedStyle : FilterStyle}>Week</Paper>
                        <Paper onClick={()=>selectFilterCallApi("month")} style={filter === "month" ? FilterSelectedStyle : FilterStyle}>Month</Paper>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
