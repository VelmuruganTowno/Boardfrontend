/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Checkbox } from "@material-ui/core";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import axios from "axios";
import Select, { components } from "react-select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TravelAgentForm from "../TravelAgent/TravelAgentForm";
import { makeStyles } from "@material-ui/core/styles";
import { differenceInDays, subDays } from "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import BookingPreview from "./BookingPreview";
import { useDispatch, useSelector } from "react-redux";
import { agentListInitial } from "../../redux/actions/agentAction";
import _ from "lodash";
import MaterialSelect from "../../components/Select/MaterialSelect";
import MuiPhoneNumber from "material-ui-phone-number";
import moment from "moment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

export default function Booking() {
  const classes = useStyles();
  const history = useHistory();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const agentLists = useSelector((state) => state.agentList.agentLists);
  // agent details
  const [agentMobile, setAgentMobile] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [agentName, setAgentName] = useState("");
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
  const [hotelList, setHotelList] = useState([]);
  const [hotelDetails, setHotelDetails] = useState({
    starRating: "",
    hotelContact: "",
    hotelAddress: "",
    hotelEmail: "",
    hotelId: "",
  });

  // Room Details
  const [roomDisplayNameList, setRoomDisplayNameList] = useState([]);
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
  const [roomInputs, setRoomInputs] = useState([
    {
      id: "",
      boardBasic: "",
      roomType: "",
      adult: 0,
      child: 0,
      rooms: 1,
      perRoomRent: 0,
      totalNetRoomRent: 0,
      totalGrossRoomRent: 0,
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
  const [paymentType, setPaymentType] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [hotelPendingAmount, setHotelPendingAmount] = useState(0);
  const [townoPending, settownoPending] = useState(0);
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
    }
    if (checkout != "" && checkin != null) {
      let subtractDate = subDays(checkout, 1);
      EndDate = format(subtractDate, "yyyy-MM-dd");
    }
    if (Object.keys(formError).length === 0 && isSubmit) {
      setOpenView(true);
      roomInputs.forEach((item) => {
        Api.get(
            `getroomrent/${propertyId}/${item.roomType}/${StartDate}/${EndDate}`
          )
          .then((res) => {
            const Name = {
              displayName: item.roomType,
            };
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
      var found = agentLists.filter(function (item) {
        return item.mobile === MobileGet;
      });
      let MailData = found.map((item) => ({
        label: item.firstName + "" + item.lastName,
        value: item.firstName + "" + item.lastName,
      }));
      setAgentName(MailData[0]);
      setAgentEmail(found.map((item) => item.mail).toString());
      setAgentMobile(found.map((item) => item.mobile).toString());
      setAgentAddress(found.map((item) => item.address).toString());
      setTitle(found.map((item) => item.title).toString());
      if (!_.isEmpty(found)) {
        setChecked(found[0].vaccinationStatus);
      }
    }
  }, [MobileGet, agentLists]);

  useEffect(() => {
    AllHotel();
    dispatch(agentListInitial(uniqueid));
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
  // Room Dispaly Name List get
  const DisplayNameGet = async () => {
    await Api.get( "getdisplayname/" + propertyId).then((res) => {
      setRoomDisplayNameList(res.data);
    });
  };

  // Agent Handle Change
  const handleChangeAgent = (option) => {
    setAgentName(option);
    var found = agentLists.filter(function (item) {
      return item.firstName === option.value;
    });

    setAgentEmail(found.map((item) => item.mail).toString());
    setAgentMobile(found.map((item) => item.mobile).toString());
    setAgentAddress(found.map((item) => item.address).toString());
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
          perRoomRent: 0,
          totalNetRoomRent: 0,
          totalGrossRoomRent: 0,
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
    setPaidAmount(0);
    setTotalInclusionAmount(0);
    setTotalRoomRent(0);
    setPersonInput([{ name: "", mobile: "", altMobile: "", email: "" }]);
    setInclusionInput([{ inclusion: "", amount: 0, vendorAmount: 0 }]);
  };
  // Handle Night
  const handleNight = (e) => {
    setNight(e.target.value);
  };

  const handleCheckin = (data) => {
    setCheckin(data);
    Main();
  };
  const handleCheckout = (data) => {
    setCheckout(data);
    let diffInDays = differenceInDays(new Date(data), new Date(checkin));
    setNight(diffInDays);
    Main();
  };

  useEffect(async () => {
    await Main();
  }, [checkout, checkin]);

  const Main = async () => {
    let StartDate;
    let EndDate;
    if (checkin != null) {
      StartDate = format(checkin, "yyyy-MM-dd");
    }
    if (checkout != null) {
      let subtractDate = await subDays(checkout, 1);
      EndDate = format(subtractDate, "yyyy-MM-dd");
    }
    roomInputs.forEach((element, index) => {
      if (
        element.roomType != "" &&
        element.roomType != null &&
        element.boardBasic != "" &&
        element.boardBasic != null &&
        element.adult != "" &&
        element.adult != null
      ) {
        Api.get(
            `getroomrent/${propertyId}/${element.roomType}/${StartDate}/${EndDate}`
          )
          .then((res) => {
            let amount1 = 0;
            let roomRent = res.data
              .map((item) => parseInt(item.roomRent))
              .reduce((a, b) => a + b, 0);
            let roomRentCheckin = res.data[0]["roomRent"];
            amount1 += roomRent;
            let guestRent = res.data
              .map((item) => parseInt(item.guestRent))
              .reduce((a, b) => a + b, 0);
            let guestChild = res.data
              .map((item) => parseInt(item.guestChildRent))
              .reduce((a, b) => a + b, 0);
            let cprate = res.data
              .map((item) => parseInt(item.cprate))
              .reduce((a, b) => a + b, 0);
            let maprate = res.data
              .map((item) => parseInt(item.maprate))
              .reduce((a, b) => a + b, 0);
            let aprate = res.data
              .map((item) => parseInt(item.aprate))
              .reduce((a, b) => a + b, 0);
            let chcprate = res.data
              .map((item) => parseInt(item.chcprate))
              .reduce((a, b) => a + b, 0);
            let chmaprate = res.data
              .map((item) => parseInt(item.chmaprate))
              .reduce((a, b) => a + b, 0);
            let chaprate = res.data
              .map((item) => parseInt(item.chaprate))
              .reduce((a, b) => a + b, 0);
            let childBase = parseInt(res.data[0]["childBase"]);
            let adultsBase = parseInt(res.data[0]["adultsBase"]);
            let mealPlanAmount = 0;
            let childmealPlanAmount = 0;
            let mealPlanRate = 0;
            let mealPlanRateChild = 0;
            if (element.boardBasic != "ep") {
              if (element.boardBasic == "cp") {
                mealPlanAmount += cprate;
                childmealPlanAmount += chcprate;
                mealPlanRate = element.adult * mealPlanAmount;
                mealPlanRateChild = element.child * childmealPlanAmount;
              }
              if (element.boardBasic == "map") {
                mealPlanAmount += maprate;
                childmealPlanAmount += chmaprate;
                mealPlanRate = element.adult * mealPlanAmount;
                mealPlanRateChild = element.child * childmealPlanAmount;
              }
              if (element.boardBasic == "ap") {
                mealPlanAmount += aprate;
                childmealPlanAmount += chaprate;
                mealPlanRate = element.adult * mealPlanAmount;
                mealPlanRateChild = element.child * childmealPlanAmount;
              }
            }
            let mealAmount = mealPlanRate + mealPlanRateChild;
            let gadultAmount = 0;
            let gchildAmount = 0;
            if (parseInt(adultsBase) < parseInt(element.adult)) {
              gadultAmount +=
                (parseInt(element.adult) - parseInt(adultsBase)) * guestRent;
            }
            if (parseInt(childBase) < parseInt(element.child)) {
              gchildAmount +=
                (parseInt(element.child) - parseInt(childBase)) * guestChild;
            }
            let Finalamount =
              amount1 + gadultAmount + gchildAmount + mealAmount;
            const list = [...roomInputs];
            list[index]["totalNetRoomRent"] = Finalamount * element.rooms;
            list[index]["perRoomRent"] = roomRentCheckin;
            setRoomInputs(list);
            const TotalNetAmount = roomInputs
              .map((item) => item.totalNetRoomRent)
              .reduce((a, b) => a + b, 0);
            const TotalGrossAmount = roomInputs
              .map((item) => parseInt(item.totalGrossRoomRent))
              .reduce((a, b) => a + b, 0);
            const TotalInclusionAmount = inclusionInput
              .map((item) => parseInt(item.amount))
              .reduce((a, b) => a + b, 0);
            const TotalInclusionAmountVendor = inclusionInput
              .map((item) => parseInt(item.vendorAmount))
              .reduce((a, b) => a + b, 0);
            setNetValue(TotalNetAmount + TotalInclusionAmountVendor);
            setGrossValue(TotalGrossAmount + TotalInclusionAmount);
            setTotalRoomRent(TotalGrossAmount);
            setTotalInclusionAmount(TotalInclusionAmount);
            const GrossProCal = TotalGrossAmount + TotalInclusionAmount;
            const NetProCal = TotalNetAmount + TotalInclusionAmountVendor;
            setProfitValue(GrossProCal - NetProCal);
          });
      }
    });
  };

  // Handle Room Inputs
  const handleRoomChange = (option, index, name) => {
    const value = option.value;
    const list = [...roomInputs];
    list[index][name] = value;
    setRoomInputs(list);
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
      list[index]["totalGrossRoomRent"] = 0;
      list[index]["adult"] = 2;
      Api.get(
          `getroomrent/${propertyId}/${value}/${StartDate}/${EndDate}`
        )
        .then((res) => {
          if (!_.isEmpty(res.data)) {
            setAdultLimit([...adultLimit, ...res.data[0]["adultsMax"]]);
            setChildLimit([...childLimit, ...res.data[0]["childMax"]]);
          }
        });
    }
    Main();
  };

  const handleRoomRent = (e, index) => {
    const value = e.target.value;
    const list = [...roomInputs];
    list[index]["perRoomRent"] = value;
    setRoomInputs(list);
  };
  const handleNetRoomRent = (e, index) => {
    const value = e.target.value;
    const list = [...roomInputs];
    list[index]["totalNetRoomRent"] = value;
    setRoomInputs(list);

    const TotalNetAmount = roomInputs
      .map((item) => parseInt(item.totalNetRoomRent))
      .reduce((a, b) => a + b, 0);

    const TotalInclusionAmountVendor = inclusionInput
      .map((item) => parseInt(item.vendorAmount))
      .reduce((a, b) => a + b, 0);
    const TotalGrossAmount = roomInputs
      .map((item) => parseInt(item.totalGrossRoomRent))
      .reduce((a, b) => a + b, 0);
    setNetValue(TotalNetAmount + TotalInclusionAmountVendor);
    const TotalCal = TotalNetAmount + TotalInclusionAmountVendor;
    setProfitValue(TotalGrossAmount - TotalCal);
  };
  const handleGrossRoomRent = (e, index) => {
    const value = e.target.value;
    const list = [...roomInputs];
    list[index]["totalGrossRoomRent"] = value;
    setRoomInputs(list);
    const TotalGrossAmount = roomInputs
      .map((item) => parseInt(item.totalGrossRoomRent))
      .reduce((a, b) => a + b, 0);
    const TotalInclusionAmount = inclusionInput
      .map((item) => parseInt(item.amount))
      .reduce((a, b) => a + b, 0);
    setGrossValue(TotalGrossAmount + TotalInclusionAmount);
    setHotelPendingAmount(TotalGrossAmount + TotalInclusionAmount);
    const TotalNetAmount = roomInputs
      .map((item) => parseInt(item.totalNetRoomRent))
      .reduce((a, b) => a + b, 0);
    setProfitValue(TotalGrossAmount - TotalNetAmount);
    setTotalRoomRent(TotalGrossAmount);
  };
  //room handle click event of the Remove button
  const handleRemoveClickRoom = (index) => {
    const list = [...roomInputs];
    list.splice(index, 1);
    setRoomInputs(list);
    Main();
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
        perRoomRent: 0,
        totalNetRoomRent: 0,
        totalGrossRoomRent: 0,
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
    setInclusionInput(list);
  };

  const handleInclusionVendorAmount = (e, index) => {
    const value = e.target.value;
    const list = [...inclusionInput];
    list[index]["vendorAmount"] = value;
    setInclusionInput(list);
    const TotalNetAmount = roomInputs
      .map((item) => parseInt(item.totalNetRoomRent))
      .reduce((a, b) => a + b, 0);
    const TotalGrossAmount = roomInputs
      .map((item) => parseInt(item.totalGrossRoomRent))
      .reduce((a, b) => a + b, 0);

    const TotalInclusionAmountVendor = inclusionInput
      .map((item) => parseInt(item.vendorAmount))
      .reduce((a, b) => a + b);
    const totalCal = TotalNetAmount + TotalInclusionAmountVendor;
    setNetValue(totalCal);
    setProfitValue(TotalGrossAmount - totalCal);
    Main();
  };

  const handleInclusionAmount = (e, index) => {
    const value = e.target.value;
    const list = [...inclusionInput];
    list[index]["amount"] = value;
    setInclusionInput(list);
    const TotalInclusionAmount = inclusionInput
      .map((item) => parseInt(item.amount))
      .reduce((a, b) => a + b);
    const TotalGrossAmount = roomInputs
      .map((item) => parseInt(item.totalGrossRoomRent))
      .reduce((a, b) => a + b, 0);
    setTotalInclusionAmount(TotalInclusionAmount);
    setGrossValue(TotalGrossAmount + TotalInclusionAmount);
    setHotelPendingAmount(TotalGrossAmount + TotalInclusionAmount);
    Main();
  };

  //room handle click event of the Remove button
  const handleRemoveClickInclusion = (index) => {
    const list = [...inclusionInput];
    list.splice(index, 1);
    setInclusionInput(list);
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
  };

  const ChangetownoBending = (e) => {
    settownoPending(e.target.value);
    const somevalue = grossValue - paidAmount;
    setHotelPendingAmount(somevalue - e.target.value);
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

  const Agentoptions =
    agentLists &&
    agentLists.map((agent) => {
      let first = agent.firstName;
      let last = agent.lastName;
      let combine = `${first}\t${last}`;
      return { label: combine, value: agent.firstName };
    });

  const Hoteloptions =
    hotelList &&
    hotelList.map((hotel) => {
      return { label: hotel.displayName, value: hotel.displayName };
    });
  const RoomDisplayName =
    roomDisplayNameList &&
    roomDisplayNameList.map((room) => {
      return { label: room.displayName, value: room.displayName };
    });

  const Validate = (values) => {
    const errors = {};
    if (!values.agentName) {
      errors.agentName = "Agent Details Required";
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
      agentName: !_.isEmpty(agentName)
        ? `${title}.\t ${agentName.label}`
        : null,
      agentMobile: agentMobile,
      agentEmail: agentEmail,
      agentAddress: agentAddress,
      hotelName: hotel,
      starRating: hotelDetails.starRating,
      hotelContact: hotelDetails.hotelContact,
      hotelAddress: hotelDetails.hotelAddress,
      hotelEmail: hotelDetails.hotelEmail,
      checkout: CheckOut,
      checkin: CheckIn,
      night: night1,
      noofRooms: roomInputs.length,
      totalNetPrice: netValue,
      totalGrossPrice: grossValue,
      paidAmount: paidAmount,
      paymentType: paymentType,
      totalAmount: netValue,
      bookingSource: bookingSource,
      townoPending: townoPending,
      hotelPending: hotelPendingAmount,
      pendingAmount: `${parseInt(townoPending) + parseInt(hotelPendingAmount)}`,
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
      .map((item) => parseInt(item.vendorAmount))
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

    let submitData = {
      agentName: !_.isEmpty(agentName)
        ? `${title}.\t ${agentName.label}`
        : null,
      agentMobile: agentMobile,
      agentEmail: agentEmail,
      agentAddress: agentAddress,
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
      noofRooms: roomInputs.length,
      totalNetPrice: netValue,
      totalGrossPrice: grossValue,
      totalInclusionAmount: totalInclusionAmount,
      totalRoomRentAmount: totalRoomRent,
      paidAmount: paidAmount,
      paymentType: paymentType,
      townoPending: townoPending,
      hotelPending: hotelPendingAmount,
      pendingAmount: `${parseInt(townoPending) + parseInt(hotelPendingAmount)}`,
      totalAmount: grossValue,
      createdBy: createdBy,
      uniqueId: uniqueid,
      propertyId: propertyId,
      bookingSource: bookingSource,
      vacinated: checked,
      createAt: "newone",
      profit: profitValue,
      totalInclusionVendorAmount: TotalInclusionAmountVendor,
    };
    Api.post("bookingdetails", submitData).then((res) => {
      if (res.data.bookingId) {
        setLoading(false);
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
          pendingAmount: `${
            parseInt(townoPending) + parseInt(hotelPendingAmount)
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
              <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                  style={{
                    background: "#343A40",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <Typography className={classes.heading}>
                    Agent Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ background: "#EEF1F3", paddingTop: "25px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11}>
                      {agentLists && (
                        <Select
                          placeholder="Select Agent"
                          isSearchable
                          defaultValue={agentName}
                          options={Agentoptions}
                          onChange={handleChangeAgent}
                          value={agentName}
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={{
                            container: (provided) => ({
                              ...provided,
                            }),
                            menu: (provided) => ({ ...provided, zIndex: 9999 }),
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
                      )}
                      <p className="errors">{formError.agentName}</p>
                    </Grid>
                    <Grid item xs={1}>
                      <AddCircleOutlineIcon
                        onClick={OpenDialog}
                        className={classes.plusmobile}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MuiPhoneNumber
                        name="agentMobile"
                        value={agentMobile || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                        defaultCountry={"in"}
                        onChange={(e) => setAgentMobile(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="agentEmail"
                        value={agentEmail || ""}
                        onChange={(e) => setAgentEmail(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="agentAddress"
                        value={agentAddress || ""}
                        onChange={(e) => setAgentAddress(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MaterialSelect
                        placeholder="Booking Source"
                        isSearchable
                        options={BookingSource}
                        onChange={handlebookingSoucre}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.formCheck}>
                      <div className={classes.formCheck}>
                        <Checkbox
                          name="checked"
                          type="checkbox"
                          defaultChecked={checked}
                          onChange={() => setChecked(!checked)}
                          color="primary"
                        />
                        <label>Vaccinated</label>
                      </div>
                    </Grid>
                    <Grid item lg={6} className={classes.formCheck}>
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
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                  style={{
                    background: "#343A40",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <Typography className={classes.heading}>
                    Hotel Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ background: "#EEF1F3", paddingTop: "25px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                      <TextField
                        name="starRating"
                        value={hotelDetails.starRating || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        name="hotelContact"
                        value={hotelDetails.hotelContact || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="hotelEmail"
                        value={hotelDetails.hotelEmail || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="hotelAddress"
                        value={hotelDetails.hotelAddress || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                  style={{
                    background: "#343A40",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <Typography className={classes.heading}>
                    Booking Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ background: "#EEF1F3", paddingTop: "25px" }}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={6}>
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
                      <Grid item sm={6} xs={6}>
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
                            minDate={new Date(checkin)}
                            disablePast="true"
                            autoOk="true"
                          />
                          <DateRangeIcon className={classes.icon} />
                        </div>
                        <p className="errors">{formError.checkout}</p>
                        <p className="errors">{formError.checkoutValid}</p>
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <TextField
                          name="night1"
                          type="number"
                          value={night1}
                          label="No of Nights"
                          onChange={handleNight}
                          variant="outlined"
                          fullWidth
                          size="small"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        {roomInputs.map((x, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item sm={6} xs={6}>
                              {i == 0 && (
                                <p style={{ margin: "0px" }}>
                                  <b>Room Details</b>
                                </p>
                              )}
                            </Grid>
                            <Grid
                              item
                              sm={6}
                              xs={6}
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
                                width: "5%",
                                textAlign: "center",
                                marginTop: "5px",
                              }}
                            >
                              {i + 1}
                            </div>
                            <div style={{ width: "95%" }}>
                              <Grid container spacing={2}>
                                <Grid item sm={6} xs={6}>
                                  {roomDisplayNameList && (
                                    <MaterialSelect
                                      name="roomType"
                                      placeholder="Room Type"
                                      isSearchable
                                      value={x.roomType}
                                      options={RoomDisplayName}
                                      onChange={(option) =>
                                        handleRoomChange(option, i, "roomType")
                                      }
                                    />
                                  )}
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                  <MaterialSelect
                                    name="boardBasic"
                                    placeholder="Meal Plan"
                                    value={BoardBasic.value}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "boardBasic")
                                    }
                                    options={BoardBasic}
                                  />
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                  <MaterialSelect
                                    name="adult"
                                    placeholder="No of Adults"
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "adult")
                                    }
                                    options={
                                      adultLimit[i] !== undefined
                                        ? [
                                            ...Array(
                                              parseInt(adultLimit[i])
                                            ).keys(),
                                          ].map((x) => ({
                                            label: x + 1,
                                            value: x + 1,
                                          }))
                                        : [...Array(0).keys()].map((x) => ({
                                            label: x,
                                            value: x,
                                          }))
                                    }
                                  />
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                  <MaterialSelect
                                    name="child"
                                    placeholder="No of Children"
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "child")
                                    }
                                    options={
                                      childLimit[i] !== undefined
                                        ? [
                                            ...Array(
                                              parseInt(childLimit[i]) + 1
                                            ).keys(),
                                          ].map((x, index) => ({
                                            label: x,
                                            value: x,
                                          }))
                                        : [...Array(0).keys()].map((x) => ({
                                            label: x,
                                            value: x,
                                          }))
                                    }
                                  />
                                </Grid>
                                {git ? (
                                  <Grid item sm={6} xs={6}>
                                    <MaterialSelect
                                      name="rooms"
                                      placeholder="No of Rooms"
                                      onChange={(option) =>
                                        handleRoomChange(option, i, "rooms")
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

                                <Grid item sm={6} xs={6}>
                                  <TextField
                                    name="perRoomRent"
                                    label="Room Rent PerNight"
                                    value={x.perRoomRent}
                                    onChange={(e) => handleRoomRent(e, i)}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                  />
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                  <TextField
                                    name="totalNetRoomRent"
                                    label="Net Room Rent"
                                    type="number"
                                    value={x.totalNetRoomRent}
                                    onChange={(e) => handleNetRoomRent(e, i)}
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
                                <Grid item sm={6} xs={6}>
                                  <TextField
                                    name="totalGrossRoomRent"
                                    label="Gross Room Rent"
                                    type="number"
                                    value={x.totalGrossRoomRent}
                                    onChange={(e) => handleGrossRoomRent(e, i)}
                                    variant="outlined"
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
                              </Grid>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        {personInput.map((x, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item sm={6} xs={6}>
                              {i == 0 && (
                                <p style={{ margin: "0px" }}>
                                  <b>Lead Pax</b>
                                </p>
                              )}
                            </Grid>
                            <Grid
                              item
                              sm={6}
                              xs={6}
                              style={{ textAlign: "end" }}
                            >
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
                                width: "5%",
                                textAlign: "center",
                                marginTop: "5px",
                              }}
                            >
                              {i + 1}
                            </div>
                            <div style={{ width: "95%" }}>
                              <Grid container spacing={2}>
                                <Grid item sm={6} xs={6}>
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
                                <Grid item sm={6} xs={6}>
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
                                <Grid item sm={6} xs={6}>
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
                                <Grid item sm={6} xs={6}>
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
                      <Grid item sm={12} xs={12}>
                        {inclusionInput.map((x, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item sm={6} xs={6}>
                              {i == 0 && (
                                <p style={{ margin: "0px" }}>
                                  <b>Inclusion</b>
                                </p>
                              )}
                            </Grid>
                            <Grid
                              item
                              sm={6}
                              xs={6}
                              style={{ textAlign: "end" }}
                            >
                              {inclusionInput.length !== 1 && (
                                <DeleteIcon
                                  onClick={() => handleRemoveClickInclusion(i)}
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
                                width: "5%",
                                textAlign: "center",
                                marginTop: "5px",
                              }}
                            >
                              {i + 1}
                            </div>
                            <div style={{ width: "95%" }}>
                              <Grid container spacing={2}>
                                <Grid item sm={6} xs={6}>
                                  <TextField
                                    name="inclusion"
                                    label="Inclusion"
                                    value={x.inclusion}
                                    onChange={(e) => handleInclusionName(e, i)}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                  />
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                  <TextField
                                    name="amount"
                                    label="Inclusion Amount"
                                    value={x.amount}
                                    onChange={(e) =>
                                      handleInclusionAmount(e, i)
                                    }
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
                                <Grid item sm={12} xs={12}>
                                  <TextField
                                    name="vendorAmount"
                                    label="Vendor Amount"
                                    value={x.vendorAmount}
                                    onChange={(e) =>
                                      handleInclusionVendorAmount(e, i)
                                    }
                                    variant="outlined"
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
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                  style={{
                    background: "#343A40",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <Typography className={classes.heading}>
                    Payment Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ background: "#EEF1F3", paddingTop: "25px" }}
                >
                  <Grid item sm={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} xs={12}>
                        <TextField
                          name="totalRoomRent"
                          label="Total Room Rent"
                          variant="outlined"
                          fullWidth
                          size="small"
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
                      <Grid item sm={12} xs={12}>
                        <TextField
                          name="totalInclusionAmount"
                          value={totalInclusionAmount || ""}
                          label="Total Inclusion Amount"
                          variant="outlined"
                          fullWidth
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
                      </Grid>
                      <Grid item sm={6} xs={6}>
                        <TextField
                          name="grossValue"
                          value={grossValue || ""}
                          label="Gross"
                          variant="outlined"
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
                          disabled
                        />
                        <p className="errors">{formError.totalGrossPrice}</p>
                      </Grid>
                      <Grid item sm={6} xs={6}>
                        <TextField
                          name="netValue"
                          label="Net"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={netValue || ""}
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
                          disabled
                        />
                        <p className="errors">{formError.totalNetPrice}</p>
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <TextField
                          name="profitValue"
                          value={profitValue || ""}
                          label="Profit"
                          variant="outlined"
                          fullWidth
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
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderRadius: "6px", marginBottom: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                  style={{
                    background: "#343A40",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <Typography className={classes.heading}>
                    Amount Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ background: "#EEF1F3", paddingTop: "25px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={6}>
                      <MaterialSelect
                        placeholder="Payment Mode"
                        options={paymentMode}
                        onChange={handlePayment}
                        value={paymentType}
                      />
                    </Grid>
                    <Grid item sm={6} xs={6}>
                      <TextField
                        name="paidAmount"
                        label="Amount Received"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={paidAmount || ""}
                        onChange={handlePaid}
                        autoComplete="off"
                        type="number"
                      />
                      <p className="errors">{formError.paidAmount}</p>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <TextField
                        name="referenceNumber"
                        value={referenceNumber || ""}
                        label="Reference Number"
                        onChange={handleReference}
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <TextField
                        name="townoPending"
                        value={townoPending || ""}
                        type="number"
                        label="Balance payable to Towno (if any)"
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        onChange={ChangetownoBending}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <TextField
                        name="hotelPendingAmount"
                        value={hotelPendingAmount}
                        label="Customer to pay to hotel"
                        disabled
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={OpenDialogView}
                >
                  Next
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item lg={12}>
                    <h2 style={{ color: "#F46D25", margin: "0px" }}>
                      New Booking{" "}
                    </h2>
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
                        <p className={classes.title}>Agent Details</p>
                      </Grid>
                      <Grid item sm={11}>
                        {agentLists && (
                          <Select
                            placeholder="Select Agent *"
                            isSearchable
                            defaultValue={agentName}
                            options={Agentoptions}
                            onChange={handleChangeAgent}
                            value={agentName}
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
                        )}
                        <p className="errors">{formError.agentName}</p>
                      </Grid>
                      <Grid item sm={1}>
                        <AddCircleOutlineIcon
                          onClick={OpenDialog}
                          className={classes.plus}
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <MuiPhoneNumber
                          name="agentMobile"
                          value={agentMobile || ""}
                          onChange={(value) => setAgentMobile(value)}
                          variant="outlined"
                          label="Agent Phone"
                          size="small"
                          fullWidth
                          autoComplete="off"
                          defaultCountry={"in"}
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          name="agentEmail"
                          value={agentEmail || ""}
                          onChange={(e) => setAgentEmail(e.target.value)}
                          variant="outlined"
                          size="small"
                          label="Agent Email"
                          fullWidth
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <TextField
                          name="agentAddress"
                          value={agentAddress || ""}
                          onChange={(e) => setAgentAddress(e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="City"
                          autoComplete="off"
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
                  </Grid>
                  <Grid item sm={12}>
                    <p className={classes.title}>Booking Information</p>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid container spacing={2} className={classes.insidepaper}>
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
                            minDate={new Date(checkin)}
                            disablePast="true"
                            autoOk="true"
                          />
                          <DateRangeIcon className={classes.icon} />
                        </div>
                        <p className="errors">{formError.checkout}</p>
                        <p className="errors">{formError.checkoutValid}</p>
                      </Grid>
                      <Grid item sm={12} lg={4}>
                        <TextField
                          name="night1"
                          type="number"
                          value={night1}
                          label="Number of Nights (N)"
                          onChange={handleNight}
                          variant="outlined"
                          fullWidth
                          size="small"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item sm={12}>
                        {roomInputs.map((x, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item sm={6}>
                              {i == 0 && (
                                <p style={{ margin: "0px" }}>
                                  <b>Room Details</b>
                                </p>
                              )}
                            </Grid>
                            <Grid item sm={6} style={{ textAlign: "end" }}>
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
                                        handleRoomChange(option, i, "roomType")
                                      }
                                    />
                                  )}
                                </Grid>
                                <Grid item sm={3}>
                                  <MaterialSelect
                                    name="boardBasic"
                                    placeholder="Meal Plan"
                                    value={BoardBasic.value}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "boardBasic")
                                    }
                                    options={BoardBasic}
                                  />
                                </Grid>
                                <Grid item sm={3}>
                                  <MaterialSelect
                                    name="adult"
                                    placeholder="No of Adults"
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "adult")
                                    }
                                    value={x.adult}
                                    options={
                                      adultLimit[i] !== undefined
                                        ? [
                                            ...Array(
                                              parseInt(adultLimit[i])
                                            ).keys(),
                                          ].map((x) => ({
                                            label: x + 1,
                                            value: x + 1,
                                          }))
                                        : [...Array(0).keys()].map((x) => ({
                                            label: x,
                                            value: x,
                                          }))
                                    }
                                  />
                                </Grid>
                                <Grid item sm={3}>
                                  <MaterialSelect
                                    name="child"
                                    placeholder="No of Children"
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "child")
                                    }
                                    options={
                                      childLimit[i] !== undefined
                                        ? [
                                            ...Array(
                                              parseInt(childLimit[i]) + 1
                                            ).keys(),
                                          ].map((x, index) => ({
                                            label: x,
                                            value: x,
                                          }))
                                        : [...Array(0).keys()].map((x) => ({
                                            label: x,
                                            value: x,
                                          }))
                                    }
                                  />
                                </Grid>
                                {git ? (
                                  <Grid item sm={3}>
                                    <MaterialSelect
                                      name="rooms"
                                      placeholder="No of Rooms"
                                      onChange={(option) =>
                                        handleRoomChange(option, i, "rooms")
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
                                    name="perRoomRent"
                                    label="Hotel Sell Price Per Night (P)"
                                    value={x.perRoomRent}
                                    onChange={(e) => handleRoomRent(e, i)}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                  />
                                </Grid>
                                <Grid item sm={3}>
                                  <TextField
                                    name="totalNetRoomRent"
                                    label="Hotel Gross Price (H = N*P)"
                                    type="number"
                                    value={x.totalNetRoomRent}
                                    onChange={(e) => handleNetRoomRent(e, i)}
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
                                <Grid item sm={3}>
                                  <TextField
                                    name="totalGrossRoomRent"
                                    label="Room Rent for Customers"
                                    type="number"
                                    value={x.totalGrossRoomRent}
                                    onChange={(e) => handleGrossRoomRent(e, i)}
                                    variant="outlined"
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
                              </Grid>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item sm={12}>
                        {personInput.map((x, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item sm={6}>
                              {i == 0 && (
                                <p style={{ margin: "0px" }}>
                                  <b>Lead Pax</b>
                                </p>
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
                      <Grid item lg={12}>
                        {inclusionInput.map((x, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item sm={6}>
                              {i == 0 && (
                                <p style={{ margin: "0px" }}>
                                  <b>Inclusion</b>
                                </p>
                              )}
                            </Grid>
                            <Grid item sm={6} style={{ textAlign: "end" }}>
                              {inclusionInput.length !== 1 && (
                                <DeleteIcon
                                  onClick={() => handleRemoveClickInclusion(i)}
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
                                <Grid item lg={4}>
                                  <TextField
                                    name="inclusion"
                                    label="Inclusion"
                                    value={x.inclusion}
                                    onChange={(e) => handleInclusionName(e, i)}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                  />
                                </Grid>
                                <Grid item lg={4}>
                                  <TextField
                                    name="amount"
                                    label="Inclusion Amount"
                                    value={x.amount}
                                    onChange={(e) =>
                                      handleInclusionAmount(e, i)
                                    }
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
                                <Grid item lg={4}>
                                  <TextField
                                    name="vendorAmount"
                                    label="Vendor Amount (V)"
                                    value={x.vendorAmount}
                                    onChange={(e) =>
                                      handleInclusionVendorAmount(e, i)
                                    }
                                    variant="outlined"
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
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12}>
                    <p className={classes.title}>Payment Details</p>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid container spacing={2} className={classes.insidepaper}>
                      <Grid item lg={6}>
                        <TextField
                          name="totalRoomRent"
                          label="Total Room Rent (R)"
                          variant="outlined"
                          fullWidth
                          size="small"
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
                      <Grid item lg={6}>
                        <TextField
                          name="totalInclusionAmount"
                          value={totalInclusionAmount || ""}
                          label="Total Inclusion Amount (I)"
                          variant="outlined"
                          fullWidth
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
                      </Grid>
                      <Grid item lg={4}>
                        <TextField
                          name="grossValue"
                          value={grossValue || ""}
                          label="Gross Booking Amount (R+I)"
                          variant="outlined"
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
                          disabled
                        />
                        <p className="errors">{formError.totalGrossPrice}</p>
                      </Grid>
                      <Grid item lg={4}>
                        <TextField
                          name="netValue"
                          label="Net Payout (H+V)"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={netValue || ""}
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
                          disabled
                        />
                        <p className="errors">{formError.totalNetPrice}</p>
                      </Grid>
                      <Grid item lg={4}>
                        <TextField
                          name="profitValue"
                          value={profitValue || ""}
                          label="Commission"
                          variant="outlined"
                          fullWidth
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
                      <Grid item sm={12}>
                        <p className={classes.title}>Amount Details</p>
                      </Grid>
                      <Grid item lg={4}>
                        <MaterialSelect
                          placeholder="Payment Mode"
                          options={paymentMode}
                          onChange={handlePayment}
                          value={paymentType}
                        />
                      </Grid>
                      <Grid item lg={4}>
                        <TextField
                          name="paidAmount"
                          label="Amount Received"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={paidAmount || ""}
                          onChange={handlePaid}
                          autoComplete="off"
                          type="number"
                        />
                        <p className="errors">{formError.paidAmount}</p>
                      </Grid>
                      <Grid item lg={4}>
                        <TextField
                          name="referenceNumber"
                          value={referenceNumber || ""}
                          label="Reference Number"
                          onChange={handleReference}
                          variant="outlined"
                          fullWidth
                          size="small"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          name="townoPending"
                          value={townoPending || ""}
                          type="number"
                          label="Balance payable to Towno (if any)"
                          variant="outlined"
                          fullWidth
                          size="small"
                          autoComplete="off"
                          onChange={ChangetownoBending}
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          name="hotelPendingAmount"
                          value={hotelPendingAmount}
                          label="Customer to pay to hotel"
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
                  <Grid item sm={12} style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={OpenDialogView}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
          <TravelAgentForm
            open={open}
            onClose={CloseDialog}
            selectedId={selectedId}
            BookingLocal={"yes"}
          />
          {openView ? (
            <BookingPreview
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
    padding: "100px 0px",
    margin: "0px 30px",
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
    background: "#F4F4F4",
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
    fontSize: "16px",
    margin: "0px",
  },
}));
