/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
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
import { Formik, Field, Form } from "formik";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import axios from "axios";
import Select, { components } from "react-select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ClientForm from "../Clients/ClientForm";
import { makeStyles } from "@material-ui/core/styles";
import { differenceInDays, subDays } from "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
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
const initialValues = {
    status: "active",
    townoPending: 0,
};
const BoardBasic = [
    { value: "ep", label: "EP" },
    { value: "cp", label: "CP" },
    { value: "map", label: "MAP" },
    { value: "ap", label: "AP" },
];

const paymentMode = [
    { value: "cash", label: "Cash" },
    { value: "upi", label: "UPI" },
    { value: "BankTransfer", label: "Bank Transfer" },
    { value: "Instamojo", label: "Instamojo" },
    { value: "creditnote", label: "Credit Note" },
];
const BookingSource = [
    { value: "hotelWebsiteChat", label: "Hotel Website Chat" },
    { value: "justDial", label: "JustDial" },
    { value: "agentB2B", label: "B2B Agent" },
    { value: "agentB2c", label: "FIT" },
    { value: "socialMedia", label: "Social Media" },
    { value: "incomingCall", label: "Incoming Call" },
    { value: "holidayIq", label: "Holiday Iq" },
    { value: "tripoto", label: "Tripoto" },
];

let calenderRent = [];

