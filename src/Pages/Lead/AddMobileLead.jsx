import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, Stack } from '@mui/material';
import { toast } from "react-toastify";
import Api from "../../Service/Api";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = {
    position: 'absolute',
    top: '4em',
    left: '0',
    width: '97%',
    height: '38em',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    padding: '0 0.5em 1em 0.5em',
    overflow: 'hidden',
};

const fieldStyle = {
    height: '2.5em', border: '0.1em solid #f46d25', borderRadius: '4px', paddingLeft: '1em', fontSize: '1em', backgroundColor: '#fff', width: 'auto'
};

let initialValues = {
    clientName: "",
    clientMail: "",
    clientMobileNo: "",
    clientDepartcity: "",
    buget: "",
    checkin: "",
    notes: "",
    leadType: "leadType",
    destination: "destination",
    displayName: "",
    noofpax: "",
    noofnights: "",
    budget: "",
    leadassignto: "",
    leadsource: "",
    leadscoring: "",
    leadscoringvalue: "",
    reason: "",
};

const validationSchema = Yup.object({
    clientMail: Yup.string().required("Email is Required").nullable(),
    leadscoring: Yup.string().required("LeadScore is Required"),
    leadsource: Yup.string().required("Source is Required"),
    leadType: Yup.string().required("Lead Type is Required"),
    leadassignto: Yup.string().required("Lead Assigned To is Required"),
    destination: Yup.string().required("Destination is Required"),
    clientMobileNo: Yup.string()
        .min(10, "Invalid Mobile Number")
        .max(10, "Invalid Mobile Number")
        .required("Mobile No required"),
});


