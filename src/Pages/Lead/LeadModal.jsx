import { React, useState } from 'react'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import { Modal, Box, Tab, Tabs, Typography, TextField, FormControlLabel, Radio, RadioGroup, Stack, Button, IconButton, Container } from '@mui/material';
import Api from '../../Service/Api';

const mystyle = {
    position: 'absolute',
    top: '24%',
    left: '20%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: "20px 20px",
    width: '800px',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};


export default function LeadModal(props) {

    const [value, setValue] = useState('new');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyle = {
        default_tab: {
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid #eee'
        },
        active_tab: {
            backgroundColor: "#f46d25",
            color: 'white'
        }
    };

    const getStyle = (isActive) => {
        return isActive ? tabStyle.active_tab : tabStyle.default_tab
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box style={mystyle}>
                <Typography style={{ color: 'rgb(244, 109, 37)', fontWeight: '700' }} variant="h6">Lead Scoring</Typography>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="secondary tabs example"
                    centered
                    variant="fullWidth"
                    TabIndicatorProps={{
                        sx: {
                            backgroundColor: 'rgb(244, 109, 37)',
                        },
                    }}
                >
                    <Tab value="new" label="New" style={getStyle(value === "new")} />
                    <Tab value="lost" label="Lost" style={getStyle(value === "lost")} />
                    <Tab value="followup" label="Follow Up" style={getStyle(value === "followup")} />
                    <Tab value="closed" label="Closed" style={getStyle(value === "closed")} />
                </Tabs>
                <TabPanel value={value} handleClose={props.handleClose} selectedTable={props.selectedTable} clickedRowId={props.selectedscoreId} fetchBoard={props.fetchBoard} />
            </Box>
        </Modal>
    );
}

const submitLeadModal = (selectedTable, id, leadscoring, leadscoringvalue, reason, handleClose, fetchBoard) => {
    var createdBy = localStorage.getItem("auth");

    var url = '/boardleadupdatescoring/' + id;
    if (selectedTable === "agentlead") {
        url = '/agenttryingbookingstatus/' + id;
    }

    var data = { "id": id, "leadscoringvalue": leadscoringvalue, "leadscoring": leadscoring, "reason": reason, "updatedBy": createdBy }

    // PUT API CALL
    Api.put(url, data)
        .then((response) => {
            handleClose();
            fetchBoard();
        })
window.open("/lead","_self");
}

function TabPanel(props) {
    const [radioValue, setRadioValue] = useState('followuphot');
    const [lostReason, setLostReason] = useState('');
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };
    if (props.value === "new") {
        return (
            <>
                <Container sx={{ padding: "20px", backgroundColor: "#eee" }}>
                    <FormControlLabel value="new" control={<Radio style={{ color: 'rgb(244, 109, 37)' }} />} label="New Lead" checked="true" />
                </Container>
                <Stack direction='row' spacing={1} justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Button size="large" sx={{ backgroundColor: 'rgb(244, 109, 37)', color: '#eee', width: '20%' }} onClick={() => submitLeadModal(props.selectedTable, props.clickedRowId, "new", "", "", props.handleClose, props.fetchBoard)}>Submit</Button>
                    <Button size="large" sx={{ backgroundColor: '#111', color: '#eee', width: '20%' }} onClick={props.handleClose}>Cancel</Button>

                </Stack>
            </>

        )
    }
    else if (props.value === "lost") {
        return (
            <>
                <Container sx={{ padding: "20px", backgroundColor: "#eee" }}>
                    <Stack spacing={2} alignItems="center">
                        <br />
                        <TextField
                            style={{ 'backgroundColor': 'white' }}
                            required
                            name='reason'
                            label="Reason"
                            fullWidth
                            focused
                            onChange={(event) => setLostReason(event.target.value)}
                            InputLabelProps={{
                                style: { 'color': 'black' }
                            }}
                            size='small'
                            color="warning"
                        />
                    </Stack>
                </Container>
                <Stack direction='row' spacing={1} justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Button size="large" variant="contained" sx={{backgroundColor: 'rgb(244, 109, 37)', color: '#eee', width: '20%'}} onClick={() => submitLeadModal(props.selectedTable, props.clickedRowId, "lost", "", lostReason, props.handleClose, props.fetchBoard)}>
                        Submit
                    </Button>
                    <Button size="large" onClick={props.handleClose} variant="outlined" sx={{ backgroundColor: '#111', color: '#eee', width: '20%' }}>
                        Cancel
                    </Button>
                </Stack>
            </>
        )
    }
    else if (props.value == "followup") {
        return (
            <>
                <Container sx={{ padding: "20px", backgroundColor: "#eee" }}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={radioValue}
                        onChange={handleRadioChange}
                    >
                        <Stack direction='row' spacing={2} justifyContent="space-around">
                            <IconButton color="error" >
                                <FormControlLabel value="followuphot" control={<Radio style={{ color: 'rgb(194, 24, 7)' }} />} label=""/>
                                <WhatshotTwoToneIcon/>
                                Hot
                            </IconButton>
                             <IconButton color="warning">
                                <FormControlLabel value="followupwarm" control={<Radio style={{ color: 'rgb(244, 109, 37)' }} />} label=""/>
                                <BrightnessHighIcon />
                                Warm
                            </IconButton>
                            <IconButton color="primary" >
                                <FormControlLabel value="followupcold" control={<Radio />} label="" />
                                <AcUnitIcon />
                                Cold
                            </IconButton>
                        </Stack>
                    </RadioGroup>
                </Container>
                <Stack direction='row' spacing={1} justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Button size="large" variant="contained" sx={{ backgroundColor: 'rgb(244, 109, 37)', color: '#eee', width: '20%'}} onClick={() => submitLeadModal(props.selectedTable, props.clickedRowId, "followup", radioValue, "", props.handleClose, props.fetchBoard)}>
                        Submit
                    </Button>
                    <Button size="large" onClick={props.handleClose} variant="outlined" sx={{ backgroundColor: '#111', color: '#eee', width: '20%' }}>
                        Cancel
                    </Button>
                </Stack>
            </>

        )
    }
    else if (props.value == "closed") {
        return (
            <>
                <Container sx={{ padding: "20px", backgroundColor: "#eee" }}>
                <FormControlLabel value="closed" control={<Radio style={{ color: 'rgb(244, 109, 37)' }} />} label="Closed" checked="true" />
                </Container>
                <Stack direction='row' spacing={1} justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Button size="large" variant="contained" sx={{ backgroundColor: 'rgb(244, 109, 37)', color: '#eee', width: '20%'}} onClick={() => submitLeadModal(props.selectedTable, props.clickedRowId, "closed", "", "", props.handleClose, props.fetchBoard)}>
                        Submit
                    </Button>
                    <Button size="large" onClick={props.handleClose} variant="outlined"  sx={{ backgroundColor: '#111', color: '#eee', width: '20%'}}>
                        Cancel
                    </Button>
                </Stack>
            </>
        )
    }
}
