import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Paper, TextField, Grid, } from "@material-ui/core";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Api from "../../Service/Api";
import _ from "lodash";
import MaterialSelect from "../../components/Select/MaterialSelect";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { twnButtonStyles } from '../../utils/townoStyle';
import { Stack } from '@mui/material';

export default function AgentSearch() {
    const classes = useStyles();
    const initalValue = {
        bookingId: "",
        clientName: "",
        email: "",
        contactno: "",
        bookingstatus: "",
        agentName: "",
    };
    var uniqueid = localStorage.getItem("unique_id");
    const [hotelList, setHotelList] = useState([]);
    const [searchData, setSearchData] = useState(initalValue);
    const [bookingDateFrom, setBookingDateFrom] = useState(null);
    const [bookingDateTo, setBookingDateTo] = useState(null);
    const [errorFrom, setErrorFrom] = useState(false);
    const [errorTo, setErrorTo] = useState(false);
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [bookingstatus, setBookingstatus] = useState(null);
    const [hotelName, setHotelName] = useState(null);
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { bookingId, clientName, email, contactno, agentName } = searchData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    };

    const handleChangeHotel = (option) => {
        setHotelName(option);
    };

    const handleChangeBookingstatus = (selectedOption) => {
        setBookingstatus(selectedOption);
    };

    const handleChangePayment = (selectedOption) => {
        setPaymentStatus(selectedOption);
    };

    const Submit = (e) => {
        e.preventDefault();
        if (bookingDateFrom !== null) {
            if (bookingDateTo == null) {
                setErrorTo(true);
            }
        }
        if (bookingDateTo !== null) {
            if (bookingDateFrom == null) {
                setErrorFrom(true);
            }
        }
        const data = {
            checkIn: checkin !== null ? format(checkin, "yyyy-MM-dd") : "",
            // checkOut: checkout !== null ? format(checkout, "yyyy-MM-dd") : "",
            from:
                bookingDateFrom !== null ? format(bookingDateFrom, "yyyy-MM-dd") : "",
            to: bookingDateTo !== null ? format(bookingDateTo, "yyyy-MM-dd") : "",
            uniqueId: uniqueid,
            paymentstatus: paymentStatus !== null ? paymentStatus.value : "",
            bookingstatus: bookingstatus !== null ? bookingstatus.value : "",
            hotelname: hotelName !== null ? hotelName.value : "",
        };

        let url = `bookingsearch`;
        if (bookingId !== "") {
            url += "bookingId";
        }
        if (bookingId == "") {
            if (clientName !== "") {
                url += "clientName";
            }

            if (email !== "") {
                url += "clientEmail";
            }

            if (contactno !== "") {
                url += "clientMobile";
            }

            if (hotelName !== null) {
                url += "hotelName";
            }

            if (bookingstatus !== null) {
                url += "bookingStatus";
            }

            if (agentName !== "") {
                url += "createdBy";
            }

            if (checkin !== null) {
                url += "checkIn";
            }

            if (checkout !== null) {
                url += "checkOut";
            }

            if (paymentStatus !== null) {
                url += "paymentStatus";
            }

            if (bookingDateFrom !== null) {
                url += "from";
            }

            if (bookingDateTo !== null) {
                url += "to";
            }
        }
        const QueryValue = { ...searchData, ...data };
        Api.post(url, QueryValue).then((res) => {
            let sorted = _.orderBy(res.data, ["bookingId"], ["desc"]);
            setBookingList(sorted);
        });
    };

    const resetData = (e) => {
        setSearchData(initalValue);
        setCheckin(null);
        setCheckout(null);
        setBookingDateFrom(null);
        setBookingDateTo(null);
        setPaymentStatus(null);
        setBookingstatus(null);
        BookingListData();
    };

    const BookingListData = () => {
        setLoading(true);
        Api.get(`bookingsearchall/${uniqueid}`).then((res) => {
            let sorted = _.orderBy(res.data, ["createdAt"], ["desc"]);
            setBookingList(sorted);
            setLoading(false);
        });
    };

    return (
        <div>
            <Paper className={classes.paper}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <form onSubmit={Submit}>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <TextField
                                    name="bookingId"
                                    variant="outlined"
                                    size="small"
                                    label="Booking Id"
                                    fullWidth
                                    value={bookingId}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <TextField
                                    name="clientName"
                                    value={clientName}
                                    variant="outlined"
                                    size="small"
                                    label="Client Name"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <TextField
                                    name="email"
                                    value={email}
                                    variant="outlined"
                                    size="small"
                                    label="Email Id"
                                    onChange={handleChangeInput}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={3}>
                                <TextField
                                    name="contactno"
                                    value={contactno}
                                    variant="outlined"
                                    size="small"
                                    label="Contact No"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <MaterialSelect
                                    placeholder="Hotels"
                                    options={hotelList.map((hotel) => ({
                                        label: hotel.displayName,
                                        value: hotel.displayName,
                                    }))}
                                    value={hotelName}
                                    onChange={handleChangeHotel}
                                    isClearable={true}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <MaterialSelect
                                    options={[
                                        { value: "compeleted", label: "Compeleted" },
                                        { value: "pending", label: "Pending" },
                                        { value: "cancel", label: "Cancel" },
                                    ]}
                                    placeholder="Booking Status"
                                    value={bookingstatus}
                                    onChange={handleChangeBookingstatus}
                                    isClearable={true}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <MaterialSelect
                                    options={[
                                        { value: "Full", label: "Paid" },
                                        { value: "Partial", label: "Pending" },
                                    ]}
                                    placeholder="Payment Status"
                                    value={paymentStatus}
                                    onChange={handleChangePayment}
                                    isClearable={true}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <TextField
                                    name="agentName"
                                    value={agentName}
                                    variant="outlined"
                                    size="small"
                                    label="Agent Name"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        label="Check-In"
                                        inputVariant="outlined"
                                        fullWidth
                                        size="small"
                                        animateYearScrolling
                                        format="dd/MM/yyyy"
                                        variant="inline"
                                        autoOk="true"
                                        value={checkin}
                                        onChange={(e) => setCheckin(e)}
                                    />
                                    <CalendarTodayIcon className={classes.icon} />
                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        label="Booking Date From"
                                        inputVariant="outlined"
                                        fullWidth
                                        size="small"
                                        animateYearScrolling
                                        format="dd/MM/yyyy"
                                        variant="inline"
                                        autoOk="true"
                                        value={bookingDateFrom}
                                        onChange={(e) => setBookingDateFrom(e)}
                                    />
                                    <CalendarTodayIcon className={classes.icon} />
                                </div>
                                {errorFrom ? (
                                    <div style={{ color: "red" }}>
                                        Booking Date From Required
                                    </div>
                                ) : null}
                            </Grid>
                            <Grid item md={3}>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        label="Booking Date To"
                                        inputVariant="outlined"
                                        size="small"
                                        fullWidth
                                        format="dd/MM/yyyy"
                                        animateYearScrolling
                                        variant="inline"
                                        autoOk="true"
                                        value={bookingDateTo}
                                        onChange={(e) => setBookingDateTo(e)}
                                    />
                                    <CalendarTodayIcon className={classes.icon} />
                                </div>
                                {errorTo ? (
                                    <div style={{ color: "red" }}>
                                        Booking Date To Required
                                    </div>
                                ) : null}
                            </Grid>
                            <Stack direction='row' spacing={2} style={{margin:'10px'}}>
                                <Button type="submit" style={{...twnButtonStyles.orangeBtn,padding:'0 26px'}}>Surabhi</Button>
                                <Button type="reset" onClick={resetData} style={{...twnButtonStyles.blackBtn,padding:'0 26px'}}>Reset</Button>
                            </Stack>
                        </Grid>
                    </form>
                </MuiPickersUtilsProvider>
            </Paper>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    button: {
        background: "#F46D25",
        color: "#fff",
        "&:hover": {
            background: "#F46D25",
        },
    },
    main: {
        padding: "100px 20px 0px 20px",
    },
    link: {
        textDecoration: "underline",
        color: "#F46D25",
        cursor: "pointer",
    },
    links: {
        textDecoration: "underline",
        color: "black",
        cursor: "pointer",
    },
    paper: {
        background: "#F4F4F4",
        padding: "25px",
        // marginBottom: "15px",
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
    tableRow: {
        backgroundColor: "#F4F4F4",
    },
}));
