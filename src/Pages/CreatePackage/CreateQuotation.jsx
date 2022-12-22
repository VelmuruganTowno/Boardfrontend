import React, { useState, useReducer } from 'react';
import { Dialog, Slide, Accordion, Grid, AccordionSummary, AccordionDetails, Typography, Stack, TextField, Button, Divider, Box } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { } from '@mui/material';
import Select from "react-select";
// import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Api from '../../Service/Api';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateRangeIcon from "@material-ui/icons/DateRange";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import Preview from './Preview';


const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validMobileRegex = RegExp(
    /^(\+\d{1,3}[- ]?)?\d{10}$/i
);

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

const HotelCategory = [{ label: "Category1", value: "category1" }, { label: "Category2", value: "category2" }]
const TransferTripOptions = [{ label: "Pickup", value: "Pickup" }, { label: "Drop", value: "Drop" }, { label: "Round", value: "Round" }]
const TransferTypeOptions = [{ label: "Private", value: "Private" }, { label: "SIC", value: "SIC" }]
const TransferVehicleOptions = [{ label: "Hatchback", value: "Hatchback" }, { label: "SUV", value: "SUV" }, { label: "Sedan", value: "Sedan" }, { label: "12 Seater", value: "12 Seater" }, { label: "24 Seater", value: "24 Seater" }, { label: "48 Seater", value: "48 Seater" }]

const buttonStyle = {
    fontSize: "15px", fontWeight: "bold", background: "#111", border: 0, borderColor: "#111",
    cursor: "pointer", boxShadow: '0px 3px 5px #999', borderTopRightRadius: "4px", borderBottomRightRadius: "4px",
    borderWidth: " thin", color: "#fff", height: "35px!important", width: '250px', textAlign: 'center', paddingTop: '0.6em', paddingBottom: '0.6em'
}

const buttonDisabledStyle = {
    fontSize: "15px", fontWeight: "bold", background: "#ddd", border: 0, borderColor: "#ddd",
    cursor: "pointer", boxShadow: '0px 3px 5px #999', borderTopRightRadius: "4px", borderBottomRightRadius: "4px",
    borderWidth: " thin", color: "#111", height: "35px!important", width: '250px', textAlign: 'center', paddingTop: '0.6em', paddingBottom: '0.6em'
}
// lead pax 

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
}));

//   lead pax ends 
const PackageOrQuotation = (isPackage) => { return isPackage ? "Package" : "Quotation" }
const CreateOrUpdate = (id) => { return id === null ? "Create" : "Update" }


const getTransferVehicleOptions = (transferType) => {
    if (transferType === "Private") {
        return [{ label: "Sedan", value: "Sedan" }, { label: "Hatchback", value: "Hatchback" }, { label: "SUV", value: "SUV" }]
    } else if (transferType === "SIC") {
        return [{ label: "12 Seater", value: "12 Seater" }, { label: "24 Seater", value: "24 Seater" }, { label: "48 Seater", value: "48 Seater" }]
    } else { return [] }

}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});


