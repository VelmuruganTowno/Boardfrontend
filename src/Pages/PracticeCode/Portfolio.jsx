import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import { Stack } from "@mui/material";

export default function Portfolio() {
    return (
        <div style={{ padding: '5%' }}>
            <Stack direction='row' justifyContent='space-between'>
                <h2>My Portfolio</h2>

            </Stack>
            <Stack direction='row' spacing={1} style={{backgroundColor:'#111',color:'#fff',width:'15em',borderRadius:'10px'}}>
                <h4 style={{paddingLeft:'2em'}}>Download Your CV </h4>
                <GetAppIcon style={{ marginTop: '10%', fontSize: '20px' }} />
            </Stack>
        </div>
    )
}