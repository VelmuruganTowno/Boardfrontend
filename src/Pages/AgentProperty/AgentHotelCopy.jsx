import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilterHotels from "./FilterHotels";
import { Box, Slide, Slider, Stack, TextField, Button } from "@mui/material";
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Checkbox,
  TableContainer,
  FormControlLabel,
  Grid,
  Dialog,
} from "@material-ui/core";
import _ from "lodash";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import FilterListIcon from "@material-ui/icons/FilterList";
import { set } from "lodash";
import Select from "react-select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Formik, Field, Form } from "formik";
import { format } from "date-fns";
import Api from "../../Service/Api";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "20px",
    "@media (max-width: 767px)": {
      margin: "0px 20px",
      paddingTop: "20px",
    },
  },
  paper: {
    padding: "10px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "0px",
      background: "none",
    },
  },
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
      right: "0",
      height: "100%",
      overflowY: "scroll",
      maxWidth: "80%",
      minHeight: "95%",
    },
  },
  paper1: {
    padding: "5px 30px",
    // boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "5px",
    background: "#F7F7F7",
    margin: "5px 30px",
    display: "block",
    border: '1px solid #f3f3f3',
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "0px",
      background: "none",
    },
  },
  topBorder: {
    position: "absolute",
    top: "-9px",
    zIndex: "10",
    left: "12px",
    color: "rgb(0 0 0 / 54%)",
    background: "#fff",
    borderRadius: "4px",
    padding: "1px 4px",
    fontSize: "12px",
  },
}));

const budgetOptions = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 3500,
    label: '3,500',
  },
  {
    value: 20000,
    label: '20,000',
  },
];