export default function CreateQuotation(props) {
    const [expanded, setExpanded] = useState('panel1');
    const history = useHistory();
    let { isPackageParam } = useParams();
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const [formData, setFormData] = useReducer(formReducer, {});
    const classes = useStyles();

    const [error, setError] = useState({ destination: "", name: "", clientName: "", clientMobileNo: "", noOfAdults: "", checkIn: "", checkOut: "", totalGrossAmount: "", amountPaid: "", comission: "" })
    const [openPreview, setOpenPreview] = useState(false);

    const validateField = (name, value) => {
        let temp_error = error;
        switch (name) {
            case 'destination':
            case 'name':
            case 'clientName':
                temp_error[name] = value.length < 3 ? `${name} required` : "";
                break;
            case 'clientMobileNo':
                temp_error[name] = validMobileRegex.test(value) ? "" : "Enter a valid Mobile Number";
                break;
            case 'noOfAdults':
                temp_error[name] = /^\+?\d+$/.test(value) ? "" : "Enter valid no of adults";
                break;
            case 'totalGrossAmount':
            case 'amountPaid':
            case 'comission':
                temp_error[name] = /^\+?\d+$/.test(value) ? "" : "Enter valid amount";
                break;
        }
        setError(temp_error);
    }

    useEffect(() => {
        if (props.location.id !== null) {
            Api.get(`/getpackageorquotationid/${uniqueid}/Quotation/${props.location.id}`).then((res) => {
                console.log("PACKAGE DETAILS: ", res.data);
                Object.entries(res.data).forEach(([key, value]) => {
                    setFormData({ name: key, value: value })
                })
                setHotelInput(res.data.hotelDetails);
                setTransferInput(res.data.transferDetails);
                setActivityInput(res.data.activityDetails);
            })
        };
    }, [props.location.id]);

    useEffect(() => {
        setFormData({ name: "uniqueId", value: uniqueid });
        setFormData({ name: "type", value: "Quotation" });
        setFormData({ name: "createdBy", value: createdBy })
    }, [])

    // lead pax starts
    const [leadPax, setLeadPax] = useState([{ id: "", leadPaxName: "", leadPaxMobile: "", leadPaxAltNo: "", leadPaxEmail: "" },]);

    const handleRemoveClickLeadPax = (index) => {
        const list = [...leadPax];
        list.splice(index, 1);
        setLeadPax(list);
    };

    const handleAddClickLeadPax = () => {
        setLeadPax([
            ...leadPax,
            { id: "", leadPaxName: "", leadPaxMobile: "", leadPaxAltNo: "", leadPaxEmail: "" },
        ]);
    };

    const handleLeadPaxChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...leadPax];
        list[index][name] = value;
        setLeadPax(list);
    };
    //   lead pax ends 

    // hotel details starts 
    const [hotelInput, setHotelInput] = useState([
        { id: "", hotelName: "", hotelCategory: "", noOfRooms: "", noOfNights: "" },
    ]);

    const handleRemoveClickHotel = (index) => {
        const list = [...hotelInput];
        list.splice(index, 1);
        setHotelInput(list);
    };

    const handleAddClickHotel = () => {
        setHotelInput([
            ...hotelInput,
            { id: "", hotelName: "", hotelCategory: "", noOfRooms: "", noOfNights: "" },
        ]);
    };

    const handleHotelChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...hotelInput];
        list[index][name] = value;
        setHotelInput(list);
    };

    const handleHotelSelectChange = (name, value, index) => {
        const list = [...hotelInput];
        list[index][name] = value;
        setHotelInput(list);
    };
    // hotel details ends 

    // transfer details starts 
    const [transferInput, setTransferInput] = useState([
        { id: "", transferFrom: "", transferTo: "", transferTrip: "", transferType: "", transferVehicle: "" },
    ]);

    const handleRemoveClickTransfer = (index) => {
        const list = [...transferInput];
        list.splice(index, 1);
        setTransferInput(list);
    };

    const handleAddClickTransfer = () => {
        setTransferInput([
            ...transferInput,
            { id: "", transferFrom: "", transferTo: "", transferTrip: "", transferType: "", transferVehicle: "" },
        ]);
    };

    const handleTransferChange = (e, index) => {
        // console.log("e",e,index);
        const { name, value } = e.target;
        const list = [...transferInput];
        list[index][name] = value;
        setTransferInput(list);
    };
    const handleTransferSelectChange = (name, value, index) => {
        const list = [...transferInput];
        list[index][name] = value;
        setTransferInput(list);
    };
    // transfer details ends 

    // activity details starts 
    const [activityInput, setActivityInput] = useState([
        { id: "", city: "", activity: "" },
    ]);

    const handleRemoveClickActivity = (index) => {
        const list = [...activityInput];
        list.splice(index, 1);
        setActivityInput(list);
    };

    const handleAddClickActivity = () => {
        setActivityInput([
            ...activityInput,
            { id: "", city: "", activity: "" },
        ]);
    };

    const handleActivityChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...activityInput];
        list[index][name] = value;
        setActivityInput(list);
    };
    // activity details ends 


    const handleFormChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
        validateField(event.target.name, event.target.value);
    }

    const handleFormDateChange = (name, e) => {
        setFormData({
            name: name,
            value: e
        });
    }

    const handleSubmit = () => {
        if (validateForm(error)) {
            const postData = { ...formData, "leadPax": leadPax, "hotelDetails": hotelInput, "transferDetails": transferInput, "activityDetails": activityInput }
            console.log("POSTDATA: ", postData);
            Api.post("createPackageOrQuotation", postData).then((res) => {
                toast.success(`Quotation ${CreateOrUpdate(props.location.id)} Successfully`);
            });
            history.push({ pathname: "/package", full: false })
        } else {
            toast.error('Please correct Errors')
        }

    }

    const handleSubmitPackage = () => {
        const postData = { ...formData, "leadPax": leadPax, "hotelDetails": hotelInput, "transferDetails": transferInput, "activityDetails": activityInput, "type": "Package" }
        console.log("POSTATA: ", postData);
        Api.post("createPackageOrQuotation", postData).then((res) => {
            toast.success('Converted to Package Successfully');
        });
        history.push({ pathname: "/package", full: true })
    }

    return (
        <div style={{ padding: "5% 1%" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography variant='h4' style={{ color: '#f46d25', fontWeight: 'bold' }}>{CreateOrUpdate(props.location.id)} Quotation</Typography><br />

                {/* Basic Details Accordian Starts  */}
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

                    <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} id="panel1a-header" style={{ backgroundColor: '#f46d25', color: '#fff' }}>
                        <Typography variant='h5'>Basic Details</Typography>
                    </AccordionSummary><br />

                    {/* Basic Info  */}
                    <AccordionDetails style={{ backgroundColor: '#eee' }}>
                        <Typography variant='h6' style={{ color: '#f46d25' }}>
                            Basic Info
                        </Typography>
                        <Stack style={{ marginTop: '0.5em' }}>
                            <Stack direction='row' spacing={2}>
                                <CustomTextInlineField name="destination" label="Destination" onChange={handleFormChange} value={formData.destination} error={error} />
                                <CustomTextInlineField name="name" label="Quotation Name" onChange={handleFormChange} value={formData.name} error={error} />
                                <CustomTextInlineField name="clientName" label="Client Name" onChange={handleFormChange} value={formData.clientName} error={error} />
                                <CustomTextInlineField name="clientMobileNo" label="Client Number" onChange={handleFormChange} value={formData.clientMobileNo} error={error} />
                            </Stack> <br />
                            <Stack direction='row' spacing={2}>
                                <CustomTextInlineField name="noOfAdults" label="No of Adults" onChange={handleFormChange} value={formData.noOfAdults} error={error} />
                                <CustomTextInlineField name="noOfChildren" label="No of Children" onChange={handleFormChange} value={formData.noOfChildren} error={error} />
                                {
                                    <DatePicker
                                        label="Check-In"
                                        size="small"
                                        autoOk
                                        required
                                        format="dd-MM-yyyy"
                                        inputVariant="outlined"
                                        fullWidth
                                        disablePast={props.location.id ? false : true}
                                        variant="inline"
                                        value={formData.checkIn ? formData.checkIn : null}
                                        onChange={(e) => handleFormDateChange("checkIn", e)} />
                                }

                                <DatePicker
                                    required
                                    label="Check-Out"
                                    value={formData.checkOut ? formData.checkOut : null}
                                    inputVariant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={(e) => handleFormDateChange("checkOut", e)}
                                    format="dd-MM-yyyy"
                                    variant="inline"
                                    autoOk
                                    minDate={formData.checkIn ? formData.checkIn : new Date()}
                                />
                            </Stack>
                        </Stack>
                    </AccordionDetails><br />

                    {/* Lead Pax only if package */}
                    {props.location.displayLeads ? <>
                        <AccordionDetails style={{ backgroundColor: '#eee' }}>
                            <Typography variant='h6' style={{ color: '#f46d25', marginBottom: "-5px" }}>Lead Pax</Typography>
                            <Grid container spacing={1}>
                                {leadPax.map((x, i) => (
                                    <>
                                        <Grid item sm={12} style={{ textAlign: "end" }}>
                                            {leadPax.length !== 1 && (
                                                <DeleteIcon onClick={() => handleRemoveClickLeadPax(i)} className={classes.plus} />
                                            )}
                                            {leadPax.length - 1 === i && (
                                                <AddCircleOutlineIcon onClick={handleAddClickLeadPax} size="small" className={classes.plus} />
                                            )}
                                        </Grid>
                                        <Grid item sm={3}>
                                            <div style={{ display: "flex" }}><span style={{ marginTop: "5px" }}>{i + 1}</span> &nbsp;
                                                <CustomTextInlineField name="leadPaxName" label="Name" value={x.leadPaxName} onChange={(e) => handleLeadPaxChange(e, i)} />
                                            </div>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <CustomTextInlineField name="leadPaxMobile" label="Mobile No" value={x.leadPaxMobile} onChange={(e) => handleLeadPaxChange(e, i)} />
                                        </Grid>
                                        <Grid item sm={3}>
                                            <CustomTextInlineField name="leadPaxAltNo" label="Alt Mobile" value={x.leadPaxAltNo} onChange={(e) => handleLeadPaxChange(e, i)} />
                                        </Grid>
                                        <Grid item sm={3}>
                                            <CustomTextInlineField name="leadPaxEmail" label="Email" value={x.leadPaxEmail} onChange={(e) => handleLeadPaxChange(e, i)} />
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                        </AccordionDetails><br /></> : null}

                    {/* Itinerary  */}
                    <AccordionDetails style={{ backgroundColor: '#eee' }}>
                        <Typography variant='h6' style={{ color: '#f46d25' }}>Itinerary</Typography>
                        <TextareaAutosize name="itinerary" onChange={handleFormChange} style={{ maxWidth: '99.5%', minHeight: '4em', minWidth: '99.4%' }} defaultValue={formData.itinerary} />
                    </AccordionDetails>

                </Accordion><br />
                {/* Basic Details Accordian Ends  */}

                {/* Package or Quotation Details Starts  */}
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} aria-controls="panel2a-content" id="panel2a-header" style={{ backgroundColor: '#f46d25', color: '#fff' }}>
                        <Typography variant='h5'>Quotation Details</Typography>
                    </AccordionSummary><br />

                    {/* Hotel Details  */}
                    <AccordionDetails style={{ backgroundColor: '#eee' }}>
                        <Typography variant='h6' style={{ color: '#f46d25', marginBottom: "-5px" }}>Hotel Details</Typography>
                        <Grid container spacing={1}>
                            {hotelInput.map((x, i) => (
                                <>
                                    <Grid item sm={12} style={{ textAlign: "end" }}>
                                        {hotelInput.length !== 1 && (
                                            <DeleteIcon onClick={() => handleRemoveClickHotel(i)} className={classes.plus} />
                                        )}
                                        {hotelInput.length - 1 === i && (
                                            <AddCircleOutlineIcon onClick={handleAddClickHotel} size="small" className={classes.plus} />
                                        )}
                                    </Grid>
                                    <Grid item sm={3}>
                                        <div style={{ display: "flex" }}><span style={{ marginTop: "5px" }}>{i + 1}</span> &nbsp;
                                            <CustomTextInlineField name="hotelName" label="Hotel Name" value={x.hotelName} onChange={(e) => handleHotelChange(e, i)} />
                                        </div>
                                    </Grid>
                                    <Grid item sm={3}>
                                        <Select
                                            name="hotelCategory"
                                            placeholder='Hotel Category'
                                            value={HotelCategory.filter(i => i.value === x.hotelCategory)}
                                            options={HotelCategory}
                                            onChange={(e) => handleHotelSelectChange("hotelCategory", e.value, i)} />
                                    </Grid>
                                    <Grid item sm={3}>
                                        <CustomTextInlineField name="noOfRooms" label="No Of Rooms" value={x.noOfRooms} onChange={(e) => handleHotelChange(e, i)} />
                                    </Grid>
                                    <Grid item sm={3}>
                                        <CustomTextInlineField name="noOfNights" label="No of Nights" value={x.noOfNights} onChange={(e) => handleHotelChange(e, i)} />
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </AccordionDetails><br />

                    {/* Transfer Details  */}
                    <AccordionDetails style={{ backgroundColor: '#eee' }}>
                        <Typography variant='h6' style={{ color: '#f46d25', marginBottom: "-5px" }}>Transfer Details</Typography>
                        <Grid container spacing={1}>
                            {transferInput.map((x, i) => (
                                <>
                                    <Grid item sm={12} style={{ textAlign: "end" }}>
                                        {transferInput.length !== 1 && (
                                            <DeleteIcon onClick={() => handleRemoveClickTransfer(i)} className={classes.plus} />
                                        )}
                                        {transferInput.length - 1 === i && (
                                            <AddCircleOutlineIcon onClick={handleAddClickTransfer} size="small" className={classes.plus} />
                                        )}
                                    </Grid>
                                    <Grid item sm={3}>
                                        <div style={{ display: "flex" }}><span style={{ marginTop: "5px" }}>{i + 1}</span> &nbsp;
                                            <CustomTextInlineField name="transferFrom" label="From" value={x.transferFrom} onChange={(e) => handleTransferChange(e, i)} />
                                        </div>
                                    </Grid>
                                    <Grid item sm={3}>
                                        <CustomTextInlineField name="transferTo" label="To" value={x.transferTo} onChange={(e) => handleTransferChange(e, i)} />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Select
                                            name="transferTrip"
                                            placeholder='Trip'
                                            value={TransferTripOptions.filter(i => i.value === x.transferTrip)}
                                            options={TransferTripOptions}
                                            onChange={(e) => handleTransferSelectChange("transferTrip", e.value, i)} />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Select
                                            name="transferType"
                                            placeholder='Type'
                                            value={TransferTypeOptions.filter(i => i.value === x.transferType)}
                                            options={TransferTypeOptions}
                                            onChange={(e) => handleTransferSelectChange("transferType", e.value, i)} />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Select
                                            name="transferVehicle"
                                            placeholder="Vehicle"
                                            value={TransferVehicleOptions.filter(i => i.value === x.transferVehicle)}
                                            options={getTransferVehicleOptions(x.transferType)}
                                            onChange={(e) => handleTransferSelectChange("transferVehicle", e.value, i)} />
                                    </Grid>

                                </>
                            ))}
                        </Grid>
                    </AccordionDetails><br />

                    {/* Activity Details */}
                    <AccordionDetails style={{ backgroundColor: '#eee' }}>
                        <Typography variant='h6' style={{ color: '#f46d25', marginBottom: "-5px" }}>Activity Details</Typography>
                        <Grid container spacing={1}>
                            {activityInput.map((x, i) => (
                                <>
                                    <Grid item sm={12} style={{ textAlign: "end" }}>
                                        {activityInput.length !== 1 && (
                                            <DeleteIcon onClick={() => handleRemoveClickActivity(i)} className={classes.plus} />
                                        )}
                                        {activityInput.length - 1 === i && (
                                            <AddCircleOutlineIcon onClick={handleAddClickActivity} size="small" className={classes.plus} />
                                        )}
                                    </Grid>
                                    <Grid item sm={6}>
                                        <div style={{ display: "flex" }}><span style={{ marginTop: "5px" }}>{i + 1}</span> &nbsp;
                                            <CustomTextInlineField name="city" label="City" value={x.city} onChange={(e) => handleActivityChange(e, i)} />
                                        </div>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <CustomTextInlineField name="activity" label="Activity" value={x.activity} onChange={(e) => handleActivityChange(e, i)} />
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </AccordionDetails>

                </Accordion><br />


                {/* Package Details Ends  */}

                {/* Payments Details Starts  */}
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} id="panel3a-header" style={{ backgroundColor: '#f46d25', color: '#fff' }}>
                        <Typography variant='h5'>Payment Details</Typography>
                    </AccordionSummary><br />
                    <AccordionDetails style={{ backgroundColor: '#eee' }}>
                        <Typography variant='h6' style={{ color: '#f46d25' }}>Payment</Typography><br />
                        <Stack direction='row' spacing={2}>
                            <CustomTextInlineField name="totalGrossAmount" label="Total Gross Amount" onChange={handleFormChange} value={formData.totalGrossAmount} error={error} />
                            <CustomTextInlineField name="amountPaid" label="Amount Paid" onChange={handleFormChange} value={formData.amountPaid} error={error} />
                            <CustomTextInlineField name="comission" label="Comission" onChange={handleFormChange} value={formData.comission} error={error} />
                        </Stack>
                    </AccordionDetails>
                </Accordion> <br />
                {/* Payment Details Ends  */}


                <Stack direction='row' spacing={2} justifyContent='center'>
                    {/* {validateForm(error) ? props.location.displayConvert ?
                        <Button onClick={handleSubmitPackage} style={buttonStyle}>Save as Package</Button> :
                        <Button onClick={handleSubmit} style={buttonStyle}>Submit</Button> : <Button style={buttonDisabledStyle}>Submit</Button>
                    } */}
                    <Button variant="outlined" onClick={() => setOpenPreview(true)} style={buttonStyle}>Preview</Button>
                    <Link to={{ pathname: "/package", full: false }} style={buttonStyle}>CANCEL</Link>
                </Stack>
            </MuiPickersUtilsProvider>

            <Dialog
                fullScreen
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                TransitionComponent={Transition}
            >
                <div>
                    <Preview data={{ ...formData, "leadPax": leadPax, "hotelDetails": hotelInput, "transferDetails": transferInput, "activityDetails": activityInput, "type": "Quotation" }}/>
                </div>
                <div style={{backgroundColor: '#eee'}}>
                    <Stack direction='row' spacing={2} justifyContent='center' style={{margin:'1%'}}>
                        {validateForm(error) ? props.location.displayConvert ?
                            <Button onClick={handleSubmitPackage} style={buttonStyle}>Save as Package</Button> :
                            <Button onClick={handleSubmit} style={buttonStyle}>Submit</Button> : <Button style={buttonDisabledStyle}>Submit</Button>
                        }
                        <Button style={buttonStyle} autoFocus color="inherit" onClick={() => setOpenPreview(false)}>
                            Edit
                        </Button>
                    </Stack>
                </div>
            </Dialog>
        </div>

    )
}


function CustomTextInlineField(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    name={props.name}
                    fullWidth
                    label={props.label}
                    autoFocus
                    value={props.value}
                    variant="outlined"
                    size="small"
                    style={{ backgroundColor: '#fff' }}
                    onChange={props.onChange}
                />
            </Grid>
            {props.error[props.name] && props.error[props.name].length > 0 &&
                <Grid item xs={12}><span style={{ color: "#ff0000" }}>{props.error[props.name]}</span></Grid>}
        </Grid>
    )
}

CustomTextInlineField.defaultProps = { error: {} }