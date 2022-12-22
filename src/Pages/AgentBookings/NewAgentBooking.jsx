import React, { useState, useReducer, useEffect } from "react";
import {
    Grid,
    Button,
    TextField,
    Radio,
    FormControlLabel,
    Checkbox,
    InputAdornment,
} from "@material-ui/core";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
// import { Formik, Field, Form } from "formik";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import axios from "axios";
import Select, { components } from "react-select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ClientForm from "../Clients/ClientForm";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { format, differenceInDays, addDays } from "date-fns";
import { Link, useHistory } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import { clientListInitial } from "../../redux/actions/clientAction";
import _ from "lodash";
import MaterialSelect from "../../components/Select/MaterialSelect";
import MaterialSelects from "../../components/Select/MaterialSelects";
import MuiPhoneNumber from "material-ui-phone-number";
import moment from "moment";
import { toast } from "react-toastify";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AgentBookingPreview from "./AgentBookingPreview";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Dialog, Slide, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "./../../components/Loader/Loader";
import { parse } from "date-fns";


//select field
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
const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}
const selectStyle = {
    menu: (provided) => ({ ...provided, zIndex: 9999, }),
    control: (base, state) => ({
        ...base,
        "&:hover": { borderColor: "#f46d25" },
        borderColor: "#f46d25",
        boxShadow: "none",
        width: '294px',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        position: "absolute",
        top:
            state.hasValue ||
                state.selectProps.inputValue
                ? -15
                : "50%",
        background: "#fff",
        padding: "0px 5px",
        transition: "top 0.1s, font-size 0.1s",
        fontSize: "14px",
    }),
}
//select field

//styles start
const useStyles = makeStyles((theme) => ({
    topBorder: {
        position: "absolute",
        top: "-9px",
        zIndex: "10",
        left: "12px",
        color: "rgb(0 0 0 / 54%)",
        background: "#f1f1f1",
        borderRadius: "4px",
        padding: "0px 4px",
        fontSize: "12px",
    },
    plus: {
        cursor: "pointer",
        color: "#f46d25",
        position: "relative",
        top: "7px",
        paddingRight: '5px',
        "@media (max-width: 767px)": {
            fontSize: "18px",
        },
    },
}))
const buttonDisabledStyle = {
    fontSize: "14px", fontWeight: "bold", background: "#cccccc", borderRadius: "5px", color: "#666666", height: "34px!important", textAlign: 'center', padding: '5px 15px'
}
//styles end

const bookingSource = [
    { value: "hotelWebsiteChat", label: "Hotel Website Chat" },
    { value: "justDial", label: "JustDial" },
    { value: "agentB2B", label: "B2B Agent" },
    { value: "fit", label: "FIT" },
    { value: "socialMedia", label: "Social Media" },
    { value: "incomingCall", label: "Incoming Call" },
    { value: "holidayIq", label: "Holiday Iq" },
    { value: "tripoto", label: "Tripoto" },
];

const mealPlanOptions = [
    { value: "ep", label: "EP" },
    { value: "cp", label: "CP" },
    { value: "map", label: "MAP" },
    { value: "ap", label: "AP" },
];

