import { Typography, Tabs, Tab, Box, Stack, TextField, Grid, TableRow, TableCell, Button } from "@mui/material";
import React, { useState, useReducer, useEffect } from "react";
import PropTypes from 'prop-types';
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Api from '../../Service/Api';
import Select from "react-select";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const useStyles = makeStyles(() => ({
    root: {
        // padding: "100px 0px",
        // margin: "0px 30px",
        padding: '5% 0.5% 1% 1.5%',
        "@media (max-width: 767px)": {
            margin: "0px 10px",
        },
    },
    icon: {
        fill: "currentColor",
        width: "1em",
        height: "1em",
        display: "inline-block",
        fontSize: "1.5rem",
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        position: "absolute",
        right: "15px",
        top: "5px",
        color: "#f46d25",
    },
    plus: {
        cursor: "pointer",
        color: "#f46d25",
        position: "relative",
        top: "7px",
        "@media (max-width: 767px)": {
            fontSize: "18px",
        },
    },
    title: {
        fontWeight: "bold",
        fontSize: "20px",
        color: "#f46d25",
        margin: "0px",
    },
}));

const FlightTripOption = [{ label: "Oneway", value: "oneway" }, { label: "Round", value: "round" }];
const TrainClass = [{ label: "1AC", value: "1AC" }, { label: "2AC", value: "2AC" }, { label: "3AC", value: "3AC" }, { label: "Sleeper", value: "Sleeper" }];
const CabTrip = [{ label: "Pickup", value: "Pickup" }, { label: "Drop", value: "Drop" }, { label: "Round", value: "Round" }];
const CabType = [{ label: "Private", value: "Private" }, { label: "SIC", value: "SIC" }];
const CabVehicle = [{ label: "Sedan", value: "Sedan" }, { label: "12 Seater", value: "12 Seater" }, { label: "24 Seater", value: "24 Seater" }];