export default function NewAgentBooking() {
    const classes = useStyles();
    const history = useHistory();
    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const dispatch = useDispatch();
    const clientLists = useSelector((state) => state.clientList.clientLists);
    let [full, setFull] = useState("active");
    // client details
    const [clientMobile, setClientMobile] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [clientName, setClientName] = useState("");
    //const [clientName1, setClientName1] = useState("");
    const [title, setTitle] = useState("");

    // vacinated check
    const [checked, setChecked] = useState(false);
    const [git, setGit] = useState(false);
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [selectedId] = useState(0);
    const [selectedData, setSelectedData] = useState("");

    // hotel details
    const [hotel, setHotel] = useState("");
    const [city, setCity] = useState("");
    const [hotelList, setHotelList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [hotelDetails, setHotelDetails] = useState({
        starRating: "",
        hotelContact: "",
        hotelAddress: "",
        hotelEmail: "",
        hotelId: "",
    });

    // Room Details
    let [roomDisplayNameList, setRoomDisplayNameList] = useState([]);
    const [propertyId, setPropertyId] = useState("");
    const [adultLimit, setAdultLimit] = useState([]);
    const [childLimit, setChildLimit] = useState([]);
    // Checkin and Checkout
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [night1, setNight] = useState(0);
    const [totalRoomRent, setTotalRoomRent] = useState(0);
    const [totalInclusionAmount, setTotalInclusionAmount] = useState(0);

    // Mulitlpe Inputs list
    let [roomInputs, setRoomInputs] = useState([
        {
            id: "",
            boardBasic: "",
            roomType: "",
            adult: 0,
            child: 0,
            rooms: 1,
            // perRoomRent: 0,
            perRoomRentNotChange: 0,
            totalNetRoomRentNotChange: 0,
            // totalNetRoomRent: 0,
            totalNetPrice:0,
            // totalGrossRoomRent: 0,
            sellingPrice:0,
            roomRent: 0,
            guestRent: 0,
            guestChildRent: 0,
            mealplan: "",
            cprate: 0,
            maprate: 0,
            aprate: 0,
            chcprate: 0,
            chmaprate: 0,
            chaprate: 0,
            adultsBase: 0,
            childBase: 0,
        },
    ]);
    const [personInput, setPersonInput] = useState([
        { name: "", mobile: "", altMobile: "", email: "" },
    ]);
    const [inclusionInput, setInclusionInput] = useState([
        { inclusion: "", amount: 0, vendorAmount: 0 },
    ]);
    //Payment Detials
    const [netValue, setNetValue] = useState(0);
    const [grossValue, setGrossValue] = useState(0);
    const [profitValue, setProfitValue] = useState(0);
    let [profitTax, setProfitTax] = useState(0);
    let [projectorAmount, setProjectorAmount] = useState(0);
    const [paymentType, setPaymentType] = useState("");
    let [paidAmount, setPaidAmount] = useState(0);
    const [hotelPendingAmount, setHotelPendingAmount] = useState(0);
    let [townoPending, settownoPending] = useState(0);
    const [referenceNumber, setReferenceNumber] = useState("");
    const [bookingSource, setBookingSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [formError, setFormError] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    useEffect(() => {
        let EndDate;
        let StartDate;
        if (checkin != "" && checkin != null) {
            StartDate = format(checkin, "yyyy-MM-dd");
        } console.log(StartDate);
        if (checkout != "" && checkin != null) {
            let subtractDate = subDays(checkout, 1);
            EndDate = format(subtractDate, "yyyy-MM-dd");
        } console.log(EndDate); console.log(formError);
        if (Object.keys(formError).length === 0 && isSubmit) {
            setOpenView(true);
            roomInputs.forEach((item) => {
                Api.get(
                    `getroomrent/${propertyId}/${item.roomType}/${StartDate}/${EndDate}`
                )
                    .then((res) => {
                        const Name = {
                            displayName: item.roomType,
                        }; console.log(res.data);
                        const MergeData = res.data.map((item) => ({ ...Name, ...item }));
                        calenderRent = [...calenderRent, ...MergeData];
                    });
            });
        }
    }, [formError]);

    const MobileGet = sessionStorage.getItem("mobile");
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    useEffect(() => {
        if (MobileGet !== null) {
            var found = clientLists.filter(function (item) {
                return item.mobile === MobileGet;
            });
            let MailData = found.map((item) => ({
                label: item.firstName + "" + item.lastName,
                value: item.firstName + "" + item.lastName,
            }));
            setClientName(MailData[0]);
            setClientEmail(found.map((item) => item.mail).toString());
            setClientMobile(found.map((item) => item.mobile).toString());
            setClientAddress(found.map((item) => item.address).toString());
            setTitle(found.map((item) => item.title).toString());
            if (!_.isEmpty(found)) {
                setChecked(found[0].vaccinationStatus);
            }
        }
    }, [MobileGet, clientLists]);

    useEffect(() => {
        AllHotel();
        AllCity();
        dispatch(clientListInitial(uniqueid));
    }, [uniqueid]);
    useEffect(() => {
        if (propertyId !== "" && checkout !== null && checkin !== null) {
            DisplayNameGet();
        }
    }, [propertyId, checkin, checkout]);

    // Hotel Name List get
    const AllHotel = async () => {
        await Api.get("propertyName").then((res) => {
            setHotelList(res.data);
        });
    };

    const AllCity = async () => {
        await Api.get("propertycityname/" + uniqueid).then((res) => {
            setCityList(res.data);
        });
    };
    // Room Dispaly Name List get
    const DisplayNameGet = async () => {
        setRoomDisplayNameList([]);
        await Api.get("getdisplayname/" + propertyId).then((res) => {
            setRoomDisplayNameList(res.data);
        });
    };

    // Client Handle Change
    const handleChangeClient = (option) => {
        setClientName(option);
        var found = clientLists.filter(function (item) {
            return item.id === option.id;
        });

        setClientEmail(found.map((item) => item.mail).toString());
        setClientMobile(found.map((item) => item.mobile).toString());
        setClientAddress(found.map((item) => item.address).toString());
        setTitle(found.map((item) => item.title).toString());
        if (!_.isEmpty(found)) {
            setChecked(found[0].vaccinationStatus);
        }
    };
    // Hotel Handle Change
    const handleChangeHotel = (data) => {
        setHotel(data.value);
        var found = hotelList.filter(function (item) {
            return item.displayName === data.value;
        });
        setRoomInputs([]);
        setPropertyId(found.map((item) => item.propertyId).toString());
        const hotelId = found.map((item) => item.propertyId).toString();
        Api.get(`propertydetails/${hotelId}`).then((res) => {
            setRoomInputs([
                {
                    id: "",
                    boardBasic: "",
                    roomType: "",
                    adult: 0,
                    child: 0,
                    rooms: 1,
                    // perRoomRent: 0,
                    perRoomRentNotChange: 0,
                    totalNetRoomRentNotChange: 0,
                    // totalNetRoomRent: 0,
                    totalNetPrice:0,
                    // totalGrossRoomRent: 0,
                    sellingPrice:0,
                    roomRent: 0,
                    guestRent: 0,
                    guestChildRent: 0,
                    mealplan: "",
                    cprate: 0,
                    maprate: 0,
                    aprate: 0,
                    chcprate: 0,
                    chmaprate: 0,
                    chaprate: 0,
                    adultsBase: 0,
                    childBase: 0,
                },
            ]);
            setHotelDetails({
                starRating: res.data.rating,
                hotelContact: res.data.mobile,
                hotelAddress: res.data.address,
                hotelEmail: res.data.email,
            });
        });
        setCheckin(null);
        setCheckout(null);
        setNight(0);
        setNetValue(0);
        setGrossValue(0);
        setProfitValue(0);
        setProfitTax(0);
        setProjectorAmount(0);
        setPaidAmount(0);
        settownoPending(0);
        setTotalInclusionAmount(0);
        setTotalRoomRent(0);
        setPersonInput([{ name: "", mobile: "", altMobile: "", email: "" }]);
        setInclusionInput([{ inclusion: "", amount: 0, vendorAmount: 0 }]);
    };
    const handleChangeCity = (option) => {
        setCity(option.value);
        let city = [];
        var found = cityList.filter(function (item) {
            return item === option.value;
        });
        found.map((ele) => city.push(ele));
        city = city.toString();
        Api.get(`propertycitynameidlist/${city}`).then((res) => {
            setHotelList(res.data);
        });
    };
    // Handle Night
    const handleNight = (e) => {
        setNight(e.target.value);
    };
    const date = new Date(checkin);
    date.setDate(date.getDate() + 1);

    const handleCheckin = (data) => {
        setRoomInputs([]);
        setCheckin(null);
        setCheckout(null);
        setRoomInputs([
            {
                id: "",
                boardBasic: "",
                roomType: "",
                adult: 0,
                child: 0,
                rooms: 1,
                // perRoomRent: 0,
                perRoomRentNotChange: 0,
                totalNetRoomRentNotChange: 0,
                // totalNetRoomRent: 0,
                totalNetPrice:0,
                // totalGrossRoomRent: 0,
                sellingPrice:0,
                roomRent: 0,
                guestRent: 0,
                guestChildRent: 0,
                mealplan: "",
                cprate: 0,
                maprate: 0,
                aprate: 0,
                chcprate: 0,
                chmaprate: 0,
                chaprate: 0,
                adultsBase: 0,
                childBase: 0,
            },
        ]);
        setCheckin(data);
    };
    const handleCheckout = (data) => {
        setRoomInputs([]);
        setCheckout(null);
        setRoomInputs([
            {
                id: "",
                boardBasic: "",
                roomType: "",
                adult: 0,
                child: 0,
                rooms: 1,
                // perRoomRent: 0,
                // totalNetRoomRent: 0,
                totalNetPrice:0,
                // totalGrossRoomRent: 0,
                sellingPrice:0,
                roomRent: 0,
                guestRent: 0,
                guestChildRent: 0,
                mealplan: "",
                cprate: 0,
                maprate: 0,
                aprate: 0,
                chcprate: 0,
                chmaprate: 0,
                chaprate: 0,
                adultsBase: 0,
                childBase: 0,
            },
        ]);
        setCheckout(data);
        let diffInDays = differenceInDays(new Date(data), new Date(checkin));
        setNight(diffInDays);
    };

    useEffect(async () => {
        await CalculateRent();
    }, [checkout, checkin]);

    const CalculateRent = async () => {
        const TotalNetAmount = roomInputs
            // .map((item) => parseFloat(item.totalNetRoomRent))
            .map((item) => parseFloat(item.totalNetPrice))
            .reduce((a, b) => a + b, 0);
        const TotalGrossAmount = roomInputs
            // .map((item) => parseFloat(item.totalGrossRoomRent))
            .map((item) => parseFloat(item.sellingPrice))
            .reduce((a, b) => a + b, 0);
        const TotalInclusionAmount = inclusionInput
            .map((item) => parseFloat(item.amount))
            .reduce((a, b) => a + b, 0);
        const TotalInclusionAmountVendor = inclusionInput
            .map((item) => parseFloat(item.vendorAmount))
            .reduce((a, b) => a + b, 0);

        setNetValue(TotalNetAmount + TotalInclusionAmountVendor);
        setGrossValue(TotalGrossAmount + TotalInclusionAmount);
        setTotalRoomRent(TotalGrossAmount);
        setTotalInclusionAmount(TotalInclusionAmount);
        const GrossProCal = TotalGrossAmount + TotalInclusionAmount;
        const NetProCal = TotalNetAmount + TotalInclusionAmountVendor;
        setProfitValue(GrossProCal - NetProCal);
    };
    // Handle Room Inputs
    const handleRoomChange = (option, index, name) => {
        const value = option.value;
        const list = [...roomInputs];
        list[index][name] = value;
        let StartDate;
        let EndDate;
        if (_.isDate(checkin)) {
            StartDate = format(checkin, "yyyy-MM-dd");
        }
        if (_.isDate(checkout)) {
            const subtractDate = subDays(checkout, 1);
            EndDate = format(subtractDate, "yyyy-MM-dd");
        }
        if (_.isEqual(name, "roomType")) {
            const list = [...roomInputs];
            Api.get(
                `getroomrent/${propertyId}/${value}/${StartDate}/${EndDate}`
            )
                .then((res) => {
                    const Name = {
                        displayName: list.roomType,
                    };
                    const MergeData = res.data.map((item) => ({ ...Name, ...item }));
                    calenderRent = [...calenderRent, ...MergeData];
                    if (!_.isEmpty(res.data)) {
                        setAdultLimit([...adultLimit, ...res.data[0]["adultsMax"]]);
                        setChildLimit([...childLimit, ...res.data[0]["childMax"]]);
                    }
                    let mealplan = res.data[0]["mealplan"];
                    if (mealplan == "cprate") {
                        mealplan = "cp";
                    } else if (mealplan == "maprate") {
                        mealplan = "map";
                    } else if (mealplan == "aprate") {
                        mealplan = "ap";
                    } else {
                        mealplan = "ep";
                    }
                    list[index]["boardBasic"] = mealplan;
                    list[index]["mealplan"] = mealplan;
                    list[index]["roomType"] = value;
                    list[index]["adult"] = parseInt(res.data[0]["adultsBase"]);
                    list[index]["child"] = parseInt(res.data[0]["childBase"]);
                    list[index]["rooms"] = 1;
                    list[index]["perRoomRentNotChange"] = res.data[0]["roomRent"];
                    // list[index]["perRoomRent"] = res.data[0]["roomRent"];
                    // list[index]["totalGrossRoomRent"] = res.data[0];
                    list[index]["sellingPrice"]=res.data[0];
                    let roomRent = res.data
                        .map((item) => parseFloat(item.roomRent))
                        .reduce((a, b) => a + b, 0);
                    // list[index]["totalNetRoomRent"] = roomRent;
                    list[index]["totalNetPrice"]=roomRent;
                    list[index]["totalNetRoomRentNotChange"] = roomRent;
                    list[index]["roomRent"] = res.data[0]["roomRent"];
                    list[index]["guestRent"] = res.data[0]["guestRent"];
                    list[index]["guestChildRent"] = res.data[0]["guestChildRent"];
                    list[index]["cprate"] = res.data[0]["cprate"];
                    list[index]["maprate"] = res.data[0]["maprate"];
                    list[index]["aprate"] = res.data[0]["aprate"];
                    list[index]["chcprate"] = res.data[0]["chcprate"];
                    list[index]["chmaprate"] = res.data[0]["chmaprate"];
                    list[index]["chaprate"] = res.data[0]["chaprate"];
                    list[index]["adultsBase"] = res.data[0]["adultsBase"];
                    list[index]["childBase"] = res.data[0]["childBase"];
                    setRoomInputs(list);
                    CalculateRent();
                });
        }
    };
    const handleRoomAmountOtherChange = (option, index, name) => {
        const value = option.value;
        const list = [...roomInputs];
        list[index][name] = value;
        setRoomInputs(list);
        CalculateMealpanRent(index);
    };

    const CalculateMealpanRent = async (index) => {
        const list = [...roomInputs];

        // let mealplan=list[index]["mealplan"];
        // let roomRent=list[index]["roomRent"];
        let guestRent = list[index]["guestRent"];
        let guestChild = list[index]["guestChildRent"];
        let cprate = list[index]["cprate"];
        let maprate = list[index]["maprate"];
        let aprate = list[index]["aprate"];
        let chcprate = list[index]["chcprate"];
        let chmaprate = list[index]["chmaprate"];
        let chaprate = list[index]["chaprate"];
        let adultsBase = list[index]["adultsBase"];
        let childBase = list[index]["childBase"];
        let boardBasic = list[index]["boardBasic"];
        let adult = list[index]["adult"];
        let child = list[index]["child"];
        let rooms = list[index]["rooms"];

        let mealPlanRate = 0;
        let mealPlanRateChild = 0;
        if (boardBasic == "ep" || boardBasic == "cp") {
            mealPlanRate = adult * cprate;
            mealPlanRateChild = child * chcprate;
        }
        if (boardBasic == "map") {
            mealPlanRate = adult * maprate;
            mealPlanRateChild = child * chmaprate;
        }
        if (boardBasic == "ap") {
            mealPlanRate = adult * aprate;
            mealPlanRateChild = child * chaprate;
        }
        let mealAmount = mealPlanRate + mealPlanRateChild;
        let gadultAmount = 0;
        let gchildAmount = 0;
        if (parseInt(adultsBase) < parseInt(adult)) {
            gadultAmount = (parseInt(adult) - parseInt(adultsBase)) * guestRent;
        }
        if (parseInt(childBase) < parseInt(child)) {
            gchildAmount = (parseInt(child) - parseInt(childBase)) * guestChild;
        }
        let Finalamount =
            parseFloat(list[index]["totalNetRoomRentNotChange"]) +
            (gadultAmount + gchildAmount + mealAmount) * parseInt(night1);
        // list[index]["totalNetRoomRent"] = Finalamount * rooms;
        // list[index]["totalNetPrice"]=Finalamount*rooms;
        list[index]["totalNetPrice"]=sellingPrice*noOfNight;
        list[index]["perRoomRent"] =
            parseFloat(list[index]["perRoomRentNotChange"]) +
            gadultAmount +
            gchildAmount +
            mealAmount;
        // list[index]["totalGrossRoomRent"] = 0;
        list[index]["sellingPrice"]=0;
        setRoomInputs(list);
        CalculateRent();
    };
    const handleRoomRent = (e, index) => {
        const value = e.target.value;
        const list = [...roomInputs];
        list[index]["perRoomRent"] = value;
        setRoomInputs(list);
    };
    // const handleNetRoomRent = (e, index) => {
        const handleTotalNetPrice=(e,index)=>{
        const value = e.target.value;
        const list = [...roomInputs];
        // list[index]["totalNetRoomRent"] = value;
list[index]["totalNetPrice"]=value;
        setRoomInputs(list);
        CalculateRent();
    };
    // const handleGrossRoomRent = (e, index) => {
        const handleSellingPrice =(e,index)=>{
        const value = e.target.value;
        const list = [...roomInputs];
        // list[index]["totalGrossRoomRent"] = value;
        list[index]["sellingPrice"]=value;

        setRoomInputs(list);
        CalculateRent();
    };

    //room handle click event of the Remove button
    const handleRemoveClickRoom = (index) => {
        const list = [...roomInputs];
        list.splice(index, 1);
        setRoomInputs(list);
        roomInputs.splice(index, 1);
        CalculateRent();
    };

    //room handle click event of the Add button
    const handleAddClickRoom = () => {
        setRoomInputs([
            ...roomInputs,
            {
                id: "",
                boardBasic: "",
                roomType: "",
                adult: 0,
                child: 0,
                rooms: 1,
                // perRoomRent: 0,
                // totalNetRoomRent: 0,
                totalNetPrice:0,
                // totalGrossRoomRent: 0,
                sellingPrice:0,
                roomRent: 0,
                guestRent: 0,
                guestChildRent: 0,
                mealplan: "",
                cprate: 0,
                maprate: 0,
                aprate: 0,
                chcprate: 0,
                chmaprate: 0,
                chaprate: 0,
                adultsBase: 0,
                childBase: 0,
            },
        ]);
    };

    // room Person input change
    const handlePersonChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...personInput];
        list[index][name] = value;
        setPersonInput(list);
    };

    const handleRemoveClickPerson = (index) => {
        const list = [...personInput];
        list.splice(index, 1);
        setPersonInput(list);
    };

    const handleAddClickPerson = () => {
        setPersonInput([
            ...personInput,
            { id: "", name: "", mobile: "", altMobile: "", email: "" },
        ]);
    };

    // Inclusion
    const handleInclusionName = (e, index) => {
        const value = e.target.value;
        const list = [...inclusionInput];
        list[index]["inclusion"] = value;
        list[index]["amount"] = 0;
        list[index]["vendorAmount"] = 0;
        setInclusionInput(list);
    };

    const handleInclusionVendorAmount = (e, index) => {
        const value = e.target.value;
        const list = [...inclusionInput];
        list[index]["vendorAmount"] = value;
        setInclusionInput(list);
        CalculateRent();
    };

    const handleInclusionAmount = (e, index) => {
        const value = e.target.value;
        const list = [...inclusionInput];
        list[index]["amount"] = value;
        setInclusionInput(list);
        CalculateRent();
    };

    //room handle click event of the Remove button
    const handleRemoveClickInclusion = (index) => {
        const list = [...inclusionInput];
        list.splice(index, 1);
        setInclusionInput(list);
        inclusionInput.splice(index, 1);
        CalculateRent();
    };

    //room handle click event of the Add button
    const handleAddClickInclusion = () => {
        setInclusionInput([
            ...inclusionInput,
            { id: "", inclusion: "", amount: 0, vendorAmount: 0 },
        ]);
    };

    const handlePaid = (e) => {
        setPaidAmount(e.target.value);
        let pending = grossValue - e.target.value;
        setHotelPendingAmount(pending);
        CalculateTax();
    };

    const ChangeTownoPending = (e) => {
        settownoPending(e.target.value);
        const somevalue = grossValue - paidAmount;
        setHotelPendingAmount(somevalue - e.target.value);
        CalculateTax();
    };

    useEffect(async () => {
        await CalculateTax();
    }, [paidAmount, townoPending]);

    const CalculateTax = async () => {
        setProjectorAmount(parseFloat(paidAmount) + parseFloat(townoPending));
        setProfitTax(
            parseFloat(profitValue) -
            (parseFloat(paidAmount) + parseFloat(townoPending)) * 0.05
        );
        const somevalue = grossValue - paidAmount;
        setHotelPendingAmount(somevalue - townoPending);
    };
    const handleReference = (e) => {
        setReferenceNumber(e.target.value);
    };
    const handlePayment = (selectedOption) => {
        setPaymentType(selectedOption.value);
    };
    const handlebookingSoucre = (selectedOption) => {
        setBookingSource(selectedOption.value);
    };

    // Dialog Open close
    const OpenDialog = () => {
        setOpen(true);
    };
    const CloseDialog = () => {
        setOpen(false);
    };
    const CloseDialogView = () => {
        setOpenView(false);
        calenderRent = [];
    };

    // DropDown Bind Values Map
    const Clientoptions =
        clientLists &&
        clientLists.map((client) => {
            let first = client.firstName;
            let last = client.lastName;
            let mail = client.mail;
            let combine = `${first}\t${last}\t\t\t\t\t(${mail})`;
            let combine1 = `${first}\t${last}`;
            return { label: combine, value: combine1, id: client.id };
        });

    const Hoteloptions =
        hotelList &&
        hotelList.map((hotel) => {
            return { label: hotel.displayName, value: hotel.displayName };
        });
    const Cityoptions =
        cityList &&
        cityList.map((city) => {
            return { label: city, value: city };
        });
    const RoomDisplayName =
        roomDisplayNameList &&
        roomDisplayNameList.map((room) => {
            return { label: room.displayName, value: room.displayName };
        });

    const Validate = (values) => {
        const errors = {};
        if (!values.clientName) {
            errors.clientName = "Client Details Required";
        }
        if (!values.hotelName) {
            errors.hotelName = "Hotel Details Required";
        }
        if (!values.checkout) {
            errors.checkout = "Checkout Date Required";
        }
        if (!values.checkin) {
            errors.checkin = "Checkin Date Required";
        }
        if (!values.totalGrossPrice) {
            errors.totalGrossPrice = "Gross Amount Required";
        }
        if (!values.totalNetPrice) {
            errors.totalNetPrice = "Net Amount Required";
        }
        if (values.totalNetPrice) {
            if (!(values.totalGrossPrice >= values.totalNetPrice)) {
                errors.totalGrossPrice = "Gross Amount want Greater Than Net";
            }
        }
        if (_.isDate(checkin)) {
            if (moment(checkin).isBefore(checkout) == false) {
                errors.checkoutValid = "CheckOut Date Greater than CheckIn";
            }
        }
        if (values.paidAmount) {
            if (!(values.paidAmount <= values.totalGrossPrice)) {
                errors.paidAmount = "Amount Received less than Gross Amount";
            }
        }

        return errors;
    };

    const OpenDialogView = () => {
        let CheckIn;
        let CheckOut;
        if (checkin != "" && checkin != null) {
            CheckIn = format(checkin, "dd-MM-yyyy");
        }
        if (checkout != "" && checkin != null) {
            CheckOut = format(checkout, "dd-MM-yyyy");
        }

        const previewData = {
            clientName: !_.isEmpty(clientName)
                ? `${title}.\t ${clientName.value}`
                : null,
            clientMobile: clientMobile,
            clientEmail: clientEmail,
            cityName: city,
            hotelName: hotel,
            starRating: hotelDetails.starRating,
            hotelContact: hotelDetails.hotelContact,
            hotelAddress: hotelDetails.hotelAddress,
            hotelEmail: hotelDetails.hotelEmail,
            checkout: CheckOut,
            checkin: CheckIn,
            night: night1,
            profit: profitValue,
            projectorAmount: projectorAmount,
            profitTax: profitTax,
            referenceNumber: referenceNumber,
            noofRooms: roomInputs.length,
            totalNetPrice: netValue,
            totalGrossPrice: grossValue,
            paidAmount: paidAmount,
            paymentType: paymentType,
            totalAmount: netValue,
            bookingSource: bookingSource,
            townoPending: townoPending,
            hotelPending: hotelPendingAmount,
            pendingAmount: `${parseFloat(townoPending) + parseFloat(hotelPendingAmount)
                }`,
            vacinated: checked,
            personInput,
            roomInputs,
            inclusionInput,
            totalInclusionAmount: totalInclusionAmount,
            totalRoomRent: totalRoomRent,
        };
        setisSubmit(true);
        setFormError(Validate(previewData));
        setSelectedData(previewData);
    };
    const InclusionFind = { inclusion: "", amount: 0 };

    // Submit Data
    const WithoutMail = (e) => {
        e.preventDefault();
        // setLoading(true);
        const adultcalu = roomInputs.map((item) => item.adult);
        const adultno = adultcalu.reduce((a, b) => a + b, 0);
        const childcalu = roomInputs.map((item) => item.child);
        const childno = childcalu.reduce((a, b) => a + b, 0);
        const TotalInclusionAmountVendor = inclusionInput
            .map((item) => parseFloat(item.vendorAmount))
            .reduce((a, b) => a + b);

        // Date format change
        let CheckIn;
        let CheckOut;
        if (checkin != "" && checkin != null) {
            CheckIn = format(checkin, "yyyy-MM-dd");
        }
        if (checkout != "" && checkin != null) {
            CheckOut = format(checkout, "yyyy-MM-dd");
        }

        const Totalrooms = roomInputs
            .map((item) => parseInt(item.rooms))
            .reduce((a, b) => a + b);

        let submitData = {
            clientName: !_.isEmpty(clientName)
                ? `${title}.\t ${clientName.value}`
                : null,
            clientMobile: clientMobile,
            clientEmail: clientEmail,
            clientAddress: clientAddress,
            cityName: city,
            hotelName: hotel,
            starRating: hotelDetails.starRating,
            hotelContact: hotelDetails.hotelContact,
            hotelAddress: hotelDetails.hotelAddress,
            hotelEmail: hotelDetails.hotelEmail,
            checkout: CheckOut,
            checkin: CheckIn,
            night: night1,
            noOfAdults: adultno,
            noOfChildren: childno,
            noofRooms: Totalrooms,
            totalNetPrice: netValue,
            totalGrossPrice: grossValue,
            totalInclusionAmount: totalInclusionAmount,
            totalRoomRentAmount: totalRoomRent,
            paidAmount: paidAmount,
            paymentType: paymentType,
            townoPending: townoPending,
            hotelPending: hotelPendingAmount,
            pendingAmount: `${parseFloat(townoPending) + parseFloat(hotelPendingAmount)
                }`,
            totalAmount: grossValue,
            createdBy: createdBy,
            uniqueId: uniqueid,
            propertyId: propertyId,
            bookingSource: bookingSource,
            vacinated: checked,
            createAt: "newone",
            profit: profitValue,
            projectorAmount: projectorAmount,
            profitTax: profitTax,
            totalInclusionVendorAmount: TotalInclusionAmountVendor,
        };
        Api.post("bookingdetails", submitData).then((res) => {
            if (res.data.bookingId) {
                setLoading(true);
            }
            if (
                res.data.bookingId !== "" &&
                res.data.bookingId !== null &&
                res.data.bookingId !== undefined
            ) {
                const bookingData = {
                    bookingId: res.data.bookingId,
                    createdBy: createdBy,
                    uniqueId: uniqueid,
                    propertyId: propertyId,
                    createAt: "newone",
                };
                const Dates = {
                    checkOut: CheckOut,
                    checkIn: CheckIn,
                };
                const payment = {
                    paymentType: paymentType,
                    referenceNumber: referenceNumber,
                    amount: paidAmount,
                    bookingId: res.data.bookingId,
                    townoPending: townoPending,
                    hotelPending: hotelPendingAmount,
                    pendingAmount: `${parseFloat(townoPending) + parseFloat(hotelPendingAmount)
                        }`,
                    createdBy: createdBy,
                    uniqueId: uniqueid,
                    propertyId: propertyId,
                    createAt: "newone",
                };

                // Room Lead data
                const person = personInput.map((item) => ({ ...bookingData, ...item }));
                Api.post("roomlead", person);
                // Room Occupied data
                const room = roomInputs.map((item) => ({
                    ...bookingData,
                    ...item,
                    ...Dates,
                }));
                Api.post("roomoccupied", room);
                const rent = calenderRent.map((item) => ({
                    ...bookingData,
                    ...item,
                }));
                Api.post(
                    `bookingroomdetail/${uniqueid}/${res.data.bookingId}`,
                    rent
                );
                // Room Inclusion Data
                const inclusions = inclusionInput.map((item) => ({
                    ...bookingData,
                    ...item,
                }));

                let checkingInclu = inclusionInput.some((item) =>
                    _.isEqual(item, InclusionFind)
                );
                if (checkingInclu == false) {
                    Api.post("bookinginclusion", inclusions);
                }
                // Room payemnt Data
                Api.post("roompayment", payment);
                toast.success("Booking Successfull");
                history.push(`/bookinglist`);
                sessionStorage.removeItem("email");
            }
        });
    };

    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <>
                    {width <= 768 ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Formik enableReinitialize initialValues={initialValues}>
                                <Form autoComplete="off">
                                    <Grid container spacing={2}>
                                        <Grid item lg={12}>
                                            <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>New Booking</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            sm={12}
                                            style={{
                                                marginRight: "15px",
                                                backgroundColor: "#f46d25",
                                                borderRadius: "8px",
                                                color: "#fff",
                                            }}
                                        >
                                            <p className={classes.titles}>Basic Information</p>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Grid
                                                container
                                                item
                                                sm={12}
                                                className={classes.insidepaper}
                                                spacing={2}
                                            >
                                                <Grid item sm={12}>
                                                    <p className={classes.title}>Client Details</p>
                                                </Grid>
                                                <Grid item sm={11}>
                                                    {clientLists && (
                                                        <Select
                                                            placeholder="Select Client *"
                                                            isSearchable
                                                            defaultValue={clientName}
                                                            options={Clientoptions}
                                                            onChange={handleChangeClient}
                                                            value={clientName}
                                                            components={{
                                                                ValueContainer: CustomValueContainer,
                                                            }}
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
                                                                    fontSize: "12px",
                                                                }),
                                                                control: (base, state) => ({
                                                                    ...base,
                                                                    "&:hover": { borderColor: "#f46d25" },
                                                                    borderColor: "#f46d25",
                                                                    boxShadow: "none",
                                                                }),
                                                            }}
                                                        />
                                                    )}
                                                    <p className="errors">{formError.clientName}</p>
                                                </Grid>
                                                <Grid item sm={1}>
                                                    <AddCircleOutlineIcon
                                                        onClick={OpenDialog}
                                                        className={classes.plus}
                                                    />
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <MuiPhoneNumber
                                                        name="clientMobile"
                                                        value={clientMobile || ""}
                                                        onChange={(value) => setClientMobile(value)}
                                                        variant="outlined"
                                                        label="Client Phone"
                                                        size="small"
                                                        fullWidth
                                                        autoComplete="off"
                                                        defaultCountry={"in"}
                                                    />
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="clientEmail"
                                                        value={clientEmail || ""}
                                                        onChange={(e) => setClientEmail(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                        label="Client Email"
                                                        fullWidth
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Select
                                                        placeholder="Destination City"
                                                        isSearchable
                                                        value={Cityoptions.label}
                                                        options={Cityoptions}
                                                        onChange={handleChangeCity}
                                                        components={{
                                                            ValueContainer: CustomValueContainer,
                                                        }}
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
                                                                    state.hasValue || state.selectProps.inputValue
                                                                        ? -4
                                                                        : "50%",
                                                                background: "#fff",
                                                                padding: "0px 5px",
                                                                transition: "top 0.1s, font-size 0.1s",
                                                                fontSize: "12px",
                                                            }),
                                                            control: (base, state) => ({
                                                                ...base,
                                                                "&:hover": { borderColor: "#f46d25" },
                                                                borderColor: "#f46d25",
                                                                boxShadow: "none",
                                                            }),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <MaterialSelect
                                                        placeholder="Booking Source"
                                                        isSearchable
                                                        options={BookingSource}
                                                        onChange={handlebookingSoucre}
                                                    />
                                                </Grid>
                                                <Grid item lg={3} className={classes.formCheck}>
                                                    <div className={classes.formCheck}>
                                                        <Checkbox
                                                            name="checked"
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() => setChecked(!checked)}
                                                            color="primary"
                                                        />
                                                        <label>Vaccinated</label>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={3} className={classes.formCheck}>
                                                    <div className={classes.formCheck}>
                                                        <Checkbox
                                                            name="git"
                                                            type="checkbox"
                                                            defaultChecked={git}
                                                            onChange={() => setGit(!git)}
                                                            color="primary"
                                                        />
                                                        <label>GIT</label>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Grid
                                                container
                                                item
                                                md={12}
                                                className={classes.insidepaper}
                                                spacing={2}
                                            >
                                                <Grid item sm={12}>
                                                    <p className={classes.title}>Hotel Details</p>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    {hotelList && (
                                                        <MaterialSelect
                                                            placeholder="Select Hotel *"
                                                            isSearchable
                                                            value={Hoteloptions.label}
                                                            options={Hoteloptions}
                                                            onChange={handleChangeHotel}
                                                        />
                                                    )}
                                                    <p className="errors">{formError.hotelName}</p>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="starRating"
                                                        value={hotelDetails.starRating || ""}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        autoComplete="off"
                                                        label="Star Category"
                                                    />
                                                </Grid>

                                                <Grid item sm={12}>
                                                    <TextField
                                                        name="hotelContact"
                                                        value={hotelDetails.hotelContact || ""}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        autoComplete="off"
                                                        label="Hotel Phone"
                                                    />
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <TextField
                                                        name="hotelEmail"
                                                        value={hotelDetails.hotelEmail || ""}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        autoComplete="off"
                                                        label="Hotel Email"
                                                    />
                                                </Grid>

                                                <Grid item sm={12}>
                                                    <TextField
                                                        name="hotelAddress"
                                                        value={hotelDetails.hotelAddress || ""}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        autoComplete="off"
                                                        label="Hotel Address"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>{" "}
                                        <Grid item lg={12}>
                                            <Grid
                                                container
                                                item
                                                md={12}
                                                className={classes.insidepaper}
                                                spacing={2}
                                            >
                                                <Grid item sm={12}>
                                                    {personInput.map((x, i) => (
                                                        <Grid container spacing={2} key={i}>
                                                            <Grid item sm={6}>
                                                                {i == 0 && (
                                                                    <p className={classes.title}>Lead Pax</p>
                                                                )}
                                                            </Grid>
                                                            <Grid item sm={6} style={{ textAlign: "end" }}>
                                                                {personInput.length !== 1 && (
                                                                    <DeleteIcon
                                                                        onClick={() => handleRemoveClickPerson(i)}
                                                                        className={classes.plus}
                                                                    />
                                                                )}
                                                                {personInput.length - 1 === i && (
                                                                    <AddCircleOutlineIcon
                                                                        onClick={handleAddClickPerson}
                                                                        size="small"
                                                                        className={classes.plus}
                                                                    />
                                                                )}
                                                            </Grid>
                                                            <div
                                                                style={{
                                                                    width: "2%",
                                                                    textAlign: "center",
                                                                    marginTop: "5px",
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </div>
                                                            <div style={{ width: "98%" }}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item lg={3}>
                                                                        <TextField
                                                                            name="name"
                                                                            label="Name"
                                                                            value={x.name}
                                                                            onChange={(e) => handlePersonChange(e, i)}
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item lg={3}>
                                                                        <TextField
                                                                            name="mobile"
                                                                            label="Mobile No"
                                                                            value={x.mobile}
                                                                            onChange={(e) => handlePersonChange(e, i)}
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            type="number"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item lg={3}>
                                                                        <TextField
                                                                            name="altMobile"
                                                                            label="Alt Mobile"
                                                                            value={x.altMobile}
                                                                            onChange={(e) => handlePersonChange(e, i)}
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                            type="number"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item lg={3}>
                                                                        <TextField
                                                                            name="email"
                                                                            label="Email"
                                                                            value={x.email}
                                                                            onChange={(e) => handlePersonChange(e, i)}
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            sm={12}
                                            style={{
                                                marginTop: "25px",
                                                marginRight: "15px",
                                                backgroundColor: "#f46d25",
                                                borderRadius: "8px",
                                                color: "#fff",
                                            }}
                                        >
                                            <p className={classes.titles}>Booking Information</p>
                                        </Grid>{" "}
                                        <Grid item lg={12}>
                                            <Grid
                                                container
                                                spacing={2}
                                                style={{
                                                    marginRight: "15px",
                                                }}
                                            >
                                                <Grid item lg={12}>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className={classes.insidepaper}
                                                    >
                                                        <Grid item md={6} sm={6} lg={4}>
                                                            <div style={{ position: "relative" }}>
                                                                <DatePicker
                                                                    required
                                                                    label="Check-In"
                                                                    inputVariant="outlined"
                                                                    fullWidth
                                                                    size="small"
                                                                    value={checkin}
                                                                    onChange={handleCheckin}
                                                                    animateYearScrolling
                                                                    format="dd/MM/yyyy"
                                                                    variant="inline"
                                                                    disablePast="true"
                                                                    autoOk="true"
                                                                />
                                                                <DateRangeIcon className={classes.icon} />
                                                            </div>
                                                            <p className="errors">{formError.checkin}</p>
                                                        </Grid>
                                                        <Grid item sm={6} md={6} lg={4}>
                                                            <div style={{ position: "relative" }}>
                                                                <DatePicker
                                                                    required
                                                                    label="Check-Out"
                                                                    value={checkout}
                                                                    inputVariant="outlined"
                                                                    size="small"
                                                                    fullWidth
                                                                    onChange={handleCheckout}
                                                                    format="dd/MM/yyyy"
                                                                    animateYearScrolling
                                                                    variant="inline"
                                                                    minDate={new Date(date)}
                                                                    disablePast="true"
                                                                    autoOk="true"
                                                                />
                                                                <DateRangeIcon className={classes.icon} />
                                                            </div>
                                                            <p className="errors">{formError.checkout}</p>
                                                            <p className="errors">
                                                                {formError.checkoutValid}
                                                            </p>
                                                        </Grid>
                                                        <Grid item sm={12} lg={4}>
                                                            <TextField
                                                                name="night1"
                                                                type="number"
                                                                value={night1}
                                                                disabled
                                                                label="Number of Nights (N)"
                                                                onChange={handleNight}
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                autoComplete="off"
                                                                style={{ borderRadius: '5px', color: '#f46d25' }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className={classes.insidepaper}
                                                    >
                                                        <Grid item sm={12}>
                                                            {roomInputs.map((x, i) => (
                                                                <Grid container spacing={2} key={i}>
                                                                    <Grid item sm={6}>
                                                                        {i == 0 && (
                                                                            <p className={classes.title}>
                                                                                Room Details
                                                                            </p>
                                                                        )}
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        sm={6}
                                                                        style={{ textAlign: "end" }}
                                                                    >
                                                                        {roomInputs.length !== 1 && (
                                                                            <DeleteIcon
                                                                                onClick={() => handleRemoveClickRoom(i)}
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                        {roomInputs.length - 1 === i && (
                                                                            <AddCircleOutlineIcon
                                                                                onClick={handleAddClickRoom}
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                    </Grid>
                                                                    <div
                                                                        style={{
                                                                            width: "2%",
                                                                            textAlign: "center",
                                                                            marginTop: "5px",
                                                                        }}
                                                                    >
                                                                        {i + 1}
                                                                    </div>
                                                                    <div style={{ width: "98%" }}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item sm={3}>
                                                                                {roomDisplayNameList && (
                                                                                    <MaterialSelect
                                                                                        name="roomType"
                                                                                        placeholder="Room Type"
                                                                                        isSearchable
                                                                                        value={x.roomType}
                                                                                        options={RoomDisplayName}
                                                                                        onChange={(option) =>
                                                                                            handleRoomChange(
                                                                                                option,
                                                                                                i,
                                                                                                "roomType"
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </Grid>
                                                                            <Grid item sm={3}>
                                                                                <MaterialSelect
                                                                                    name="boardBasic"
                                                                                    placeholder="Meal Plan"
                                                                                    value={x.boardBasic}
                                                                                    onChange={(option) =>
                                                                                        handleRoomAmountOtherChange(
                                                                                            option,
                                                                                            i,
                                                                                            "boardBasic"
                                                                                        )
                                                                                    }
                                                                                    options={BoardBasic}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item sm={3}>
                                                                                <TextField
                                                                                    name="adult"
                                                                                    // type="number"
                                                                                    value={x.adult}
                                                                                    label="No of Adults"
                                                                                    // onChange={handleNight}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    autoComplete="off"
                                                                                    style={{ borderRadius: '5px', color: '#f46d25' }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item sm={3}>
                                                                                <TextField
                                                                                    name="child"
                                                                                    // type="number"
                                                                                    value={x.child}
                                                                                    label="No of Children"
                                                                                    // onChange={handleNight}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    autoComplete="off"
                                                                                    style={{ borderRadius: '5px', color: '#f46d25' }}
                                                                                />
                                                                            </Grid>
                                                                            {git ? (
                                                                                <Grid item sm={3}>
                                                                                    <MaterialSelect
                                                                                        name="rooms"
                                                                                        placeholder="No of Rooms"
                                                                                        value={x.rooms}
                                                                                        onChange={(option) =>
                                                                                            handleRoomAmountOtherChange(
                                                                                                option,
                                                                                                i,
                                                                                                "rooms"
                                                                                            )
                                                                                        }
                                                                                        options={[...Array(10).keys()].map(
                                                                                            (x) => ({
                                                                                                label: x + 1,
                                                                                                value: x + 1,
                                                                                            })
                                                                                        )}
                                                                                    />
                                                                                </Grid>
                                                                            ) : null}
                                                                            <Grid item sm={3}>
                                                                                <TextField
                                                                                    name="sellingPrice"
                                                                                    label="Selling Price"
                                                                                    type="number"
                                                                                    // value={x.totalGrossRoomRent}
                                                                                    value={x.sellingPrice}
                                                                                    onChange={(e) =>
                                                                                        // handleGrossRoomRent(e, i)
                                                                                        handleSellingPrice(e,i)
                                                                                    }
                                                                                    variant="outlined"
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

                                                                            {/* <Grid item sm={3}>
                                                                                <TextField
                                                                                    name="perRoomRent"
                                                                                    label="Net to Hotel per Night(P)"
                                                                                    value={x.perRoomRent}
                                                                                    onChange={(e) => handleRoomRent(e, i)}
                                                                                    variant="outlined"
                                                                                    InputProps={{
                                                                                        startAdornment: (
                                                                                            <InputAdornment position="start">
                                                                                                ₹
                                                                                            </InputAdornment>
                                                                                        ),
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                        style: {
                                                                                            color: "#fff",
                                                                                            background: "#282828",
                                                                                            borderRadius: "4px",
                                                                                            padding: "2px 4px",
                                                                                        },
                                                                                    }}
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Grid> */}
                                                                            <Grid item sm={3}>
                                                                                <TextField
                                                                                    name="totalNetPrice"
                                                                                    label="Total Selling Price"
                                                                                    type="number"
                                                                                    // value={x.totalNetRoomRent}
                                                                                    value={x.totalNetPrice}
                                                                                    onChange={(e) =>
                                                                                        // handleNetRoomRent(e, i)
                                                                                        handleTotalNetPrice(e,i)
                                                                                    }
                                                                                    InputProps={{
                                                                                        startAdornment: (
                                                                                            <InputAdornment position="start">
                                                                                                ₹
                                                                                            </InputAdornment>
                                                                                        ),
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    autoComplete="off"
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                        style: {
                                                                                            color: "#fff",
                                                                                            background: "#282828",
                                                                                            borderRadius: "4px",
                                                                                            padding: "2px 4px",
                                                                                        },
                                                                                    }}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className={classes.insidepaper}
                                                    >
                                                        <Grid item lg={12}>
                                                            {inclusionInput.map((x, i) => (
                                                                <Grid container spacing={2} key={i}>
                                                                    <Grid item sm={6}>
                                                                        {i == 0 && (
                                                                            <p className={classes.title}>Inclusion</p>
                                                                        )}
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        sm={6}
                                                                        style={{ textAlign: "end" }}
                                                                    >
                                                                        {inclusionInput.length !== 1 && (
                                                                            <DeleteIcon
                                                                                onClick={() =>
                                                                                    handleRemoveClickInclusion(i)
                                                                                }
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                        {inclusionInput.length - 1 === i && (
                                                                            <AddCircleOutlineIcon
                                                                                onClick={handleAddClickInclusion}
                                                                                size="small"
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                    </Grid>
                                                                    <div
                                                                        style={{
                                                                            width: "2%",
                                                                            textAlign: "center",
                                                                            marginTop: "5px",
                                                                        }}
                                                                    >
                                                                        {i + 1}
                                                                    </div>
                                                                    <div style={{ width: "98%" }}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item lg={6}>
                                                                                <TextField
                                                                                    name="inclusion"
                                                                                    label="Inclusion Name"
                                                                                    value={x.inclusion}
                                                                                    onChange={(e) =>
                                                                                        handleInclusionName(e, i)
                                                                                    }
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Grid>{" "}
                                                                            <Grid item lg={6}>
                                                                                <TextField
                                                                                    name="amount"
                                                                                    label="Inclusion Selling Price"
                                                                                    value={x.amount}
                                                                                    onChange={(e) =>
                                                                                        handleInclusionAmount(e, i)
                                                                                    }
                                                                                    InputProps={{
                                                                                        startAdornment: (
                                                                                            <InputAdornment position="start">
                                                                                                ₹
                                                                                            </InputAdornment>
                                                                                        ),
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    type="number"
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
                                                                                />
                                                                            </Grid>
                                                                            {/* <Grid item lg={4}>
                                                                                <TextField
                                                                                    name="vendorAmount"
                                                                                    label="Net to Vendor(V)"
                                                                                    value={x.vendorAmount}
                                                                                    onChange={(e) =>
                                                                                        handleInclusionVendorAmount(e, i)
                                                                                    }
                                                                                    variant="outlined"
                                                                                    InputProps={{
                                                                                        startAdornment: (
                                                                                            <InputAdornment position="start">
                                                                                                ₹
                                                                                            </InputAdornment>
                                                                                        ),
                                                                                    }}
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    type="number"
                                                                                    autoComplete="off"
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                        style: {
                                                                                            color: "#fff",
                                                                                            background: "#000",
                                                                                            borderRadius: "4px",
                                                                                            padding: "2px 4px",
                                                                                        },
                                                                                    }}
                                                                                />
                                                                            </Grid> */}
                                                                        </Grid>
                                                                    </div>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            sm={12}
                                            style={{
                                                marginTop: "25px",
                                                marginRight: "15px",
                                                backgroundColor: "#f46d25",
                                                borderRadius: "8px",
                                                color: "#fff",
                                            }}
                                        >
                                            <p className={classes.titles}>Payment Details</p>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Grid container spacing={2}>
                                                <Grid item lg={12}>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className={classes.insidepaper}
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        <Grid item sm={12}>
                                                            <p className={classes.title}>Payment Breakup</p>
                                                        </Grid>
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
                                                                        name="totalRoomRent"
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
                                                                        value={totalRoomRent || ""}
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
                                                                        value={totalInclusionAmount || ""}
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
                                                                        name="grossValue"
                                                                        value={grossValue || ""}
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
                                                                    <p className="errors">
                                                                        {formError.totalGrossPrice}
                                                                    </p>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
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
                                                                        name="netValue"
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
                                                                        value={netValue || ""}
                                                                        autoComplete="off"
                                                                        disabled
                                                                    />
                                                                    <p className="errors">
                                                                        {formError.totalNetPrice}
                                                                    </p>
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
                                                                        value={profitValue || ""}
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
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className={classes.insidepaper}
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        <Grid item sm={12}>
                                                            <p className={classes.title}>
                                                                Transaction Summary
                                                            </p>
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
                                                                        value={paidAmount || ""}
                                                                        onChange={handlePaid}
                                                                        autoComplete="off"
                                                                        type="number"
                                                                    />
                                                                    <p className="errors">{formError.paidAmount}</p>
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
                                                                        name="hotelPendingAmount"
                                                                        value={hotelPendingAmount}
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
                                                                    <MaterialSelects
                                                                        options={paymentMode}
                                                                        onChange={handlePayment}
                                                                        value={paymentType}
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
                                                                        name="referenceNumber"
                                                                        value={referenceNumber || ""}
                                                                        onChange={handleReference}
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
                                                        <Grid item lg={6}>
                                                            <div style={{ marginLeft: "20px" }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Field
                                                                            as={Radio}
                                                                            type="radio"
                                                                            name="status"
                                                                            color="primary"
                                                                            value="active"
                                                                            onClick={() => setFull("active") || settownoPending(0)}
                                                                            style={{
                                                                                color: "#f46d25",
                                                                                fontSize: "18px",
                                                                            }}
                                                                            checkedIcon={<CheckBoxIcon />}
                                                                            icon={<CheckBoxOutlineBlankIcon />}
                                                                        />
                                                                    }
                                                                    label={
                                                                        <span style={{ fontSize: "18px" }}>
                                                                            Full Payment
                                                                        </span>
                                                                    }
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Field
                                                                            as={Radio}
                                                                            type="radio"
                                                                            name="status"
                                                                            color="primary"
                                                                            value="inactive"
                                                                            onClick={() => setFull("inactive")}
                                                                            style={{
                                                                                color: "#f46d25",
                                                                                fontSize: "18px",
                                                                            }}
                                                                            checkedIcon={<CheckBoxIcon />}
                                                                            icon={<CheckBoxOutlineBlankIcon />}
                                                                        />
                                                                    }
                                                                    label={
                                                                        <span style={{ fontSize: "18px" }}>
                                                                            Partial Payment
                                                                        </span>
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                        {full == "active" ? null : (
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
                                                                        label={"Balance payable to Towno"}
                                                                        disabled
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={3}>
                                                                    <TextField
                                                                        name="townoPending"
                                                                        value={townoPending || ""}
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
                                                                        onChange={ChangeTownoPending}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                {/* <Grid item lg={12}>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className={classes.insidepaper}
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        <Grid item sm={12}>
                                                            <p className={classes.title}>Booking P&L</p>
                                                        </Grid>
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
                                                                                color: "#f46d25",
                                                                            },
                                                                        }}
                                                                        label={"Towno Gross Amount (Projected)"}
                                                                        disabled
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField
                                                                        name="townoGrossAmount"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        size="small"
                                                                        style={{
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
                                                                        value={projectorAmount || ""}
                                                                        disabled
                                                                        autoComplete="off"
                                                                        type="number"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
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
                                                                                color: "#138128",
                                                                            },
                                                                        }}
                                                                        label={"Profit After Tax"}
                                                                        disabled
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField
                                                                        name="profitTax"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        style={{
                                                                            backgroundColor: "#deffde",
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
                                                                        value={profitTax || ""}
                                                                        disabled
                                                                        autoComplete="off"
                                                                        type="number"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid> */}
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            sm={12}
                                            style={{ textAlign: "center", marginTop: "25px" }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={OpenDialogView}
                                            >
                                                Preview
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            </Formik>
                        </>
                    )}
                    <ClientForm
                        open={open}
                        onClose={CloseDialog}
                        selectedId={selectedId}
                        BookingLocal={"yes"}
                    />
                    {openView ? (
                        <AgentBookingPreview
                            open={openView}
                            onClose={CloseDialogView}
                            selectme={selectedData}
                            WithoutMail={WithoutMail}
                            loading={loading}
                        />
                    ) : null}
                </>
            </MuiPickersUtilsProvider>
        </div>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        // padding: "100px 0px",
        // margin: "0px 30px",
        padding: '1% 0.5% 1% 1.5%',
        "@media (max-width: 767px)": {
            margin: "0px 10px",
        },
    },
    paper: {
        padding: "30px 40px",
        marginLeft: "20px",
        marginRight: "20px",

        "@media (max-width: 767px)": {
            padding: "10px",
        },
    },
    insidepaper: {
        boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
        borderRadius: "4px",
        marginTop: "2px",
        background: "#eaeaea",
        padding: "10px",
        width: "100%",
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
    plusmobile: {
        cursor: "pointer",
        color: "#f46d25",
        top: "7px",
        position: "relative",
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
    titles: {
        marginLeft: "15px",
        fontWeight: "bold",
        fontSize: "23px",
        color: "#fff",
        margin: "0px",
    },
}));
