import React, { useState, useReducer, useEffect } from "react";
import { Typography, Tabs, Tab, Box, Stack, TextField, Grid, TableRow, TableCell, Button, Dialog, Slide } from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from 'date-fns';
import Api from '../../Service/Api';
import Select, { components } from "react-select";
import FlightForm from "./FlightForm";
import TrainForm from "./TrainForm";
import PreviewPage from "./PreviewPage";
import { toast } from "react-toastify";
// import { useHistory } from 'react-router-dom';
import RoadForm from "./RoadForm";
import ClientForm from '../Clients/ClientForm';
import { twnButtonStyles } from "../../utils/townoStyle";

const { ValueContainer, Placeholder } = components;
const CustomValueContainer = ({ children, ...props }) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children.map(children, (child) =>
                child && child.type !== Placeholder ? child : null
            )}
        </ValueContainer>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 1, m: -1 }}>
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

function a11yProps(index) { return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`, }; }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

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
        fontWeight: "600",
        fontSize: "18px",
        color: "#f46d25",
        margin: "0px",
    },
    nextBtn: { fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, borderColor: "#f46d25", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "white", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' },
    cancelBtn: { fontSize: "15px", fontWeight: "bold", background: "#111", border: 0, borderColor: "#111", cursor: "pointer", borderRadius: '10px', borderWidth: " thin", color: "#fff", height: "30px", width: '120px', textAlign: 'center', paddingTop: '0.6em' },
}));

const travelType = (flightInput, trainInput, cabInput, busInput) => {
    var flightTempAmountArray = flightInput.map((x, i) => { return /^\+?\d+$/.test(x.flightAmount) ? x.flightAmount : 0 });
    var flightTempTotalAmount = flightTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var trainTempAmountArray = trainInput.map((x, i) => { return /^\+?\d+$/.test(x.trainAmount) ? x.trainAmount : 0 });
    var trainTempTotalAmount = trainTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var cabTempAmountArray = cabInput.map((x, i) => { return /^\+?\d+$/.test(x.cabAmount) ? x.cabAmount : 0 });
    var cabTempTotalAmount = cabTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
    var busTempAmountArray = busInput.map((x, i) => { return /^\+?\d+$/.test(x.busAmount) ? x.busAmount : 0 });
    var busTempTotalAmount = busTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
    // console.log("diffAmount: ", flightTempTotalAmount, flightTempTotalAmount > 0);
    var type = "";
    if (flightTempTotalAmount > 0) {
        type += "Flight, ";
    }
    if (trainTempTotalAmount > 0) {
        type += " Train, "
    }
    if (cabTempTotalAmount > 0) {
        type += " Cab, "
    }
    if (busTempTotalAmount > 0) {
        type += " Bus"
    }
    return type;
}

const checkFields = ["clientName", "clientMobileNo", "flightFrom", "flightTo", "flightAdults", "flightAmount", "trainFrom", "trainTo", "trainAdults", "trainAmount", "cabFrom", "cabTo", "cabAdults", "cabAmount", "busFrom", "busTo", "busAdults", "busAmount"];


export default function TravelForm() {
    var uniqueid = localStorage.getItem("unique_id");

    let { transferId } = useParams();
    const classes = useStyles();
    // const history = useHistory();
    const [value, setValue] = useState(0);
    var createdBy = localStorage.getItem("auth");
    const [formData, setFormData] = useReducer(formReducer, { uniqueId: uniqueid, transferId: "", totalAmount: "", commission: "", createdBy: createdBy, createdAt: format(new Date(), "yyyy-MM-dd hh:mm:ss"), "updateBy": null, "updateAt": null });
    const [openPreview, setOpenPreview] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [commission, setCommission] = useState(0);
    const [open, setOpen] = useState(false)
    const [selectedId] = useState(0);
    const [clientLists, setClientLists] = useState([]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [basicInput, setBasicInput] = useState([
        { id: "", clientName: " ", clientMobileNo: " ", clientEmail: " ", clientAltNo: " " },
    ]);
    const [basicInputError, setBasicInputError] = useState([{ id: "", clientName: " " },]);

    const [flightInput, setFlightInput] = useState([
        { id: "", flightTrip: " ", flightName: " ", flightFrom: " ", flightTo: " ", flightDepartDate: "", flightReturnDate: "", flightPnr: " ", flightAdults: " ", flightChild: " ", flightInclusion: " ", flightAmount: "", flightComission: "" },
    ]);

    const [flightInputError, setFlightInputError] = useState([
        { id: "", flightTrip: " ", flightName: " ", flightFrom: " ", flightTo: " ", flightDepartDate: "", flightReturnDate: "", flightPnr: " ", flightAdults: " ", flightChild: " ", flightInclusion: " ", flightAmount: "", flightComission: "" },
    ]);
    const [trainInput, setTrainInput] = useState([
        { id: "", traintravelClass: " ", trainName: " ", trainFrom: " ", trainTo: " ", trainDepartDate: "", trainPnr: " ", trainAdults: " ", trainChild: " ", trainInclusion: " ", trainAmount: "", trainComission: "" },
    ]);
    const [trainInputError, setTrainInputError] = useState([
        { id: "", traintravelClass: " ", trainName: " ", trainFrom: " ", trainTo: " ", trainDepartDate: "", trainPnr: " ", trainAdults: " ", trainChild: " ", trainInclusion: " ", trainAmount: "", trainComission: "" },
    ]);
    const [cabInput, setCabInput] = useState([
        { id: "", cabFrom: " ", cabTo: "", cabTrip: " ", cabType: " ", cabVehicle: " ", cabAdults: " ", cabChild: " ", cabAmount: "", cabCommission: "" },
    ]);
    const [cabInputError, setCabInputError] = useState([
        { id: "", cabFrom: " ", cabTo: "", cabTrip: " ", cabType: " ", cabVehicle: " ", cabAdults: " ", cabChild: " ", cabAmount: "", cabCommission: "" },
    ]);
    const [busInput, setBusInput] = useState([
        { id: "", busName: "", busFrom: " ", busTo: " ", busSeatNo: " ", busAdults: " ", busChild: " ", busAmount: "", busCommission: "" },
    ]);
    const [busInputError, setBusInputError] = useState([
        { id: "", busName: "", busFrom: " ", busTo: " ", busSeatNo: " ", busAdults: " ", busChild: " ", busAmount: "", busCommission: "" },
    ]);

    const handleRemoveClickBasic = (index) => {
        const list = [...basicInput];
        list.splice(index, 1);
        setBasicInput(list);

        const listError = [...basicInputError];
        listError.splice(index, 1);
        setBasicInputError(listError);
    };
    const handleAddClickBasic = () => {
        setBasicInput([
            ...basicInput,
            { id: "", clientName: " ", clientMobileNo: " ", clientEmail: " ", clientAltNo: " " },
        ]);

        setBasicInputError([
            ...basicInputError,
            { id: "", clientName: " " },
        ]);
    };
    const handleBasicChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...basicInput];
        list[index][name] = value;
        setBasicInput(list);
    };

    useEffect(() => {
        var tempTotalAmount = 0;
        var flightAmountArray = flightInput.map((x, i) => { return /^\+?\d+$/.test(x.flightAmount) ? x.flightAmount : 0 });
        var flightTotalAmount = flightAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
        tempTotalAmount += flightTotalAmount;

        var trainAmountArray = trainInput.map((x, i) => { return /^\+?\d+$/.test(x.trainAmount) ? x.trainAmount : 0 });
        var trainTotalAmount = trainAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
        tempTotalAmount += trainTotalAmount;

        var cabAmountArray = cabInput.map((x, i) => { return /^\+?\d+$/.test(x.cabAmount) ? x.cabAmount : 0 });
        var cabTotalAmount = cabAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
        tempTotalAmount += cabTotalAmount;

        var busAmountArray = busInput.map((x, i) => { return /^\+?\d+$/.test(x.busAmount) ? x.busAmount : 0 });
        var busTotalAmount = busAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
        tempTotalAmount += busTotalAmount;

        setTotalAmount(tempTotalAmount);

        var tempCommission = 0;
        var flightCommissionArray = flightInput.map((x, i) => { return /^\+?\d+$/.test(x.flightComission) ? x.flightComission : 0 });
        tempCommission += flightCommissionArray.reduce((total, num) => { return total + (num / 1) }, 0)

        var trainCommissionArray = trainInput.map((x, i) => { return /^\+?\d+$/.test(x.trainComission) ? x.trainComission : 0 });
        tempCommission += trainCommissionArray.reduce((total, num) => { return total + (num / 1) }, 0)

        var cabCommissionArray = cabInput.map((x, i) => { return /^\+?\d+$/.test(x.cabCommission) ? x.cabCommission : 0 });
        tempCommission += cabCommissionArray.reduce((total, num) => { return total + (num / 1) }, 0)

        var busCommissionArray = busInput.map((x, i) => { return /^\+?\d+$/.test(x.busCommission) ? x.busCommission : 0 });
        tempCommission += busCommissionArray.reduce((total, num) => { return total + (num / 1) }, 0)

        setCommission(tempCommission);

    }, [flightInput, trainInput, cabInput, busInput])

    const handleSubmit = () => {
        let postData = {
            ...formData,
            "basicDetails": basicInput,
            "flightDetails": flightInput,
            "trainDetails": trainInput,
            "cabDetails": cabInput,
            "busDetails": busInput,
            "type": travelType(flightInput, trainInput, cabInput, busInput),
            clientName: basicInput[0].clientName,
            clientPhoneNumber: basicInput[0].clientMobileNo,
            "totalAmount": totalAmount,
            "commission": commission

        }
        if (transferId) {
            postData = { ...postData, "transferId": transferId }
        }

        // console.log("POSTATA: ", postData);
        Api.post("transferData", postData).then((res) => {
            toast.success('Transfer Details Successfull');
            // console.log("res:", res)
        });
        // history.push({ pathname: "/transferList" })
        window.open("/transferList", "_self")
    }

    const handleChangeClient = (index, option) => {
        const list = [...basicInput];
        list[index]["clientName"] = option.value;
        list[index]["clientMobileNo"] = option.clientMobileNo;
        list[index]["clientEmail"] = option.clientEmail;
        setBasicInput(list);
    }

    useEffect(() => {
        if (transferId) {
            Api.get(`/transferDetail/${uniqueid}/${transferId}`).then((res) => {
                setFormData(res.data);
                let arr = [];
                for (let i = 0; i < res.data.basicDetails.length; i++) {
                    arr.push({ id: `${i}`, clientName: " " })
                }
                setBasicInputError(arr);
                setBasicInput(res.data.basicDetails);

                arr = [];
                for (let i = 0; i < res.data.flightDetails.length; i++) {
                    arr.push({ id: "", flightTrip: " ", flightName: " ", flightFrom: " ", flightTo: " ", flightDepartDate: "", flightReturnDate: "", flightPnr: " ", flightAdults: " ", flightChild: " ", flightInclusion: " ", flightAmount: "", flightComission: "" })
                }
                setFlightInputError(arr);
                setFlightInput(res.data.flightDetails);
                arr = [];
                for (let i = 0; i < res.data.trainDetails.length; i++) {
                    arr.push({ id: "", traintravelClass: " ", trainName: " ", trainFrom: " ", trainTo: " ", trainDepartDate: "", trainPnr: " ", trainAdults: " ", trainChild: " ", trainInclusion: " ", trainAmount: "", trainComission: "" })
                }
                setTrainInputError(arr);
                setTrainInput(res.data.trainDetails);
                arr = [];
                for (let i = 0; i < res.data.cabDetails.length; i++) {
                    arr.push({ id: "", cabFrom: " ", cabTo: "", cabTrip: " ", cabType: " ", cabVehicle: " ", cabAdults: " ", cabChild: " ", cabAmount: "", cabCommission: "" })
                }
                setCabInputError(arr);
                setCabInput(res.data.cabDetails);
                arr = [];
                for (let i = 0; i < res.data.busDetails.length; i++) {
                    arr.push({ id: "", busName: "", busFrom: " ", busTo: " ", busSeatNo: " ", busAdults: " ", busChild: " ", busAmount: "", busCommission: "" })
                }
                setBusInputError(arr);
                setBusInput(res.data.busDetails);
            });
        }
    }, []);

    useEffect(() => {
        Api.get(`/clientall/${uniqueid}`).then((res) => {
            // console.log("res.data: clientall ",res.data)
            setClientLists(res.data)
        })
    }, [open])

    const Clientoptions =
        clientLists &&
        clientLists.map((client) => {
            let combine = `${client.firstName} ${client.lastName} (${client.mail})`;
            let combine1 = `${client.firstName} ${client.lastName}`;
            return { label: combine, value: combine1, id: client.id, clientMobileNo: client.mobile, clientEmail: client.mail };
        });

    const validateAllFields = (arr, errorArr, setErrorArr) => {
        let eachVaid = arr.map((each, i) => {
            let valid = true;
            let formDataCheck = Object.entries(each);
            formDataCheck = formDataCheck.filter(e => { return checkFields.includes(e[0]) })
            // console.log("formDataCheck: ", formDataCheck);
            Object.values(formDataCheck).forEach(val => {
                if (val[1] !== null && val[1].toString().trim().length <= 0) {
                    valid = false;
                    let temp = errorArr;
                    temp[i][val[0]] = "Required"
                    setErrorArr(temp);
                }
            });
            return valid;
        })
        console.log(arr, "eachValid:,", eachVaid)
        return eachVaid.every(Boolean);
    }

    const validatePreview = () => {
        let validFlight = flightInput.filter((e) => { return e.flightFrom.trim() !== "" || e.flightTo.trim() !== "" || e.flightAdults?.toString().trim() || "" !== "" || e.flightAmount?.toString().trim() || "" !== "" })
        let validTrain = trainInput.filter((e) => { return e.trainFrom.trim() !== "" || e.trainTo.trim() !== "" || e.trainAdults?.toString().trim() || "" !== "" || e.trainAmount?.toString().trim() || "" !== "" })
        let validCab = cabInput.filter((e) => { return e.cabFrom.trim() !== "" || e.cabTo.trim() !== "" || e.cabAdults?.toString().trim() || "" !== "" || e.cabAmount?.toString().trim() || "" !== "" })
        let validBus = busInput.filter((e) => { return e.busFrom.trim() !== "" || e.busTo.trim() !== "" || e.busAdults?.toString().trim() || "" !== "" || e.busAmount?.toString().trim() || "" !== "" })

        console.log("flightInput:", validFlight, validFlight.length)
        // console.log(validateAllFields(flightInput, flightInputError, setFlightInputError))
        if (basicInput.length > 0 && validateAllFields(basicInput, basicInputError, setBasicInputError) === false) { alert("Please fill all the manditory fields of Basic."); setValue(0) }
        else if (validFlight.length > 0 && validateAllFields(flightInput, flightInputError, setFlightInputError) === false) { alert("Please fill all the manditory fields of Flights."); setValue(0) }
        else if (validTrain.length > 0 && validateAllFields(trainInput, trainInputError, setTrainInputError) === false) { alert("Please fill all the manditory fields of Train."); setValue(1) }
        else if (validCab.length > 0 && validateAllFields(cabInput, cabInputError, setCabInputError) === false) { alert("Please fill all the manditory fields of Cab."); setValue(2) }
        else if (validBus.length > 0 && validateAllFields(busInput, busInputError, setBusInputError) === false) { alert("Please fill all the manditory fields of Bus."); setValue(2) }
        else { setOpenPreview(true); }

    }

    return (
        <div style={twnButtonStyles.allPages}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography style={{ ...twnButtonStyles.xlFonts, color: '#F46D25', paddingTop: '17px' }}>Transfer Details</Typography>
                <div>
                    {/* Basic Details Fields  */}
                    <Stack style={{ padding: '0.4em 0.5em' }}>
                        {basicInput.map((x, i) => (
                            <Grid container spacing={2} key={i}>
                                <Grid item sm={6}>
                                    {i == 0 && (<p className={classes.title}>Basic Details</p>)}
                                </Grid>

                                <Grid item sm={6} style={{ textAlign: "end", fontSize: '14px' }}>
                                    {basicInput.length !== 1 && i > 0 && (
                                        <DeleteIcon onClick={() => handleRemoveClickBasic(i)} className={classes.plus} />
                                    )}
                                    {basicInput.length - 1 === i && (
                                        <AddCircleOutlineIcon onClick={handleAddClickBasic} size="small" className={classes.plus} />
                                    )}
                                </Grid>

                                <div style={{ width: "2%", textAlign: "center", marginTop: "1em", marginLeft: '5px' }}> {i + 1 + "."}</div>
                                <div style={{ width: '97%', marginTop: '1em' }}>
                                    <Box>
                                        <Grid container spacing={2}>
                                            {i === 0 ?
                                                transferId ?
                                                    <Grid item xs={3}>
                                                        <CustomBasic name="clientName" label='Client Name' fullWidth size="small" style={{ backgroundColor: '#fff' }} value={x.clientName} onChange={(e) => handleBasicChange(e, i)} disabled />
                                                    </Grid> :
                                                    <>
                                                        <Grid item xs={2.7}>
                                                            <Select
                                                                isSearchable
                                                                placeholder='Client Name'
                                                                defaultInputValue={x.clientName}
                                                                value={Clientoptions.filter(i => i.value === x.clientName)}
                                                                options={Clientoptions}
                                                                onChange={(e) => handleChangeClient(i, e)}
                                                                components={{
                                                                    ValueContainer: CustomValueContainer,
                                                                }}
                                                                styles={{
                                                                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                                                    control: (base, state) => ({
                                                                        ...base,
                                                                        "&:hover": { borderColor: "#f46d25" },
                                                                        borderColor: "#f46d25",
                                                                        boxShadow: "none",
                                                                        width: '275px',
                                                                    }),
                                                                    placeholder: (provided, state) => ({
                                                                        ...provided,
                                                                        position: "absolute",
                                                                        top:
                                                                            state.hasValue ||
                                                                                state.selectProps.inputValue
                                                                                ? -9
                                                                                : "50%",
                                                                        background: "#fff",
                                                                        padding: "0px 5px",
                                                                        transition: "top 0.1s, font-size 0.1s",
                                                                        fontSize: "17px",
                                                                    }),
                                                                }}
                                                            />
                                                            <span style={{ "color": "#ff0000" }}>{basicInputError[i]['clientName']}</span>
                                                        </Grid>
                                                        <Grid item xs={0.3}>
                                                            <AddCircleOutlineIcon style={{ fontSize: '20px', color: '#f46d25', cursor: 'pointer', paddingTop: '0.5em' }} onClick={() => { setOpen(true) }} />
                                                        </Grid>
                                                    </> :
                                                <Grid item xs={3}>
                                                    <CustomBasic name="clientName" label='Client Name' style={{ backgroundColor: '#fff' }} value={x.clientName} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            }
                                            {i === 0 ?
                                                <Grid item xs={3}>
                                                    <CustomBasic name="clientMobileNo" label="Mobile No" value={x.clientMobileNo} disabled />
                                                </Grid> :
                                                <Grid item xs={3}>
                                                    <CustomBasic name="clientMobileNo" label='Mobile No' style={{ backgroundColor: '#fff' }} value={x.clientMobileNo} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            }

                                            {i === 0 ?
                                                <Grid item xs={3}>
                                                    <CustomBasic name="clientEmail" fullWidth label="Email Id" value={x.clientEmail} variant="outlined" size="small" style={{ backgroundColor: '#fff', color: "#f46d25" }} disabled />
                                                </Grid> :
                                                <Grid item xs={3}>
                                                    <CustomBasic name="clientEmail" label='Email Id' style={{ backgroundColor: '#fff' }} value={x.clientEmail} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            }
                                            <Grid item xs={3}>
                                                <CustomBasic name="clientAltNo" label='Alternate No' style={{ backgroundColor: '#fff' }} value={x.clientAltNo} onChange={(e) => handleBasicChange(e, i)} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            </Grid>
                        ))}
                    </Stack>
                    <br /><span style={{ float: 'right', fontSize: '12px', color: '#f46d25', fontWeight: 'bold' }}>Note: Fill details of at least one Travel Mode</span>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                            <Tab label="Flight" {...a11yProps(0)} />
                            <Tab label="Train" {...a11yProps(1)} />
                            <Tab label="Road Transport" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <FlightForm flightInput={flightInput} setFlightInput={setFlightInput} flightInputError={flightInputError} setFlightInputError={setFlightInputError} classes={classes} />
                        {/* Buttons  */}
                        <Stack direction='row' spacing={2} style={{ backgroundColor: '#eee', width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                            <span style={{ color: '#f46d25', padding: '0.5em 1em', width: '50%' }}>Total Transfer Booking Amount</span>
                            <span style={{ color: '#1eaf1e', padding: '0.5em 1em', width: '50%' }}>Commission</span>
                        </Stack>
                        <Stack direction='row' spacing={2} style={{ width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                            <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{totalAmount}</span>
                            <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{commission}</span>
                        </Stack>
                        <br />
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            {/* <a href="#" className={classes.nextBtn} onClick={() => setValue(1)}>Next</a> */}
                            <a href="#" style={twnButtonStyles.linkOrangeBtn} onClick={validatePreview}>Preview</a>
                            <Link to={{ pathname: "/transferList" }} style={twnButtonStyles.linkBlackBtn}>Cancel</Link>
                        </Stack>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <TrainForm trainInput={trainInput} setTrainInput={setTrainInput} trainInputError={trainInputError} setTrainInputError={setTrainInputError} classes={classes} />
                        {/* Buttons  */}
                        <Stack direction='row' spacing={2} style={{ backgroundColor: '#eee', width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                            <span style={{ color: '#f46d25', padding: '0.5em 1em', width: '50%' }}>Total Transfer Booking Amount</span>
                            <span style={{ color: '#1eaf1e', padding: '0.5em 1em', width: '50%' }}>Commission</span>
                        </Stack>
                        <Stack direction='row' spacing={2} style={{ width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                            <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{totalAmount}</span>
                            <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{commission}</span>
                        </Stack><br />
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            {/* <a href="#" className={classes.nextBtn} onClick={() => setValue(0)}>Previous</a>
                            <a href="#" className={classes.nextBtn} onClick={() => setValue(2)}>Next</a> */}
                            <a href="#" style={twnButtonStyles.linkOrangeBtn} onClick={validatePreview}>Preview</a>
                            <Link to={{ pathname: "/transferList" }} style={twnButtonStyles.linkBlackBtn}>Cancel</Link>
                        </Stack>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <RoadForm cabInput={cabInput} setCabInput={setCabInput} busInput={busInput} setBusInput={setBusInput} cabInputError={cabInputError} setCabInputError={setCabInputError} busInputError={busInputError} setBusInputError={setBusInputError} classes={classes} />
                        {/* Buttons  */}
                        <Stack direction='row' spacing={2} style={{ backgroundColor: '#eee', width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                            <span style={{ color: '#f46d25', padding: '0.5em 1em', width: '50%' }}>Total Transfer Booking Amount</span>
                            <span style={{ color: '#1eaf1e', padding: '0.5em 1em', width: '50%' }}>Commission</span>
                        </Stack>
                        <Stack direction='row' spacing={2} style={{ width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                            <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{totalAmount}</span>
                            <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{commission}</span>
                        </Stack>
                        {/* <Stack direction='row' spacing={2} justifyContent='center' style={{ backgroundColor: '#F7F7F7', width: '99.8%', marginLeft: '-15px', padding: '1em' }}> */}
                        {/* <a href="#" className={classes.nextBtn} onClick={() => setValue(1)}>Previous</a> */}
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <a href="#" style={twnButtonStyles.linkOrangeBtn} onClick={validatePreview}>Preview</a>
                            <Link to={{ pathname: "/transferList" }} style={twnButtonStyles.linkBlackBtn}>Cancel</Link>
                        </Stack>
                    </TabPanel>
                </div>
                <ClientForm
                    open={open}
                    onClose={() => { setOpen(false) }}
                    selectedId={selectedId}
                    BookingLocal={"yes"}
                />
            </MuiPickersUtilsProvider >

            <Dialog
                // fullScreen
                fullWidth={true}
                maxWidth={'xl'}
                sx={{ maxHeight: '100vh' }}
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                TransitionComponent={Transition}
            >
                <div>
                    <PreviewPage basicInput={basicInput} flightInput={flightInput} trainInput={trainInput} cabInput={cabInput} busInput={busInput} totalAmount={totalAmount} commission={commission} />
                </div>
                <div>
                    <Stack direction='row' spacing={2} style={{ textAlign: 'center' }} justifyContent='center'>
                        <Button onClick={handleSubmit} style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.7em', width: '10em', fontWeight: 'bold', borderRadius: '5px' }}>{transferId ? "Update Now" : "Book Now"}</Button>
                        <Button onClick={() => setOpenPreview(false)} style={{ backgroundColor: '#111', color: '#fff', padding: '0.7em', width: '10em', fontWeight: 'bold', borderRadius: '5px' }}>Edit Booking</Button>
                    </Stack>
                    <br />
                </div>
            </Dialog>
        </div >)
}

function CustomTextInlineField(props) {
    return (
        <TextField
            name={props.name}
            fullWidth
            label={props.label}
            value={props.value}
            autoFocus
            variant="outlined"
            size="small"
            // style={{ backgroundColor: '#fff', color: "#f46d25" }}
            sx={{
                // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
                '& .MuiInputBase-input': { height: 0 }
            }}
            onChange={props.onChange}
        // disabled={props.disabled}
        />)
}
function CustomBasic(props) {
    return (
        <TextField
            name={props.name}
            fullWidth
            label={props.label}
            value={props.value}
            autoFocus
            variant="outlined"
            size="small"
            // style={{ backgroundColor: '#fff', color: "#f46d25" }}
            sx={{
                // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
                '& .MuiInputBase-input': { height: 0 }
            }}
            onChange={props.onChange}
            disabled={props.disabled}
        />)
}
CustomTextInlineField.defaultProps = {
    disabled: false
};