/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Dialog,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import axios from "axios";
import MaterialSelect from "../../components/Select/MaterialSelect";
import Select, { components } from "react-select";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import Api from "../../Service/Api";
import {
  bookingDetialInitial,
  historyListInitial,
} from "../../redux/actions/bookingActions";
import { useDispatch } from "react-redux";
import Loader from "./../../components/Loader/Loader";
import _ from "lodash";
import moment from "moment";
import { format, differenceInDays, subDays } from "date-fns";

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

export default function AddPax(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const uniqueId = localStorage.getItem("unique_id");
  const auth = localStorage.getItem("auth");
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );
  const propertyId = bookingDetails.propertyId;
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

  const [roomDisplayNameList, setRoomDisplayNameList] = useState([]);
  const [adultLimit, setAdultLimit] = useState([]);
  const [childLimit, setChildLimit] = useState([]);
  // Checkin and Checkout
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [night1, setNight] = useState(0);
  const [inclusionInput, setInclusionInput] = useState([
    { id: "", inclusion: "", amount: 0, vendorAmount: 0 },
  ]);
  const [prevRoom, setPrevRoom] = useState([]);
  const [personInput, setPersonInput] = useState([
    { name: "", mobile: "", altMobile: "", email: "" },
  ]);
  //Payment Detials
  const [netValue, setNetValue] = useState(0);
  const [grossValue, setGrossValue] = useState(0);
  const [profitValue, setProfitValue] = useState(0);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalInclusionAmount, setTotalInclusionAmount] = useState(0);
  const [totalRoomRent, setTotalRoomRent] = useState(0);
  const [dateChange, setDateChange] = useState(false);
  const [prevRoomRents, setPrevRoomRents] = useState([]);
  const [hotelPendingAmount, setHotelPendingAmount] = useState(0);
  const [townoPending, settownoPending] = useState(0);

  const handleClose = () => {
    onClose(true);
    setPersonInput([]);
    setInclusionInput([]);
    setRoomInputs([]);
  };

  useEffect(() => {
    const Date1 = bookingDetails.checkin.replace(/['"']+/g, "");
    const Date2 = bookingDetails.checkout.replace(/['"']+/g, "");
    setCheckin(new Date(Date1));
    setCheckout(new Date(Date2));
    setNight(bookingDetails.night);
    setTotalInclusionAmount(bookingDetails.totalInclusionAmount);
    setTotalRoomRent(bookingDetails.totalRoomRentAmount);
    setHotelPendingAmount(bookingDetails.hotelPending);
    setGrossValue(bookingDetails.totalGrossPrice);
    setNetValue(bookingDetails.totalNetPrice);
    setProfitValue(bookingDetails.profit);
    settownoPending(bookingDetails.townoPending);
    if (propertyId) {
   Limit();
      RoomLead();
      DisplayNameGet();
      RoomData();
      RoomInclusion();
      PreRoomRent();
    }
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId, loader]);

   const Limit = async () => {
    roomInputs.forEach((element) => {
      let StartDate;
      let EndDate;
      if (checkin != "" && checkin != null) {
        StartDate = format(checkin, "yyyy-MM-dd");
      }
      if (checkout != "" && checkout != null) {
        const subtractDate = subDays(checkout, 1);
        EndDate = format(subtractDate, "yyyy-MM-dd");
      }
      if (element.propertyId !== undefined && element.roomType !== undefined) {
        Api.get(
            `getroomrent/${element.propertyId}/${element.roomType}/${StartDate}/${EndDate}`
          )
          .then((res) => {
            setAdultLimit((prevState) => [
              ...prevState,
              ...res.data[0]["adultsMax"],
            ]);
            setChildLimit((prevState) => [
              ...prevState,
              ...res.data[0]["childMax"],
            ]);
          });
      }
    });
  };

  const RoomData = () => {
    Api.get(`roomoccupied/${uniqueId}/${id}`).then((res) => {
      setRoomInputs(res.data);
      const Modified = res.data.map((item) => ({
        roomDeleteData:
          item.roomType +
          "&&" +
          bookingDetails.checkin +
          "&&" +
          bookingDetails.checkout,
        id: item.id,
      }));
      setPrevRoom(Modified);
    });
  };

  const PreRoomRent = () => {

    Api.get(`bookingroomdetail/${uniqueId}/${id}`).then((res) => {
      setPrevRoomRents(res.data);
      console.log(res.data);
    });
  };

  const RoomLead = () => {
    Api.get(`/roomlead/${uniqueId}/${id}`).then((res) => {
      setPersonInput(res.data);
    });
  };

  const DisplayNameGet = async () => {
    if (propertyId !== undefined) {
      await Api.get("getdisplayname/" + propertyId).then((res) => {
        setRoomDisplayNameList(res.data);
       });
    }
  };

  const RoomInclusion = async () => {
    await Api.get(`bookinginclusion/${uniqueId}/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setInclusionInput(res.data);
        }
      });
  };


  // Handle Night
  const handleNight = (e) => {
    setNight(e.target.value);
  };
  const date = new Date(checkin);
  date.setDate(date.getDate() + 1);
  const handleCheckin = (data) => {
    setCheckin(data);
    setDateChange(true);
  };
  const handleCheckout = (data) => {
    setCheckout(data);
    let diffInDays = differenceInDays(new Date(data), new Date(checkin));
    setNight(diffInDays);
    setDateChange(true);
  };

  useEffect(() => {
    if (dateChange) {
      NewAddInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, checkin]);

  const NewAddInputs = async () => {
    let StartDate;
    let EndDate;
    const list = [...roomInputs];
    if (checkin != null) {
      StartDate = format(checkin, "yyyy-MM-dd");
    }
    if (checkout != null) {
      let subtractDate = await subDays(checkout, 1);
      EndDate = format(subtractDate, "yyyy-MM-dd");
    }
    if (_.isDate(checkin)) {
      if (moment(checkin).isBefore(checkout)) {
        roomInputs.forEach((element, index) => {
          if (element.id !== "") {
            Api.get(
                `getroomrent/${propertyId}/${element.roomType}/${StartDate}/${EndDate}`
              )
              .then((res) => {
                let Previous = _.filter(prevRoomRents, {
                  displayName: element.roomType,
                });
                const PreviousRate = _.uniqBy(Previous, "calendarDate");
                const IDS = new Set(
                  PreviousRate.map(({ calendarDate }) => calendarDate)
                );
                const combined = [
                  ...PreviousRate,
                  ...res.data.filter(
                    ({ calendarDate }) => !IDS.has(calendarDate)
                  ),
                ];
                let dates = [];
                let currDate = moment(new Date(StartDate)).startOf("day");
                let lastDate = moment(new Date(EndDate)).startOf("day");
                do {
                  dates.push(currDate.clone().toDate());
                } while (currDate.add(1, "days").diff(lastDate) < 0);
                dates.push(currDate.clone().toDate());
                const FilteredDate = dates.map((item) =>
                  moment(item).format("yyyy-MM-DD")
                );
                let filteredPreviousRate = combined.filter((el) =>
                  FilteredDate.includes(el.calendarDate)
                );if (!_.isEmpty(filteredPreviousRate)) {
                  setAdultLimit([...adultLimit, ...filteredPreviousRate[0]["adultsMax"]]);
                  setChildLimit([...childLimit, ...filteredPreviousRate[0]["childMax"]]);
                }
                let mealplan = filteredPreviousRate[0]["mealplan"];
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
                list[index]["roomType"] = filteredPreviousRate[""];
                list[index]["adult"] = parseInt(filteredPreviousRate[0]["adultsBase"]);
                list[index]["child"] = parseInt(filteredPreviousRate[0]["childBase"]);
                list[index]["rooms"] = 1;
                list[index]["perRoomRentNotChange"] = filteredPreviousRate[0]["roomRent"];
                list[index]["perRoomRent"] = filteredPreviousRate[0]["roomRent"];
                list[index]["totalGrossRoomRent"] = filteredPreviousRate[0];
                let roomRent = filteredPreviousRate
                  .map((item) => parseFloat(item.roomRent))
                  .reduce((a, b) => a + b, 0);
                list[index]["totalNetRoomRent"] = roomRent;
                list[index]["totalNetRoomRentNotChange"] = roomRent;
                list[index]["roomRent"] = filteredPreviousRate[0]["roomRent"];
                list[index]["guestRent"] = filteredPreviousRate[0]["guestRent"];
                list[index]["guestChildRent"] = filteredPreviousRate[0]["guestChildRent"];
                list[index]["cprate"] = filteredPreviousRate[0]["cprate"];
                list[index]["maprate"] = filteredPreviousRate[0]["maprate"];
                list[index]["aprate"] = filteredPreviousRate[0]["aprate"];
                list[index]["chcprate"] = filteredPreviousRate[0]["chcprate"];
                list[index]["chmaprate"] = filteredPreviousRate[0]["chmaprate"];
                list[index]["chaprate"] = filteredPreviousRate[0]["chaprate"];
                list[index]["adultsBase"] = filteredPreviousRate[0]["adultsBase"];
                list[index]["childBase"] = filteredPreviousRate[0]["childBase"];
                setRoomInputs(list);
                CalculateRent();
              });
          } else {
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
                  list[index]["roomType"] = res.data[""];
                  list[index]["adult"] = parseInt(res.data[0]["adultsBase"]);
                  list[index]["child"] = parseInt(res.data[0]["childBase"]);
                  list[index]["rooms"] = 1;
                  list[index]["perRoomRentNotChange"] = res.data[0]["roomRent"];
                  list[index]["perRoomRent"] = res.data[0]["roomRent"];
                  list[index]["totalGrossRoomRent"] = res.data[0];
                  let roomRent = res.data
                    .map((item) => parseFloat(item.roomRent))
                    .reduce((a, b) => a + b, 0);
                  list[index]["totalNetRoomRent"] = roomRent;
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
          }
        });
      }
    }
  };
  const CalculateRent = async () => {
    const TotalNetAmount = roomInputs
      .map((item) => parseFloat(item.totalNetRoomRent))
      .reduce((a, b) => a + b, 0);
    const TotalGrossAmount = roomInputs
      .map((item) => parseFloat(item.totalGrossRoomRent))
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
          list[index]["roomType"] = res.data[""];
          list[index]["adult"] = parseInt(res.data[0]["adultsBase"]);
          list[index]["child"] = parseInt(res.data[0]["childBase"]);
          list[index]["rooms"] = 1;
          list[index]["perRoomRentNotChange"] = res.data[0]["roomRent"];
          list[index]["perRoomRent"] = res.data[0]["roomRent"];
          list[index]["totalGrossRoomRent"] = res.data[0];
          let roomRent = res.data
            .map((item) => parseFloat(item.roomRent))
            .reduce((a, b) => a + b, 0);
          list[index]["totalNetRoomRent"] = roomRent;
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
    list[index]["totalNetRoomRent"] = Finalamount * rooms;
    list[index]["perRoomRent"] =
      parseFloat(list[index]["perRoomRentNotChange"]) +
      gadultAmount +
      gchildAmount +
      mealAmount;
    list[index]["totalGrossRoomRent"] = 0;
    setRoomInputs(list);
    CalculateRent();
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
    CalculateRent();
  };
  const handleGrossRoomRent = (e, index) => {
    const value = e.target.value;
    const list = [...roomInputs];
    list[index]["totalGrossRoomRent"] = value;
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
        perRoomRent: 0,
        totalNetRoomRent: 0,
        totalGrossRoomRent: 0,
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
  let [profitTax, setProfitTax] = useState(0);
  let [projectorAmount, setProjectorAmount] = useState(0);
  const ChangetownoBending = (e) => {
    settownoPending(e.target.value);
    const somevalue = grossValue - bookingDetails.paidAmount;
    setHotelPendingAmount(somevalue - e.target.value);
    CalculateTax();
  };
  const CalculateTax = async () => {
    setProjectorAmount(
      parseFloat(bookingDetails.paidAmount) + parseFloat(townoPending)
    );
    setProfitTax(
      parseFloat(profitValue) -
        (parseFloat(bookingDetails.paidAmount) + parseFloat(townoPending)) *
          0.05
    );
  };
  const PersonFind = { id: "", name: "", mobile: "", altMobile: "", email: "" };
  const InclusionFind = { id: "", inclusion: "", amount: 0 };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const StartDate = format(checkin, "yyyy-MM-dd");
    const EndDate = format(checkout, "yyyy-MM-dd");
    let NewEndDate;
    if (checkout != null) {
      let subtractDate = subDays(checkout, 1);
      NewEndDate = format(subtractDate, "yyyy-MM-dd");
    }
    let calenderRent = [];

    roomInputs.forEach((item, index) => {
      Api.get(
          `getroomrent/${propertyId}/${item.roomType}/${StartDate}/${NewEndDate}`
        )
        .then((res) => {
          let Previous = _.filter(prevRoomRents, {
            displayName: item.roomType,
          });
          const PreviousRate = _.uniqBy(Previous, "calendarDate");
          const IDS = new Set(
            PreviousRate.map(({ calendarDate }) => calendarDate)
          );
          const combined = [
            ...PreviousRate,
            ...res.data.filter(({ calendarDate }) => !IDS.has(calendarDate)),
          ];
          let dates = [];
          let currDate = moment(new Date(StartDate)).startOf("day");
          let lastDate = moment(new Date(EndDate)).startOf("day");
          do {
            dates.push(currDate.clone().toDate());
          } while (currDate.add(1, "days").diff(lastDate) < 0);
          dates.push(currDate.clone().toDate());
          const FilteredDate = dates.map((item) =>
            moment(item).format("yyyy-MM-DD")
          );
          let filteredPreviousRate = combined.filter((el) =>
            FilteredDate.includes(el.calendarDate)
          );

          const Name = {
            displayName: item.roomType,
          };
          const Rent = filteredPreviousRate.filter(
            (item) => item.displayName == null
          );
          const MergeData = Rent.map((item) => ({ ...Name, ...item }));
          calenderRent = [...calenderRent, ...MergeData];

          if (Object.is(roomInputs.length - 1, index)) {
            const bookingData = {
              bookingId: bookingDetails.bookingId,
              createdBy: auth,
              uniqueId: uniqueId,
              propertyId: propertyId,
            };
            const calenderRents = calenderRent.map((item) => ({
              ...bookingData,
              ...item,
            }));
            Api.post(
              `bookingroomdetail/${uniqueId}/${bookingDetails.bookingId}`,
              calenderRents
            );
          }
        });
    });

    const adultcalu = roomInputs.map((item) => parseInt(item.adult));
    const adultno = adultcalu.reduce((a, b) => a + b, 0);
    const childcalu = roomInputs.map((item) => parseInt(item.child));
    const childno = childcalu.reduce((a, b) => a + b, 0);
    const createdBy = localStorage.getItem("auth");
    const bookingData = {
      bookingId: bookingDetails.bookingId,
      uniqueId: bookingDetails.uniqueId,
      propertyId: bookingDetails.propertyId,
      createdBy: createdBy,
    };
    const TotalInclusionAmountVendor = inclusionInput
      .map((item) => parseInt(item.vendorAmount))
      .reduce((a, b) => a + b, 0);
    const Amountdata = {
      bookingId: bookingDetails.bookingId,
      totalAmount: grossValue,
      totalGrossPrice: grossValue,
      totalNetPrice: netValue,
      profit: profitValue,
      noOfAdults: adultno,
      noOfChildren: childno,
      noofRooms: roomInputs.length,
      checkin: StartDate,
      checkout: EndDate,
      totalInclusionAmount: totalInclusionAmount,
      totalRoomRentAmount: totalRoomRent,
      totalInclusionVendorAmount: TotalInclusionAmountVendor,
      night: night1,
      projectorAmount: projectorAmount,
      profitTax: profitTax,
      pendingAmount: `${parseInt(townoPending) + parseInt(hotelPendingAmount)}`,
      townoPending: townoPending,
      hotelPending: hotelPendingAmount,
      updatedby: createdBy,
    };

    const findNewItem = (oldItem) =>
      prevRoom.find((item) =>
        item.id === oldItem.id ? (oldItem.eprate = item.eprate) : ""
      );

    let arr = roomInputs.map((item) => (findNewItem(item) && item) || item);

    const room = arr.map((item) => ({
      ...bookingData,
      ...item,
      createdAt: item.id == "" ? "" : item.createdAt,
      updatedBy: item.id !== "" ? auth : null,
    }));

    const InclusionData = inclusionInput.map((item) => ({
      ...item,
      ...bookingData,
      createdAt: item.id == "" ? "" : item.createdAt,
      updatedBy: item.id !== "" ? auth : null,
    }));
    Api.post("amountModify", Amountdata).then((res) => {
      if (res.data === 1) {
        Api.post("roomoccupied", room);
        handleClose();
        dispatch(bookingDetialInitial(id, uniqueId));
        dispatch(historyListInitial(uniqueId, id));
        setLoading(false);
      }
    });

    let checkingInclu = inclusionInput.some((item) =>
      _.isEqual(item, InclusionFind)
    );
    if (checkingInclu == false) {
      Api.post("bookinginclusion", InclusionData);
    }
    // Room Lead data
    const person = personInput.map((item) => ({
      ...bookingData,
      ...item,
      createdAt: item.id == "" ? "" : item.createdAt,
      updatedBy: item.id !== "" ? auth : null,
    }));
    let checkingPerson = personInput.some((item) =>
      _.isEqual(item, PersonFind)
    );
    if (checkingPerson == false) {
      Api.post("roomlead", person);
    }
  };
  const RoomDisplayName =
  roomDisplayNameList &&
  roomDisplayNameList.map((room) => {
    return { label: room.displayName, value: room.displayName };
  });

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        {loader ? (
          <Loader />
        ) : (
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <p className={classes.titles}> Edit Booking</p>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                    style={{
                      marginTop: "10px",
                      marginRight: "15px",
                      backgroundColor: "#f46d25",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    <p className={classes.title}>Basic Information</p>
                  </Grid>
                  <Grid container spacing={2} className={classes.insidepaper}>
                    {personInput.map((x, i) => (
                      <Grid container spacing={2} key={i}>
                        <Grid item sm={6} xs={6}>
                          {i == 0 && (
                            <p style={{ color: "#f46d25", margin: "0px" }}>
                              <b>Lead Pax</b>
                            </p>
                          )}
                        </Grid>
                        <Grid item sm={6} xs={6} style={{ textAlign: "end" }}>
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
                            <Grid item lg={3} xs={6}>
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
                            <Grid item lg={3} xs={6}>
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
                            <Grid item lg={3} xs={6}>
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
                            <Grid item lg={3} xs={6}>
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
                  <Grid
                    item
                    sm={12}
                    xs={12}
                    style={{
                      marginTop: "25px",
                      marginRight: "15px",
                      backgroundColor: "#f46d25",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    <p className={classes.title}>Booking Information</p>
                  </Grid>
                  <Grid container spacing={2} className={classes.insidepaper}>
                    {" "}
                    <Grid item sm={4} xs={6}>
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
                          minDate={new Date(checkin)}
                          autoOk="true"
                        />
                        <DateRangeIcon className={classes.icon} />
                      </div>
                    </Grid>
                    <Grid item sm={4} xs={6}>
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
                          minDate={new Date(date)}
                          animateYearScrolling
                          variant="inline"
                          autoOk="true"
                        />
                        <DateRangeIcon className={classes.icon} />
                      </div>
                    </Grid>
                    <Grid item sm={4} xs={12}>
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
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      {roomInputs.map((x, i) => (
                        <Grid container spacing={2} key={i}>
                          <Grid item sm={6} xs={6}>
                            {i == 0 && (
                              <p style={{ color: "#f46d25", margin: "0px" }}>
                                <b>Room Details</b>
                              </p>
                            )}
                          </Grid>
                          <Grid item sm={6} xs={6} style={{ textAlign: "end" }}>
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
                              <Grid item sm={3} xs={6}>
                                {roomDisplayNameList && (
                                  <Select
                                    defaultValue={RoomDisplayName.find(
                                      (y) => y.value === x.roomType
                                    )}
                                    name="roomType"
                                    placeholder="Room Type"
                                    isSearchable
                                    value={RoomDisplayName.value}
                                    options={RoomDisplayName}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "roomType")
                                    }
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
                                        fontSize:
                                          (state.hasValue ||
                                            state.selectProps.inputValue) &&
                                          13,
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
                              </Grid>
                              <Grid item sm={3} xs={6}>
                                <MaterialSelect
                                  defaultValue={BoardBasic.find(
                                    (y) => y.value === x.boardBasic
                                  )}
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
                              <Grid item sm={3} xs={6}>
                                <MaterialSelect
                                  defaultValue={{
                                    label: x.adult,
                                    value: x.adult,
                                  }}
                                  name="adult"
                                  placeholder="No of Adults"
                                  onChange={(option) =>
                                    handleRoomAmountOtherChange(
                                      option,
                                      i,
                                      "adult"
                                    )
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
                              <Grid item sm={3} xs={6}>
                                <MaterialSelect
                                  name="child"
                                  defaultValue={{
                                    label: x.child,
                                    value: x.child,
                                  }}
                                  value={x.child}
                                  placeholder="No of Children"
                                  onChange={(option) =>
                                    handleRoomAmountOtherChange(
                                      option,
                                      i,
                                      "child"
                                    )
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
                              {x.rooms !== 1 ? (
                                <Grid item sm={3} xs={6}>
                                  <MaterialSelect
                                    name="rooms"
                                    defaultValue={{
                                      label: x.rooms,
                                      value: x.rooms,
                                    }}
                                    placeholder="No of Rooms"
                                    value={x.rooms}
                                    onChange={(option) =>
                                      handleRoomAmountOtherChange(
                                        option,
                                        i,
                                        "rooms"
                                      )
                                    }
                                    options={[...Array(10).keys()].map((x) => ({
                                      label: x + 1,
                                      value: x + 1,
                                    }))}
                                  />
                                </Grid>
                              ) : null}
                              <Grid item sm={3}>
                                <TextField
                                  name="totalGrossRoomRent"
                                  label="Selling Price"
                                  type="number"
                                  value={x.totalGrossRoomRent}
                                  onChange={(e) => handleGrossRoomRent(e, i)}
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

                              <Grid item sm={3}>
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
                              </Grid>
                              <Grid item sm={3}>
                                <TextField
                                  name="totalNetRoomRent"
                                  label="Net to Hotel Total(H = N*P)"
                                  type="number"
                                  value={x.totalNetRoomRent}
                                  onChange={(e) => handleNetRoomRent(e, i)}
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
                    <Grid item lg={12}>
                      {inclusionInput.map((x, i) => (
                        <Grid container spacing={2} key={i}>
                          <Grid item sm={6}>
                            {i == 0 && (
                              <p style={{ color: "#f46d25", margin: "0px" }}>
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
                                  label="Inclusion Name"
                                  value={x.inclusion}
                                  onChange={(e) => handleInclusionName(e, i)}
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  autoComplete="off"
                                />
                              </Grid>{" "}
                              <Grid item lg={4}>
                                <TextField
                                  name="amount"
                                  label="Inclusion Selling Price"
                                  value={x.amount}
                                  onChange={(e) => handleInclusionAmount(e, i)}
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
                              <Grid item lg={4}>
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
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                    style={{
                      marginTop: "25px",
                      marginRight: "15px",
                      backgroundColor: "#f46d25",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    <p className={classes.title}>Payment Details</p>
                  </Grid>{" "}
                  <Grid container spacing={2} className={classes.insidepaper}>
                    <Grid item lg={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            name="totalRoomRent"
                            label="Total Room Rent (R)"
                            variant="outlined"
                            fullWidth
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                            }}
                            value={totalRoomRent}
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
                        <Grid item lg={6} xs={12}>
                          <TextField
                            name="totalInclusionAmount"
                            value={totalInclusionAmount}
                            label="Total Inclusion Amount (I)"
                            variant="outlined"
                            fullWidth
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
                        </Grid>
                        <Grid item lg={4} xs={6}>
                          <TextField
                            name="grossValue"
                            value={grossValue || ""}
                            label="Total Booking Amount (R+I)"
                            variant="outlined"
                            fullWidth
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
                        <Grid item lg={4} xs={6}>
                          <TextField
                            name="netValue"
                            label="Net Payout (H+V)"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                            }}
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
                        </Grid>
                        <Grid item lg={4} xs={12}>
                          <TextField
                            name="profitValue"
                            value={profitValue || ""}
                            label="Commission"
                            variant="outlined"
                            fullWidth
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
                    <Grid item lg={12} xs={12}>
                      <b>Total Amount Received : </b>

                      <>₹</>
                      <b style={{ color: "#f46d25", margin: "0px" }}>
                        {" "}
                        {bookingDetails.paidAmount}
                      </b>
                      <>/-</>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <TextField
                        name="townoPending"
                        value={townoPending || ""}
                        type="number"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#fff",
                            background: "#f46d25",
                            borderRadius: "4px",
                            padding: "2px 4px",
                          },
                        }}
                        autoComplete="off"
                        onChange={ChangetownoBending}
                        label={"Balance payable to Towno"}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <TextField
                        name="hotelPendingAmount"
                        value={hotelPendingAmount}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        disabled
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        autoComplete="off"
                        label="Balance Payable on Arrival (BPAH)"
                      />
                    </Grid>{" "}
                    <Grid item lg={6} xs={12}>
                      <TextField
                        name="townoGrossAmount"
                        label="Towno Gross Amount (Projected)"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        size="small"
                        value={projectorAmount || ""}
                        autoComplete="off"
                        disabled
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <TextField
                        name="profitTax"
                        value={profitTax || ""}
                        label="Profit After Tax"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
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
                  <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                    {loading ? (
                      <Button type="submit" className={classes.button} disabled>
                        <i
                          className="fa fa-refresh fa-spin"
                          style={{
                            marginRight: "8px",
                          }}
                        ></i>
                        Submit
                      </Button>
                    ) : (
                      <Button type="submit" className={classes.button}>
                        Submit
                      </Button>
                    )}
                    <Button
                      onClick={handleClose}
                      style={{
                        margin: "10px",
                      }}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </MuiPickersUtilsProvider>
          </div>
        )}
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "100%",
    minWidth: "85%",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
    padding: "20px",
    "@media (max-width: 767px)": {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100%",
      overflowY: "scroll",
      maxWidth: "100%",
      minHeight: "95%",
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
  insidepaper: {
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    marginTop: "6px",
    marginRight: "15px",
    marginLeft: "1px",
    background: "#eaeaea",
    padding: "10px",
    width: "100%",
  },
  plus: {
    cursor: "pointer",
    color: "#f46d25",
    position: "relative",
    top: "7px",
    "@media (max-width: 767px)": {
      top: "4px",

      fontSize: "18px",
    },
  },
  title: {
    marginLeft: "15px",
    fontWeight: "bold",
    fontSize: "23px",
    color: "#fff",
    margin: "0px",
  },
  titles: {
    fontWeight: "bold",
    fontSize: "30px",
    marginTop: "10px",
    margin: "0px",
    color: "#f46d25",
  },
}));
