import { Card, Stack, TextField, Typography, Checkbox, Button, Grid, Paper } from "@mui/material";
import React, { useState, useReducer, useEffect } from "react";
import { twnButtonStyles } from "../../../utils/townoStyle";
import Select, { components } from "react-select";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import DateFnsUtils from "@date-io/date-fns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Api from '../../../Service/Api';
import { useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parse } from "date-fns";
import Loader from "./../../../components/Loader/Loader";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

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

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validMobileRegex = RegExp(
    // /^(\+\d{1,3}[- ]?)?\d{10}$/i
    /^(\+\d{1,3}[- ]?)?\d{5}[- ]?\d{5}$/i
);
const buttonDisabledStyle = {
    fontSize: "14px", fontWeight: "bold", background: "#cccccc", borderRadius: "5px", color: "#666666", height: "34px!important", textAlign: 'center', padding: '5px 15px'
}
const selectStyle = {
    container: (provided) => ({
        ...provided,
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999, }),
    control: (base, state) => ({
        ...base,
        "&:hover": { borderColor: "#f46d25" },
        borderColor: "#f46d25",
        boxShadow: "none",
        width: '31.5vw',
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
                ? -7
                : "50%",
        background: "#fff",
        padding: "0px 5px",
        transition: "top 0.1s, font-size 0.1s",
        fontSize: "14px",
    }),
}

const addButtonStyle = { marginTop: '8px', cursor: "pointer", color: "#f46d25", position: "relative", "@media (maxWidth: 767px)": { fontSize: "18px", } }
const HotelCategory = [{ label: "1 Star", value: "1Star" }, { label: "2 Star", value: "2Star" }, { label: "3 Star", value: "3Star" }, { label: "4 Star", value: "4Star" }, { label: "5 Star", value: "5Star" }]
const checkFields = ['hotelName', 'city', 'totalNoOfRooms', 'hotelAddress', 'hotelContact', 'hotelEmail']