export default function AddMobileLead({ Lead, open, setOpenAdd, viewselectedDetails, setViewselectedDetails }) {

    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const [leadSource, setLeadSource] = useState([]);
    const [leadType, setLeadType] = useState([]);
    const [leadassignto, setLeadassignto] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [allHotelList, setAllHotelList] = useState([]);
    const create = { uniqueId: uniqueid, createdBy: createdBy };
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        LeadType();
        LeadAssignTo();
        LeadSource();
        CityList();
    }, []);

    useEffect(() => {
        let hotelUrl = `/propertyName`;
        if (selectedCity != null && selectedCity != "destination") {
            hotelUrl = `/propertycitynameidlist/` + selectedCity;
        }
        Api.get(hotelUrl).then((res) => {
            setAllHotelList(res.data);
        });
    }, [selectedCity])

    const LeadAssignTo = (event) => {
        Api.get(`leadassignfor/${uniqueid}`).then((res) => {
            setLeadassignto(res.data);
        });
    };

    const LeadType = (event) => {
        Api.get(`commonfeatureonly/${uniqueid}/leadType`).then((res) => {
            setLeadType(res.data);
        });
    };

    const LeadSource = (event) => {
        Api.get(`commonfeatureonly/${uniqueid}/leadSource`).then((res) => {
            setLeadSource(res.data);
        });
    };

    const CityList = (event) => {
        Api.get(`commonfeatureonly/${uniqueid}/City`).then((res) => {
            setCityList(res.data);
        });
    };

    const addFormOnSubmit = (values) => {
        const newdata = { ...values, ...create };
        if (viewselectedDetails.hasOwnProperty('id')) {
            Api.put(`boardleadupdate/${newdata.id}`, newdata).then((res) => {
                toast.success("Lead Updated Successfully");
                setOpenAdd(false);
                setViewselectedDetails({});
                Lead();
            });
        } else {
            Api.post("boardlead", newdata).then((res) => {
                toast.success("Lead Created Successfully");
                setOpenAdd(false);
                setViewselectedDetails({});
                Lead();
            });
        }
    }

    return (
        <Modal open={open} onClose={() => setOpenAdd(false)}>
            <Box sx={style}>
                {viewselectedDetails.hasOwnProperty('id') ? <h3>Update Lead</h3> : <h3>Add Lead</h3>}
                <div style={{ height: "32em", overflow: "auto" }}>
                    <Formik initialValues={viewselectedDetails || initialValues} validationSchema={validationSchema} onSubmit={addFormOnSubmit}>

                        {({ values, setFieldValue, errors, touched }) => (

                            <Form>
                                <Stack spacing={2} style={{ marginBottom: "20em" }}>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ backgroundColor: '#333', color: '#fff', borderRadius: '4px' }}
                                        >
                                            <Typography>Basic Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                            <Stack spacing={1}>
                                                <Field name="clientName" type="text" placeholder="Client Name" style={fieldStyle} />
                                                <Field name="clientMobileNo" type="text" placeholder="Mobile No" style={fieldStyle} />
                                                {errors.clientMobileNo && touched.clientMobileNo ? (
                                                    <span style={{ color: '#ff0000' }}>{errors.clientMobileNo}</span>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.clientMobileNo}</span>
                                                }
                                                <Field name="clientMail" type="text" placeholder="Email" style={fieldStyle} />
                                                {errors.clientMail && touched.clientMail ? (
                                                    <div style={{ color: '#ff0000' }}>{errors.clientMail}</div>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.clientMail}</span>
                                                }
                                                <Field name="clientDepartcity" type="text" placeholder="Departure City" style={fieldStyle} />
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ backgroundColor: '#333', color: '#fff', borderRadius: '4px' }}
                                        >
                                            <Typography>Travel Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                            <Stack spacing={1}>
                                                <Field name="leadType" as="select" style={fieldStyle} >
                                                    <option value="leadType" disabled selected hidden>Lead Type</option>
                                                    {leadType.map((each, index) => { return <option key={index} value={each} style={{ width: '5em' }}>{each}</option> })}
                                                </Field>
                                                {errors.leadType && touched.leadType ? (
                                                    <div style={{ color: '#ff0000' }}>{errors.leadType}</div>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.leadType}</span>
                                                }
                                                <Field name="checkin" placeholder='Tentative Check-In Date' type="date" style={{height: '2.5em', border: '0.15em solid #f46d25', borderRadius: '4px', paddingLeft: '1em', fontSize: '1em',backgroundColor:'#fff',width:'83.4vw'}}/>
                                                <Field name="destination" as="select" style={fieldStyle}
                                                    onChange={(Value) => { setSelectedCity(Value.target.value); setFieldValue("destination", Value.target.value) }}>
                                                    <option value="destination" disabled selected hidden>Destination City</option>
                                                    {cityList.map((each, index) => { return <option key={index} value={each}>{each}</option> })}
                                                </Field>
                                                {errors.destination && touched.destination ? (
                                                    <div style={{ color: '#ff0000' }}>{errors.destination}</div>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.destination}</span>
                                                }
                                                <Field name="displayName" as="select" style={fieldStyle}>
                                                    <option value="anyhotel">Any Hotel</option>
                                                    {allHotelList.map((each, index) => { return <option key={index} value={each.propertyId}>{each.displayName}</option> })}
                                                </Field>
                                                <Field name="noofpax" type="number" placeholder="No. Of Pax" style={fieldStyle} />
                                                <Field name="noofnights" type="number" placeholder="No Of Nights" style={fieldStyle} />
                                                <Field name="budget" type="number" placeholder="Budget" style={fieldStyle} />
                                                <Field name="notes" type="text" placeholder="Remarks" style={fieldStyle} />
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ backgroundColor: '#333', color: '#fff', borderRadius: '4px' }}
                                        >
                                            <Typography>Lead Status</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                            <Stack spacing={1}>
                                                <Field name="leadassignto" as="select" style={fieldStyle}>
                                                    <option value="leadassignto" disabled selected hidden>Lead Assign To</option>
                                                    {leadassignto.map((each, index) => { return <option key={index} value={each.username}>{each.name}</option> })}
                                                </Field>
                                                {errors.leadassignto && touched.leadassignto ? (
                                                    <div style={{ color: '#ff0000' }}>{errors.leadassignto}</div>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.leadassignto}</span>
                                                }
                                                <Field name="leadsource" as="select" style={fieldStyle}>
                                                    <option value="leadsource" disabled selected hidden>Lead Source</option>
                                                    {leadSource.map((each, index) => { return <option key={index} value={each}>{each}</option> })}
                                                </Field>
                                                {errors.leadsource && touched.leadsource ? (
                                                    <div style={{ color: '#ff0000' }}>{errors.leadsource}</div>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.leadsource}</span>
                                                }
                                                <Field name="leadscoring" as="select" style={fieldStyle}>
                                                    <option value="select" disabled hidden selected>Select</option>
                                                    <option value="new">New</option>
                                                    <option value="followup">Follow Up</option>
                                                    <option value="closed">Closed</option>
                                                    <option value="lost">Lost</option>
                                                </Field>
                                                {errors.leadscoring && touched.leadscoring ? (
                                                    <div style={{ color: '#ff0000' }}>{errors.leadscoring}</div>
                                                ) : <span style={{ color: '#ff0000' }}>{errors.leadscoring}</span>
                                                }
                                                {
                                                    values.leadscoring === "followup" ?
                                                        <Field name="leadscoringvalue" as="select" style={fieldStyle}>
                                                            <option value="followuphot">HOT</option>
                                                            <option value="followupwarm">Warm</option>
                                                            <option value="followupcold">Cold</option>
                                                        </Field> :
                                                        values.leadscoring === "lost" ? <Field name="reason" type="text" placeholder="Reason" style={fieldStyle} /> :
                                                            <div></div>
                                                }
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                        {
                                            viewselectedDetails.hasOwnProperty('id') ?
                                                <Button style={{ backgroundColor: '#f46d25', color: '#fff' }} variant="contained" type="submit">Update</Button> :
                                                <Button style={{ backgroundColor: '#f46d25', color: '#fff' }} variant="contained" type="submit">Submit</Button>
                                        }

                                        <Button style={{ backgroundColor: '#111', color: '#fff' }} variant="contained" onClick={() => { setOpenAdd(false); setViewselectedDetails({}); setExpanded("panel1") }}>Cancel</Button>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Box>
        </Modal >
    )
}