function valuetext(value) {
  return `Rs.${value}`;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const optionStyle = {
  menu: (provided) => ({ ...provided, zIndex: 9999, }),
  control: (base, state) => ({
    ...base,
    "&:hover": { borderColor: "#f46d25" },
    borderColor: "#f46d25",
    boxShadow: "none",
    width: '300px',
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
    fontSize: "17px",
  }),
}


export default function AgentHotelCopy(props) {

  const classes = useStyles();
  const [budgetValue, setBudgetValue] = React.useState([0, 3500]);

  const handleBudgetChange = (e, newValue) => {
    setBudgetValue(newValue);
  }

  const [rawList, setRawList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);

  const [StarRating, setStarRating] = useState([
    { id: 1, checked: false, label: "2", labelData: "2 Star" },
    { id: 2, checked: false, label: "3", labelData: "3 Star" },
    { id: 3, checked: false, label: "4", labelData: "4 Star" },
    { id: 4, checked: false, label: "5", labelData: "5 Star" },
  ]);

  const [propertyType, setPropertyType] = useState([
    { id: 1, checked: false, label: "Resort" },
    { id: 2, checked: false, label: "Hotel" },
    { id: 3, checked: false, label: "Villas" },
    { id: 4, checked: false, label: "Campsites" },
    { id: 5, checked: false, label: "Homestays" },
  ]);
  const [roomRent, setRoomRent] = useState([
    { id: 1, checked: false, label: "0", label1: "2500" },
    { id: 2, checked: false, label: "2500", label1: "5000" },
    { id: 3, checked: false, label: "5000", label1: "10000" },
    { id: 4, checked: false, label: "10000", label1: "20000" },
  ]);

  const [popularFilter, setPopularFilter] = useState({
    seaView: false,
    mountainView: false,
    valleyView: false,
    gardenView: false,
    cityView: false,
  });

  const [facilties, setFacilties] = useState({
    beachnearby: false,
    bathtub: false,
    swimingpool: false,
    petFriendly: false,
    couplefriendly: false,
    conferenceArea: false,
    kidsplayarea: false,
    designatorforwedding: false,
    spa: false,
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const OpenDialog = (client) => {
    setOpen(true);
  };

  const CloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleChangeStarRating = (id) => {
    const StarRatingCheckedList = StarRating;
    const changeCheckedStar = StarRatingCheckedList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setStarRating(changeCheckedStar);
  };

  const handleChangePropertyType = (id) => {
    const PropertyTypeCheckedList = propertyType;
    const changeCheckedPropertyType = PropertyTypeCheckedList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPropertyType(changeCheckedPropertyType);
  };

  const handleChangeRoomRent = (id) => {
    const RoomRentCheckedList = roomRent;
    const changeCheckedRoomRent = RoomRentCheckedList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setRoomRent(changeCheckedRoomRent);
  };

  const applyFilters = () => {
    let updatedList = rawList;
    // StarRating Filter
    const StarRatingChecked = StarRating.filter((item) => item.checked).map(
      (item) => item.label.toLowerCase()
    );
    if (StarRatingChecked.length) {
      updatedList = updatedList.filter((item) =>
        StarRatingChecked.includes(item.starRating)
      );
    }
    //Property Type Filter
    const PropertyTypeChecked = propertyType
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());
    if (PropertyTypeChecked.length) {
      updatedList = updatedList.filter((item) =>
        PropertyTypeChecked.includes(item.propertyType.toLowerCase())
      );
    }
    // Price Filter
    const RoomRentChecked = roomRent.filter((item) => item.checked);
    const minPrice = _.first(RoomRentChecked);
    const maxPrice = _.last(RoomRentChecked);

    // if (minPrice && maxPrice) {
    updatedList = updatedList.filter(
      (item) =>
        // item.rent >= parseInt(minPrice.label) &&
        // item.rent <= parseInt(maxPrice.label1)
        item.rent >= budgetValue[0] &&
        item.rent <= budgetValue[1]
    );
    // }
    if (facilties.beachnearby) {
      updatedList = updatedList.filter((item) => item.beachnearby === true);
    }
    if (facilties.bathtub) {
      updatedList = updatedList.filter((item) => item.bathtub === true);
    }
    if (facilties.swimingpool) {
      updatedList = updatedList.filter((item) => item.swimingpool === true);
    }
    if (facilties.petFriendly) {
      updatedList = updatedList.filter((item) => item.petFriendly === true);
    }
    if (facilties.couplefriendly) {
      updatedList = updatedList.filter((item) => item.couplefriendly === true);
    }
    if (facilties.conferenceArea) {
      updatedList = updatedList.filter((item) => item.conferenceArea === true);
    }
    if (facilties.kidsplayarea) {
      updatedList = updatedList.filter((item) => item.kidsplayarea === true);
    }
    if (facilties.designatorforwedding) {
      updatedList = updatedList.filter(
        (item) => item.designatorforwedding === true
      );
    }
    if (popularFilter.seaView) {
      updatedList = updatedList.filter((item) => item.seaView === true);
    }
    if (popularFilter.mountainView) {
      updatedList = updatedList.filter((item) => item.mountainView === true);
    }
    if (popularFilter.valleyView) {
      updatedList = updatedList.filter((item) => item.valleyView === true);
    }
    if (popularFilter.gardenView) {
      updatedList = updatedList.filter((item) => item.gardenView === true);
    }

    if (popularFilter.cityView) {
      updatedList = updatedList.filter((item) => item.cityView === true);
    }
    setPropertyList(updatedList);
    console.log(updatedList);
  };



  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StarRating, budgetValue, propertyType, facilties, popularFilter]);

  // search bar starts
  const uniqueId = localStorage.getItem("unique_id");
  const AgentType = localStorage.getItem("agent");
  const [cityOptions, setCityOptions] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const searchField = props.location.state;
  console.log("searchFieldData",searchField);

  const [city, setCity] = useState(searchField.city)
  const [checkIn, setCheckIn] = useState(searchField.checkIn)
  const [checkOut, setCheckOut] = useState(searchField.checkOut)
  const [hotel, setHotel] = useState(searchField.hotel)
  const [adult, setAdult] = useState(searchField.adult)
  const [child, setChild] = useState(searchField.child)

  const getCityOptions = () => {
    Api.get(`agentcitypropertylist/${uniqueId}`).then((res) => {
      var options = res.data.map((each) => {
        return { label: each, value: each }
      })
      setCityOptions(options);
    })
  }

  const getHotelOptions = () => {
    let url = `agentidpropertynamelist/${uniqueId}`
    Api.get(url).then((res) => {
      var options = res.data.map((each) => {
        return { label: each.displayName, value: each.propertyId }
      })
      setHotelOptions(options);
    })
  }

  const fetchPropertySearchResult = () => {
    const data = {
      checkin: checkIn !== null ? format(checkIn, "yyyy-MM-dd") : "",
      checkout: checkOut !== null ? format(checkOut, "yyyy-MM-dd") : "",
      city: city.value ?? "",
      propertyId: hotel.value ?? "",
      adult: adult,
      children: child,
      uniqueId: uniqueId,
      agentType: AgentType,
    };
    console.log("data",data)
    Api.post("AgentCommonSearch", data).then((res) => {
      console.log("search resonse",res);
      setPropertyList(res.data)
      setRawList(res.data);
    });
  }

  useEffect(() => {
    getCityOptions();
    getHotelOptions();
    fetchPropertySearchResult();
  }, [])

  // search bar ends 

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Grid container>
          {width <= 768 ? (
            <>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "right",
                }}
                onClick={OpenDialog}
              >
                Filter <FilterListIcon style={{ marginLeft: "2px" }} />
              </div>
              <Dialog
                open={open}
                onClose={CloseDialog}
                classes={{ paper: classes.dialogPaper }}
              >
                <div style={{ paddingTop: "5px" }}>
                  <HighlightOffIcon onClick={CloseDialog} />
                  <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table style={{ bordercolor: "black" }}>
                        <TableBody>
                          <TableRow
                            tabIndex={-1}
                            style={{ paddingTop: "5px", paddingLeft: "10px" }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ background: "black", color: "white" }}
                            >
                              FILTER
                            </TableCell>
                          </TableRow>
                          <TableRow tabIndex={-1}>
                            <TableCell align="left">
                              <h3 style={{ color: "black" }}>Hotel Stars</h3>
                              {StarRating.map((item,index) => (
                                <FormControlLabel key={index}
                                  style={{ width: "100%" }}
                                  control={
                                    <Checkbox
                                      color="primary"
                                      key={item.id}
                                      checked={item.checked}
                                      onChange={() =>
                                        handleChangeStarRating(item.id)
                                      }
                                    />
                                  }
                                  label={item.labelData}
                                />
                              ))}
                            </TableCell>
                          </TableRow>
                          <TableRow tabIndex={-1}>
                            <TableCell align="left">
                              <h3 style={{ color: "black" }}>Budget</h3>
                              {roomRent.map((item,index) => (
                                <FormControlLabel key={index}
                                  style={{ width: "100%" }}
                                  control={
                                    <Checkbox
                                      color="primary"
                                      key={item.id}
                                      checked={item.checked}
                                      onChange={() =>
                                        handleChangeRoomRent(item.id)
                                      }
                                    />
                                  }
                                  label={`Rs.${item.label} ${"-"} Rs.${item.label1
                                    }`}
                                />
                              ))}
                            </TableCell>
                          </TableRow>
                          <TableRow tabIndex={-1}>
                            <TableCell align="left">
                              <h3 style={{ color: "black" }}>Property Type</h3>
                              {propertyType.map((item) => (
                                <FormControlLabel
                                  style={{ width: "100%" }}
                                  control={
                                    <Checkbox
                                      color="primary"
                                      key={item.id}
                                      checked={item.checked}
                                      onChange={() =>
                                        handleChangePropertyType(item.id)
                                      }
                                    />
                                  }
                                  label={item.label}
                                />
                              ))}
                            </TableCell>
                          </TableRow>
                          <TableRow tabIndex={-1}>
                            <TableCell align="left">
                              <h3 style={{ color: "black" }}>Popular Filters</h3>
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={popularFilter.seaView}
                                    onChange={() =>
                                      setPopularFilter({
                                        ...popularFilter,
                                        seaView: !popularFilter.seaView,
                                      })
                                    }
                                  />
                                }
                                label="Sea View "
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={popularFilter.mountainView}
                                    onChange={() =>
                                      setPopularFilter({
                                        ...popularFilter,
                                        mountainView: !popularFilter.mountainView,
                                      })
                                    }
                                  />
                                }
                                label="Mountain View "
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={popularFilter.valleyView}
                                    onChange={() =>
                                      setPopularFilter({
                                        ...popularFilter,
                                        valleyView: !popularFilter.valleyView,
                                      })
                                    }
                                  />
                                }
                                label="Valley View "
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={popularFilter.gardenView}
                                    onChange={() =>
                                      setPopularFilter({
                                        ...popularFilter,
                                        gardenView: !popularFilter.gardenView,
                                      })
                                    }
                                  />
                                }
                                label="Garden View "
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={popularFilter.cityView}
                                    onChange={() =>
                                      setPopularFilter({
                                        ...popularFilter,
                                        cityView: !popularFilter.cityView,
                                      })
                                    }
                                  />
                                }
                                label="City View "
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow tabIndex={-1}>
                            <TableCell align="left">
                              <h3 style={{ color: "black" }}>
                                Facilties
                              </h3>
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.beachnearby}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        beachnearby: !facilties.beachnearby,
                                      })
                                    }
                                  />
                                }
                                label="Beach Front"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.bathtub}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        bathtub: !facilties.bathtub,
                                      })
                                    }
                                  />
                                }
                                label="Bath Tub"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.swimingpool}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        swimingpool: !facilties.swimingpool,
                                      })
                                    }
                                  />
                                }
                                label="Swimming Pool "
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.petFriendly}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        petFriendly: !facilties.petFriendly,
                                      })
                                    }
                                  />
                                }
                                label="Pet Friendly"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.couplefriendly}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        couplefriendly:
                                          !facilties.couplefriendly,
                                      })
                                    }
                                  />
                                }
                                label="Couple Friendly"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.conferenceArea}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        conferenceArea:
                                          !facilties.conferenceArea,
                                      })
                                    }
                                  />
                                }
                                label="Banquet Hall"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.kidsplayarea}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        kidsplayarea:
                                          !facilties.kidsplayarea,
                                      })
                                    }
                                  />
                                }
                                label="Kidâ€™s Play Area"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.designatorforwedding}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        designatorforwedding:
                                          !facilties.designatorforwedding,
                                      })
                                    }
                                  />
                                }
                                label="Wedding Destination"
                              />
                              <FormControlLabel
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={facilties.spa}
                                    onChange={() =>
                                      setFacilties({
                                        ...facilties,
                                        spa: !facilties.spa,
                                      })
                                    }
                                  />
                                }
                                label="Spa Facilities "
                              />
                            </TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </div>
              </Dialog>
            </>
          ) : (
            <Stack>
              <div style={{ position: "relative", zIndex: 1, paddingTop: '3%' }}>
                <div className={classes.paper1} style={{ width: "auto", padding: " 1.5%", boxShadow: "0 0 25px 4px rgb(0 0 0 / 20%)" }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Stack spacing={1}>
                        <Stack direction='row' spacing={2} style={{ width: '100%' }}>
                          <div style={{ position: "relative" }}>
                            <span className={classes.topBorder}>City</span>
                            <Select
                              name="city"
                              className={classes.select}
                              value={city}
                              onChange={(e) => {setCity(e)}}
                              placeholder=""
                              options={cityOptions}
                              styles={optionStyle}
                            />
                          </div>
                          <div style={{ width: '100%' }}>
                            <DatePicker
                              label="Check-In"
                              inputVariant="outlined"
                              fullWidth
                              size="small"
                              animateYearScrolling
                              format="dd/MM/yyyy"
                              variant="inline"
                              autoOk="true"
                              value={checkIn}
                              onChange={(e)=>setCheckIn(e)}
                              style={{ borderRadius: '5px' }}
                            />
                          </div>
                          <div style={{ width: '100%' }}>
                            <DatePicker
                              label="Check-Out"
                              inputVariant="outlined"
                              size="small"
                              fullWidth
                              format="dd/MM/yyyy"
                              animateYearScrolling
                              variant="inline"
                              autoOk="true"
                              value={checkOut}
                              onChange={(e)=>setCheckOut(e)}
                              style={{ borderRadius: '5px' }}
                            />
                          </div>
                        </Stack>

                        <Stack direction='row' spacing={2} style={{ width: '100%' }}>
                          <div style={{ position: "relative" }}>
                            <span className={classes.topBorder}>Hotel Name</span>
                            <Select
                              name="propertyId"
                              className={classes.select}
                              value={hotel}
                              onChange={(e) => {setHotel(e)}}
                              placeholder=""
                              options={hotelOptions}
                              styles={optionStyle}
                            />
                          </div>
                          {/* <div style={{ width: '100%' }}> */}
                          <Stack direction='row' spacing={2}>
                            <TextField
                              name="adult"
                              value={adult}
                              variant="outlined"
                              fullWidth
                              size="small"
                              placeholder="Adults"
                              sx={{
                                // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
                                '& .MuiInputBase-input': { height: 0, width: '18ch' }
                              }}
                              onChange={(e)=>setAdult(e.target.value)}
                            />
                            {/* </div>
                            <div style={{ width: '100%' }}> */}
                            <TextField
                              name="children"
                              value={child}
                              fullWidth
                              variant="outlined"
                              size="small"
                              placeholder="Children"
                              sx={{
                                // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
                                '& .MuiInputBase-input': { height: 0, width: '18ch' }
                              }}
                              onChange={(e)=>setChild(e.target.value)}
                            />
                          </Stack>
                          <div style={{ width: '100%' }}>
                            <Button onClick={fetchPropertySearchResult} style={{ width: '100%', fontWeight: '600', backgroundColor: '#f46d25', color: '#fff' }}>Search</Button>
                          </div>
                        </Stack>
                      </Stack>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <Stack direction='row' style={{ marginTop: '15px' }}>
                <Grid item sm={3}>
                  <Container>
                    <div style={{ paddingTop: "5px" }}>
                      <Card>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table style={{ bordercolor: "black" }}>
                            <TableBody>
                              <TableRow
                                tabIndex={-1}
                                style={{ paddingTop: "5px", paddingLeft: "10px" }}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                  style={{ background: "black", color: "white" }}
                                >
                                  FILTER
                                </TableCell>
                              </TableRow>
                              <TableRow tabIndex={-1}>
                                <TableCell align="left">
                                  <h3 style={{ color: "black" }}>Hotel Stars</h3>
                                  {StarRating.map((item) => (
                                    <FormControlLabel
                                      style={{ width: "100%" }}
                                      control={
                                        <Checkbox
                                          color="primary"
                                          key={item.id}
                                          checked={item.checked}
                                          onChange={() =>
                                            handleChangeStarRating(item.id)
                                          }
                                        />
                                      }
                                      label={item.labelData}
                                    />
                                  ))}
                                </TableCell>
                              </TableRow>
                              <TableRow tabIndex={-1}>
                                <TableCell align="left">
                                  <h3 style={{ color: "black" }}>Budget</h3>
                                  {/* {roomRent.map((item) => (
                                <FormControlLabel
                                  style={{ width: "100%" }}
                                  control={
                                    <Checkbox
                                      color="primary"
                                      key={item.id}
                                      checked={item.checked}
                                      onChange={() =>
                                        handleChangeRoomRent(item.id)
                                      }
                                    />
                                  }
                                  label={`Rs.${item.label} ${"-"} Rs.${
                                    item.label1
                                  }`}
                                />
                              ))} */}
                                  <Box sx={{ width: 220 }}>
                                    <Slider
                                      getAriaLabel={() => 'Minimum distance shift'}
                                      value={budgetValue}
                                      defaultValue={3500}
                                      min={0}
                                      max={20000}
                                      onChange={handleBudgetChange}
                                      marks={budgetOptions}
                                      valueLabelDisplay="auto"
                                      getAriaValueText={valuetext}
                                      disableSwap
                                      style={{ color: "#f46d25" }}
                                    />
                                  </Box>
                                </TableCell>
                              </TableRow>
                              <TableRow tabIndex={-1}>
                                <TableCell align="left">
                                  <h3 style={{ color: "black" }}>Property Type</h3>
                                  {propertyType.map((item) => (
                                    <FormControlLabel
                                      style={{ width: "100%" }}
                                      control={
                                        <Checkbox
                                          color="primary"
                                          key={item.id}
                                          checked={item.checked}
                                          onChange={() =>
                                            handleChangePropertyType(item.id)
                                          }
                                        />
                                      }
                                      label={item.label}
                                    />
                                  ))}
                                </TableCell>
                              </TableRow>
                              <TableRow tabIndex={-1}>
                                <TableCell align="left">
                                  <h3 style={{ color: "black" }}>Popular Filters</h3>
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={popularFilter.seaView}
                                        onChange={() =>
                                          setPopularFilter({
                                            ...popularFilter,
                                            seaView: !popularFilter.seaView,
                                          })
                                        }
                                      />
                                    }
                                    label="Sea View "
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={popularFilter.mountainView}
                                        onChange={() =>
                                          setPopularFilter({
                                            ...popularFilter,
                                            mountainView: !popularFilter.mountainView,
                                          })
                                        }
                                      />
                                    }
                                    label="Mountain View "
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={popularFilter.valleyView}
                                        onChange={() =>
                                          setPopularFilter({
                                            ...popularFilter,
                                            valleyView: !popularFilter.valleyView,
                                          })
                                        }
                                      />
                                    }
                                    label="Valley View "
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={popularFilter.gardenView}
                                        onChange={() =>
                                          setPopularFilter({
                                            ...popularFilter,
                                            gardenView: !popularFilter.gardenView,
                                          })
                                        }
                                      />
                                    }
                                    label="Garden View "
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={popularFilter.cityView}
                                        onChange={() =>
                                          setPopularFilter({
                                            ...popularFilter,
                                            cityView: !popularFilter.cityView,
                                          })
                                        }
                                      />
                                    }
                                    label="City View "
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow tabIndex={-1}>
                                <TableCell align="left">
                                  <h3 style={{ color: "black" }}>
                                    Facilties
                                  </h3>
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.beachnearby}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            beachnearby: !facilties.beachnearby,
                                          })
                                        }
                                      />
                                    }
                                    label="Beach Front"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.bathtub}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            bathtub: !facilties.bathtub,
                                          })
                                        }
                                      />
                                    }
                                    label="Bath Tub"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.swimingpool}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            swimingpool: !facilties.swimingpool,
                                          })
                                        }
                                      />
                                    }
                                    label="Swimming Pool "
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.petFriendly}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            petFriendly: !facilties.petFriendly,
                                          })
                                        }
                                      />
                                    }
                                    label="Pet Friendly"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.couplefriendly}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            couplefriendly:
                                              !facilties.couplefriendly,
                                          })
                                        }
                                      />
                                    }
                                    label="Couple Friendly"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.conferenceArea}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            conferenceArea:
                                              !facilties.conferenceArea,
                                          })
                                        }
                                      />
                                    }
                                    label="Banquet Hall"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.kidsplayarea}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            kidsplayarea:
                                              !facilties.kidsplayarea,
                                          })
                                        }
                                      />
                                    }
                                    label="Kidâ€™s Play Area"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.designatorforwedding}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            designatorforwedding:
                                              !facilties.designatorforwedding,
                                          })
                                        }
                                      />
                                    }
                                    label="Wedding Destination"
                                  />
                                  <FormControlLabel
                                    style={{ width: "100%" }}
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={facilties.spa}
                                        onChange={() =>
                                          setFacilties({
                                            ...facilties,
                                            spa: !facilties.spa,
                                          })
                                        }
                                      />
                                    }
                                    label="Spa Facilities "
                                  />
                                </TableCell>
                              </TableRow>

                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Card>
                    </div>
                  </Container>
                </Grid>
                <Grid item lg={9} xs={12}>
                  <FilterHotels Data={propertyList} />
                </Grid>
              </Stack>
            </Stack>
          )}

          {/* <Grid item lg={9} xs={12}>
            <FilterHotels Data={propertyList} />
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}