export default function AddAgentProperty() {
    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const [loading, setLoading] = useState(false);
    const [basicInput, setBasicInput] = useReducer(formReducer, {
        id: "", hotelName: " ", city: " ", starCategory: " ", totalNoOfRooms: " ", checkinTime: " ", checkoutTime: " ",
        hotelAddress: " ", hotelContact: " ", hotelEmail: " ", amenties: "", propertyId: "", "checkIn24": false, "couplefriendly": false, "beachnearby": false, "swimingpool": false, "jacuzzi": false,
        "conferencehall": false, "kidsplayarea": false, "designatorforwedding": false, "petFriendly": false, "isspa": false
    });
    const [error, setError] = useState({ hotelName: "", city: "", totalNoOfRooms: "", checkinTime: "", checkoutTime: "", hotelAddress: "", hotelContact: "", hotelEmail: "" })

    const [allFieldsValid, setAllFieldsValid] = useState(false);
    let { propertyId } = useParams();

    const validateField = (name, value) => {
        let temp_error = error;
        switch (name) {
            case 'hotelName':
            case 'city':
            case 'hotelAddress':
                temp_error[name] = value.length < 3 ? `${name} required` : "";
                break;
            case 'hotelContact':
                temp_error[name] = validMobileRegex.test(value) ? "" : "Enter a valid Mobile Number";
                break;
            case 'totalNoOfRooms':
                temp_error[name] = /^\+?\d+$/.test(value) ? "" : "Enter a valid positive no.";
                break;
            case 'hotelEmail':
                temp_error[name] = validEmailRegex.test(value) ? "" : "Enter a valid Email format";
                break;

        }
        setError(temp_error);
    }

    // This use effect is to check for validation and error so that it will update all fields as valid
    // if all fields are valid and no error is there in any fields then submit button will be enabled
    useEffect(() => {
        let valid = true;
        let formDataCheck = Object.entries(basicInput);
        formDataCheck = formDataCheck.filter(e => { return checkFields.includes(e[0]) })
        formDataCheck.forEach(val => {
            if (val[1] === null || val[1].trim().length <= 0) { valid = false }
        });
        setAllFieldsValid(valid && validateForm(error));
        console.log("valid", valid, validateForm(error));
    }, [basicInput])

    //room categories starts
    const [roomCategories, setRoomCategories] = useState([{ id: "", name: " ", price: " " },]);

    const handleRoomChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...roomCategories];
        list[index][name] = value;
        // validateField(name, value);
        setRoomCategories(list);
    };

    const handleAddClickBasic = () => {
        setRoomCategories([
            ...roomCategories,
            { id: "", name: " ", price: " " },
        ]);
    };

    const handleRemoveClickBasic = (index) => {
        const list = [...roomCategories];
        list.splice(index, 1);
        setRoomCategories(list);
    };
    //room categories ends

    //data on change
    const handleFormChange = event => {
        setBasicInput({
            name: event.target.name,
            value: event.target.value,
        });
        validateField(event.target.name, event.target.value.trim());
    }

    //checkbox change
    const handleCheckboxChange = (event) => {
        setBasicInput({
            name: event.target.name,
            value: event.target.checked,
        });
    };

    //select star category
    const handleHotelSelectChange = (name, value) => {
        console.log("hotelselectchange:", name, value)
        setBasicInput({
            name: name,
            value: value,
        });
    };

    //onSubmit
    const onSubmit = () => {
        let postData = {
            ...basicInput, ...{
                "id": "",
                "uniqueId": uniqueid,
                "createdBy": createdBy,
                "updatedBy": "",
                "roomCategories": roomCategories,
            }
        }
        console.log("onSubmit|postdata: ", postData)
        Api.post(`/quickProperty`, postData).then((res) => { window.open('/properties', '_self') });
    }

    //load data for editing
    useEffect(() => {
        if (propertyId) {
            setLoading(true);
            Api.get(`/quickPropertybyid/${uniqueid}/${propertyId}`).then((res) => {
                console.log("PACKAGE DETAILS: ", res.data);
                Object.entries(res.data).forEach(([key, value]) => {
                    setBasicInput({ name: key, value: value })
                })
                setRoomCategories(res.data.roomCategories);
                setLoading(false);
            })
        };
    }, [propertyId]);

    const handleDateChange = (name, e) => {
        setBasicInput({
            name: name,
            value: e
        });
        console.log("name: ", name, "value:", e);
    }

    return (
        <>
            {loading ? <Loader /> :
                <div style={twnButtonStyles.allPages}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Typography variant="h5" component="h5" style={{ ...twnButtonStyles.xlFonts, paddingTop: '19px' }}>Add Property</Typography>

                        {/* basic details  */}
                        <Paper style={{ backgroundColor: '#eee', marginTop: '7px', padding: '0.5% 1% 1% 1%' }}>
                            <Typography style={{ ...twnButtonStyles.lgFonts, fontWeight: '600', color: '#f46d25' }}>Basic Details</Typography>
                            <Stack style={{ marginTop: '10px' }}>
                                <Stack direction='row' spacing={2}>
                                    <CustomTextInlineField name="hotelName" label='Hotel Name*' style={{ backgroundColor: '#fff' }} value={basicInput.hotelName} onChange={handleFormChange} error={error} />
                                    <CustomTextInlineField name="hotelAddress" label='Hotel Address*' style={{ backgroundColor: '#fff' }} value={basicInput.hotelAddress} onChange={handleFormChange} error={error} />
                                    <CustomTextInlineField name="hotelContact" label='Hotel Contact*' style={{ backgroundColor: '#fff' }} value={basicInput.hotelContact} onChange={handleFormChange} error={error} />
                                </Stack>
                                <Stack direction='row' spacing={2} style={{ marginTop: '16px' }}>
                                    <CustomTextInlineField name="hotelEmail" label='Hotel Email*' style={{ backgroundColor: '#fff' }} value={basicInput.hotelEmail} onChange={handleFormChange} error={error} />
                                    <Select
                                        name="starCategory"
                                        isSearchable
                                        placeholder='Star Category'
                                        value={HotelCategory.filter(i => i.value === basicInput.starCategory)}
                                        options={HotelCategory}
                                        onChange={(e) => handleHotelSelectChange("starCategory", e.value)}
                                        maxMenuHeight={500}
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        styles={selectStyle}
                                    />
                                    <CustomTextInlineField name="city" label='City*' style={{ backgroundColor: '#fff' }} value={basicInput.city} onChange={handleFormChange} error={error} />
                                </Stack>
                                <Stack direction='row' spacing={2} style={{ marginTop: '16px' }}>
                                    <CustomTextInlineField name="totalNoOfRooms" label='Total Rooms*' style={{ backgroundColor: '#fff', borderColor: '#f46d25' }} value={basicInput.totalNoOfRooms} onChange={handleFormChange} error={error} />
                                    <TimePicker
                                        label="Check in Time*"
                                        value={basicInput.checkinTime ? parse(basicInput.checkinTime, 'hh:mmaaaa', new Date()) : null}
                                        style={{ width: '200%', height: '20px' }}
                                        onChange={(e) => handleDateChange("checkinTime", format(e["$d"], 'hh:mmaaa'))}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" style={{ borderColor: "#f46d25", backgroundColor: '#fff' }} />}
                                    />
                                    <TimePicker
                                        label="Check out Time*"
                                        value={basicInput.checkoutTime ? parse(basicInput.checkoutTime, 'hh:mmaaaa', new Date()) : null}
                                        size='small'
                                        variant="outlined"
                                        // format="HH:mm"
                                        onChange={(e) => handleDateChange("checkoutTime", format(e["$d"], 'hh:mmaaa'))}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" style={{ borderColor: "#f46d25", backgroundColor: '#fff' }} />}
                                    />
                                </Stack>
                            </Stack>
                        </Paper>

                        {/* room category  */}
                        <Card style={{ backgroundColor: '#eee', marginTop: '15px', padding: '0.5% 1% 1% 1%' }}>
                            <Typography style={{ ...twnButtonStyles.lgFonts, fontWeight: '600', color: '#f46d25' }}>Room Category</Typography>
                            <Stack style={{ marginTop: '10px' }} spacing={2}>
                                {roomCategories.map((x, i) => (
                                    <Stack direction='row' spacing={2} key={i}>
                                        <CustomTextInlineField name="name" label='Name' style={{ backgroundColor: '#fff' }} value={x.name} onChange={(e) => handleRoomChange(e, i)} />
                                        <CustomTextInlineField name="price" label='Price' style={{ backgroundColor: '#fff' }} value={x.price} onChange={(e) => handleRoomChange(e, i)} />
                                        {roomCategories.length - 1 === i ?
                                            <AddCircleOutlineIcon onClick={handleAddClickBasic} size="small" style={addButtonStyle} />
                                            :
                                            <DeleteIcon onClick={() => handleRemoveClickBasic(i)} size="small" style={addButtonStyle} />
                                        }
                                    </Stack>
                                ))}
                            </Stack>
                        </Card>

                        {/* checkboxes  */}
                        <div style={{ marginTop: '20px' }}>
                            <FormGroup>
                                <Stack direction='row' justifyContent='space-around'>
                                    <Stack >
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='checkIn24' onChange={handleCheckboxChange} label="24 Hour Check-in" checked={basicInput.checkIn24} />
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='conferencehall' onChange={handleCheckboxChange} label="Conference Hall" checked={basicInput.conferencehall} />
                                    </Stack>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='beachnearby' onChange={handleCheckboxChange} label="Beach Nearby" checked={basicInput.beachnearby} />
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='designatorforwedding' onChange={handleCheckboxChange} label="Wedding Destination" checked={basicInput.designatorforwedding} />
                                    </Stack>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='kidsplayarea' onChange={handleCheckboxChange} label="Kids Play Area" checked={basicInput.kidsplayarea} />
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='isspa' onChange={handleCheckboxChange} label="Spa" checked={basicInput.isspa} />
                                    </Stack>
                                    <Stack>

                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='couplefriendly' onChange={handleCheckboxChange} label="Couple Friendly" checked={basicInput.couplefriendly} />
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='swimingpool' onChange={handleCheckboxChange} label="Swimming Pool" checked={basicInput.swimingpool} />
                                    </Stack>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='petFriendly' onChange={handleCheckboxChange} label="Pet Friendly" checked={basicInput.petFriendly} />
                                        <FormControlLabel control={<Checkbox style={{ color: '#f46d25' }} />} name='jacuzzi' onChange={handleCheckboxChange} label="Jacuzzi" checked={basicInput.jacuzzi} />
                                    </Stack>
                                </Stack>
                            </FormGroup>
                        </div>

                        {/* amenities  */}
                        <Card style={{ backgroundColor: '#eee', marginTop: '15px', padding: '0.5% 1% 1% 1%' }}>
                            <Typography style={{ ...twnButtonStyles.lgFonts, fontWeight: '600', color: '#f46d25' }}>Amenities</Typography>
                            <TextareaAutosize name="amenties" style={{ maxWidth: '99.5%', minHeight: '4em', minWidth: '99.4%', fontSize: '15px', borderColor: '#f46d25', marginTop: '10px', borderRadius: '5px' }}
                                onChange={handleFormChange} defaultValue={basicInput.amenties} />
                        </Card>
                        <Stack direction='row' spacing={2} justifyContent='center' style={{ marginTop: '20px' }}>
                            {allFieldsValid ?
                                <Button style={twnButtonStyles.orangeBtn} onClick={onSubmit}>Submit</Button> : <Button style={buttonDisabledStyle}>Submit</Button>}
                            <a href="/properties" style={twnButtonStyles.linkBlackBtn}>Cancel</a>
                        </Stack>
                    </LocalizationProvider>
                </div >
            }
        </>
    );
}
function CustomTextInlineField(props) {
    return (<Grid container>
        <Grid item xs={12}>
            <TextField
                name={props.name}
                fullWidth
                label={props.label}
                autoFocus={true}
                value={props.value}
                variant="outlined"
                size="small"
                // InputLabelProps={{style:{color:'#f46d25 !important'}}}
                style={{ backgroundColor: '#fff', borderRadius: '5px', borderColor: '#f46d25 !important' }}
                onChange={props.onChange}
            />
        </Grid>
        {props.error && props.error[props.name] && props.error[props.name].length > 0 &&
            <Grid item xs={12}><span style={{ color: "#ff0000" }}>{props.error[props.name]}</span></Grid>}
    </Grid>)
}