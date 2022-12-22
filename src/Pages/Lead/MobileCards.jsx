import React from 'react';
import { Stack, Button, Typography, Dialog, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { format } from "date-fns";
import CachedIcon from '@material-ui/icons/Cached';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EventNoteIcon from '@material-ui/icons/EventNote';

const displayScoreValueName=(leadScore,leadScoringValue)=>{
    if(leadScore==='followup'){
        if(leadScoringValue==='followuphot'){
            return <>Hot</>
        }
        else if(leadScoringValue==='followupwarm'){
            return <>Warm</>
        }
        else if(leadScoringValue==='followupcold'){
            return <>Cold</>
        }
    }
    else if(leadScore==='new'){
        return <>New</>
    }
    else if(leadScore==='closed'){
        return <>Closed</>
    }
    else if(leadScore==='lost'){
        return <>Lost</>
    }
}
const displayScoreValueIcon=(leadScore,leadScoringValue)=>{
    if(leadScore==='followup'){
        if(leadScoringValue==='followuphot'){
            return  <WhatshotTwoToneIcon style={{backgroundColor:'#fff', color: '#e71e24', fontSize: '15px',padding:'2px',borderRadius:'4px'}}/>
        }
        else if(leadScoringValue==='followupwarm'){
            return <BrightnessHighIcon style={{backgroundColor:'#fff',color: '#febc12', fontSize: '15px',padding:'2px',borderRadius:'4px' }}/>
        }
        else if(leadScoringValue==='followupcold'){
            return <AcUnitIcon style={{backgroundColor:'#fff',color: '#1663be', fontSize: '15px',padding:'2px',borderRadius:'4px' }}/>
        }
    }
    else if(leadScore==='new'){
        return <FiberNewIcon style={{ backgroundColor:'#fff', color: '#fc7506', fontSize: '15px',padding:'2px',borderRadius:'4px',border:'0.8px solid #fff' }} />
    }
    else if(leadScore==='closed'){
        return <ThumbUpIcon style={{ backgroundColor:'#fff', color: '#1eaf1e', fontSize: '15px',padding:'2px',borderRadius:'4px' }} />
    }
    else if(leadScore==='lost'){
        return <ThumbDownIcon style={{ backgroundColor:'#fff', color: '#aaa', fontSize: '15px',padding:'2px',borderRadius:'4px' }} />
    }
}

export default function MobileCards({ details, setOpenView, setOpenScoring, setViewselectedDetails, notifyFun, setOpenAdd }) {
   
    var checkin = details.checkin;
    if (checkin != null && checkin.trim() != "") {
        checkin = format(new Date(checkin), "dd MMM,yyyy");
    }

    const OpenDialogView = async (row) => {
        notifyFun(row.id);
        setViewselectedDetails(row);
        setOpenView(true);
    };

    return (
        <Stack style={{ backgroundColor: '#f46d25', borderRadius: '0.5em' }}>
            <Stack direction='row' justifyContent='space-between' style={{ margin: '0em 1em' }}>
                <Stack direction='row' spacing={2} justifyContent='left' alignItems='center'> 
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1em',fontFamily:'Segoe UI' }}>{details.clientName}</span>
                <span>{displayScoreValueIcon(details.leadscoring,details.leadscoringvalue)}</span>
                </Stack>
                <Stack direction='row'>
                    <Tooltip title="lead scoring">
                        <IconButton>
                            <CachedIcon style={{ color: "#fff", fontSize: '0.7em' }} onClick={() => {setOpenScoring(true);setViewselectedDetails(details);}} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            aria-label="edit">
                            <EditIcon style={{ color: "#fff", fontSize: '0.7em' }}  onClick={() => {setOpenAdd(true);setViewselectedDetails(details);}}></EditIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                        <IconButton>
                            <VisibilityIcon style={{ color: "#fff", fontSize: '0.7em' }} onClick={() => { OpenDialogView(details) }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            <Stack spacing={0} style={{ backgroundColor: '#fff', boxShadow: '0px 3px 3px #ddd', padding: '0.5em 1.2em', fontSize: '0.7em', borderBottomRightRadius: '0.5em', borderBottomLeftRadius: '0.5em' }}>
                <Stack direction='row' justifyContent='space-between' >
                    <span style={{ width: '20em',fontFamily:'Segoe UI Semibold' }}>ClientNo: <span style={{fontFamily:'Poppins Thin Italic' }}>{details.clientMobileNo}</span></span>
                    <span style={{ width: '14em',fontFamily:'Segoe UI Semibold' }}>Assigned To: <span style={{fontFamily:'Poppins Thin Italic' }}>{details.leadassignto}</span></span>
                    {/* <span style={{ width: '14em' }}>Check-In: {checkin}</span> */}
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <span style={{ width: '20em',fontFamily:'Segoe UI Semibold' }}>Destination: <span style={{fontFamily:'Poppins Thin Italic' }}>{details.destination}</span></span>
                    <span style={{ width: '14em',fontFamily:'Segoe UI Semibold' }}>No. of Nights: <span style={{fontFamily:'Poppins Thin Italic' }}>{details.noofnights}</span></span>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <span style={{ width: '20em',fontFamily:'Segoe UI Semibold' }}>Lead Type: <span style={{fontFamily:'Poppins Thin Italic' }}>{details.leadType}</span></span>
                    <span style={{ width: '14em',fontFamily:'Segoe UI Semibold' }}>Lead Scoring: <span style={{fontFamily:'Poppins Thin Italic' }}>{displayScoreValueName(details.leadscoring,details.leadscoringvalue)}</span></span>
                </Stack>
                <span style={{ width: '100%',fontFamily:'Segoe UI Semibold' }}>Email Id: <span style={{fontFamily:'Poppins Thin Italic' }}>{details.clientMail}</span></span>
            </Stack>
        </Stack>
    );
}

// {displayScoreValueName(details.leadscoringvalue)}