const paymentModeOptions = [
    { value: "cash", label: "Cash" },
    { value: "upi", label: "UPI" },
    { value: "BankTransfer", label: "Bank Transfer" },
    { value: "Instamojo", label: "Instamojo" },
    { value: "creditnote", label: "Credit Note" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

//new
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

const checkFields = ["clientName", "destinationCity", "bookingSource","hotelName","checkIn","checkOut","totalRoomSellingAmount","totalNetAmount"];

export default function NewAgentBooking() {
    const classes = useStyles();
    const history = useHistory();
    const { bookingId } = useParams();
    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const [clientList, setClientList] = useState([]);
    const [destinationCity, setDestinationCity] = useState([]);
    const [hotelList, setHotelList] = useState([]);
    const [hotelRoomType, setHotelRoomType] = useState([]);
    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false);
    const [selectedId] = useState(0);
    const [paymentType, setPaymentType] = useState("Full");
    const [checkin1, setCheckin1] = useState(new Date());
    const [loading, setLoading] = useState(false);

    // all single data variable 
    const [formData, setFormData] = useReducer(formReducer, {
        clientName: " ", clientMobile: " ", clientEmail: " ", destinationCity: " ", bookingSource: " ", hotelName: " ",
        hotelPhone: " ", starRating: " ", hotelAddress: " ", hotelEmail: " ", checkIn: null, checkOut: null,
        totalRoomNetAmount: " ", totalRoomSellingAmount: "", totalInclusionAmount: " ",
        totalVendorAmount: "1", totalBookingAmount: " ", paidAmount: " ", profit: "1", pendingAmount: " ",
        bookingStatus: " ", balancePayableHotel: " ", vaccinated: true, git: false, partialPayment: "0", paymentType: "Full",
        paymentMode: "", paymentRefNo: " ", id: '', uniqueId: uniqueid, bookingId: ''
    });

    const minCheckInDate = formData.checkIn ? parse(formData.checkIn, 'yyyy-MM-dd', new Date()) < new Date() ? parse(formData.checkIn, 'yyyy-MM-dd', new Date()) : new Date() : new Date()

    //bookingLeads variable and function starts
    const [bookingLeads, setBookingLeads] = useState([
        { id: "", name: "", mobile: "", altMobile: "", email: "" },
    ]);

    const handleLeadChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...bookingLeads];
        list[index][name] = value;
        setBookingLeads(list);
    };

    const handleRemoveLeadPerson = (index) => {
        const list = [...bookingLeads];
        list.splice(index, 1);
        setBookingLeads(list);
    };

    const handleAddLeadPerson = () => {
        setBookingLeads([
            ...bookingLeads,
            { id: "", name: "", mobile: "", altMobile: "", email: "" },
        ]);
    };
    //bookingLeads variable and function ends

    //RoomCategories variables and function starts
    const [roomCategories, setRoomCategories] = useState([
        {
            id: "", boardBasic: " ", roomType: " ", mealplan: " ", adult: '1', child: "0", rooms: "1",
            sellingPrice: '', netPrice: '', totalNetPrice: ""
        },]);

    const handleRoomChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...roomCategories];
        list[index][name] = value;
        setRoomCategories(list);
    };
    const handleRoomOptionsChange = (name, value, index) => {
        const list = [...roomCategories];
        list[index][name] = value;
        setRoomCategories(list);
    };
    const handleRemoveRoomPerson = (index) => {
        const list = [...roomCategories];
        list.splice(index, 1);
        setRoomCategories(list);
    };

    const handleAddRoomPerson = () => {
        setRoomCategories([
            ...roomCategories,
            {
                id: "", boardBasic: " ", roomType: " ", mealplan: " ", adult: '1', child: "0", rooms: "1",
                sellingPrice: '0', netPrice: '0', totalNetPrice: "0"
            },
        ]);
    };
    //RoomCategories variables and function ends

    // inclusion variable and function starts 
    const [bookingInclusions, setBookingInclusions] = useState([{ id: "", inclusion: "", sellingPrice: "", vendorPrice: "" },]);

    const handleInclusionsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...bookingInclusions];
        list[index][name] = value;
        setBookingInclusions(list);
    };
    const handleRemoveInclusionPerson = (index) => {
        const list = [...bookingInclusions];
        list.splice(index, 1);
        setBookingInclusions(list);
    };

    const handleAddInclusionPerson = () => {
        setBookingInclusions([...bookingInclusions, { id: "", inclusion: "", sellingPrice: "" },]);
    };
    //inclusion variable and function ends

    //new
    const [error, setError] = useState({ clientName: "", destinationCity: "", bookingSource: "", hotelName: "" })
    const validateField = (name, value) => {
        let temp_error = error;
        switch (name) {
            case 'clientName':
            case 'destinationCity':
            case 'bookingSource':
            case 'hotelName':
                temp_error[name] = value.length < 3 ? `${name} required` : "";
                break;
        }
        setError(temp_error);
    }

    const validateAllFields = () => {
        let valid = true;
        let formDataCheck = Object.entries(formData);
        formDataCheck = formDataCheck.filter(e => { return checkFields.includes(e[0]) });
        console.log("NewAgentBooking|validateAllFields|formDataCheck:",formDataCheck);
        Object.values(formDataCheck).forEach(val => {
            if (val[1] !== null && val[1].toString().trim().length <= 0) {
                valid = false;
                // let temp = errorArr;
                // temp[i][val[0]] = "Required"
                // setErrorArr(temp);
            }
            else if (val[1] === null){
                valid = false;
            }
            if (['totalRoomSellingAmount',"totalNetAmount"].includes(val[0])){
                if (val[1]/1<=0){
                    valid=false;
                } 
            }
        });
        return valid;
    }

    const daysDiff = () => {
        console.log("formData.checkOut", formData.checkOut);
        console.log("parseData", formData.checkIn, 'yyyy-MM-dd', new Date())
        if (formData.checkOut) {
            // parse date and calculate diff between the dates
            let d1 = parse(formData.checkIn, 'yyyy-MM-dd', new Date());
            let d2 = parse(formData.checkOut, 'yyyy-MM-dd', new Date());
            return differenceInDays(d2, d1)
        }
        else { return '' }
    }

    const handleFormChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
        validateField(event.target.name, event.target.value);
    }

    useEffect(() => {
        roomCategories.forEach(element => {
            element.rooms = 1
            element.totalNetPrice = element.netPrice * 1 * daysDiff();
            // element.totalNetPrice = element.netPrice * 1 * differenceInDays(formData.checkOut, formData.checkIn);
        });
        let tempTotalRoomNetAmount = roomCategories.reduce((total, e) => { return total + (e.totalNetPrice * 1) }, 0)
        let tempTotalInclusionAmount = bookingInclusions.reduce((total, e) => { return total + (e.sellingPrice * 1) }, 0)
        let tempTotalRoomSellingAmount = roomCategories.reduce((total, e) => { return total + (e.sellingPrice * 1) }, 0)
        let tempTotalVendorAmount = bookingInclusions.reduce((total, e) => { return total + (e.vendorPrice * 1) }, 0)
        let tempTotalNetAmount = tempTotalRoomNetAmount + tempTotalVendorAmount;
        let tempCommission = (tempTotalInclusionAmount + tempTotalRoomSellingAmount) - tempTotalNetAmount;

        if (tempTotalRoomNetAmount === null) { return 0 };
        if (tempTotalNetAmount === null) { return 0 };
        if (tempCommission === null) { return 0 };

        setFormData({ name: 'totalRoomNetAmount', value: tempTotalRoomNetAmount });
        setFormData({ name: "totalNetAmount", value: tempTotalNetAmount });
        setFormData({ name: "profit", value: tempCommission });
    }, [formData.git])

    useEffect(() => {
        let tempTotalRoomNetAmount = roomCategories.reduce((total, e) => { return total + (e.totalNetPrice * 1) }, 0)
        let tempTotalInclusionAmount = bookingInclusions.reduce((total, e) => { return total + (e.sellingPrice * 1) }, 0)
        let tempTotalRoomSellingAmount = roomCategories.reduce((total, e) => { return total + (e.sellingPrice * 1) }, 0)
        let tempTotalVendorAmount = bookingInclusions.reduce((total, e) => { return total + (e.vendorPrice * 1) }, 0)
        let tempTotalNetAmount = tempTotalRoomNetAmount + tempTotalVendorAmount;
        let tempCommission = (tempTotalInclusionAmount + tempTotalRoomSellingAmount) - tempTotalNetAmount;

        if (tempTotalRoomNetAmount === null) { return 0 };
        if (tempTotalInclusionAmount === null) { return 0 };
        if (tempTotalRoomSellingAmount === null) { return 0 };
        if (tempTotalVendorAmount === null) { return 0 };
        if (tempTotalNetAmount === null) { return 0 };
        if (tempCommission === null) { return 0 };

        setFormData({ name: 'totalRoomNetAmount', value: tempTotalRoomNetAmount });
        setFormData({ name: 'totalInclusionAmount', value: tempTotalInclusionAmount });
        setFormData({ name: 'totalBookingAmount', value: tempTotalRoomSellingAmount + tempTotalInclusionAmount });
        setFormData({ name: 'totalRoomSellingAmount', value: tempTotalRoomSellingAmount });
        setFormData({ name: 'totalVendorAmount', value: tempTotalVendorAmount });
        setFormData({ name: "totalNetAmount", value: tempTotalNetAmount });
        setFormData({ name: "profit", value: tempCommission });
    }, [roomCategories, bookingInclusions])


    //payment type useEffect
    useEffect(() => {
        if (formData.paymentType === "Full") { formData.partialPayment = 0 }
        formData.balancePayableHotel = formData.totalBookingAmount - formData.paidAmount - formData.partialPayment;
    }, [formData.paymentType])

    // Client Starts
    const handleClientChange = (option) => {
        console.log("client|option", option);
        setFormData({ name: 'clientName', value: option.value });
        setFormData({ name: 'clientMobile', value: option.phoneNo });
        setFormData({ name: 'clientEmail', value: option.mailId });
    }
    // Client Ends

    //destinationCity-HotelList function Starts
    const handleCityChange = (option) => {
        Api.get(`/agentbookingcityproperty/${uniqueid}/${option.value}`).then((res) => {
            let hotelVar = res.data.map((each, index) => {
                return { label: each.displayName, value: each.propertyId }
            })
            setFormData({ name: 'destinationCity', value: option.value });
            setHotelList(hotelVar);
        })
    }

    const handleHotelChange = (option) => {
        Api.get(`/agentbookingpropertydetail/${uniqueid}/${option.value}`).then((res) => {
            console.log("hotelList:", option, res.data);
            setFormData({ name: 'hotelName', value: option.label });
            setFormData({ name: 'hotelAddress', value: res.data.hotelAddress });
            setFormData({ name: 'starRating', value: res.data.hotelStarRating });
            setFormData({ name: 'hotelPhone', value: res.data.hotelMobile });
            setFormData({ name: 'hotelEmail', value: res.data.hotelEmail });
            let tempHotelRoomTypes = res.data.roomType.map((each, index) => {
                return { label: each, value: each }
            })
            setHotelRoomType(tempHotelRoomTypes);
        })
    }
    //destinationCity-HotelList function Ends

    //accordian variable and function starts
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => { setExpanded(newExpanded ? panel : false); };
    //accordian variable and function ends

    const onSubmitFun = () => {
        if (validateForm(error) && validateAllFields()) {
            let postData = {
                ...formData,
                agentBookingLeads: bookingLeads,
                agentBookingRoomCategories: roomCategories,
                agentBookingInclusions: bookingInclusions,
                createdBy: createdBy,
                agentBookingPayments: [{ id: "", paidAmount: formData.paidAmount, paymentMode: formData.paymentMode, paymentRefNo: formData.paymentRefNo }],
                noOfNight: daysDiff()
            }
            console.log('Preiview Open Clicked', postData);
            Api.post("agentBooking", postData).then((res) => {
                console.log(res);
                window.open('/agentBookings', '_self');
            })
        } else {
            toast.error('Please correct Errors')
        }
    }


    // Api call for ClientList,DestinationCity,AllHotelList Start
    useEffect(() => {
        Api.get(`/clientall/${uniqueid}`).then((res) => {
            let clientVar = res.data.map((each, index) => {
                return { label: each.firstName + " " + each.lastName, value: each.firstName + " " + each.lastName, phoneNo: each.mobile, mailId: each.mail }
            })
            setClientList(clientVar);
        })

        Api.get(`/agentbookingpropertycity/${uniqueid}`).then((res) => {
            let cityVar = res.data.map((each, index) => {
                return ({ label: each, value: each })
            })
            setDestinationCity(cityVar);
        })
        // Api.get(`propertyName`).then((res) => {
        //     let allHotelVar = res.data.map((each, index) => {
        //         return { label: each.displayName, value: each.propertyId }
        //     })
        //     setHotelList(allHotelVar);
        // })

        //this useEffect is for updating/editing the form
        if (bookingId) {
            setLoading(true);
            Api.get(`agentBookingById/${uniqueid}/${bookingId}`).then((res) => {

                Object.entries(res.data).forEach(([key, value]) => {
                    setFormData({ name: key, value: value })
                })
                setFormData({ name: "paymentMode", value: res.data.agentBookingPayments[0].paymentMode })
                setFormData({ name: "paymentRefNo", value: res.data.agentBookingPayments[0].paymentRefNo })
                setPaymentType(res.data.paymentType)

                setBookingLeads(res.data.agentBookingLeads);

                Api.get(`propertyName`).then((propertyResData) => {
                    let allHotelVar = propertyResData.data.map((each, index) => {
                        return { label: each.displayName, value: each.propertyId }
                    })
                    let selectedHotel = allHotelVar.filter(i => i.label === res.data.hotelName)
                    return selectedHotel
                }).then((selectedHotel) => {
                    Api.get(`/agentbookingpropertydetail/${uniqueid}/${selectedHotel[0].value}`).then((roomTypeResData) => {
                        let tempHotelRoomTypes = roomTypeResData.data.roomType.map((each, index) => {
                            return { label: each, value: each }
                        })
                        setHotelRoomType(tempHotelRoomTypes);
                    })
                })


                setRoomCategories(res.data.agentBookingRoomCategories);
                setBookingInclusions(res.data.agentBookingInclusions);
                setCheckin1(addDays(new Date(res.data.checkIn), 1));
                setLoading(false);
            })
        }

    }, [])
    //Api call of ClientList,DestinationCity,AllHotelList Ends

    const handleFormDateChange = (name, e) => {
        setFormData({
            name: name,
            value: format(e, 'yyyy-MM-dd')
        });
        //console.log("name: ",name);
        if (name === "checkIn") {
            setCheckin1(addDays(e, 1));
        }
    }

    return (
        <>
            {loading ? <Loader /> :
                <div style={{ ...twnButtonStyles.allPages, paddingTop: "7%" }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {bookingId ?
                            <>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography style={{ ...twnButtonStyles.xlFonts, marginTop: '1.5%' }}>Update Booking</Typography>
                                    <Typography style={{ fontSize: '18px', marginTop: '2%', color: '#f46d25', fontWeight: 'bold' }}>{bookingId}</Typography>
                                </Stack>
                            </> :
                            <Typography style={{ ...twnButtonStyles.xlFonts, marginTop: '-2%' }}>New Booking</Typography>
                        }
                        {/* Basic Information Accordian Starts  */}
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ margin: '5px 0' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} id="panel1a-header" style={{ backgroundColor: '#f46d25', color: '#fff', marginTop: '0.8%', height: '0.5em' }}>
                                <Typography variant='h5' style={{ padding: '0%' }}>Basic Information</Typography>
                            </AccordionSummary>

                            {/* client details   */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%' }} spacing={2}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Client Details</Typography>
                                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                                        <div style={{ position: "relative" }}><span className={classes.topBorder}>Client Name*</span>
                                            <Select
                                                name="clientName"
                                                defaultValue={formData.clientName}
                                                value={clientList.filter(i => i.value === formData.clientName)}
                                                isSearchable
                                                options={clientList}
                                                onChange={handleClientChange}
                                                components={{
                                                    ValueContainer: CustomValueContainer,
                                                }}
                                                styles={selectStyle}
                                                error={error}
                                            /></div>
                                        <AddCircleOutlineIcon style={{ fontSize: '20px', color: '#f46d25', cursor: 'pointer' }} onClick={() => { setOpen(true) }} />
                                        <CustomTextInlineField name="clientMobile" label="Client Phone*" value={formData.clientMobile} onChange={() => { }} disabled={true} />
                                        <CustomTextInlineField name="clientEmail" label="Client Email*" value={formData.clientEmail} onChange={() => { }} disabled={true} />

                                        <div style={{ position: "relative" }}><span className={classes.topBorder}>Destination City*</span>
                                            <Select
                                                name="destinationCity"
                                                isSearchable
                                                value={destinationCity ? destinationCity.filter(i => i.value === formData.destinationCity) : null}
                                                options={destinationCity}
                                                onChange={handleCityChange}
                                                components={{
                                                    ValueContainer: CustomValueContainer,
                                                }}
                                                styles={selectStyle}
                                                error={error}
                                            /></div>
                                        <div style={{ position: "relative" }}><span className={classes.topBorder}>Booking Source*</span>
                                            <Select
                                                options={bookingSource}
                                                isSearchable
                                                value={bookingSource ? bookingSource.filter(i => i.value === formData.bookingSource) : null}
                                                onChange={(option) => setFormData({ name: 'bookingSource', value: option.value })}
                                                components={{
                                                    ValueContainer: CustomValueContainer,
                                                }}
                                                styles={selectStyle}
                                                error={error}
                                            />
                                        </div>
                                    </Stack>
                                    <Stack direction='row' spacing={5}>
                                        <div>
                                            <Checkbox
                                                type="checkbox"
                                                checked={formData.vaccinated}
                                                onChange={(e) => { setFormData({ name: 'vaccinated', value: e.target.checked }) }}
                                                color="primary"
                                            />
                                            <label>Vaccinated</label>
                                        </div>
                                        <div>
                                            <Checkbox
                                                type="checkbox"
                                                checked={formData.git}
                                                onChange={(e) => { setFormData({ name: 'git', value: e.target.checked }) }}
                                                color="primary"
                                            />
                                            <label>GIT</label>
                                        </div>
                                    </Stack>
                                    {/* </Stack> */}
                                </Stack>
                            </AccordionDetails>

                            {/* hotel details  */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%' }} spacing={2}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Hotel Details</Typography>
                                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                                        <div style={{ position: "relative" }}><span className={classes.topBorder}>Hotel Name*</span>
                                            <Select
                                                name="hotelName"
                                                // defaultValue={formData.hotelName}
                                                value={hotelList ? hotelList.filter(i => i.label === formData.hotelName) : null}
                                                isSearchable
                                                options={hotelList}
                                                onChange={handleHotelChange}
                                                components={{
                                                    ValueContainer: CustomValueContainer,
                                                }}
                                                styles={selectStyle}
                                                error={error}
                                            /></div>
                                        <CustomTextInlineField name="starRating" label="Star Category" value={formData.starRating} onChange={() => { }} disabled={true} />
                                        <CustomTextInlineField name="hotelPhone" label="Hotel Phone*" value={formData.hotelPhone} onChange={() => { }} disabled={true} />
                                        <CustomTextInlineField name="hotelEmail" label="Hotel Email*" value={formData.hotelEmail} onChange={() => { }} disabled={true} />
                                        <CustomTextInlineField name="hotelAddress" label="Hotel Address*" value={formData.hotelAddress} onChange={() => { }} disabled={true} />
                                    </Stack>
                                </Stack>
                            </AccordionDetails>

                            {/* leadpax details  */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%' }} spacing={2}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Lead Pax</Typography>
                                    {bookingLeads.map((x, i) => (

                                        <Stack direction='row' spacing={3} justifyContent='space-between' style={{ width: '100%' }} key={i}>
                                            <><div style={{ display: "flex", width: '100%' }}><span>{i + 1}</span> &nbsp;
                                                <CustomTextInlineField name="name" label="Name" value={x.name} onChange={(e) => handleLeadChange(e, i)} />
                                            </div></>
                                            <CustomTextInlineField name="mobile" label="Mobile No" value={x.mobile} onChange={(e) => handleLeadChange(e, i)} />
                                            <CustomTextInlineField name="altMobile" label="Alt Mobile" value={x.altMobile} onChange={(e) => handleLeadChange(e, i)} />
                                            <CustomTextInlineField name="email" label="Email" value={x.email} onChange={(e) => handleLeadChange(e, i)} />
                                            <>
                                                {bookingLeads.length - 1 === i ?
                                                    <AddCircleOutlineIcon size="small" className={classes.plus} onClick={handleAddLeadPerson} /> :
                                                    <DeleteIcon className={classes.plus} onClick={() => handleRemoveLeadPerson(i)} />
                                                }
                                            </>
                                        </Stack>

                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        {/* Basic Information Accordian Ends  */}

                        {/* Booking Information Accordian Starts  */}
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ margin: '5px 0' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} id="panel1a-header" style={{ backgroundColor: '#f46d25', color: '#fff', marginTop: '0.8%', height: '0.5em' }}>
                                <Typography variant='h5' style={{ padding: '0%' }}>Booking Information</Typography>
                            </AccordionSummary>

                            {/* Checkin,Checkout,Nights Starts  */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack direction='row' spacing={2} justifyContent='space-around' style={{ width: '100%', marginTop: '10px' }} >
                                    <DatePicker
                                        animateYearScrolling
                                        autoOk="true"
                                        format="yyyy-MM-dd"
                                        fullWidth
                                        inputVariant="outlined"
                                        label="Check-In"
                                        minDate={minCheckInDate}
                                        onChange={(e) => handleFormDateChange("checkIn", e)}
                                        required
                                        size="small"
                                        value={formData.checkIn ? parse(formData.checkIn, 'yyyy-MM-dd', new Date()) : null}
                                        variant="inline"
                                    />
                                    <DatePicker
                                        required label="Check-Out" size="small" fullWidth
                                        inputVariant="outlined" format="yyyy-MM-dd" animateYearScrolling
                                        // onChange={(e) => setFormData({ name: 'checkOut', value: e })}
                                        value={formData.checkOut ? parse(formData.checkOut, 'yyyy-MM-dd', new Date()) : null}
                                        onChange={(e) => handleFormDateChange("checkOut", e)}
                                        variant="inline" autoOk="true"
                                        minDate={checkin1 ?? new Date()}
                                    />
                                    <CustomTextInlineField name="noOfNight" label="No. of Nights" value={daysDiff()} />
                                </Stack>
                            </AccordionDetails>
                            {/* Checkin,Checkout,Nights Ends  */}

                            {/* Room Details Starts  */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%', marginTop: '10px' }} spacing={1}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Room Details</Typography>
                                    {roomCategories.map((x, i) => (
                                        <div key={i}>
                                            <div style={{ textAlign: 'right' }}>
                                                {
                                                    roomCategories.length - 1 === i ?
                                                        <AddCircleOutlineIcon size="small" className={classes.plus} onClick={handleAddRoomPerson} /> :
                                                        <DeleteIcon className={classes.plus} onClick={() => handleRemoveRoomPerson(i)} />
                                                }
                                            </div>
                                            <Stack direction='row' spacing={2} justifyContent='space-between' style={{ width: '100%', marginTop: '10px' }} >
                                                <div style={{ position: "relative" }}><span className={classes.topBorder}>Room Type*</span>
                                                    <Select
                                                        name="roomType"
                                                        isSearchable
                                                        // placeholder='Room Type'
                                                        value={x.roomType ? hotelRoomType.filter(i => i.value === x.roomType) : null}
                                                        options={hotelRoomType}
                                                        onChange={(e) => handleRoomOptionsChange('roomType', e.value, i)}
                                                        components={{
                                                            ValueContainer: CustomValueContainer,
                                                        }}
                                                        styles={selectStyle}
                                                    /></div>
                                                <div style={{ position: "relative" }}><span className={classes.topBorder}>Meal Plan*</span>
                                                    <Select
                                                        name='mealplan'
                                                        value={x.mealplan ? mealPlanOptions.filter(i => i.value === x.mealplan) : null}
                                                        options={mealPlanOptions}
                                                        isSearchable
                                                        placeholder='Meal Plan'
                                                        onChange={(e) => handleRoomOptionsChange('mealplan', e.value, i)}
                                                        components={{
                                                            ValueContainer: CustomValueContainer,
                                                        }}
                                                        styles={selectStyle}
                                                    /></div>
                                                <CustomTextInlineField name="adult" label="Adults*" value={x.adult} onChange={(e) => handleRoomChange(e, i)} />
                                                <CustomTextInlineField name="child" label="Children*" value={x.child} onChange={(e) => handleRoomChange(e, i)} />
                                            </Stack>
                                            <Stack direction='row' spacing={2} justifyContent='space-between' style={{ marginTop: '10px' }}>
                                                {formData.git && <CustomTextInlineField name="rooms" label="No. of Rooms" value={x.rooms} onChange={(e) => { handleRoomChange(e, i); handleRoomOptionsChange('totalNetPrice', x.netPrice * daysDiff() * x.rooms, i) }} />}

                                                <CustomTextInlineField name="sellingPrice" label="Selling Price*" value={x.sellingPrice} onChange={(e) => handleRoomChange(e, i)} />

                                                <CustomTextInlineField name="netPrice" label="Net to Hotel per Night*" value={x.netPrice} onChange={(e) => { handleRoomChange(e, i); handleRoomOptionsChange('totalNetPrice', x.netPrice * daysDiff() * x.rooms, i) }} />

                                                <CustomTextInlineField name="totalNetPrice" label="Total Net Price" value={formData.checkOut ? x.netPrice * daysDiff() * x.rooms : 0} disabled={true} />
                                            </Stack>
                                        </div>
                                    ))}
                                </Stack>
                            </AccordionDetails>
                            {/* Room Details Ends  */}

                            {/* Inclusion Starts  */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%' }} spacing={2}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Inclusion</Typography>
                                    {bookingInclusions.map((x, i) => (
                                        <Stack direction='row' spacing={2} key={i}>
                                            <CustomTextInlineField name="inclusion" label="Inclusion Name" value={x.inclusion} onChange={(e) => handleInclusionsChange(e, i)} />

                                            <CustomTextInlineField name="sellingPrice" label="Inclusion Selling Price" value={x.sellingPrice} onChange={(e) => handleInclusionsChange(e, i)} />

                                            <CustomTextInlineField name="vendorPrice" label="Net to Vendor" value={x.vendorPrice} onChange={(e) => handleInclusionsChange(e, i)} />

                                            {
                                                bookingInclusions.length - 1 === i ?
                                                    <AddCircleOutlineIcon size="small" className={classes.plus} onClick={handleAddInclusionPerson} /> :
                                                    <DeleteIcon className={classes.plus} onClick={() => handleRemoveInclusionPerson(i)} />
                                            }
                                        </Stack>
                                    ))}
                                </Stack>
                            </AccordionDetails>
                            {/* Inclusion Ends  */}

                        </Accordion>
                        {/* Booking Information Accordian Ends  */}

                        {/* Payment Details Starts  */}
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{ margin: '5px 0' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} id="panel1a-header" style={{ backgroundColor: '#f46d25', color: '#fff', marginTop: '0.8%', height: '0.5em' }}>
                                <Typography variant='h5' style={{ padding: '0%' }}>Payment Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%' }} spacing={2}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Payment Breakup</Typography>
                                    <Stack direction='row' spacing={5}>
                                        {/* left side fields  */}
                                        <Grid item lg={6}>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#138128",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#f46d25",
                                                            },
                                                        }}
                                                        label={"Total Room Rent (R)"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="totalRoomNetAmount"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{
                                                            backgroundColor: "#ffe2d7",
                                                            marginLeft: "-20px",
                                                        }}
                                                        size="small"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        value={formData.totalRoomSellingAmount || ""}
                                                        autoComplete="off"
                                                        disabled
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: {
                                                                color: "#fff",
                                                                background: "#f46d25",
                                                                borderRadius: "4px",
                                                                padding: "2px 4px",
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#138128",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#f46d25",
                                                            },
                                                        }}
                                                        label={"Total Inclusion Amount (I)"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="totalInclusionAmount"
                                                        value={formData.totalInclusionAmount || ""}
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{
                                                            backgroundColor: "#ffe2d7",
                                                            marginLeft: "-20px",
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        size="small"
                                                        autoComplete="off"
                                                        disabled
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: {
                                                                color: "#fff",
                                                                background: "#f46d25",
                                                                borderRadius: "4px",
                                                                padding: "2px 4px",
                                                            },
                                                        }}
                                                    />
                                                </Grid>{" "}
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#138128",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#f46d25",
                                                            },
                                                        }}
                                                        label={"Total Booking Amount (R+I)"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="totalBookingAmount"
                                                        value={formData.totalBookingAmount || ""}
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{
                                                            backgroundColor: "#ffe2d7",
                                                            marginLeft: "-20px",
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        size="small"
                                                        autoComplete="off"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: {
                                                                color: "#fff",
                                                                background: "#f46d25",
                                                                borderRadius: "4px",
                                                                padding: "2px 4px",
                                                            },
                                                        }}
                                                        disabled
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* right side fields  */}
                                        <Grid item lg={6}>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#282828",
                                                            borderColor: "#a1a1a1",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#464141",
                                                            },
                                                        }}
                                                        label={"Net Payout (H+V)"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        // name="netValue"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        style={{
                                                            borderColor: "#a1a1a1",
                                                            backgroundColor: "#cccccc",
                                                            marginLeft: "-20px",
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        value={formData.totalNetAmount || ""}
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                    {/* <p className="errors">
                                                {formError.totalNetPrice}
                                            </p> */}
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#4e8c50",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#067d04",
                                                            },
                                                        }}
                                                        label={"Commission"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="profitValue"
                                                        value={formData.profit || ""}
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{
                                                            backgroundColor: "#deffde",
                                                            marginLeft: "-20px",
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        size="small"
                                                        autoComplete="off"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: {
                                                                color: "#fff",
                                                                background: "#00a300",
                                                                borderRadius: "4px",
                                                                padding: "2px 4px",
                                                            },
                                                        }}
                                                        disabled
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Stack>
                                </Stack>
                            </AccordionDetails>
                            {/* Transaction Summary Starts  */}
                            <AccordionDetails style={{ backgroundColor: '#eee' }}>
                                <Stack style={{ width: '100%' }} spacing={2}>
                                    <Typography variant='h6' style={{ color: '#f46d25' }}>Transaction Summary</Typography>
                                    <Stack direction='row' spacing={5}>
                                        <Grid item lg={6}>
                                            <Grid container spacing={2}>
                                                {" "}
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#138128",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#f46d25",
                                                            },
                                                        }}
                                                        label={"Amount Received"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="paidAmount"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{
                                                            backgroundColor: "#ffe2d7",
                                                            marginLeft: "-20px",
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        size="small"
                                                        value={formData.paidAmount || ""}
                                                        onChange={(e) => { handleFormChange(e); setFormData({ name: 'pendingAmount', value: formData.totalBookingAmount - (e.target.value * 1) }); setFormData({ name: 'balancePayableHotel', value: formData.totalBookingAmount - (e.target.value * 1) - formData.partialPayment }) }}
                                                        autoComplete="off"
                                                        type="number"
                                                    />
                                                </Grid></Grid>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#138128",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#f46d25",
                                                            },
                                                        }}
                                                        label={"Balance Payable on Arrival (BPAH)"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="balancePayableHotel"
                                                        value={formData.balancePayableHotel}
                                                        style={{
                                                            backgroundColor: "#ffe2d7",
                                                            marginLeft: "-20px",
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    ₹
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        disabled
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        type="number"
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Grid container spacing={2}>
                                                {" "}
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#138128",
                                                            borderColor: "#deffde",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#464141",
                                                            },
                                                        }}
                                                        label={"Payment Mode"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={6}
                                                    style={{
                                                        marginLeft: "-20px",
                                                    }}
                                                >
                                                    <Select
                                                        options={paymentModeOptions}
                                                        onChange={(option) => setFormData({ name: 'paymentMode', value: option.label })}
                                                        value={formData.paymentMode ? paymentModeOptions.filter(i => i.label === formData.paymentMode) : null}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        style={{
                                                            color: "#282828",
                                                            borderColor: "#a1a1a1",
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: false,
                                                            style: {
                                                                color: "#464141",
                                                            },
                                                        }}
                                                        label={"Reference Number"}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <TextField
                                                        name="paymentRefNo"
                                                        value={formData.paymentRefNo || ""}
                                                        onChange={handleFormChange}
                                                        style={{
                                                            borderColor: "#a1a1a1",
                                                            marginLeft: "-20px",
                                                        }}
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                    <Grid item lg={6}>
                                        <Stack direction='row' spacing={5}>
                                            <div>
                                                <Checkbox
                                                    type="checkbox"
                                                    checked={paymentType === "Full" ? true : false}
                                                    onClick={(e) => {
                                                        setFormData({ name: 'paymentType', value: "Full" });
                                                        setPaymentType("Full");
                                                        setFormData({ name: 'balancePayableHotel', value: formData.totalBookingAmount - formData.paidAmount })
                                                        setFormData({ name: 'partialPayment', value: "0" })
                                                    }}
                                                    // onClick={() => setPaymentType("Full")}
                                                    style={{
                                                        color: "#f46d25",
                                                        fontSize: "18px",
                                                    }}
                                                />
                                                <label style={{ fontSize: "18px" }}>Full Payment</label>
                                            </div>
                                            <div>
                                                <Checkbox
                                                    type="checkbox"
                                                    checked={paymentType === "Partial" ? true : false}
                                                    onClick={(e) => { setFormData({ name: 'paymentType', value: "Partial" }); setPaymentType("Partial") }}
                                                    // onClick={() => setPaymentType("Partial")}
                                                    style={{
                                                        color: "#f46d25",
                                                        fontSize: "15px",
                                                    }}
                                                />
                                                <label style={{ fontSize: "18px" }}>Partial Payment</label>
                                            </div>
                                        </Stack>
                                    </Grid>
                                    {paymentType === "Full" ? null : (
                                        <Grid container spacing={2}>
                                            <Grid item lg={3}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    style={{
                                                        marginLeft: "10px",
                                                        color: "#138128",
                                                        borderColor: "#deffde",
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: false,
                                                        style: {
                                                            color: "#f46d25",
                                                        },
                                                    }}
                                                    label={"Balance Payable"}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item lg={3}>
                                                <TextField
                                                    name="partialPayment"
                                                    value={formData.partialPayment || ""}
                                                    type="number"
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor: "#ffe2d7",
                                                        marginLeft: "-20px",
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                ₹
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    onChange={(e) => { handleFormChange(e); setFormData({ name: 'balancePayableHotel', value: formData.totalBookingAmount - (e.target.value * 1) - formData.paidAmount }) }}
                                                />
                                            </Grid>
                                        </Grid>
                                    )}

                                </Stack>
                            </AccordionDetails>
                            {/* Transaction Summary Ends  */}
                        </Accordion> <br /><br />
                        {/* Payment Details Ends  */}

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            {(validateForm(error) && validateAllFields()) ?
                                <Button onClick={() => setOpenPreview(true)} style={twnButtonStyles.orangeBtn}>Preview</Button> : <Button style={buttonDisabledStyle}>Preview</Button>
                            }
                            <Link to={{ pathname: "/agentBookings" }} style={twnButtonStyles.linkBlackBtn}>Cancel</Link>
                        </Stack><br />
                        <ClientForm
                            open={open}
                            onClose={() => { setOpen(false) }}
                            selectedId={selectedId}
                            BookingLocal={"yes"}
                        />
                    </MuiPickersUtilsProvider >

                    <Dialog
                        fullWidth={true}
                        maxWidth={'xl'}
                        sx={{ maxHeight: '100vh' }}
                        open={openPreview}
                        onClose={() => setOpenPreview(false)}
                        TransitionComponent={Transition}
                    >
                        <div>
                            <AgentBookingPreview data={{ ...formData, "bookingLeads": bookingLeads, "roomCategories": roomCategories, "bookingInclusions": bookingInclusions }} />
                        </div>
                        <div style={{ backgroundColor: '#eee' }}>
                            <Stack direction='row' spacing={2} justifyContent='center' style={{ margin: '1%' }}>
                                <Button style={twnButtonStyles.orangeBtn} onClick={onSubmitFun}>Submit</Button>
                                <Button style={twnButtonStyles.blackBtn} autoFocus color="inherit" onClick={() => setOpenPreview(false)}>
                                    Edit
                                </Button>
                            </Stack>
                        </div>
                    </Dialog>
                </div >}
        </>
    );
}

function CustomTextInlineField(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    name={props.name} fullWidth={props.fullWidth}
                    label={props.label} autoFocus value={props.value} variant="outlined"
                    size="small" style={{ backgroundColor: '#fff' }} onChange={props.onChange}
                    disabled={props.disabled}
                />
            </Grid>
            {props.error[props.name] && props.error[props.name].length > 0 &&
                <Grid item xs={12}><span style={{ color: "#ff0000" }}>{props.error[props.name]}</span></Grid>}
        </Grid>
    )
}

CustomTextInlineField.defaultProps = {
    fullWidth: true, disabled: false,
    error: {}
};
