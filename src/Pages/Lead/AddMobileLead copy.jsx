import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, Stack, TextField, FormControl, MenuItem, InputLabel } from '@mui/material';
import Select from 'react-select';
import { toast } from "react-toastify";
import Api from "../../Service/Api";
import * as Yup from "yup";

// this file is not used


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '76%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// const leadTypeOption = [{ label: 'B2B', value: 'b2b' }, { label: 'B2C', value: 'b2c' }];

const initialValues = {
    clientName: "",
    clientMail: "",
    clientMobileNo: "",
    clientDepartcity: "",
    buget: "",
    checkin: "",
    notes: "",
    leadType: "",
    destination: "",
    displayName: "",
    noofpax: "",
    noofnights: "",
    budget: "",
    leadassignto: "",
    leadsource: "",
    leadscoring: "new",
    leadscoringvalue: "",
    reason: "",
};

export default function BasicModal() {
    var uniqueid = localStorage.getItem("unique_id");
    const [open, setOpen] = useState(false);
    const [leadType, setLeadType] = useState([]);
    const [addFormData, setAddFormData] = useState({ clientName: ' ', clientMobileNo: ' ', clientMail: ' ', clientDepartcity: ' ',leadType:' ',checkin:' ',destination:' ',displayName:' ',noofpax:' ',noofnights:' ',budget:' ' });
    const [selectedDestCity, setSelectedDestCity] = useState({ value: null, label: null });
    const [selectedHotel, setSelectedHotel] = useState({ label: 'Any Hotel', value: 'anyHotel' });
    const [hotelList, setHotelList] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [boardLead, setBoardLead] = useState("");
    const [cityList, setCityList] = useState([]);

    const validationSchema = Yup.object({
        leadType: Yup.string().required("Lead Assigned To is Required"),
        destination: Yup.string().required("Destination is Required"),
    });

    const addFormChange = (event, label) => {
        addFormData[label] = event.target.value;
        setAddFormData(addFormData);
        
    }

    function createBoardLead() {
        console.log( addFormData);
        Api.post("boardlead", addFormData).then((res) => {
            toast.success("Lead Created Successfully");
            console.log("AddMobileLead|createBoardLead|response", res);
            setOpen(false);
        });
    }
    const CityList = (event) => {
        Api.get(`commonfeatureonly/${uniqueid}/City`).then((res) => {
            setCityList(res.data);
        });
    };

    useEffect(() => {
        let hotelUrl = `/propertyName`;
        console.log("from useeffect:", selectedDestCity)
        if (selectedDestCity != null) {
            hotelUrl = `/propertycitynameidlist/` + selectedDestCity;
        }
        Api.get(hotelUrl).then((res) => {
            setHotelList([{ displayName: 'Any Hotel', propertyId: 'anyHotel' }, ...res.data]);
            console.log("hotelList from useeffect:", res.data);
            setSelectedHotel({ label: 'Any Hotel', value: 'anyHotel' });
        });
    }, [selectedDestCity])

    const LeadType = (event) => {
        Api.get(`commonfeatureonly/${uniqueid}/leadType`).then((res) => {
            setLeadType(res.data);
        });
    };
    const LeadTypeoptions =
        leadType &&
        leadType.map((lead) => {
            return { label: lead, value: lead };
        });

    const Cityoption =
        cityList &&
        cityList.map((city) => {
            return { label: city, value: city };
        });

    const Hoteloption =
        hotelList &&
        hotelList.map((each) => {
            return { value: each.propertyId, label: each.displayName };
        });


    // const BoardLeadSingleData = async () => {
    //     console.log("boardform|boardleadsingledata|selectedId", selectedId);
    //     Api.get(`boardlead/${uniqueid}/${selectedId}`).then((res) => {
    //         setBoardLead(res.data);
    //         let hotelUrl = '/propertyName';
    //         console.log("from useeffect:", res.data.destination);
    //         if (res.data.destination != null) {
    //             hotelUrl = `/propertycitynameidlist/` + res.data.destination;
    //         }
    //         Api.get(hotelUrl).then((res1) => {
    //             setHotelList([{ displayName: 'Any Hotel', propertyId: 'anyHotel' }, ...res1.data]);
    //             console.log("hotelList from useeffect:", res1.data);
    //             // setHotelList([{ displayName: res.data.displayName, propertyId: res.data.propertyId }]);
    //             if (res.data.propertyId != "" && res.data.propertyId != null && res.data.propertyId != 'anyHotel') {
    //                 setSelectedHotel({ label: res.data.displayName, value: res.data.propertyId });
    //             } else {
    //                 setSelectedHotel({ label: 'Any Hotel', value: 'anyHotel' });
    //             }
    //         });

    //         // setHotelList([{ displayName: res.data.displayName, propertyId: res.data.propertyId }]);
    //         console.log("boardform|boardleadsingledata|responseData", res.data);
    //         //   if (res.data.leadscoring === "followup") {
    //         //     setLeadscorings(true);
    //         //   }
    //         //   if (res.data.leadscoring === "lost") {
    //         //     setLeadscoring(true);
    //         //     setLeadscorings(false);
    //         //   }
    //         //   if(res.data.checkin!=null && res.data.checkin!="" && res.data.checkin.trim()!=""){
    //         //     setStartDate(res.data.checkin);
    //         //   }

    //         console.log("boardform|singledata|checkin:", res.data.checkin);
    //         console.log("boardfoorm|boardleadsingledata|boardleadId", boardLead.id);
    //     });
    // };

    useEffect(() => {
        LeadType();
        // CityList();
        // if (selectedId) {
        //     BoardLeadSingleData();
        // }
    }, [selectedId])
    return (
        <div>
            {/* <Formik
                initialValues={boardLead || initialValues}
                // onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
            >
                {({ values, isValid, setFieldValue }) => {
                    return (
                        <Form autoComplete="off"> */}
                            
                            <Modal
                                open={open}
                                onClose={() => setOpen(false)}
                            >
                                <Box sx={style}>
                                    <Typography variant='h6' style={{ fontWeight: 'bold' }}>Add Lead</Typography><br />
                                    <Stack spacing={2} style={{ backgroundColor: '#fff', padding: '1.5em 0.5em', fontSize: '0.7em', borderBottomRightRadius: '0.5em', borderBottomLeftRadius: '0.5em' }}>
                                        <TextField
                                            // id="contained-select-currency"
                                            select
                                            defaultValue=" "
                                            variant="filled"
                                            label='Basic Details'
                                            style={{ backgroundColor: '#444', color: '#fff', borderRadius: '0.5em' }}
                                        >
                                            <MenuItem>
                                                <Stack spacing={2}>
                                                    <TextField
                                                        label="Client Name"
                                                        defaultValue=" "
                                                        // value={addFormData.name}
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientName") }}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Client Mobile"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientMobileNo") }}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Client Email"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientMail") }}
                                                    />
                                                    <TextField
                                                        label="Departure City"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientDepartcity") }}
                                                    />
                                                </Stack>
                                            </MenuItem>
                                        </TextField>
                                    </Stack>
                                    <Stack spacing={2} style={{ backgroundColor: '#fff', padding: '1.5em 0.5em', fontSize: '0.7em', borderBottomRightRadius: '0.5em', borderBottomLeftRadius: '0.5em' }}>
                                        <TextField
                                            // id="contained-select-currency"
                                            select
                                            defaultValue=" "
                                            variant="filled"
                                            label='Travel Details'
                                            style={{ backgroundColor: '#444', color: '#fff', borderRadius: '0.5em' }}
                                        >
                                            <MenuItem>
                                                <Stack spacing={2}>
                                                    <TextField
                                                        select
                                                        defaultValue=" "
                                                        variant="outlined"
                                                        label='Lead Type'
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "leadType") }}
                                                    >
                                                        {LeadTypeoptions.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    <TextField
                                                        required
                                                        label="Tentative Check-in"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "checkin") }}
                                                    />
                                                    <TextField
                                                        required
                                                        select
                                                        label="Destination City"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        // value={Cityoption}
                                                        // value={values.destination || ""}
                                                        // onChange={(Value) => {
                                                        //     let city = Value.value;
                                                        //     setFieldValue("destination", city);
                                                        //     setIsActive(true);
                                                        //     // console.log(typeof city);
                                                        //     console.log("from onchange event of destcity", city);
                                                        //     setSelectedDestCity(city);
                                                        // }}
                                                        onChange={(event) => { addFormChange(event, "destination") }}
                                                    />
                                                    <TextField
                                                        required
                                                        select
                                                        label="Hotel"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        // value={Hoteloption}
                                                        onChange={(event) => { addFormChange(event, "displayName") }}
                                                    />
                                                    <TextField
                                                        label="No of Pax"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "noofpax") }}
                                                    />
                                                    <TextField
                                                        label="No of Nights"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "noofnights") }}
                                                    />
                                                    <TextField
                                                        label="Budget"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "budget") }}
                                                    />
                                                </Stack>
                                            </MenuItem>
                                        </TextField>
                                    </Stack>
                                    <Stack spacing={2} style={{ backgroundColor: '#fff', padding: '1.5em 0.5em', fontSize: '0.7em', borderBottomRightRadius: '0.5em', borderBottomLeftRadius: '0.5em' }}>
                                        <TextField
                                            // id="contained-select-currency"
                                            select
                                            defaultValue=" "
                                            variant="filled"
                                            label='Basic Details'
                                            style={{ backgroundColor: '#444', color: '#fff', borderRadius: '0.5em' }}
                                        >
                                            <MenuItem>
                                                <Stack spacing={2}>
                                                    <TextField
                                                        label="Client Name"
                                                        defaultValue=" "
                                                        // value={addFormData.name}
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientName") }}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Client Mobile"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientMobileNo") }}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Client Email"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientMail") }}
                                                    />
                                                    <TextField
                                                        label="Departure City"
                                                        defaultValue=" "
                                                        fullWidth
                                                        size='small'
                                                        onChange={(event) => { addFormChange(event, "clientDepartcity") }}
                                                    />
                                                </Stack>
                                            </MenuItem>
                                        </TextField>
                                    </Stack>

                                    <Button onClick={createBoardLead}>Submit</Button>
                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                </Box>
                            </Modal>
                        {/* </Form>
                    )
                }}
            </Formik> */}
        </div >
    );
}