export default function TravelForm() {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [formData, setFormData] = useReducer(formReducer, { transferId: "", type: "", totalAmount: "", commission: "", clientName: "",clientPhoneNumber: "" });
    const id=null

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // basic details starts 
    const [basicInput, setBasicInput] = useState([
        { id: "", clientName: "", clientPhoneNumber: "", clientEmail: "", clientAltNo: "" },
    ]);
    const handleRemoveClickBasic = (index) => {
        const list = [...basicInput];
        list.splice(index, 1);
        setBasicInput(list);
    };
    const handleAddClickBasic = () => {
        setBasicInput([
            ...basicInput,
            { id: "", clientName: "", clientMobileNo: "", clientEmail: "", clientAltNo: "" },
        ]);
    };
    const handleBasicChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...basicInput];
        list[index][name] = value;
        setBasicInput(list);
    };
    // basic details ends 

    // flight details starts 
    const [flightInput, setFlightInput] = useState([
        { id: "", flightTrip: "", flightName: "", flightFrom: "", flightTo: "", flightDepartDate: "", flightReturnDate: "", flightPnr: "", flightAdults: "", flightChild: "", flightInclusion: "", flightAmount: "", flightComission: "" },
    ]);
    const handleRemoveClickFlight = (index) => {
        const list = [...flightInput];
        list.splice(index, 1);
        setFlightInput(list);
    };
    const handleAddClickFlight = () => {
        setFlightInput([
            ...flightInput,
            { id: "", flightTrip: "", flightName: "", flightFrom: "", flightTo: "", flightDepartDate: "", flightReturnDate: "", flightPnr: "", flightAdults: "", flightChild: "", flightInclusion: "", flightAmount: "", flightComission: "" },
        ]);
    };
    const handleFlightChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...flightInput];
        list[index][name] = value;
        setFlightInput(list);
    };

    const handleFlightSelectChange = (name, value, index) => {
        const list = [...flightInput];
        list[index][name] = value;
        setFlightInput(list);
    };
    // flight details ends 

    // train details starts    
    const [trainInput, setTrainInput] = useState([
        { id: "", traintravelClass: "", trainName: "", trainFrom: "", trainTo: "", trainDepartDate: "", trainPnr: "", trainAdults: "", trainChild: "", trainInclusion: "", trainAmount: "", trainComission: "" },
    ]);

    const handleRemoveClickTrain = (index) => {
        const list = [...trainInput];
        list.splice(index, 1);
        setTrainInput(list);
    };

    const handleAddClickTrain = () => {
        setTrainInput([
            ...trainInput,
            { id: "", traintravelClass: "", trainName: "", trainFrom: "", trainTo: "", trainDepartDate: "", trainPnr: "", trainAdults: "", trainChild: "", trainInclusion: "", trainAmount: "", trainComission: "" },
        ]);
    };

    const handleTrainChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...trainInput];
        list[index][name] = value;
        setTrainInput(list);
    };
    // train details ends 

    // cab details starts 
    const [cabInput, setCabInput] = useState([
        { id: "", cabFrom: "", cabTo: "", cabTrip: "", cabType: "", cabVehicle: "", cabAdults: "", cabChild: "", cabAmount: "", cabComission: "" },
    ]);

    const handleRemoveClickCab = (index) => {
        const list = [...cabInput];
        list.splice(index, 1);
        setCabInput(list);
    };

    const handleAddClickCab = () => {
        setCabInput([
            ...cabInput,
            { id: "", cabFrom: "", cabTo: "", cabTrip: "", cabType: "", cabVehicle: "", cabAdults: "", cabChild: "", cabAmount: "", cabComission: "" },
        ]);
    };

    const handleCabChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...cabInput];
        list[index][name] = value;
        setCabInput(list);
    };
    // cab details ends 

    // bus details starts 
    const [busInput, setBusInput] = useState([
        { id: "", busName: "", busFrom: "", busTo: "", busSeatNo: "", busAdults: "", busChild: "", busAmount: "", busComission: "" },
    ]);

    const handleRemoveClickBus = (index) => {
        const list = [...busInput];
        list.splice(index, 1);
        setBusInput(list);
    };

    const handleAddClickBus = () => {
        setBusInput([
            ...busInput,
            { id: "", busName: "", busFrom: "", busTo: "", busSeatNo: "", busAdults: "", busChild: "", busAmount: "", busComission: "" },
        ]);
    };

    const handleBusChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...cabInput];
        list[index][name] = value;
        setBusInput(list);
    };
    // cab details ends 

    //date change starts 
    const handleFormDateChange = (name, e) => {
        setFlightInput({
            name: name,
            value: e
        });
    }
    //date change ends

    return (
        <div style={{ padding: "5% 1%" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography variant="h3" fontWeight='bold' color="#f46d25">Transfer Details</Typography><br />
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                            {/* <Tab label="Basic" {...a11yProps(0)} /> */}
                            <Tab label="Flight" {...a11yProps(0)} />
                            <Tab label="Train" {...a11yProps(1)} />
                            <Tab label="Road Transport" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <Stack style={{ backgroundColor: '#eee', padding: '1em' }}>
                            {basicInput.map((x, i) => (
                                <Grid container spacing={2} key={i}>
                                    <Grid item sm={6}>
                                        {i == 0 && (
                                            <p className={classes.title}>Basic Details</p>
                                        )}
                                    </Grid>
                                    <Grid item sm={6} style={{ textAlign: "end" }}>
                                        {basicInput.length !== 1 && (
                                            <DeleteIcon
                                                onClick={() => handleRemoveClickBasic(i)}
                                                className={classes.plus}
                                            />
                                        )}
                                        {basicInput.length - 1 === i && (
                                            <AddCircleOutlineIcon
                                                onClick={handleAddClickBasic}
                                                size="small"
                                                className={classes.plus}
                                            />
                                        )}
                                    </Grid>
                                    <div
                                        style={{
                                            width: "2%",
                                            textAlign: "center",
                                            marginTop: "1em",
                                        }}
                                    >
                                        {i + 1 + "."}
                                    </div>
                                    <div style={{ width: '97%', marginTop: '1em' }}>
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientName" label='Client Name' style={{ backgroundColor: '#fff' }} value={x.clientName} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientMobileNo" label='Mobile No' style={{ backgroundColor: '#fff' }} value={x.clientMobileNo} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientEmail" label='Email Id' style={{ backgroundColor: '#fff' }} value={x.clientEmail} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientAltNo" label='Alternate No' style={{ backgroundColor: '#fff' }} value={x.clientAltNo} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                </Grid>
                            ))}
                        </Stack><br />
                        <Stack style={{ backgroundColor: '#eee', padding: '1em' }}>
                            {flightInput.map((x, i) => (
                                <Grid container spacing={2} key={i}>
                                    <Grid item sm={6}>
                                        {i == 0 && (
                                            <p className={classes.title}>Flight Details</p>
                                        )}
                                    </Grid>
                                    <Grid item sm={6} style={{ textAlign: "end" }}>
                                        {flightInput.length !== 1 && (
                                            <DeleteIcon
                                                onClick={() => handleRemoveClickFlight(i)}
                                                className={classes.plus}
                                            />
                                        )}
                                        {flightInput.length - 1 === i && (
                                            <AddCircleOutlineIcon
                                                onClick={handleAddClickFlight}
                                                size="small"
                                                className={classes.plus}
                                            />
                                        )}
                                    </Grid>
                                    <div
                                        style={{
                                            width: "2%",
                                            textAlign: "center",
                                            marginTop: "1em",
                                        }}
                                    >
                                        {i + 1 + "."}
                                    </div>
                                    <div style={{ width: '97%', marginTop: '1em' }}>
                                        {/* <Stack direction='row' spacing={2}> */}
                                        <Grid container>
                                            <Select
                                                name="flightTrip"
                                                placeholder='Trip'
                                                value={FlightTripOption.filter(i => i.value === x.flightTrip)}
                                                options={FlightTripOption}
                                                onChange={(e) => handleFlightSelectChange("flightTrip", e.value, i)}
                                                styles={{
                                                    container: (provided) => ({
                                                        ...provided,
                                                    }),
                                                    menu: (provided) => ({
                                                        ...provided,
                                                        zIndex: 9999,
                                                    }),
                                                    valueContainer: (provided) => ({
                                                        ...provided,
                                                        overflow: "visible",
                                                    }),
                                                    placeholder: (provided, state) => ({
                                                        ...provided,
                                                        position: "absolute",
                                                        top:
                                                            state.hasValue ||
                                                                state.selectProps.inputValue
                                                                ? -4
                                                                : "50%",
                                                        background: "#fff",
                                                        padding: "0px 5px",
                                                        transition: "top 0.1s, font-size 0.1s",
                                                        fontSize: "16px",
                                                    }),
                                                    control: (base, state) => ({
                                                        ...base,
                                                        "&:hover": { borderColor: "#f46d25" },
                                                        borderColor: "#f46d25",
                                                        boxShadow: "none",
                                                    }),
                                                }} />
                                            <CustomTextInlineField name="flightName" label="Flight Name" value={x.flightName} onChange={(e) => { handleFlightChange(e, i) }} />
                                            <CustomTextInlineField name="flightFrom" label="From" value={x.flightFrom} onChange={(e) => { handleFlightChange(e, i) }} />
                                            <CustomTextInlineField name="flightTo" label="To" />
                                        {/* </Stack> */}
                                        </Grid><br />
                                        <Stack direction='row' spacing={2}>
                                            {/* <CustomTextInlineField name="flightDepartDate" label="DepartureDate" />
                                        <CustomTextInlineField name="flightReturnDate" label="Return Date" /> */}
                                            <DatePicker
                                                label="DepartureDate"
                                                size="small"
                                                autoOk
                                                required
                                                format="dd-MM-yyyy"
                                                inputVariant="outlined"
                                                fullWidth
                                                // disablePast={id ? false : true}
                                                variant="inline"
                                                value={flightInput.flightDepartDate ? flightInput.flightDepartDate : null}
                                                onChange={(e) => handleFormDateChange("flightDepartDate", e)} />

                                            <DatePicker
                                                required
                                                label="Return Date"
                                                value={flightInput.flightReturnDate ? flightInput.flightReturnDate : null}
                                                inputVariant="outlined"
                                                size="small"
                                                fullWidth
                                                onChange={(e) => handleFormDateChange("flightReturnDate", e)}
                                                format="dd-MM-yyyy"
                                                variant="inline"
                                                autoOk
                                                minDate={flightInput.flightDepartDate ? flightInput.flightDepartDate : new Date()}
                                            />
                                            <CustomTextInlineField name="flightPnr" label="PNR No" value={x.flightPnr} onChange={(e) => { handleFlightChange(e, i) }} />
                                            <CustomTextInlineField name="flightAdults" label="Adults" value={x.flightAdults} onChange={(e) => { handleFlightChange(e, i) }} />
                                        </Stack><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="flightChild" label='Children' style={{ backgroundColor: '#fff' }} value={x.flightChild} onChange={(e) => { handleFlightChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CustomTextInlineField name="flightInclusion" label='Inclusion' style={{ backgroundColor: '#fff' }} value={x.flightInclusion} onChange={(e) => { handleFlightChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="flightAmount" label='Total Amount' style={{ backgroundColor: '#fff' }} value={x.flightAmount} onChange={(e) => { handleFlightChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="flightComission" label='Comisssion' style={{ backgroundColor: '#fff' }} value={x.flightComission} onChange={(e) => { handleFlightChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                    </div>
                                </Grid>
                            ))}
                        </Stack><br />
                        <Box style={{ backgroundColor: '#eee', paddingLeft: '1em', border: '0.2px solid #ccc' }}>
                            <Grid container>
                                <Grid item xs={7} style={{ padding: '0.3em' }}>
                                    <span style={{ color: '#f46d25', fontWeight: 'bold' }}>Total Transfer Booking Amount</span>
                                </Grid>
                                <Grid item xs={5} style={{ padding: '0.3em' }}>
                                    <span style={{ fontWeight: 'bold' }}>Commission</span>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box style={{ backgroundColor: '#fff', border: '0.5px solid #ccc' }}>
                            <Grid container>
                                <Grid item xs={7} style={{ padding: '0.3em', paddingLeft: '1.3em' }}>
                                    <span>1200</span>
                                </Grid>
                                <Grid item xs={5} style={{ padding: '0.3em', paddingLeft: '1em' }}>
                                    <span>300</span>
                                </Grid>
                            </Grid>
                        </Box> <br />
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Link to={{ pathname: "/previewPage" }} style={{ fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, borderColor: "#f46d25", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "white", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' }}>Next
                            </Link>

                            <Link to={{ pathname: "/transferList" }} style={{ fontSize: "15px", fontWeight: "bold", background: "#111", border: 0, borderColor: "#111", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "#fff", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' }}>Cancel
                            </Link>
                        </Stack>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Stack style={{ backgroundColor: '#eee', padding: '1em' }}>
                            {trainInput.map((x, i) => (
                                <Grid container spacing={2} key={i}>
                                    <Grid item sm={6}>
                                        {i == 0 && (
                                            <p className={classes.title}>Train Details</p>
                                        )}
                                    </Grid>
                                    <Grid item sm={6} style={{ textAlign: "end" }}>
                                        {trainInput.length !== 1 && (
                                            <DeleteIcon
                                                onClick={() => handleRemoveClickTrain(i)}
                                                className={classes.plus}
                                            />
                                        )}
                                        {trainInput.length - 1 === i && (
                                            <AddCircleOutlineIcon
                                                onClick={handleAddClickTrain}
                                                size="small"
                                                className={classes.plus}
                                            />
                                        )}
                                    </Grid>
                                    <div
                                        style={{
                                            width: "2%",
                                            textAlign: "center",
                                            marginTop: "1em",
                                        }}
                                    >
                                        {i + 1 + "."}
                                    </div>
                                    <div style={{ width: '97%', marginTop: '1em' }}>
                                        <Stack direction='row' spacing={2} >
                                            <CustomTextInlineField name="trainName" label='Train Name' value={x.trainName} onChange={(e) => { handleTrainChange(e, i) }} />
                                            <CustomTextInlineField name="trainFrom" label='From' value={x.trainFrom} onChange={(e) => { handleTrainChange(e, i) }} />
                                            <CustomTextInlineField name="trainTo" label='To' value={x.trainTo} onChange={(e) => { handleTrainChange(e, i) }} />
                                            <DatePicker
                                                label="DepartureDate"
                                                size="small"
                                                autoOk
                                                required
                                                format="dd-MM-yyyy"
                                                inputVariant="outlined"
                                                fullWidth
                                                // disablePast={id ? false : true}
                                                variant="inline"
                                                value={trainInput.trainDepartDate ? trainInput.trainDepartDate : null}
                                                onChange={(e) => handleFormDateChange("trainDepartDate", e)} />
                                        </Stack><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <Select
                                                        name="traintravelClass"
                                                        placeholder='Travel Class'
                                                        value={TrainClass.filter(i => i.value === x.traintravelClass)}
                                                        options={TrainClass}
                                                        onChange={(e) => handleTrainChange(e, i)}
                                                        style={{ width: '100%', height: '2.5em', backgroundColor: '#fff', color: "#f46d25" }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="trainPnr" label='PNR No' value={x.trainPnr} onChange={(e) => { handleTrainChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="trainAdults" label='Adults' value={x.trainAdults} onChange={(e) => { handleTrainChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="trainChild" label='Children' style={{ backgroundColor: '#fff' }} value={x.trainChild} onChange={(e) => { handleTrainChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <CustomTextInlineField name="trainInclusion" label='Inclusion' style={{ backgroundColor: '#fff' }} value={x.trainInclusion} onChange={(e) => { handleTrainChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="trainAmount" label='Total Amount' style={{ backgroundColor: '#fff' }} value={x.trainAmount} onChange={(e) => { handleTrainChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="trainComission" label='Comission' style={{ backgroundColor: '#fff' }} value={x.trainComission} onChange={(e) => { handleTrainChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                </Grid>
                            ))}
                        </Stack><br />
                        <Box style={{ backgroundColor: '#eee', paddingLeft: '1em', border: '0.2px solid #ccc' }}>
                            <Grid container>
                                <Grid item xs={7} style={{ padding: '0.3em' }}>
                                    <span style={{ color: '#f46d25', fontWeight: 'bold' }}>Total Transfer Booking Amount</span>
                                </Grid>
                                <Grid item xs={5} style={{ padding: '0.3em' }}>
                                    <span style={{ fontWeight: 'bold' }}>Commission</span>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box style={{ backgroundColor: '#fff', border: '0.5px solid #ccc' }}>
                            <Grid container>
                                <Grid item xs={7} style={{ padding: '0.3em', paddingLeft: '1.3em' }}>
                                    <span>1200</span>
                                </Grid>
                                <Grid item xs={5} style={{ padding: '0.3em', paddingLeft: '1em' }}>
                                    <span>300</span>
                                </Grid>
                            </Grid>
                        </Box> <br />
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Link to={{ pathname: "/previewPage" }} style={{ fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, borderColor: "#f46d25", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "white", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' }}>Next
                            </Link>

                            <Link to={{ pathname: "/transferList" }} style={{ fontSize: "15px", fontWeight: "bold", background: "#111", border: 0, borderColor: "#111", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "#fff", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' }}>Cancel
                            </Link>
                        </Stack>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <Stack style={{ backgroundColor: '#eee', padding: '1em' }}>
                            {cabInput.map((x, i) => (
                                <Grid container spacing={2} key={i}>
                                    <Grid item sm={6}>
                                        {i == 0 && (
                                            <p className={classes.title}>Cab Details</p>
                                        )}
                                    </Grid>
                                    <Grid item sm={6} style={{ textAlign: "end" }}>
                                        {cabInput.length !== 1 && (
                                            <DeleteIcon
                                                onClick={() => handleRemoveClickCab(i)}
                                                className={classes.plus}
                                            />
                                        )}
                                        {cabInput.length - 1 === i && (
                                            <AddCircleOutlineIcon
                                                onClick={handleAddClickCab}
                                                size="small"
                                                className={classes.plus}
                                            />
                                        )}
                                    </Grid>
                                    <div
                                        style={{
                                            width: "2%",
                                            textAlign: "center",
                                            marginTop: "1em",
                                        }}
                                    >
                                        {i + 1 + "."}
                                    </div>
                                    <div style={{ width: '97%', marginTop: '1em' }}>
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="cabFrom" label='From' value={x.cabFrom} onChange={(e) => { handleCabChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="cabTo" label='To' value={x.cabTo} onChange={(e) => { handleCabChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Select
                                                        name="cabTrip"
                                                        placeholder='Pickup/Drop/Round'
                                                        // value={trainClass.filter(i => i.value === x.trainTrip)}
                                                        options={CabTrip}
                                                        onChange={(e) => handleCabChange(e, i)}
                                                        style={{ width: '100%', height: '2.5em', backgroundColor: '#fff', color: "#f46d25" }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Select
                                                        name="cabType"
                                                        placeholder='Private/SIC'
                                                        // value={trainClass.filter(i => i.value === x.trainTrip)}
                                                        options={CabType}
                                                        onChange={(e) => handleCabChange(e, i)}
                                                        style={{ width: '100%', height: '2.5em', backgroundColor: '#fff', color: "#f46d25" }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <Select
                                                        name="cabVehicle"
                                                        placeholder='Sedan/12Seater/24Seater'
                                                        // value={trainClass.filter(i => i.value === x.trainTrip)}
                                                        options={CabVehicle}
                                                        // onChange={(e) => handleTrainChange(e, i)}
                                                        style={{ width: '100%', height: '2.5em', backgroundColor: '#fff', color: "#f46d25" }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="cabAdult" label='Adults' value={x.cabAdult} onChange={(e) => { handleCabChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="cabChild" label='Children' value={x.cabChild} onChange={(e) => { handleCabChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="cabAmount" label='Total Amount' style={{ backgroundColor: '#fff' }} value={x.cabAmount} onChange={(e) => { handleCabChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="cabComission" label='Comission' style={{ backgroundColor: '#fff' }} value={x.cabComission} onChange={(e) => { handleCabChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                </Grid>
                            ))}
                        </Stack><br />
                        <Stack style={{ backgroundColor: '#eee', padding: '1em' }}>
                            {busInput.map((x, i) => (
                                <Grid container spacing={2} key={i}>
                                    <Grid item sm={6}>
                                        {i == 0 && (
                                            <p className={classes.title}>Bus Details</p>
                                        )}
                                    </Grid>
                                    <Grid item sm={6} style={{ textAlign: "end" }}>
                                        {busInput.length !== 1 && (
                                            <DeleteIcon
                                                onClick={() => handleRemoveClickBus(i)}
                                                className={classes.plus}
                                            />
                                        )}
                                        {busInput.length - 1 === i && (
                                            <AddCircleOutlineIcon
                                                onClick={handleAddClickBus}
                                                size="small"
                                                className={classes.plus}
                                            />
                                        )}
                                    </Grid>
                                    <div
                                        style={{
                                            width: "2%",
                                            textAlign: "center",
                                            marginTop: "1em",
                                        }}
                                    >
                                        {i + 1 + "."}
                                    </div>
                                    <div style={{ width: '97%', marginTop: '1em' }}>
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busName" label='Bus Name' value={x.busName} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busFrom" label='From' value={x.busFrom} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busTo" label='To' value={x.busTo} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busSeatNo" label='Seat No' value={x.busSeatNo} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busAdult" label='Adult' value={x.busAdult} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busChild" label='Children' value={x.busChild} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busAmount" label='Total Amount' style={{ backgroundColor: '#fff' }} value={x.busAmount} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="busComission" label='Comission' style={{ backgroundColor: '#fff' }} value={x.busComission} onChange={(e) => { handleBusChange(e, i) }} />
                                                </Grid>
                                            </Grid>
                                        </Box><br />
                                    </div>
                                </Grid>
                            ))}
                        </Stack><br />
                        <Box style={{ backgroundColor: '#eee', paddingLeft: '1em', border: '0.2px solid #ccc' }}>
                            <Grid container>
                                <Grid item xs={7} style={{ padding: '0.3em' }}>
                                    <span style={{ color: '#f46d25', fontWeight: 'bold' }}>Total Transfer Booking Amount</span>
                                </Grid>
                                <Grid item xs={5} style={{ padding: '0.3em' }}>
                                    <span style={{ fontWeight: 'bold' }}>Commission</span>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box style={{ backgroundColor: '#fff', border: '0.5px solid #ccc' }}>
                            <Grid container>
                                <Grid item xs={7} style={{ padding: '0.3em', paddingLeft: '1.3em' }}>
                                <CustomTextInlineField name="commission"/>
                                </Grid>
                                <Grid item xs={5} style={{ padding: '0.3em', paddingLeft: '1em' }}>
                                    <span>300</span>
                                </Grid>
                            </Grid>
                        </Box><br />
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Link to={{ pathname: "/previewPage" }} style={{ fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, borderColor: "#f46d25", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "white", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' }}>Preview
                            </Link>

                            <Link to={{ pathname: "/transferList" }} style={{ fontSize: "15px", fontWeight: "bold", background: "#111", border: 0, borderColor: "#111", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "#fff", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' }}>Cancel
                            </Link>
                        </Stack>
                    </TabPanel>
                </div>
            </MuiPickersUtilsProvider>
        </div >)
}

function CustomTextInlineField(props) {
    return (<TextField
        name={props.name}
        fullWidth
        label={props.label}
        value={props.value}
        autoFocus
        variant="outlined"
        size="small"
        style={{ backgroundColor: '#fff', color: "#f46d25" }}
        onChange={props.onChange}
    />)
}